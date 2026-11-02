/**
 * A rectangle with all four edges torn, as a CSS `clip-path` polygon. Points
 * are percentages, so one shape fits any frame size. The tear comes from a
 * fixed seed, so server and client draw the same edge.
 *
 * `depth` is how far (in % of the frame) the tear bites in from each edge.
 */
export function tornPolygon(seed: number, depth = 1.8, steps = 34): string {
  let state = seed;
  const random = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };
  // Mostly shallow nicks, with the occasional deeper bite.
  const bite = () => {
    const base = random() * depth;
    return random() > 0.86 ? base + depth * 0.9 : base;
  };

  const points: string[] = [];
  const push = (x: number, y: number) =>
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);

  for (let i = 0; i <= steps; i++) push((i / steps) * 100, bite());
  for (let i = 1; i <= steps; i++) push(100 - bite(), (i / steps) * 100);
  for (let i = 1; i <= steps; i++) push(100 - (i / steps) * 100, 100 - bite());
  for (let i = 1; i < steps; i++) push(bite(), 100 - (i / steps) * 100);

  return `polygon(${points.join(", ")})`;
}
