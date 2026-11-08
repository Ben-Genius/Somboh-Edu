"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { Marker } from "@/components/ui/marker";
import { TextGenerate } from "@/components/ui/text-generate";
import { Typewriter } from "@/components/ui/typewriter";
import { programImages } from "@/content/program-images";
import { programs } from "@/content/programs";
import { imageBlur } from "@/lib/blur";

/**
 * Sticky scroll reveal. On large screens the programs scroll past on the
 * left while one photograph stays pinned on the right and cross-fades to the
 * program in the middle of the screen. On small screens each program simply
 * carries its own photograph.
 */
export function ProgramScroll() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    // A thin band across the middle of the viewport: whichever program
    // crosses it is the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    items.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) =>
    items.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  const current = programs[active]!;

  return (
    <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
      <ol className="lg:col-span-6">
        {programs.map((program, index) => {
          const image = programImages[program.slug]!;
          return (
            <li
              key={program.slug}
              ref={(node) => {
                items.current[index] = node;
              }}
              data-index={index}
              className={`flex flex-col justify-center border-t border-line py-10 transition-opacity duration-500 first:border-t-0 lg:min-h-[72vh] lg:py-14 ${
                index === active ? "lg:opacity-100" : "lg:opacity-35"
              }`}
            >
              <figure className="mb-7 lg:hidden">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_0_0_5px_var(--surface),0_0_0_6px_var(--line)]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    placeholder="blur"
                    blurDataURL={imageBlur[image.blur]}
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-[0.72rem] leading-relaxed text-ink-soft">
                  {image.credit}
                </figcaption>
              </figure>

              <p className="eyebrow">Program {program.number}</p>
              <Typewriter
                text={program.title}
                className="display-3 mt-5 max-w-[18ch] text-ink"
              />
              <TextGenerate
                text={program.summary}
                delay={0.25}
                className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft"
              />
              <p className="mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-ink">
                <span className="font-semibold">What students get: </span>
                <Marker>{program.studentsGet}</Marker>
              </p>
              <Link
                href={`/programs/${program.slug}`}
                prefetch
                className="link-quiet mt-7 self-start text-sm"
              >
                Explore this program
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="hidden lg:col-span-6 lg:block">
        <div className="sticky top-[calc(var(--nav-height)+2.5rem)]">
          <figure>
            <div className="relative aspect-[4/5] max-h-[calc(100svh-var(--nav-height)-12.5rem)] w-full overflow-hidden rounded-[2rem] bg-clay shadow-[0_0_0_6px_var(--surface),0_0_0_7px_var(--line),var(--shadow-float)]">
              {programs.map((program, index) => {
                const image = programImages[program.slug]!;
                const shown = index === active;
                return (
                  <Image
                    key={program.slug}
                    src={image.src}
                    alt={shown ? image.alt : ""}
                    aria-hidden={!shown}
                    fill
                    placeholder="blur"
                    blurDataURL={imageBlur[image.blur]}
                    sizes="(min-width: 1024px) 46vw, 1px"
                    className={`object-cover transition-[opacity,transform] duration-700 ease-out ${
                      shown ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                    }`}
                  />
                );
              })}

              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-6 pt-24 text-white"
              >
                <span className="font-display text-[1.15rem] font-semibold tracking-[-0.02em]">
                  {current.shortLabel}
                </span>
                <span className="tnum font-display text-sm opacity-80">
                  {current.number} / {String(programs.length).padStart(2, "0")}
                </span>
              </div>
            </div>
            <figcaption className="mt-3 min-h-[2.4rem] max-w-md text-[0.72rem] leading-relaxed text-ink-soft">
              {programImages[current.slug]!.credit}
            </figcaption>
          </figure>

          <ol className="mt-4 flex gap-2" aria-label="Jump to a program">
            {programs.map((program, index) => (
              <li key={program.slug} className="flex-1">
                <button
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={index === active ? "step" : undefined}
                  aria-label={`${program.number}: ${program.title}`}
                  className="tap group flex w-full flex-col gap-2 py-2 text-left"
                >
                  <span
                    className={`h-[3px] w-full rounded-full transition-colors duration-500 ${
                      index === active
                        ? "bg-gold"
                        : "bg-line group-hover:bg-line-strong"
                    }`}
                  />
                  <span
                    className={`tnum font-display text-[0.75rem] transition-colors ${
                      index === active ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {program.number}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
