import Link from "next/link";
import type { Metadata } from "next";
import { ArchMedia } from "@/components/arch-media";
import { CommitmentCycle } from "@/components/commitment-cycle";
import { FounderNote } from "@/components/founder-note";
import { JsonLd } from "@/components/json-ld";
import { ArrowRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { PaperTear } from "@/components/paper-tear";
// import { ProgramIndex } from "@/components/program-index"; (list hidden below)
import { ReadMore } from "@/components/ui/read-more";
import { SectionHeading } from "@/components/section-heading";
import { SourceFootnote, SourcesList } from "@/components/sources";
import { homePage } from "@/content/home";
import { missionPage } from "@/content/mission";
import { programs } from "@/content/programs";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: missionPage.meta.title,
  description: missionPage.meta.description,
  path: missionPage.meta.path,
});

const stats = homePage.gap.stats;

export default function MissionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Mission", path: "/mission" },
        ])}
      />

      <PageHero
        sketch="idea"
        eyebrow={missionPage.hero.eyebrow}
        title={missionPage.hero.title}
        lede={missionPage.hero.lede}
      />

      <section
        aria-labelledby="mission-statement-heading"
        className="section-tight bg-surface"
      >
        <div className="shell grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          {/* Side photograph: hidden to keep the section short.
            <ArchMedia
              src="/images/knust-great-hall.jpg"
              alt="The Great Hall at KNUST in Kumasi, photographed from the lawn."
              caption="Placeholder photograph: the Great Hall, KNUST, Kumasi. Photo by Pnlarbi, CC BY 4.0. Not an SEF program image."
              blur="knust"
              ratio="3 / 4"
              sizes="(min-width: 1024px) 22vw, 100vw"
              className="mt-10 hidden lg:block"
            />
          */}
          <div className="lg:col-span-5">
            <p className="eyebrow">{missionPage.statement.eyebrow}</p>
            <h2
              id="mission-statement-heading"
              className="display-2 mt-6 max-w-[18ch]"
            >
              {missionPage.statement.heading}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="border-l-2 border-gold pl-6">
              <p className="font-display text-[1.45rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.7rem]">
                {missionPage.statement.body[0]}
              </p>
              {missionPage.statement.body.length > 1 ? (
                <ReadMore>
                  {missionPage.statement.body.slice(1).map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 text-[1.0625rem] leading-relaxed text-ink-soft"
                    >
                      {paragraph}
                    </p>
                  ))}
                </ReadMore>
              ) : null}
            </div>
            <p className="mt-6 text-[0.75rem] leading-relaxed text-ink-soft">
              This statement is reproduced from the foundation&apos;s own
              mission document.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="mission-gap-heading"
        className="section-tight bg-gold-wash"
      >
        <div className="shell">
          <SectionHeading
            id="mission-gap-heading"
            eyebrow={missionPage.gap.eyebrow}
            heading={missionPage.gap.heading}
            intro={missionPage.gap.body}
          />

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <li key={stat.id} className="card card-lift p-6">
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
                <p className="mt-4 text-[0.875rem] font-semibold leading-snug text-ink">
                  {stat.label}
                </p>
                {/* Detail line: hidden to keep the cards short.
                {stat.detail ? (
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                    {stat.detail}
                  </p>
                ) : null}
                */}
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-line pt-5">
            <SourcesList
              ids={stats.map((stat) => stat.sourceId)}
              id="mission-sources"
            />
            <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-soft">
              {homePage.gap.sourcesNote}
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="mission-programs-heading"
        className="section-tight bg-surface"
      >
        <div className="shell">
          <SectionHeading
            id="mission-programs-heading"
            eyebrow={missionPage.programs.eyebrow}
            heading={missionPage.programs.heading}
            intro={missionPage.programs.intro}
          />
          {/* Full program list: hidden here, the programs page owns it.
          <ProgramIndex
            items={programs}
            showStudentsGet={false}
            className="mt-12"
          />
          */}
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {programs.map((program) => (
              <li key={program.slug}>
                <Link
                  href={`/programs/${program.slug}`}
                  prefetch
                  className="tap inline-flex min-h-[44px] items-center gap-2 rounded-full border border-line bg-paper/60 px-4 text-[0.875rem] font-medium text-ink transition-colors hover:border-ink hover:bg-clay"
                >
                  <span className="tnum font-display text-xs text-gold-ink">
                    {program.number}
                  </span>
                  {program.shortLabel}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end">
            <Link href="/programs" prefetch className="link-quiet text-sm">
              Explore the programs in full
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section
        id="who-we-serve"
        aria-labelledby="mission-serve-heading"
        className="section-tight bg-blend relative overflow-clip"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-40 h-[26rem] w-[26rem] rounded-full border border-gold/30"
        />

        <div className="shell relative grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow">{missionPage.serve.eyebrow}</p>
            <h2
              id="mission-serve-heading"
              className="display-2 mt-6 max-w-[16ch]"
            >
              {missionPage.serve.heading}
            </h2>
            <p className="mt-7 text-[1.0625rem] leading-relaxed text-ink-soft">
              {missionPage.serve.body}
            </p>
            <figure className="card paper-note mt-10 rounded-[1.5rem] p-6">
              <blockquote className="font-display text-[1.75rem] leading-snug tracking-[-0.03em] text-ink">
                “{homePage.serve.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-line pt-4">
                <p className="text-[0.8125rem] leading-relaxed text-ink-soft">
                  {homePage.serve.quoteNote}
                </p>
                <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  {homePage.serve.quoteAttribution}
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <ArchMedia
              src="/images/sef/group-serve.jpg"
              sticky
              alt="Somboh Educational Foundation students from different schools standing together in SEF T-shirts."
              caption="Somboh Educational Foundation students."
              blur="sefGroupServe"
              ratio="4 / 5"
              sizes="(min-width: 1024px) 34vw, 100vw"
              peel="bl"
            />
          </div>
        </div>
      </section>

      <section
        id="commitment"
        aria-labelledby="mission-commitment-heading"
        className="section-tight bg-blue-wash"
      >
        <div className="shell">
          <SectionHeading
            id="mission-commitment-heading"
            eyebrow={missionPage.commitment.eyebrow}
            heading={missionPage.commitment.heading}
            intro={missionPage.commitment.body}
          />
        </div>
        <div className="shell mt-10">
          <CommitmentCycle />
        </div>
      </section>

      <PaperTear from="var(--blue-wash)" to="var(--gold-wash)" />

      <FounderNote />

      {/* Old banner that sent readers to the home page for the founder's
          message. Hidden now that the full message is here.
      <PaperTear from="var(--surface)" to="var(--forest)" />
      <section className="section-tight on-forest relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-40 h-[24rem] w-[24rem] rounded-full border border-white/12"
        />
        <div className="shell relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{missionPage.founder.eyebrow}</p>
            <h2 className="display-3 mt-4 max-w-[22ch] text-[var(--on-forest)]">
              {missionPage.founder.heading}
            </h2>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-[var(--on-forest)] opacity-75">
              {missionPage.founder.note}
            </p>
          </div>
          <Link
            href={missionPage.founder.href}
            prefetch
            className="btn btn-quiet shrink-0"
          >
            {missionPage.founder.linkLabel}
            <span className="btn-arrow" aria-hidden="true">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
      */}
    </>
  );
}
