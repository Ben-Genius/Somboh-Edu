/**
 * A torn edge, drawn once from a fixed seed so server and client agree.
 * The strip is filled with the outgoing section's colour and sits on the
 * incoming section's background; the "holes" in the tear are the next section.
 */
function tearPath(seed: number): string {
  let state = seed;
  const random = () => {
    state = (state * 1103515245 + 12345) % 2147483648;
    return state / 2147483648;
  };

  let x = 1200;
  let y = 18;
  const points = ["M0 0", "H1200", "V18"];

  while (x > 0) {
    x = Math.max(0, x - Math.round(4 + random() * 15));
    y = 9 + random() * 22;
    // An occasional deeper bite keeps the edge from reading as a saw blade.
    if (random() > 0.82) y += 7 + random() * 6;
    points.push(`L${x} ${y.toFixed(1)}`);
  }

  points.push("V0Z");
  return points.join("");
}

const TEAR = tearPath(29);

export function PaperTear({
  from = "var(--paper)",
  to = "transparent",
  flip = false,
  className = "",
}: {
  /** Colour of the sheet being torn away. */
  from?: string;
  /** Colour revealed underneath. */
  to?: string;
  /** Put the tear along the top edge instead of the bottom. */
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`paper-tear ${className}`}
      style={{ background: to }}
    >
      <svg
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        role="presentation"
        focusable="false"
        className={flip ? "rotate-180" : undefined}
      >
        <path d={TEAR} fill="var(--tear-edge)" transform="translate(0 2.5)" />
        <path d={TEAR} fill={from} />
      </svg>
    </div>
  );
}
