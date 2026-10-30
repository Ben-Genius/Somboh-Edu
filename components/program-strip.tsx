import Link from "next/link";
import { programs } from "@/content/programs";
import { ArrowRight } from "./icons";

/**
 * A capsule of program chips that sits across the seam between the hero and the
 * next section. It gives the page an immediate, concrete way in — and it is
 * navigation, not decoration.
 */
export function ProgramStrip() {
  return (
    <div className="shell relative z-20 -mt-12 sm:-mt-14">
      <nav
        aria-label="Programs at a glance"
        className="card flex flex-wrap items-center gap-2.5 rounded-[1.75rem] px-4 py-4 sm:rounded-full sm:px-6"
      >
        <p className="chip mr-1 border-gold/40 bg-gold/10 text-gold-ink">
          Five programs
        </p>

        <ul className="flex flex-wrap items-center gap-2">
          {programs.map((program) => (
            <li key={program.slug}>
              <Link
                href={`/programs#${program.slug}`}
                prefetch
                className="tap inline-flex min-h-[40px] items-center gap-2 rounded-full border border-line bg-paper/60 px-3.5 text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink hover:bg-clay"
              >
                <span className="tnum font-display text-[0.7rem] text-gold-ink">
                  {program.number}
                </span>
                {program.shortLabel}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/programs"
          prefetch
          className="ml-auto hidden items-center gap-1.5 whitespace-nowrap text-[0.8125rem] font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink sm:inline-flex"
        >
          All programs
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </nav>
    </div>
  );
}
