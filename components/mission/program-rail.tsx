"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";

export type RailItem = {
  href: string;
  number: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  blurDataURL: string;
};

/* Descending heights, bottoms aligned: the row steps down like a staircase
   on large screens, then repeats. Phones get one even height. */
const heights = ["lg:h-[31rem]", "lg:h-[26rem]", "lg:h-[22rem]"];

/**
 * The five programs as a row of photo cards, each with a frosted caption bar.
 * The row scrolls sideways (swipe, trackpad, or the arrow buttons); every
 * card is an ordinary link, so keyboard users simply tab along it.
 */
export function ProgramRail({
  items,
  previousLabel,
  nextLabel,
  footer,
}: {
  items: RailItem[];
  previousLabel: string;
  nextLabel: string;
  footer?: React.ReactNode;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (card.getBoundingClientRect().width + 16),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  const arrowClass =
    "tap grid h-11 w-11 place-items-center rounded-full border transition-colors disabled:cursor-default disabled:opacity-40";

  return (
    <div>
      <ul
        ref={track}
        className="no-scrollbar -mx-[clamp(1.25rem,3.8vw,3.5rem)] flex snap-x snap-mandatory items-end gap-4 overflow-x-auto scroll-px-[clamp(1.25rem,3.8vw,3.5rem)] px-[clamp(1.25rem,3.8vw,3.5rem)] pb-2"
      >
        {items.map((item, index) => (
          <li
            key={item.href}
            className={`relative h-[25rem] w-[80%] shrink-0 snap-start sm:w-[21rem] lg:w-[23rem] ${
              heights[index % heights.length]
            }`}
          >
            <Link
              href={item.href}
              prefetch
              className="group relative block h-full overflow-hidden rounded-[1.5rem] bg-ink/10"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                placeholder="blur"
                blurDataURL={item.blurDataURL}
                sizes="(min-width: 1024px) 23rem, (min-width: 640px) 21rem, 80vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent"
              />
              <span className="tnum absolute left-5 top-4 font-display text-[0.8125rem] font-semibold tracking-[0.08em] text-white">
                {item.number}
              </span>

              {/* Frosted caption bar, inset from the card edge. */}
              <span className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-[1rem] border border-white/20 bg-black/40 py-3 pl-4 pr-3 text-white backdrop-blur-md [-webkit-backdrop-filter:blur(12px)]">
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[1.05rem] font-semibold leading-tight tracking-[-0.015em]">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.75rem] leading-snug text-white/80">
                    {item.description}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-[#0c1b33] transition-transform duration-300 group-hover:translate-x-0.5"
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0 flex-1">{footer}</div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={atStart}
            aria-label={previousLabel}
            className={`${arrowClass} border-line-strong bg-surface text-ink hover:border-ink`}
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={atEnd}
            aria-label={nextLabel}
            className={`${arrowClass} border-transparent bg-gold text-[#0c1b33] hover:brightness-95`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
