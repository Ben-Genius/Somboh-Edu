import { homePage } from "@/content/home";

/**
 * Four stages of the scholarship cycle, as cards that lift on hover. The arc
 * underneath is the return path: the last step feeds the first.
 */
export function CommitmentCycle() {
  const steps = homePage.commitment.steps;

  return (
    <div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="card card-lift relative p-6">
            <span className="tnum grid h-10 w-10 place-items-center rounded-full border border-gold/45 bg-gold/10 font-display text-[0.85rem] text-gold-ink">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 font-display text-[1.5rem] leading-tight tracking-[-0.025em] text-ink">
              {step.title}
            </h3>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-5 flex items-center gap-4">
        <svg
          viewBox="0 0 1000 46"
          className="h-8 w-full text-gold/50"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M968 4v12c0 14-10 24-24 24H56C42 40 32 30 32 16V4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="m24 12 8-8 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <p className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          The cycle continues
        </p>
      </div>
    </div>
  );
}
