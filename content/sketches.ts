import type { SketchName } from "@/components/blueprint-sketches";

type Motion = "draw" | "reverse" | "scribble" | "pop" | "float";

/**
 * Each program's pencil sketch, chosen by what its caption says:
 * SAT prep, guidance, full funding, information (research), direction.
 * Used on the programs page and on each program's own page.
 */
export const programSketches: Record<string, { drawing: SketchName; motion: Motion }> = {
  "academic-excellence": { drawing: "sat", motion: "reverse" },
  "application-mentorship": { drawing: "idea", motion: "scribble" },
  "financial-aid": { drawing: "funding", motion: "draw" },
  "skills-development": { drawing: "magnifier", motion: "pop" },
  "community-engagement": { drawing: "compass", motion: "float" },
};
