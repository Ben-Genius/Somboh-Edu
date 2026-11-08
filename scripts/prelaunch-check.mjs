#!/usr/bin/env node
/**
 * Pre-launch check: crawls a running copy of the site and fails on the kind
 * of defect that slips past typecheck and lint — template leftovers, contact
 * links that dial or mail a different address than the one shown, dead
 * internal links and anchors, filename alt text, and pages without one h1.
 *
 * Usage:
 *   node scripts/prelaunch-check.mjs                 # http://localhost:3000
 *   node scripts/prelaunch-check.mjs https://sef.org  # a deployed copy
 *
 * It only reads pages. It never builds, so it is safe to run against the
 * dev server. Exits 1 when anything fails.
 */

const base = (process.argv[2] || process.env.CHECK_URL || "http://localhost:3000").replace(/\/$/, "");
const origin = new URL(base).origin;

// Text that must never reach a visitor.
const leftovers = [
  { pattern: /\[Add [^\]]*\]/g, why: "unfilled [Add …] placeholder (see TODO.md)" },
  { pattern: /lorem ipsum/gi, why: "lorem ipsum" },
  { pattern: /\b(?:demo|needhelp|test)@(?:example|company)\.com\b/gi, why: "template email address" },
  { pattern: /sef-ghana\.example/g, why: "placeholder domain (set NEXT_PUBLIC_SITE_URL)" },
];

const failures = [];
const fail = (page, check, detail) => failures.push({ page, check, detail });

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<template[\s\S]*?<\/template>/gi, " ")
    // Hidden nodes the visitor never sees (Next dev overlay, sr-only kept).
    .replace(/<nextjs-portal[\s\S]*?<\/nextjs-portal>/gi, " ");

const text = (html) =>
  stripTags(html)
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i"));
  return match ? (match[1] ?? match[2]) : null;
};

const digits = (value) => value.replace(/[^\d+]/g, "").replace(/^\+?233/, "0");

const pages = new Map(); // path -> { status, html, ids }

async function load(path) {
  if (pages.has(path)) return pages.get(path);
  const entry = { status: 0, html: "", ids: new Set() };
  pages.set(path, entry);
  try {
    const response = await fetch(origin + path, { redirect: "follow" });
    entry.status = response.status;
    if ((response.headers.get("content-type") || "").includes("text/html")) {
      entry.html = await response.text();
      for (const match of entry.html.matchAll(/\sid="([^"]+)"/g)) entry.ids.add(match[1]);
    }
  } catch (error) {
    entry.status = `unreachable (${error.cause?.code || error.message})`;
  }
  return entry;
}

async function seedPaths() {
  const seeds = new Set(["/"]);
  const sitemap = await fetch(`${origin}/sitemap.xml`).then((r) => (r.ok ? r.text() : "")).catch(() => "");
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    try {
      seeds.add(new URL(match[1]).pathname);
    } catch {
      // Not a URL; skip it.
    }
  }
  return [...seeds];
}

const queue = await seedPaths();
const seen = new Set(queue);
const anchorChecks = []; // { from, path, hash }

while (queue.length) {
  const path = queue.shift();
  const page = await load(path);
  if (page.status !== 200) {
    fail(path, "status", `returned ${page.status}`);
    continue;
  }
  const html = page.html;
  const visible = stripTags(html);
  const words = text(html);

  // 1. Leftovers in what the visitor reads, and in links they can follow.
  for (const { pattern, why } of leftovers) {
    const hits = new Set([...words.matchAll(pattern)].map((m) => m[0]));
    for (const href of visible.matchAll(/\shref="([^"]+)"/g)) {
      for (const m of href[1].matchAll(pattern)) hits.add(m[0]);
    }
    for (const hit of hits) fail(path, "leftover", `${why}: "${hit}"`);
  }

  // 2. Contact links must go where their text says.
  for (const match of visible.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = attr(match[1], "href") || "";
    const label = text(match[2]);
    if (href.startsWith("mailto:")) {
      const address = decodeURIComponent(href.slice(7).split("?")[0]).toLowerCase();
      const shown = label.match(/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/);
      if (shown && shown[0].toLowerCase() !== address) {
        fail(path, "contact link", `shows ${shown[0]} but mails ${address}`);
      }
    }
    if (href.startsWith("tel:")) {
      const shown = label.match(/\+?[\d][\d\s().-]{6,}\d/);
      if (shown && digits(shown[0]) !== digits(href.slice(4))) {
        fail(path, "contact link", `shows ${shown[0].trim()} but dials ${href.slice(4)}`);
      }
    }
  }

  // 3. Internal links: queue pages, remember anchors.
  for (const match of visible.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
    const raw = match[1].replace(/&amp;/g, "&");
    if (/^(mailto:|tel:|https?:\/\/(?!localhost)|javascript:)/i.test(raw) && !raw.startsWith(origin)) continue;
    if (raw === "#") {
      fail(path, "dead link", 'href="#" goes nowhere');
      continue;
    }
    let url;
    try {
      url = new URL(raw, origin + path);
    } catch {
      continue;
    }
    if (url.origin !== origin) continue;
    if (/\.(?:pdf|jpe?g|png|webp|svg|xml|txt|ico)$/i.test(url.pathname)) continue;
    if (!seen.has(url.pathname)) {
      seen.add(url.pathname);
      queue.push(url.pathname);
    }
    if (url.hash.length > 1) anchorChecks.push({ from: path, path: url.pathname, hash: decodeURIComponent(url.hash.slice(1)) });
  }

  // 4. Images: alt present, and not a filename. Empty alt is allowed: it is
  // the correct value for decorative images.
  for (const match of visible.matchAll(/<img\b([^>]*)>/gi)) {
    const alt = attr(match[1], "alt");
    const src = attr(match[1], "src") || "";
    if (alt === null) fail(path, "alt text", `missing alt on ${src.slice(0, 80)}`);
    else if (/\.(?:jpe?g|png|webp|gif|svg)\b|^IMG[-_]|^DSC|WhatsApp/i.test(alt)) {
      fail(path, "alt text", `filename used as alt: "${alt}"`);
    }
  }

  // 5. Exactly one h1.
  const h1s = (visible.match(/<h1\b/gi) || []).length;
  if (h1s !== 1) fail(path, "headings", `${h1s} h1 elements (want 1)`);

  // 6. Copyright year is this year.
  const year = words.match(/©\s*(\d{4})/);
  if (year && Number(year[1]) !== new Date().getFullYear()) {
    fail(path, "copyright", `© ${year[1]}, expected ${new Date().getFullYear()}`);
  }
}

for (const { from, path, hash } of anchorChecks) {
  const page = await load(path);
  if (page.status === 200 && !page.ids.has(hash)) fail(from, "dead anchor", `${path}#${hash} has no element with that id`);
}

// Report, grouped so one bad footer does not read as fifty problems.
const grouped = new Map();
for (const f of failures) {
  const key = `${f.check} · ${f.detail}`;
  if (!grouped.has(key)) grouped.set(key, []);
  grouped.get(key).push(f.page);
}

console.log(`Checked ${pages.size} pages on ${origin}\n`);
if (!grouped.size) {
  console.log("PASS — no leftovers, contact mismatches, dead links, filename alts or heading problems.");
  process.exit(0);
}
for (const [key, where] of [...grouped].sort()) {
  const list = where.length > 4 ? `${where.slice(0, 4).join(", ")} +${where.length - 4} more` : where.join(", ");
  console.log(`FAIL  ${key}\n      on ${list}`);
}
console.log(`\n${grouped.size} distinct problem(s). Fix them, or fill in TODO.md, before launch.`);
process.exit(1);
