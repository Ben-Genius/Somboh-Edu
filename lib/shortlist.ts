import { programs } from "@/content/programs";

const COOKIE_NAME = "sef_shortlist";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

const knownSlugs = new Set(programs.map((program) => program.slug));

/**
 * The shortlist is a cookie, not server state, so every program page can stay
 * static. It is deliberately readable by JavaScript; it holds no personal data.
 */
export function readShortlistCookie(): string[] {
  if (typeof document === "undefined") return [];

  const entry = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));

  if (!entry) return [];

  try {
    const raw = entry.slice(COOKIE_NAME.length + 1);
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (slug): slug is string => typeof slug === "string" && knownSlugs.has(slug),
    );
  } catch {
    return [];
  }
}

export function writeShortlistCookie(slugs: string[]): void {
  if (typeof document === "undefined") return;

  const value = encodeURIComponent(
    JSON.stringify(slugs.filter((slug) => knownSlugs.has(slug))),
  );

  document.cookie = `${COOKIE_NAME}=${value}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}
