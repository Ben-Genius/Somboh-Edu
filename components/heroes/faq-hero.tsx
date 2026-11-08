import { faqCategories, faqsByCategory } from "@/content/faq";
import { HeroTitle } from "./hero-title";

/**
 * FAQ opener, after "Making Software": a book's contents page. Type and a
 * thin blue line drawing do the work; the numbered table is the navigation.
 */
export function FaqHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 [mask-image:radial-gradient(80%_70%_at_20%_30%,#000,transparent)]"
      />

      <div className="shell relative grid gap-12 pb-14 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-14">
        <div className="lg:col-span-6">
          <p className="eyebrow">Questions</p>
          <HeroTitle className="display-1 mt-7 max-w-[10ch] text-ink">
            Straight answers.
          </HeroTitle>
          <p className="lede mt-7 max-w-[30rem]">
            Who can apply, what support includes, what it costs, and what we
            can and cannot promise. If your question is not here, ask us
            directly.
          </p>
          <QuestionDiagram className="mt-10 hidden w-full max-w-[22rem] text-blue-ink sm:block" />
        </div>

        <nav
          aria-label="Contents"
          className="lg:col-span-5 lg:col-start-8 lg:self-end"
        >
          <p className="flex items-baseline justify-between border-b-2 border-blue-ink pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.185em] text-blue-ink">
            <span>Contents</span>
            <span>Questions</span>
          </p>
          <ol>
            {faqCategories.map((category, index) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="group flex items-baseline gap-4 border-b border-line py-5 transition-colors hover:bg-blue-wash/60"
                >
                  <span className="tnum w-7 font-display text-sm text-blue-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-3">
                      <span className="font-display text-[1.3rem] font-semibold leading-tight tracking-[-0.02em] text-ink group-hover:text-blue-ink sm:text-[1.5rem]">
                        {category.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="min-w-6 flex-1 border-b border-dotted border-line-strong"
                      />
                      <span className="tnum font-display text-sm text-ink-soft">
                        {faqsByCategory(category.id).length}
                      </span>
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink-soft">
                      {category.description}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

/** A technical line drawing of a question mark, with its construction lines. */
function QuestionDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 150"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="1" opacity="0.35">
        <line x1="0" y1="130" x2="320" y2="130" />
        <line x1="70" y1="0" x2="70" y2="150" strokeDasharray="3 4" />
        <circle cx="70" cy="48" r="36" strokeDasharray="3 4" />
        <line x1="34" y1="48" x2="106" y2="48" strokeDasharray="3 4" />
      </g>
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M40 44 C40 22 58 12 72 12 C92 12 106 26 106 44 C106 62 86 66 76 78 C71 84 70 90 70 100" />
        <circle cx="70" cy="122" r="5" />
      </g>
      <g fill="currentColor" fontSize="9" fontFamily="ui-monospace, monospace" letterSpacing="0.08em">
        <text x="150" y="40">fig. 1</text>
        <text x="150" y="58" opacity="0.6">the question, drawn out</text>
        <text x="150" y="112" opacity="0.6">r = 36</text>
      </g>
      <g stroke="currentColor" strokeWidth="1" opacity="0.6">
        <line x1="112" y1="38" x2="144" y2="38" />
        <line x1="106" y1="108" x2="144" y2="108" />
      </g>
    </svg>
  );
}
