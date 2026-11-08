import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { programImages } from "@/content/program-images";
import { programs } from "@/content/programs";
import { imageBlur } from "@/lib/blur";
import { HeroTitle } from "./hero-title";

/**
 * Programs opener, after Family Service Lincoln: the five programs are the
 * hero itself, each a card with its own photograph that fills with blue on
 * hover, so the services read as places rather than a list.
 */
export function ProgramsHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-clay">
      <div className="shell relative pb-12 pt-10 lg:pb-16 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow">Our programs</p>
            <HeroTitle className="display-1 mt-7 max-w-[14ch] text-ink">
              Five programs. One student at a time.
            </HeroTitle>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[1rem] leading-relaxed text-ink-soft">
              Support begins with where a student is and what they need next.
              These programs are built to work together, not in isolation.
            </p>
            <Link
              href="/get-involved#students"
              prefetch
              className="btn btn-gold mt-6"
            >
              Apply for support
              <span className="btn-arrow" aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        <ul className="no-scrollbar -mx-[clamp(1.25rem,3.8vw,3.5rem)] mt-12 flex snap-x snap-mandatory scroll-px-[clamp(1.25rem,3.8vw,3.5rem)] gap-3 overflow-x-auto px-[clamp(1.25rem,3.8vw,3.5rem)] pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {programs.map((program) => {
            const image = programImages[program.slug];
            return (
              <li key={program.slug} className="w-[68%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
                <Link
                  href={`#${program.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface p-2 transition-colors duration-300"
                >
                  {/* The fill that rises on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-forest transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.1rem]">
                    {image ? (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority
                        placeholder="blur"
                        blurDataURL={imageBlur[image.blur]}
                        // Landscape photographs cropped to 4:5, so the file
                        // must be about twice the card's width to stay sharp.
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05] motion-reduce:transition-none"
                      />
                    ) : null}
                    <span className="tnum absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-surface/90 font-display text-xs text-ink backdrop-blur">
                      {program.number}
                    </span>
                  </div>
                  <div className="relative flex flex-1 items-end justify-between gap-3 px-2 pb-2 pt-4">
                    <span className="font-display text-[1.05rem] font-semibold leading-tight tracking-[-0.02em] text-ink transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                      {program.shortLabel}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-ink-soft transition-colors duration-300 group-hover:text-gold group-focus-visible:text-gold" />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
