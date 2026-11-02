import { SombohMark } from "./somboh-logo";

/**
 * Shown while a page is on its way: the Somboh mark assembles itself above
 * the wordmark and a thin gold progress shimmer. Used on the page-change
 * sheet and as the route loading state.
 */
export function BrandLoader({
  label = "Loading",
  still = false,
}: {
  label?: string;
  /** Fully drawn and not moving: for the sheet that lifts the new page in. */
  still?: boolean;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-5 text-center"
    >
      <SombohMark animated={!still} className="h-20 w-24" />
      <div>
        <p className="font-display text-[1.6rem] font-bold leading-none tracking-[-0.03em] text-[var(--brand-blue)]">
          Somboh
        </p>
        <p className="mt-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-gold-ink">
          Educational Foundation
        </p>
      </div>
      <span
        aria-hidden="true"
        className={`loader-bar ${still ? "loader-bar-still" : ""}`}
      />
      <span className="sr-only">{label}…</span>
    </div>
  );
}
