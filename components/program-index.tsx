import Link from "next/link";
import type { Program } from "@/content/types";
import { homePage } from "@/content/home";
import { ArrowRight } from "./icons";
import { ViewTransition } from "./view-transition";

/**
 * An editorial index, not a card grid: one program per row, separated by
 * hairlines. On hover the row lifts into a card and the arrow chip slides,
 * which keeps five long rows feeling alive without adding noise.
 */
export function ProgramIndex({
  items,
  headingLevel = 3,
  showStudentsGet = true,
  className = "",
}: {
  items: Program[];
  headingLevel?: 2 | 3;
  showStudentsGet?: boolean;
  className?: string;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <ol className={`border-b border-line ${className}`}>
      {items.map((program) => (
        <li key={program.slug} className="border-t border-line">
          <Link
            href={`/programs/${program.slug}`}
            prefetch
            className="group grid gap-4 py-7 transition-colors hover:bg-surface sm:grid-cols-[3.5rem_1fr_auto] sm:items-start sm:gap-6 sm:rounded-2xl sm:px-4"
          >
            <span className="tnum pt-1 font-display text-[0.95rem] text-gold-ink">
              {program.number}
            </span>

            <span className="min-w-0">
              <ViewTransition
                name={`program-${program.slug}`}
                share="morph"
                default="none"
              >
                <Heading className="display-3 max-w-[22ch] text-ink transition-colors group-hover:text-forest">
                  {program.title}
                </Heading>
              </ViewTransition>
              <span className="mt-3 block max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
                {program.summary}
              </span>
              {showStudentsGet ? (
                <span className="mt-3 flex max-w-2xl flex-wrap items-baseline gap-x-2 gap-y-1 text-[0.8125rem] leading-relaxed">
                  <span className="font-semibold text-ink">
                    {homePage.programs.studentsGetLabel}
                  </span>
                  <span className="text-ink-soft">{program.studentsGet}</span>
                </span>
              ) : null}
            </span>

            <span className="hidden items-center gap-3 self-center text-sm font-semibold text-ink-soft transition-colors group-hover:text-ink sm:flex">
              <span className="hidden lg:inline">
                {homePage.programs.linkLabel}
              </span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface transition-all duration-300 group-hover:border-forest group-hover:bg-forest group-hover:text-[var(--on-forest)]">
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
