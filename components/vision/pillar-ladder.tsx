import { Reveal } from "@/components/reveal";

type Pillar = { number: string; title: string; body: string };

/* Tread colours climb from pale to full brand blue as the steps rise. */
const treads = [
  "bg-forest/25",
  "bg-forest/45",
  "bg-forest/70",
  "bg-forest",
];

/**
 * "What transformation looks like" as a ladder: the four changes are steps
 * rising left to right, each card standing on a tread one step higher than
 * the last. Phones swipe through the steps sideways to keep the page short.
 * Steps rise in one after another on scroll.
 */
export function PillarLadder({ items }: { items: readonly Pillar[] }) {
  const count = items.length;

  return (
    <>
      {/* A staircase. On phones and tablets it scrolls sideways, one step
          at a time, with the next step peeking in; on large screens all four
          steps fit. Each tread rises by --rise, smaller on phones. */}
      <div className="relative mt-10 lg:mt-12">
        <ol
          aria-label="Four changes, swipe to see each step"
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory items-end gap-3 overflow-x-auto px-5 pb-1 [--rise:2.25rem] lg:mx-0 lg:grid lg:snap-none lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0 lg:[--rise:4.5rem]"
        >
          {items.map((item, index) => (
            <li
              key={item.number}
              className="relative flex w-[78%] shrink-0 snap-start scroll-ml-5 flex-col sm:w-[46%] lg:w-auto"
            >
              <Reveal delay={index * 0.12} y={40} className="flex flex-col">
                <article className="card card-lift relative z-10 -mb-3 p-5 lg:p-6">
                  <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.03em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </article>
                <div
                  aria-hidden="true"
                  className={`relative overflow-hidden rounded-b-[1.25rem] rounded-t-[0.5rem] ${treads[index % treads.length]}`}
                  style={{ height: `calc(4.5rem + ${index} * var(--rise))` }}
                >
                  <span
                    className={`tnum absolute bottom-3 left-5 font-display text-[2.6rem] leading-none lg:text-[3.2rem] tracking-[-0.05em] ${
                      index >= 2 ? "text-white/90" : "text-forest-deep/70"
                    }`}
                  >
                    {item.number}
                  </span>
                </div>
              </Reveal>
              <span className="sr-only">Step {index + 1} of {count}</span>
            </li>
          ))}
        </ol>

        {/* Where the climb starts and where it leads. */}
        <div className="mt-4 flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-ink-soft lg:text-[0.75rem]">
          <span>Where Ghana starts</span>
          <span aria-hidden="true" className="mx-4 h-px flex-1 bg-gradient-to-r from-forest/10 to-forest/60" />
          <span className="text-forest">The Ghana we see</span>
        </div>
      </div>

      {/* Previous phone layout: a vertical ladder (too long to scroll).
      {/ * Phones and tablets: a vertical ladder. * /}
      <ol className="relative mt-10 lg:hidden">
        {/ * The ladder: two rails with evenly spaced rungs. * /}
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-[0.375rem] top-4 w-[2.25rem] border-x-2 border-forest/25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent 0 1.5rem, color-mix(in srgb, var(--forest) 18%, transparent) 1.5rem calc(1.5rem + 2px))",
          }}
        />

        {items.map((item, index) => (
          <li key={item.number} className="relative pb-4 pl-[4.25rem] last:pb-0">
            {/ * The step number sits on the ladder. * /}
            <span
              className={`tnum absolute left-0 top-4 grid h-12 w-12 place-items-center rounded-full font-display text-[0.9rem] ${
                index >= 2 ? "bg-forest text-white" : "bg-surface text-forest ring-2 ring-forest/30"
              }`}
            >
              {item.number}
            </span>
            <Reveal delay={index * 0.08} y={24}>
              <article className="card p-6">
                <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
      */}
    </>
  );
}
