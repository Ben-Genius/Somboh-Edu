/**
 * Kente-inspired geometric rule. Used exactly twice on the site, both on the
 * home page. It is a quiet reference, not a flag or a costume.
 */
export function KenteDivider({
  idSuffix,
  className = "",
}: {
  idSuffix: string;
  className?: string;
}) {
  const patternId = `kente-${idSuffix}`;

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg
        width="100%"
        height="28"
        viewBox="0 0 1200 28"
        preserveAspectRatio="none"
        role="presentation"
        focusable="false"
      >
        <defs>
          <pattern
            id={patternId}
            width="56"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 27.5H56" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1" />
            <path d="M2 27 14 9 26 27Z" fill="#F8C000" fillOpacity="0.55" />
            <path d="M28 27 42 14 56 27Z" fill="currentColor" fillOpacity="0.28" />
            <circle cx="42" cy="9" r="1.4" fill="#F8C000" fillOpacity="0.8" />
          </pattern>
        </defs>
        <rect width="1200" height="28" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
