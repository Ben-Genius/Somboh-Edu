"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { Marker } from "@/components/ui/marker";
import {
  SqueezeCarousel,
  type SqueezeSlide,
} from "@/components/ui/squeeze-carousel";
import { TextGenerate } from "@/components/ui/text-generate";
import { Typewriter } from "@/components/ui/typewriter";
import { programImages } from "@/content/program-images";
import { programs } from "@/content/programs";
import { imageBlur } from "@/lib/blur";

const slides: SqueezeSlide[] = programs.map((program) => {
  const image = programImages[program.slug]!;
  return {
    id: program.slug,
    title: program.title,
    image: image.src,
    imageAlt: image.alt,
    blurDataURL: imageBlur[image.blur],
    overlay: (
      <span className="flex w-full items-end justify-between gap-4 text-white">
        <span className="font-display text-[1.1rem] font-semibold tracking-[-0.02em]">
          {program.shortLabel}
        </span>
        <span className="tnum font-display text-sm opacity-80">
          {program.number} / {String(programs.length).padStart(2, "0")}
        </span>
      </span>
    ),
  };
});

/**
 * The copy under the open panel. Only the visible one carries the effects,
 * keyed so they replay each time a program opens; the hidden ones are plain
 * text that only hold the block at the height of the tallest.
 */
function ProgramCopy({ index, shown }: { index: number; shown: boolean }) {
  const program = programs[index]!;
  const image = programImages[program.slug]!;

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <p className="eyebrow">Program {program.number}</p>
        {shown ? (
          <div key={`shown-${program.slug}`}>
            <Typewriter
              text={program.title}
              className="display-3 mt-4 max-w-[22ch] text-ink"
            />
            <TextGenerate
              text={program.summary}
              delay={0.2}
              className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft"
            />
          </div>
        ) : (
          <div>
            <h3 className="display-3 mt-4 max-w-[22ch] text-ink">
              {program.title}
            </h3>
            <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-ink-soft">
              {program.summary}
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between gap-6 lg:col-span-5">
        <p className="text-[0.9375rem] leading-relaxed text-ink lg:pt-9">
          <span className="font-semibold">What students get: </span>
          {shown ? (
            <Marker key={`m-${program.slug}`}>{program.studentsGet}</Marker>
          ) : (
            program.studentsGet
          )}
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Link
            href={`/programs/${program.slug}`}
            prefetch
            tabIndex={shown ? 0 : -1}
            className="btn btn-forest"
          >
            Explore this program
            <span className="btn-arrow" aria-hidden="true">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
          <p className="max-w-xs text-[0.68rem] leading-relaxed text-ink-soft">
            {image.credit}
          </p>
        </div>
      </div>
    </div>
  );
}

/** Phones: the carousel's columns need width, so here it is a swipeable row. */
function ProgramCards() {
  return (
    <ol className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:hidden">
      {programs.map((program) => {
        const image = programImages[program.slug]!;
        return (
          <li
            key={program.slug}
            className="w-[82%] shrink-0 snap-start overflow-hidden rounded-[1.5rem] border border-line bg-surface"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                placeholder="blur"
                blurDataURL={imageBlur[image.blur]}
                sizes="82vw"
                className="object-cover"
              />
              <span className="tnum absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 font-display text-xs text-white">
                {program.number}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-[1.35rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
                {program.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {program.summary}
              </p>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink">
                <span className="font-semibold">What students get: </span>
                <Marker>{program.studentsGet}</Marker>
              </p>
              <Link
                href={`/programs/${program.slug}`}
                prefetch
                className="link-quiet mt-5 text-sm"
              >
                Explore this program
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-[0.65rem] leading-relaxed text-ink-soft">
                {image.credit}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function ProgramCarousel() {
  return (
    <div className="mt-12">
      <ProgramCards />
      <SqueezeCarousel
        slides={slides}
        label="Our programs"
        className="hidden md:flex"
        height="clamp(260px, 33cqi, 440px)"
        gap={12}
        slatGap={8}
        slatWidth={10}
        radius={22}
        duration={1150}
        sizes="(min-width: 1024px) 62vw, 90vw"
        renderCopy={(_, index, shown) => (
          <ProgramCopy index={index} shown={shown} />
        )}
      />
    </div>
  );
}
