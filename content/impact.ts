import { isPlaceholder, siteConfig } from "@/lib/site-config";

/**
 * SEF's own results, each with the date it was counted and where the count
 * comes from. A figure without both is not shown: an undated, unsourced
 * number reads as a guess, and one that later disagrees with another page
 * costs more trust than it earns.
 *
 * Values come from `siteConfig.unverifiedCounts`; fill those in, then set
 * `asOf` and `basis` here. See TODO.md.
 */
export type ImpactFigure = {
  value: string;
  label: string;
  /** Month and year the count was taken, e.g. "June 2027". */
  asOf: string;
  /** How it was counted, in one line, e.g. "SEF intake records". */
  basis: string;
};

export const impactSection = {
  eyebrow: "Our results so far",
  heading: "Counted, dated, and sourced.",
} as const;

const figures: ImpactFigure[] = [
  {
    value: siteConfig.unverifiedCounts.studentsServed,
    label: "Students supported",
    asOf: "[Add date counted]",
    basis: "[Add how it was counted]",
  },
  {
    value: siteConfig.unverifiedCounts.scholarshipsSecured,
    label: "Scholarships secured",
    asOf: "[Add date counted]",
    basis: "[Add how it was counted]",
  },
];

/** Only figures whose value, date and basis are all filled in. */
export const publishedImpact = figures.filter(
  (figure) =>
    !isPlaceholder(figure.value) &&
    !isPlaceholder(figure.asOf) &&
    !isPlaceholder(figure.basis),
);
