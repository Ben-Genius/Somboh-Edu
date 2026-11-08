# Kofi A. Tawiah Foundation — site teardown

**Prepared for:** Somboh Educational Foundation (SEF Ghana)
**Source:** https://ktawiahfoundation.org/ (crawled 8 November 2026)
**Scope:** every public route, anchor section, article, event, form, downloadable asset, and the front-end/SEO/accessibility layer.

> **Ground rule:** everything factual on that site belongs to the Kofi A. Tawiah Foundation (KTF). This document recommends *patterns, structure and mechanics*, not their copy, names, quotes, statistics or photography. Somboh must supply and verify its own facts before publishing.

---

## 1. Executive summary

1. **KTF is a content-rich, proof-heavy site inside a dated template.** It has roughly 20 real pages plus 14 article/event detail pages, 15 FAQ answers, 7 testimonials, a named board and team, 15 regional school counts, and 26 partner-school logos. That is the thing worth copying: *evidence density*, not visual style.
2. **Somboh already beats KTF on craft and engineering.** Somboh has typed content, accessible components, real metadata, sitemap/robots, JSON-LD, dark mode, reduced-motion support, and a coherent paper design system. Do not trade that away. KTF scores 0.86 accessibility / 0.40 SEO in Lighthouse; Somboh's architecture is built to score far higher.
3. **Somboh's real gap is credibility content.** Today Somboh has 6 routes. It has no news, events, FAQ, team, testimonials, partner proof, impact report, resource library, or dedicated campaign page. KTF has all of those — even when some are thin or broken.
4. **The single best structural idea to borrow:** *one flagship programme, packaged as a "programme in a box"* — overview + curriculum/traits + downloadable resources + partner schools + testimonials + FAQ + a time-bound challenge with winners. Somboh's five programmes currently live as paragraphs on one page with no deep links.
5. **The single best conversion idea to borrow:** a dedicated campaign landing page with its own focused form. KTF's "Adopt A School" is a separate page, not a paragraph inside "Get involved." Somboh should have an equivalent: **Sponsor a Scholar** (or **Adopt a School**) with one job per page.
6. **Do not copy KTF's technical layer.** The site ships 31 stylesheets, 25 scripts, a jQuery/legacy stack, dead search, empty report page, template leftovers ("History Of Tibet"), duplicate `<title>` on every page, no meta description, no sitemap/robots, 404s in the nav, empty `alt` on every image, and 11–15 MB PDFs.

**Bottom line:** take KTF's *information architecture and proof strategy*; keep Somboh's *design system and technical standards*. The highest-return work is a proof layer (stats, testimonials, partners), an FAQ, deep-linkable programme pages, a news/events system, and one campaign page.

---

## 2. Crawl map

### 2.1 Working routes (HTTP 200)

| Route | Page job | What is actually on it | Borrow? |
|---|---|---|---|
| `/` | Home | Hero slider with 4 slides and 4 animated counters (150 schools, 52,000 students, 2,000 educators, 100 partner schools); upcoming-event countdown; About/founder teaser; flagship programme + 5 project cards; "run a programme at your school" CTA; two split CTAs (Adopt / Read report); 3 latest posts; footer with contact + latest news + quick links | **Structure yes** — proof strip, countdown, programme spotlight, dual CTA |
| `/about/` | About | Founder story, vision, mission, 15-region school-count map, SDG 4 alignment, "moral responsibility" list, 3 board members with bios, 7 team members with roles | **Yes** — especially region map and named team |
| `/impact/` | Programmes / impact | Flagship programme narrative, "who uses it" list, curriculum, implementation, 30 traits (6 shown), 26 partner-school logos, testimonial carousel, 15-question FAQ | **Yes** — this is the model for a programme page |
| `/reports/` | Reports | Breadcrumb and heading only. **No reports.** | No — cautionary example |
| `/news-events/` | News hub | Upcoming event + countdown, 3 recent events, 11 recent news cards with author/date | **Yes** — combined news + events hub |
| `/contact/` | Contact | 5-field form (name, email, phone, subject, message), phone, address, email | **Yes** — but Somboh's form is already better |
| `/adopt-school/` | Campaign | 8-field adoption form (name, email, phone, address, country, message), campaign copy | **Yes** — dedicated campaign page pattern |
| `/news/{slug}` | Article | Hero image + date, title, rich body, tags, author, categories, recent posts, enquiry CTA, comment form | **Yes** — article template |
| `/event_detail/{slug}` | Event | Hero image + date/time/location, title, body, countdown | **Yes** — event template |
| `/index.html` | Duplicate home | Same content as `/` | No — duplicate URL |

**11 news articles crawled** (dates as published):

1. 12 Jun 2026 — Invites schools nationwide to join the programme
2. 29 Apr 2026 — Partners with NCCE on responsible citizenship
3. 17 Mar 2026 — National Good Citizenship Challenge launched
4. 10 Dec 2025 — McCarthy Hill School wins the 2025 challenge
5. 30 Sep 2025 — Celebrating 100 partner schools by 2025
6. 13 Nov 2024 — Beyond academics: educator training
7. 13 Nov 2024 — NGO equips teachers with character education skills
8. 10 Jun 2024 — Team Luna Azul wins the challenge
9. 29 Sep 2023 — Emerging School of Character: McCarthy Hill
10. 28 Sep 2023 — Character education training programme
11. 28 Sep 2023 — Role of character education in shaping ethical citizens

**3 events crawled:** 20 Nov 2026 (winners announced), 20 Aug 2025 (Northern Ghana expansion), 10 Aug 2025 (educator training, Northern Ghana).

### 2.2 Anchor sections used as sub-navigation

`/about/#Our_founder`, `/about/#misson` *(typo in the live nav)*, `/about/#team`, `/impact/#cfe`, `/impact/#our_traits`, `/impact/#partnersc`, `/impact/#testimonials`, `/impact/#faq`.

**Lesson:** deep anchors are useful, but KTF's are inconsistent (mixed case, a typo, and menu labels that do not match section headings). Somboh should use stable lowercase kebab-case IDs and a single source of truth for nav labels.

### 2.3 Broken and dead routes (verified)

| URL | Status | Note |
|---|---|---|
| `/sitemap.xml` | 404 | No sitemap |
| `/robots.txt` | 404 | No robots file |
| `/about/index.html` | 404 | Stale template link in footer |
| `/project-details.html` | 404 | "Event of Shares" / "History Of Tibet" cards link here |
| `/blog.html` | 404 | Footer "News" link |
| `/events.html` | 404 | Footer "Events" link |
| `/adopt-school/donation-details.html` | 404 | "Adopt a school" sub-link |
| `/about/team-details.html` | 404 | First board member links here |
| Search form | — | `action="#"`, no handler; search is decorative |
| `/static/pdfs/responsibility.pdf` | 200 | 11.5 MB |
| `/static/pdfs/self-control.pdf` | 200 | 15.0 MB |
| `/static/pdfs/determination.pdf` | 200 | 12.3 MB |

---

## 3. Content inventory (what gives the site its weight)

| Asset | Quantity | Quality / caveat |
|---|---|---|
| Headline statistics | 4 | 150 schools engaged, 52,000 students, 2,000 educators, 100 partner schools |
| Regional school counts | 15 regions, 101 schools listed | Does not reconcile with the 150 / 100 headline figures |
| Board members | 3 | Name, bio, no photo on the page |
| Team members | 7 | Name, role, photo |
| Testimonials | 7 unique (15 carousel slides) | Named people, named schools/institutions, specific outcomes |
| FAQ answers | 15 | Genuinely useful: programme length, cost, materials, evaluation, parent involvement |
| Character traits | ~30 claimed, 6 shown | 3 traits have downloadable PDFs |
| Partner schools | 26 logos | Empty `alt`; no names in text |
| News | 11 | Dated, authored, category-tagged |
| Events | 3 | Dated, timed, location field |
| Reports | 0 | Empty page |
| Founder story | 1 long narrative | Strong origin story; but foundation year conflicts across pages (2015 vs 2019) |

**Observation:** the site's authority comes from *named* proof — named head teachers, named schools, a named NCCE director, a named Ministry of Education advisor, named board members with real careers. Somboh's site currently has none of this. This is the largest single gap.

---

## 4. What works — patterns worth adopting

### 4.1 Proof placed immediately after the hero
KTF puts four counters directly in the hero: schools, students, educators, partners. A visitor cannot miss scale. Somboh currently opens with a thesis ("Your grades got you this far…") and statistics about *the problem* (36% transition, 14th rank). Both are valid — but Somboh has no proof of *its own* results.

**Adopt:** a compact "SEF by the numbers" strip on the home page, *only once verified figures exist* — scholars supported, scholarships secured, universities represented, regions reached, hours of coaching. Until then, do not invent numbers; the honest alternative is a qualitative proof strip (cohort year, partner universities, mentor network) or nothing.

### 4.2 One programme gets the full treatment
"Character First Education" gets its own narrative, audience list, curriculum, implementation model, traits, downloadable PDFs, partner logos, testimonials and FAQ. Every other programme is a card.

**Adopt:** designate one Somboh flagship — e.g. the **SEF Scholars Programme** (SAT + applications + aid, as one cohort experience). Give it:
- a deep-linkable page (`/programs/scholars-programme` or `/programs/[slug]`),
- a cohort timeline (diagnostic → practice → essays → aid → decisions),
- downloadable resources,
- scholar/mentor testimonials,
- partner universities/schools,
- a programme-specific FAQ,
- a single application CTA.

Somboh's five programmes are already well written. They need *packaging*, not more prose.

### 4.3 A time-bound campaign creates urgency and a news engine
The "Good Citizenship Challenge" gives KTF:
- a countdown on the home page,
- an event page,
- annual winners,
- multiple news articles,
- a reason for schools to engage,
- a repeatable annual content calendar.

**Adopt:** an annual Somboh flagship moment — e.g. **SEF Scholars Cohort** applications open/close, or a **Ghana College Access Week**. It creates a legitimate deadline, an event page, a winners/celebration story, and a yearly content rhythm. No fake urgency: one real date.

### 4.4 Downloadable one-page resources
KTF's trait PDFs are a smart lead magnet: a teacher can download "responsibility", use it, and remember the foundation. Execution is poor (11–15 MB files), but the mechanic is right.

**Adopt:** a small **Resources** library with genuinely useful, lightweight PDFs:
- "SAT study plan: 8 weeks" (2–4 pages)
- "Personal statement worksheet"
- "Financial aid document checklist for Ghanaian families"
- "How to choose universities that meet full demonstrated need"
- "Parent guide: what applying abroad actually costs"

Gate optionally with email capture, but keep them small (<1 MB), accessible, and printable. This directly serves Somboh's audience and builds the newsletter list.

### 4.5 Regional footprint map
KTF lists school counts by region. It makes a national mission tangible.

**Adopt:** a "Where our scholars come from" map or region grid, using `content/ghana.ts` (all 16 regions are already there). Counts must be real. Even a qualitative version ("scholars from 9 of 16 regions") is powerful and honest.

### 4.6 FAQ as objection handling
KTF's 15 answers do real work: Is it free? How long? Who provides materials? How is it evaluated? How do parents help? This is the closest thing on the site to a sales conversation.

**Adopt:** a Somboh FAQ that answers the questions a Ghanaian family actually asks:
- Who is eligible? (age, stage, region, school type)
- Does it cost anything?
- Is this only for studying abroad?
- What does the SAT have to do with Ghanaian university admission?
- How much time per week?
- What if my school has no counsellor?
- Can parents be involved?
- What happens after I submit the interest form?
- Do you guarantee admission or a scholarship? *(A clear no builds trust.)*
- How is my data used?

Wrap it in `FAQPage` JSON-LD. Somboh currently has none.

### 4.7 Combined news + events hub
One `/news-events` page with the next event pinned, then recent events, then recent news, is efficient. It gives journalists and partners a single place to look.

**Adopt:** `/news` (or `/stories`) + `/events`, or one combined `/updates`. Include author, date, category, and related posts. Add `Article` and `Event` JSON-LD. Somboh already has `lib/structured-data.ts` to extend.

### 4.8 Named humans
Board bios with real careers (retired bank CEO, retired Assistant Surgeon General) and a team list with regional responsibilities signal that this is a real institution.

**Adopt:** an `/about/team` page (or a section on Mission) with board, leadership, and programme staff. Titles, one-line bios, region focus, photos with consent. Even 3–4 people transforms trust.

### 4.9 Dedicated campaign page with a focused form
`/adopt-school/` does one job. It does not compete with the contact form or the donor inquiry.

**Adopt:** `/sponsor-a-scholar` (or `/adopt-a-school`) with:
- the cost of one scholar's preparation, broken down,
- what the sponsor receives (updates, report, introduction to the scholar where appropriate),
- one short form,
- a privacy/consent line,
- no payment processing unless Somboh is ready for it.

### 4.10 A founder story with a place and a stake
KTF's founder narrative is specific: born 1946, grew up in poverty, studied engineering, built a company, returned to Ghana. Specificity is what makes it memorable.

**Adopt:** Somboh's founder note is strong but abstract ("One conviction"). Add place, moment, and a concrete turning point — supplied by the founder, not invented. Keep the existing promise structure.

---

## 5. What not to copy

### Design and UX
- **Lime button + white text.** `#D7E59A` on white text fails contrast badly. Somboh's token pairs are already AA in both schemes.
- **Three competing accents** (indigo `#2D2E99`, lime `#D7E59A`, brown `#7A5555`) plus five background greys, with no documented rule for when each is used.
- **Hero carousel with four messages.** Somboh's single, sharp hero is stronger. Carousels hide 75% of the message.
- **Two identical counter blocks** on the home page (hero + about). Repetition reads as padding.
- **Template leftovers:** "Event of Shares", "History Of Tibet", and project cards that link to a 404. A visitor notices instantly.
- **Empty report page** in the main nav. Never ship a nav item with nothing behind it.
- **Decorative search**: a search box that submits to `#`. Either implement it or remove it.

### Content and governance
- **Numbers that do not reconcile:** 150 schools engaged vs 100 partner schools vs 101 schools in the regional list. Pick one definition per metric and label it.
- **Founding year conflict:** 2015 in the founder story, 2019 in the About copy.
- **No dates on evergreen pages**, no "last updated", no author on most pages.
- **Empty `alt` on every image**, including partner logos and portraits.
- **Typos in navigation** (`#misson`) and inconsistent anchor casing.
- **Testimonials without permission context.** Get written consent and keep it on file.

### Technical
- **31 stylesheets and 25 scripts**, including jQuery, four carousel libraries, Isotope, three date/time pickers, and a broken Bootstrap-select URL with `%20%%7D` in it.
- **87 requests** on the home page.
- **No meta description, no canonical, no Open Graph/Twitter tags, no sitemap, no robots.txt.**
- **The same `<title>` on every route** ("Home| Welcome to kofi Tawiah Foundation").
- **No `<h1>` on the home page** (the logo is the first link; headings start at H2/H3).
- **404s in the primary navigation and footer.**
- **PDFs of 11–15 MB** for one-page resources.
- **Missing assets and broken CSS MIME types** logged on the home page.

---

## 6. Gap analysis: KTF vs Somboh

| Capability | KTF | Somboh today | Priority |
|---|---|---|---|
| Proof of own results | Counters (unverified but present) | None | **P0** |
| Named testimonials | 7, named and specific | None | **P0** |
| FAQ | 15 answers | None | **P0** |
| Deep-linkable programme pages | Programme detail + anchors | One long `/programs` page | **P0** |
| News / updates | 11 articles | None | **P1** |
| Events + countdown | 3 events, live countdown | None | **P1** |
| Team / board | 10 named people | None | **P1** |
| Partner schools / universities | 26 logos | Placeholder only | **P1** |
| Regional footprint | 15 regions | Region field in form only | **P1** |
| Downloadable resources | 3 PDFs | None | **P1** |
| Dedicated campaign page | Adopt A School | Tabs inside `/get-involved` | **P1** |
| Impact / annual report | Empty page | None | **P2** |
| Search | Fake | ⌘K palette exists | **P2** |
| Typed content / a11y / SEO / performance | Weak | **Strong** | Keep |

---

## 7. Recommended roadmap for Somboh

### Phase 0 — Proof layer (highest return, no new routes)

**Goal:** make the existing site credible in under two screens.

1. **`content/proof.ts`** — typed arrays for `stats`, `testimonials`, `partners`, `scholarUniversities`.
   - Add only verified values. If a value is unknown, omit the stat rather than showing a placeholder.
   - Testimonial shape: `quote`, `name`, `role`, `organisation`, `region`, `programme`, `consentOnFile`.
2. **`components/proof-strip.tsx`** — a four-item stat band directly below the hero, in the paper material (not a generic card row). Tabular numerals, source note if the figure needs context.
3. **Testimonial component** — one large quote at a time, keyboard-accessible, no autoplay. Place one on Home and one on each program page. Prefer a static quote over a carousel: it is faster and more accessible.
4. **Partner strip** — text names first, logos only with written permission. KTF uses 26 anonymous logos; Somboh should use fewer, named, and linked.
5. Update `TODO.md` with the exact facts and permissions needed.

**Files:** `content/proof.ts`, `content/types.ts`, `components/proof-strip.tsx`, `components/testimonial.tsx`, `app/(site)/page.tsx`, `TODO.md`.

### Phase 1 — FAQ + programme deep links

6. **`/faq`** (or a Home + Programs FAQ section that links to a full page).
   - `content/faq.ts`: `{ id, question, answer, category }`.
   - `components/faq.tsx`: native `<details>`/`<summary>` styled as cut paper labels; no JS required.
   - Add `FAQPage` JSON-LD in `lib/structured-data.ts`.
   - Answer only what Somboh can substantiate.
7. **`/programs/[slug]`** using the existing `programs` array and `generateStaticParams`.
   - Reuse `ProgramPhoto`, hero, `ReadMore`, `ShortlistButton`.
   - Add `Course` JSON-LD (or `EducationalOccupationalProgram`) per programme.
   - Link the five cards on `/programs` to their detail pages; keep the anchors for backwards compatibility.
   - This turns one long page into five indexable, shareable pages — the single biggest SEO gain available.

### Phase 2 — News, events, team

8. **`content/updates.ts`** with `news` and `events` (typed, no CMS required).
   - News: `slug`, `title`, `date`, `author`, `category`, `excerpt`, `body` (paragraph array), `image`, `related`.
   - Event: `slug`, `title`, `start`, `end`, `location`, `status` (`upcoming`/`past`), `body`, `registrationUrl`.
9. **`/news` + `/news/[slug]`** and **`/events` + `/events/[slug]`**.
   - Article template: date, author, reading time, body, share links, related posts, one CTA.
   - Event template: date/time/location block, countdown only for the next real event, add-to-calendar (`.ics`), past-event gallery.
   - Add `Article` / `Event` JSON-LD and an RSS feed at `/feed.xml`.
10. **`/about/team`** — board and staff, with `Person` JSON-LD.
11. **Home "Next deadline" bar** — one real date, no fake countdown.

### Phase 3 — Campaign + resources + report

12. **`/sponsor-a-scholar`** — dedicated campaign page with a focused form (reuse the donor action and schema, but fewer fields). Include a cost breakdown and what the sponsor receives.
13. **`/resources`** — 3–5 lightweight PDFs (or HTML pages) with optional email capture. Reuse the newsletter action for capture.
14. **`/impact`** — a real impact page: outcome metrics, region footprint, partner list, scholar destinations, annual report download. Do not ship it until the data exists.
15. **Search** — only after there are 10+ articles. The existing ⌘K palette can index `content/news.ts` and `content/faq.ts` at build time.

---

## 8. Suggested content models

```ts
// content/types.ts (additions)
export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  organisation?: string;
  region?: string;
  programme?: string;
  consentOnFile: boolean;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category: "applying" | "programmes" | "cost" | "parents" | "partners";
};

export type NewsPost = {
  slug: string;
  title: string;
  date: string;            // ISO
  author: string;
  category: string;
  excerpt: string;
  body: string[];
  image?: { src: string; alt: string; credit: string };
  related?: string[];
};

export type FoundationEvent = {
  slug: string;
  title: string;
  start: string;           // ISO
  end?: string;
  location: string;
  status: "upcoming" | "past";
  body: string[];
  registrationUrl?: string;
};

export type Resource = {
  slug: string;
  title: string;
  description: string;
  format: "pdf" | "page";
  href: string;
  sizeLabel?: string;      // e.g. "3 pages, 420 KB"
  audience: "students" | "parents" | "schools";
};
```

Keep the repo's existing rule: any unverified fact stays in `lib/site-config.ts` as a `[placeholder]` and is listed in `TODO.md`. Do not populate `content/proof.ts` with KTF's numbers.

---

## 9. Technical notes for Somboh (already ahead — protect it)

KTF's failures are a useful checklist. Somboh already handles most of them; confirm before launch:

- One `<h1>` per page, ordered headings, landmarks, skip link. ✅
- Unique `<title>` and 150–158 character meta description per route. ✅
- Canonical URLs, OG/Twitter cards, generated OG image. ✅
- `sitemap.xml`, `robots.txt`, Organization/Breadcrumb JSON-LD. ✅ — add `FAQPage`, `Article`, `Event`, `Person`, `Course`.
- Real `alt` text and captions. ✅ — keep it when partner logos and team photos arrive.
- Static generation + ISR, no client data fetching. ✅
- Reduced motion, 44px targets, AA contrast. ✅ — keep the paper aesthetic when adding new components.
- Lightweight assets. ✅ — cap PDFs at ~1 MB and compress images; do not repeat KTF's 15 MB downloads.
- No dead nav items. Audit every new route before adding it to `content/site.ts`.
- Add "Published" / "Last updated" dates to news and evergreen impact content.

---

## 10. Facts Somboh must supply before any of this ships

1. **Outcome numbers:** scholars supported, scholarships/offers secured, total aid value, universities represented, regions represented, cohort years.
2. **Named testimonials:** 3–5 scholars, parents, school leaders or university partners, with written consent.
3. **Partner names/logos:** written permission, preferred lockup, and link targets.
4. **Team and board:** names, roles, one-line bios, photos, consent.
5. **Programme facts:** eligibility, cost to the student, weekly time commitment, cohort dates, selection process, what "success" means.
6. **One real annual moment:** application window, cohort start, celebration event, or deadline.
7. **Resource content:** who writes the SAT plan / essay guide / aid checklist, and who reviews it.
8. **Legal:** privacy notice covering forms, newsletter, photos and testimonials.

Until these arrive, the honest move is to ship *fewer* proof elements, not placeholder numbers. KTF's site shows how quickly unverified counters and stale pages erode trust.

---

## 11. Copy-ready borrow list (one screen)

- [ ] Proof strip under the hero — verified stats only
- [ ] One named testimonial on Home, one per programme
- [ ] Partner/school names (text first, logos only with permission)
- [ ] Region footprint grid using `content/ghana.ts`
- [ ] Full FAQ page + `FAQPage` JSON-LD
- [ ] `/programs/[slug]` deep links with `Course` JSON-LD
- [ ] `/news` + `/news/[slug]` with author, date, related posts
- [ ] `/events` + `/events/[slug]` with a real countdown and `.ics`
- [ ] `/about/team` with `Person` JSON-LD
- [ ] `/sponsor-a-scholar` campaign page with a focused form
- [ ] `/resources` with 3–5 small, useful downloads
- [ ] `/impact` with outcomes + annual report — only when real
- [ ] "Next deadline" bar on Home — one real date
- [ ] RSS feed, related content, last-updated dates
- [ ] Audit `content/site.ts` so no nav item points at an empty page

---

## Appendix — raw evidence

- Home section order: hero slider + counters → upcoming event countdown → about → flagship programme + project cards → school CTA → dual CTA banners → latest news → footer.
- KTF palette: indigo `#2D2E99`, lime `#D7E59A`, brown `#7A5555`, off-white `#F8F8F9`, white.
- KTF type: headings Fira Sans 35–60 px / 700; body Rubik 17 px / 26 px line-height.
- KTF buttons: 10 px radius, 17×50 px padding, lime background, white text.
- Lighthouse (home): accessibility 0.86, best practices 0.83, SEO 0.40. Failures: contrast, link names, list structure, touch targets, low-resolution images, missing meta description, non-descriptive link text, uncrawlable anchors.
- Page weight signals: 87 requests, 31 stylesheets, 25 scripts, 25 images, 908 DOM nodes.
- Console errors on home: broken stylesheet MIME types (`card.css`, `bootstrap-select.min.css`), 404s for `main-slider-shape-1.png`, `main-slider-shape-5.png`, `footer-logo.png`, `main-slider-1-2a.jpg`, `main-slider-1-2aa.jpg`.
