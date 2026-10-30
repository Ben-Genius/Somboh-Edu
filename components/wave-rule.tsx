/**
 * A single wavy cut, used where the page would otherwise use a hairline rule
 * (the hero's top row and the facts row). It stretches to any width without
 * changing the 1px stroke.
 */
export function WaveRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`h-3 w-full ${className}`}
    >
      <path
        d="M0 6 Q30 -1 60 6 T120 6 T180 6 T240 6 T300 6 T360 6 T420 6 T480 6 T540 6 T600 6 T660 6 T720 6 T780 6 T840 6 T900 6 T960 6 T1020 6 T1080 6 T1140 6 T1200 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
