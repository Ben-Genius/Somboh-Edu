"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { programs } from "@/content/programs";

/**
 * Sticky in-page navigation with a scroll-spy marker. It uses a small scroll
 * calculation rather than a full library, and stays out of the way of reduced
 * motion (the link jump itself is handled by CSS).
 */
export function ProgramsNav() {
  const [active, setActive] = useState(programs[0]!.slug);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const marker = 180;
      let current = programs[0]!.slug;

      for (const program of programs) {
        const element = document.getElementById(program.slug);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= marker) {
          current = program.slug;
        }
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav
      aria-label="Programs on this page"
      className="sticky top-[calc(var(--nav-height)+env(safe-area-inset-top))] z-30 border-y border-line bg-surface"
    >
      <div className="shell no-scrollbar overflow-x-auto">
        <ul className="flex min-w-max gap-1 py-1.5">
          {programs.map((program) => {
            const current = active === program.slug;
            return (
              <li key={program.slug}>
                <Link
                  href={`#${program.slug}`}
                  aria-current={current ? "location" : undefined}
                  onClick={() => setActive(program.slug)}
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
