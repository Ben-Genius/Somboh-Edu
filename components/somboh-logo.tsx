/**
 * The Somboh mark: a cut diamond with a spark, rising from an open book.
 * Redrawn as SVG from the foundation's printed logo, so it stays sharp at
 * any size. Swap in the original artwork once it is supplied.
 *
 * Pages and wordmark use `--brand-blue` (white in dark mode, as on the dark
 * T-shirts); the diamond and the middle pages use `--brand-gold`.
 */
export function SombohMark({ className = "" }: { className?: string }) {
  const left = (
    <>
      {/* outer page */}
      <path
        d="M60 95 C46 85 28 80 4 82 L6 73 C30 71 48 78 60 89 Z"
        fill="var(--brand-blue)"
      />
      {/* middle page */}
      <path
        d="M60 86 C51 75 37 68 17 66 L21 57 C38 59 52 67 60 79 Z"
        fill="var(--brand-gold)"
      />
      {/* inner page */}
      <path
        d="M60 77 C56 66 48 56 37 51 L43 45 C52 51 58 61 60 71 Z"
        fill="var(--brand-blue)"
      />
    </>
  );

  return (
    <svg
      viewBox="0 0 120 100"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* spark */}
      <path
        d="M27 2 Q28.2 8.8 35 10 Q28.2 11.2 27 18 Q25.8 11.2 19 10 Q25.8 8.8 27 2 Z"
        fill="var(--brand-gold)"
      />
      {/* diamond: three crown facets over three pavilion facets */}
      <g fill="var(--brand-gold)">
        <path d="M40 18 H52.5 L48.5 30 H30 Z" />
        <path d="M54.5 18 H65.5 L69.5 30 H50.5 Z" />
        <path d="M67.5 18 H80 L90 30 H71.5 Z" />
        <path d="M30 32 H48.5 L58.6 63 Z" />
        <path d="M50.5 32 H69.5 L60 62 Z" />
        <path d="M71.5 32 H90 L61.4 63 Z" />
      </g>
      {left}
      <g transform="translate(120 0) scale(-1 1)">{left}</g>
    </svg>
  );
}
