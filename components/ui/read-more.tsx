"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "@/components/icons";

/**
 * Brief first, detail on request. The detail is always in the HTML, so search
 * engines still read it, and it opens in place with a height-and-fade
 * transition. Closed content is `inert`, so it is skipped by keyboard and
 * screen readers until opened.
 */
export function ReadMore({
  children,
  label = "Read more",
  lessLabel = "Show less",
  className = "",
  buttonClassName = "",
  tone = "ink",
}: {
  children: ReactNode;
  label?: string;
  lessLabel?: string;
  className?: string;
  buttonClassName?: string;
  /** `light` on forest backgrounds. */
  tone?: "ink" | "light";
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <div
        id={id}
        className="grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
        }}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">{children}</div>
      </div>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
        className={`tap mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-current ${
          tone === "light" ? "text-[var(--on-forest)]" : "text-ink"
        } ${buttonClassName}`}
      >
        {open ? lessLabel : label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
