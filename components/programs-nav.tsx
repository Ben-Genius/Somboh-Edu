"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { programs } from "@/content/programs";

/**
 * Quick switch between the five program pages. The overview keeps anchors
 * with the same slugs, so older links still land on the right card.
 */
export function ProgramsNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Program pages"
      className="sticky top-[calc(var(--nav-height)+env(safe-area-inset-top))] z-30 border-y border-line bg-surface"
    >
      <div className="shell no-scrollbar overflow-x-auto">
        <ul className="flex min-w-max gap-1 py-1.5">
          {programs.map((program) => {
            const href = `/programs/${program.slug}`;
            const current = pathname === href;
            return (
              <li key={program.slug}>
                <Link
                  href={href}
                  prefetch
                  aria-current={current ? "page" : undefined}
                  className={`tap inline-flex min-h-[44px] items-center gap-2 rounded-full px-3 text-sm font-medium transition-colors ${
                    current
                      ? "bg-clay text-ink"
                      : "text-ink-soft hover:bg-clay/60 hover:text-ink"
                  }`}
                >
                  <span className="tnum font-display text-xs">
                    {program.number}
                  </span>
                  <span className={current ? "" : "hidden sm:inline"}>
                    {program.shortLabel}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
