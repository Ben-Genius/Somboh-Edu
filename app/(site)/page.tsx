import Link from "next/link";
import type { Metadata } from "next";
import { ArchMedia, PhotoFrame } from "@/components/arch-media";
import { CommitmentCycle } from "@/components/commitment-cycle";
import { CtaPaths } from "@/components/cta-paths";
import { FounderNote } from "@/components/founder-note";
import { HeroSketches } from "@/components/hero-sketches";
import { ArrowRight } from "@/components/icons";
import { PaperTear } from "@/components/paper-tear";
import { ProgramIndex } from "@/components/program-index";
import { ProgramStrip } from "@/components/program-strip";
import { SectionHeading } from "@/components/section-heading";
import { SourceFootnote, SourcesList } from "@/components/sources";
import { ViewTransition } from "@/components/view-transition";
import { WaveMedia } from "@/components/wave-media";
import { WaveRule } from "@/components/wave-rule";
import { homePage } from "@/content/home";
import { programs } from "@/content/programs";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: homePage.meta.title,
  description: homePage.meta.description,
  path: "/",
  openGraphTitle: homePage.meta.title,
  absoluteTitle: true,
});

export default function HomePage() {
  const { hero, gap, serve } = homePage;

  return (
    <>
      <section className="relative overflow-hidden bg-surface">
        <HeroSketches />
        <div className="shell relative pb-24 pt-10 lg:pb-32 lg:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="eyebrow">{hero.eyebrow}</p>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Ghana · West Africa
            </p>
          </div>
          <WaveRule className="mt-4 text-line" />

          <div className="mt-10 grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5 lg:pb-6">
              <ViewTransition name="page-title" share="morph" default="none">
                <h1 className="display-1 max-w-[14ch] text-ink">
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

      <ProgramStrip />

      <section
        id="the-gap"
        aria-labelledby="the-gap-heading"
        className="section bg-paper pb-14"
      >
        <div className="shell pt-14">
          <SectionHeading
            id="the-gap-heading"
            eyebrow={gap.eyebrow}
            heading={gap.heading}
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <div className="prose-editorial">
                {gap.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {gap.stats.map((stat) => (
                  <li
                    key={stat.id}
                    className="card card-lift flex flex-col p-5"
                  >
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`stat-value text-[clamp(2.4rem,4.2vw,3.3rem)] ${
                          stat.emphasis ? "text-gold-ink" : "text-ink"
                        }`}
                      >
                        {stat.value}
                        {stat.unit ? (
                          <span className="text-[0.5em] tracking-normal">
                            {stat.unit}
                          </span>
                        ) : null}
                      </span>
                      <SourceFootnote sourceId={stat.sourceId} className="ml-1" />
                    </div>
                    <p className="mt-3 text-[0.875rem] font-semibold leading-snug text-ink">
                      {stat.label}
                    </p>
                    {stat.detail ? (
                      <p className="mt-1.5 text-[0.78rem] leading-relaxed text-ink-soft">
                        {stat.detail}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <PhotoFrame
                src="/images/classroom-ghana.jpg"
                alt="A student speaking into a microphone during a classroom session in Ghana."
                caption="Placeholder photograph: a classroom session in Kumasi. Photo by Asamoah Daniel Kwame Oware, CC0. Not an SEF program image."
                blur="classroom"
                ratio="4 / 3"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <PhotoFrame
                src="/images/school-courtyard.jpg"
                alt="Students gathered under a tree in a school courtyard in Ghana."
                caption="Placeholder photograph: a secondary school courtyard in Ghana. Photo by Hakamal, CC0. Not an SEF program image."
                blur="courtyard"
                ratio="16 / 10"
                peel="bl"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="mt-10 sm:ml-10 sm:mt-6"
              />
            </div>
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {gap.sourcesLabel}
            </p>
            <SourcesList
              ids={gap.stats.map((stat) => stat.sourceId)}
              id="sources"
              className="mt-3"
            />
            <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-soft">
              {gap.sourcesNote}
            </p>
          </div>
        </div>
      </section>

      <PaperTear from="var(--paper)" to="var(--surface)" />

      <section
        id="programs"
        aria-labelledby="programs-heading"
        className="section bg-surface"
      >
        <div className="shell">
          <SectionHeading
            id="programs-heading"
            eyebrow={homePage.programs.eyebrow}
            heading={homePage.programs.heading}
            intro={homePage.programs.intro}
          />

          <PhotoFrame
            src="/images/balme-library.jpg"
            alt="The Balme Library at the University of Ghana, Accra."
            caption="Placeholder photograph: Balme Library, University of Ghana, Accra. Photo by Cca Raheem, CC BY 4.0. Not an SEF program image."
            blur="balme"
            ratio="21 / 7"
            sizes="(min-width: 1024px) 104rem, 100vw"
            className="mt-12 hidden lg:block"
          />

          <ProgramIndex items={programs} className="mt-6 lg:mt-10" />
          <div className="mt-8 flex justify-end">
            <Link href="/programs" prefetch className="link-quiet text-sm">
              All five programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="who-we-serve"
        aria-labelledby="who-we-serve-heading"
        className="section bg-clay"
      >
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow">{serve.eyebrow}</p>
            <h2 id="who-we-serve-heading" className="display-2 mt-6 max-w-[18ch]">
              {serve.heading}
            </h2>
            <div className="prose-editorial mt-7">
              {serve.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <figure className="card paper-note mt-10 rounded-[1.5rem] p-6">
              <blockquote className="font-display text-[1.75rem] leading-[1.2] tracking-[-0.03em] text-ink">
                “{serve.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-4">
                <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
                  {serve.quoteNote}
                </p>
                <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  {serve.quoteAttribution}
                </p>
              </figcaption>
            </figure>

            <Link href={serve.link.href} prefetch className="link-quiet mt-6 text-sm">
              {serve.link.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <ArchMedia
              src="/images/community-planting.jpg"
              sticky
              alt="Students and a teacher gathered around a sapling they have planted."
              caption="Placeholder photograph: students planting trees. Photo by Otuo-Akyampong Boakye, CC BY-SA 4.0. Not an SEF program image."
              blur="planting"
              ratio="4 / 5"
              sizes="(min-width: 1024px) 34vw, 100vw"
              peel="bl"
            />
          </div>
        </div>
      </section>

      <section
        id="commitment"
        aria-labelledby="commitment-heading"
        className="section bg-surface"
      >
        <div className="shell">
          <SectionHeading
            id="commitment-heading"
            eyebrow={homePage.commitment.eyebrow}
            heading={homePage.commitment.heading}
            intro={homePage.commitment.body}
          />
          <div className="mt-12">
            <CommitmentCycle />
          </div>
          <p className="mt-10 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
            {homePage.commitment.closing}
          </p>
        </div>
      </section>

      <FounderNote />

      <PaperTear from="var(--paper)" to="var(--forest)" />

      <CtaPaths />
    </>
  );
}
