import Link from "next/link";
import { BlueprintSketches } from "@/components/blueprint-sketches";
import { ArrowRight } from "@/components/icons";
import { PaperTear } from "@/components/paper-tear";
import { ViewTransition } from "@/components/view-transition";
import { WaveMedia } from "@/components/wave-media";
import { WaveRule } from "@/components/wave-rule";
import { homePage } from "@/content/home";

/** Opening section: headline, calls to action and the hand-cut photograph. */
export function HomeHero() {
  const { hero } = homePage;

  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <BlueprintSketches set="hero" />
        <div className="shell relative pb-24 pt-10 lg:pb-32 lg:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">{hero.eyebrow}</p>
            <p className="hidden text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-soft sm:block">
              Ghana · West Africa
            </p>
          </div>
          <WaveRule className="mt-4 text-line" />

          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 lg:pb-6">
              <ViewTransition name="page-title" share="morph" default="none">
                <h1 className="display-1 max-w-[14ch] text-ink lg:text-[clamp(3.4rem,5vw,4.9rem)]">
                  {hero.title}
                </h1>
              </ViewTransition>

              <p className="lede mt-8">{hero.subline}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={hero.primary.href}
                  prefetch
                  className="btn btn-forest"
                >
                  {hero.primary.label}
                  <span className="btn-arrow" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href={hero.secondary.href}
                  prefetch
                  className="btn btn-quiet"
                >
                  {hero.secondary.label}
                  <span className="btn-arrow" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>

              <WaveRule className="mt-12 text-line" />

              <dl className="mt-6 grid max-w-lg grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                    Preparation
                  </dt>
                  <dd className="mt-1.5 text-[0.875rem] leading-snug text-ink">
                    SAT coaching, writing, and study support
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                    Funding
                  </dt>
                  <dd className="mt-1.5 text-[0.875rem] leading-snug text-ink">
                    Full-need aid and scholarship guidance
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <WaveMedia
                src="/images/students-portrait.jpg"
                alt="Three students standing together on the KNUST campus in Kumasi."
                caption="Placeholder photograph: students at KNUST, Kumasi. Photo by Enyonam Caroline, CC BY 4.0. Not an SEF program image."
                blur="students"
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                ratio="1 / 1"
                badge={
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                      {hero.asideLabel}
                    </p>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink">
                      {hero.asideBody}
                    </p>
                    <Link
                      href={hero.asideLink.href}
                      prefetch
                      className="mt-2 inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink"
                    >
                      {hero.asideLink.label}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </section>
      <PaperTear from="var(--surface)" to="var(--paper)" />
    </>
  );
}
