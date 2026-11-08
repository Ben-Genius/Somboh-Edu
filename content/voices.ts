/**
 * Voices: short quotes from people who know SEF's work first-hand, each with
 * a name and a role so a reader can judge the source.
 *
 * Empty on purpose. Add a quote only when it is real, the person has agreed
 * in writing to be named, and `permission` records where that consent is
 * kept. Nothing here is shown until at least one entry has permission.
 * Never write or tidy a quote on someone's behalf. See TODO.md.
 */
export type Voice = {
  quote: string;
  name: string;
  /** e.g. "Student, Class of 2027" or "Headteacher, Example SHS". */
  role: string;
  /** Who they are to SEF, so a mix of perspectives can be shown. */
  kind: "student" | "parent" | "school" | "partner";
  /** Where the written consent is filed. Leave empty until it exists. */
  permission: string;
  /** Optional portrait in public/images, also covered by the consent. */
  image?: { src: string; alt: string };
};

export const voicesSection = {
  eyebrow: "In their words",
  heading: "From the people who know the work.",
} as const;

export const voices: Voice[] = [];

/** Only the voices with recorded consent are ever rendered. */
export const publishedVoices = voices.filter(
  (voice) => voice.permission.trim().length > 0,
);
