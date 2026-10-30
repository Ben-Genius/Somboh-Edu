import type { Source } from "./types";

/**
 * Verified statistics only. Each number rendered on the site links back to
 * one of these citations. Do not add a figure without a published source.
 */
export const sources: Source[] = [
  {
    id: "wasce-tertiary",
    citation:
      "Africa Education Watch via Modern Ghana — WASSCE-to-tertiary transition, 2021 cohort.",
  },
  {
    id: "free-shs",
    citation: "Oxford Business Group — Free Senior High School policy, introduced 2018.",
  },
  {
    id: "open-doors",
    citation:
      "IIE Open Doors 2025 Ghana Fact Sheet; Ghanaian Times — Ghanaian students in the United States, 2024/25.",
  },
  {
    id: "tertiary-goal",
    citation:
      "Africa Education Watch via Modern Ghana — Ghana's 40% gross tertiary enrollment goal for 2030.",
  },
];

export function sourceById(id: string): Source {
  const found = sources.find((source) => source.id === id);
  if (!found) {
    throw new Error(`Unknown source: ${id}`);
  }
  return found;
}
