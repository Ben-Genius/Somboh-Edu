import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import type { programImages } from "@/content/program-images";
import { imageBlur } from "@/lib/blur";
import { HeroTitle } from "./hero-title";

type ProgramImage = (typeof programImages)[string];

/**
 * Single-program opener, after People4Ocean: a split screen, the program
 * set on a deep blue gradient on one side and its photograph held in a quiet
 * neutral container on the other. The program number is the graphic.
 */
export function ProgramHero({
  number,
  total,
  title,
  summary,
  image,
}: {
  number: string;
  total: number;
  title: string;
  summary: string;
  image: ProgramImage;
}) {
  return (
    <section className="bg-surface px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
      <div className="grid gap-3 lg:grid-cols-2 lg:gap-4">
        <div className="on-forest relative isolate flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-[1.75rem] bg-[linear-gradient(155deg,var(--forest)_0%,var(--forest-deep)_100%)] px-7 pb-9 pt-9 sm:px-10 sm:pb-11 lg:min-h-[clamp(34rem,78svh,46rem)] lg:px-12">
          <div
            aria-hidden="true"
            className="absolute -bottom-40 -right-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.16),transparent_65%)]"
          />
          <span
            aria-hidden="true"
            className="tnum pointer-events-none absolute -right-4 top-16 -z-10 font-display text-[clamp(10rem,22vw,19rem)] font-semibold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.22)]"
          >
            {number}
          </span>

          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow !text-white/90">
              Program {number} of {String(total).padStart(2, "0")}
            </p>
            <Link
              href="/programs"
              prefetch
              className="tap -my-2 inline-flex min-h-[44px] items-center text-[0.75rem] font-semibold text-white/90 underline decoration-white/40 underline-offset-4 hover:text-white hover:decoration-white"
            >
              All programs
            </Link>
          </div>

          <div className="mt-16">
            <HeroTitle className="display-1 max-w-[13ch] text-white lg:text-[clamp(3rem,4.8vw,5rem)]">
              {title}
            </HeroTitle>
            <p className="mt-6 max-w-[40ch] text-[1rem] leading-relaxed text-white/80 sm:text-[1.0625rem]">
              {summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/get-involved#students"
                prefetch
                className="btn btn-gold"
              >
                Apply for support
                <span className="btn-arrow" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <figure className="relative flex flex-col rounded-[1.75rem] bg-clay p-3 sm:p-4">
          <div className="relative aspect-[4/3] flex-1 overflow-hidden rounded-[1.35rem] lg:aspect-auto">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              placeholder="blur"
              blurDataURL={imageBlur[image.blur]}
              // Landscape photographs cropped into a tall box on desktop: the
              // file must be wider than the box, or it is upscaled and soft.
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="px-2 pb-1 pt-3 text-[0.68rem] leading-relaxed text-ink-soft">
            {image.credit}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
