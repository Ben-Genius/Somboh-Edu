"use client";

import Link from "next/link";
import { programs } from "@/content/programs";
import { ui } from "@/content/ui";
import { ArrowRight, BookmarkIcon, CloseIcon } from "./icons";
import { useShortlist } from "./shortlist-provider";

export function ShortlistSummary() {
  const { items, ready, setMembership } = useShortlist();

  if (!ready) {
    return (
      <div
        aria-hidden="true"
        className="panel flex min-h-[92px] animate-pulse items-center px-5"
      >
        <div className="h-3 w-52 rounded bg-clay" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="paper-stack flex items-center gap-4 rounded-[1rem] border border-line bg-surface px-4 py-3.5">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gold/15 text-gold-ink"
        >
          <BookmarkIcon className="h-4 w-4" />
        </span>
        <p className="text-sm leading-snug text-ink-soft">
          <span className="font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-ink">
            {ui.forms.shortlistEmptyTitle}
          </span>{" "}
          {ui.forms.shortlistHint}
        </p>
      </div>
    );
  }

  const selected = programs.filter((program) => items.includes(program.slug));

  return (
    <div className="paper-stack rounded-[1rem] border border-line bg-surface px-4 py-3.5">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          <BookmarkIcon className="h-3.5 w-3.5 text-gold-ink" />
          {ui.forms.shortlistLabel}
          <span className="tnum text-ink">{selected.length}</span>
        </p>
        <Link
          href="/get-involved#students"
          className="ml-auto inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-ink underline decoration-line-strong underline-offset-4"
        >
          Apply for support
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <ul className="mt-2 flex flex-wrap gap-2">
        {selected.map((program) => (
          <li key={program.slug}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper py-1 pl-3 pr-1 text-[0.8125rem] font-medium text-ink">
              {program.shortLabel}
              <button
                type="button"
                onClick={() =>
                  setMembership(program.slug, false, program.title)
                }
                className="tap grid h-8 w-8 place-items-center rounded-full text-ink-soft transition-colors hover:bg-clay hover:text-ink"
                aria-label={`Remove ${program.title} from shortlist`}
              >
                <CloseIcon className="h-3.5 w-3.5" />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
