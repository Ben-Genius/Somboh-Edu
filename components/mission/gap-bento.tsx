import { SourceFootnote } from "@/components/sources";
import { homePage } from "@/content/home";
import { missionPage } from "@/content/mission";

type Stat = (typeof homePage.gap.stats)[number];

function StatValue({ stat, size }: { stat: Stat; size: string }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className={`stat-value ${size} ${stat.emphasis ? "text-gold-ink" : "text-ink"}`}>
        {stat.value}
        {stat.unit ? <span className="text-[0.5em] tracking-normal">{stat.unit}</span> : null}
      </span>
      <SourceFootnote sourceId={stat.sourceId} className="ml-1" />
    </div>
  );
}

/**
 * The share as a hundred dots: one per hundred candidates, filled in reading
 * order. A meter in unit form, so a single colour and a same-family track;
 * the number beside it carries the reading, so no legend.
 */
function HundredDots({ filled, label }: { filled: number; label: string }) {
  const cell = 12;
  return (
    <svg
      viewBox={`0 0 ${cell * 10} ${cell * 10}`}
      role="img"
      aria-label={label}
      className="h-auto w-full max-w-[22rem]"
    >
      {Array.from({ length: 100 }, (_, index) => {
        const x = (index % 10) * cell + cell / 2;
        const y = Math.floor(index / 10) * cell + cell / 2;
        const on = index < filled;
        return (
          <circle
            key={index}
            cx={x}
            cy={y}
            r={4.25}
            className={on ? "fill-[var(--gold-ink)]" : "fill-[var(--line-strong)] opacity-60"}
          />
        );
      })}
    </svg>
  );
}

/**
 * The gap, as a bento: the headline figure gets the wide card with its own
 * picture of the share; the three context figures sit in a row beneath.
 */
export function GapBento() {
  const [lead, ...rest] = homePage.gap.stats;
  if (!lead) return null;
  const share = Number(lead.value);

  return (
    <ul className="mt-12 grid gap-4 lg:grid-cols-3">
      <li className="grid gap-8 rounded-[1.75rem] bg-clay p-7 sm:p-10 lg:col-span-3 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-12">
        <div className="lg:col-span-6">
          <StatValue stat={lead} size="text-[clamp(4rem,9vw,7rem)]" />
          <p className="mt-5 max-w-[26ch] font-display text-[1.35rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.6rem]">
            {lead.label}
          </p>
          {lead.detail ? (
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">{lead.detail}</p>
          ) : null}
        </div>
        {Number.isFinite(share) ? (
          <figure className="lg:col-span-5 lg:col-start-8">
            <HundredDots
              filled={Math.round(share)}
              label={`${share} of every 100 WASSCE candidates entered tertiary education the following year.`}
            />
            <figcaption className="mt-4 max-w-[22rem] text-[0.8125rem] leading-relaxed text-ink-soft">
              {missionPage.gapChart.caption}
            </figcaption>
          </figure>
        ) : null}
      </li>

      {rest.map((stat) => (
        <li key={stat.id} className="flex flex-col rounded-[1.75rem] bg-clay p-7 sm:p-8">
          <StatValue stat={stat} size="text-[clamp(2.4rem,4.2vw,3.3rem)]" />
          <p className="mt-4 text-[0.9375rem] font-semibold leading-snug text-ink">{stat.label}</p>
          {stat.detail ? (
            <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{stat.detail}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
