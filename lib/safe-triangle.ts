export type Point = { x: number; y: number };

function sign(point: Point, a: Point, b: Point): number {
  return (point.x - b.x) * (a.y - b.y) - (a.x - b.x) * (point.y - b.y);
}

/**
 * Safe-triangle hover intent: while the pointer travels from the trigger
 * toward the open panel, it stays inside a triangle whose base is the panel's
 * top edge. The desktop Programs menu uses this so a diagonal move does not
 * close the menu in the gap.
 */
export function isPointInTriangle(
  point: Point,
  a: Point,
  b: Point,
  c: Point,
): boolean {
  const d1 = sign(point, a, b);
  const d2 = sign(point, b, c);
  const d3 = sign(point, c, a);
  const hasNegative = d1 < 0 || d2 < 0 || d3 < 0;
  const hasPositive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(hasNegative && hasPositive);
}
