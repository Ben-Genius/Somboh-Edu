/**
 * The curled corner on a photograph. The frame gets `peelClasses(corner)` and
 * the image gets `.peel-photo`; this component only draws the flap itself.
 * Nothing here is interactive, and the fold still reads without JavaScript.
 */
export type PeelCorner = "br" | "bl" | "tr" | "tl" | "none";

export function peelClasses(corner: PeelCorner): string {
  return corner === "none" ? "" : `peel-frame peel-${corner}`;
}

export function PeelCurl({ corner }: { corner: PeelCorner }) {
  if (corner === "none") return null;
  return <span aria-hidden="true" className="peel-curl" />;
}
