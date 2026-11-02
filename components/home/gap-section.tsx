import Image from "next/image";
import { BlueprintSketches } from "@/components/blueprint-sketches";
import { PaperTear } from "@/components/paper-tear";
import { SectionHeading } from "@/components/section-heading";
import { SourceFootnote, SourcesList } from "@/components/sources";
import { homePage } from "@/content/home";
import { imageBlur } from "@/lib/blur";

function GapStat({ stat }: { stat: (typeof homePage.gap.stats)[number] }) {
  return (
    <li>
      <div className="flex items-baseline gap-1">
        <span
          className={`stat-value text-[clamp(2.2rem,3.6vw,3rem)] ${
            stat.emphasis ? "text-gold-ink" : "text-ink"
          }`}
        >
          {stat.value}
          {"unit" in stat && stat.unit ? (
            <span className="text-[0.5em] tracking-normal">{stat.unit}</span>
          ) : null}
        </span>
        <SourceFootnote sourceId={stat.sourceId} className="ml-1" />
      </div>
      <p className="mt-3 text-[1rem] font-semibold leading-snug text-ink">
        {stat.label}
      </p>
      {"detail" in stat && stat.detail ? (
        <p className="mt-2 max-w-xs text-[0.9rem] leading-relaxed text-ink-soft">
          {stat.detail}
        </p>
      ) : null}
    </li>
  );
}

/** "The gap": the problem SEF exists to close, with sourced figures. */
export function GapSection() {
  const { gap } = homePage;

  return (
    <>
      <section
        id="the-gap"
        aria-labelledby="the-gap-heading"
        className="section-tight relative overflow-clip bg-gold-wash pb-10"
      >
        <BlueprintSketches set="gap" onScroll from="xl" />
        <div className="shell pt-8">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <SectionHeading
                id="the-gap-heading"
                eyebrow={gap.eyebrow}
                heading={gap.heading}
              />
            </div>
            <div className="prose-editorial lg:col-span-5 [&_p:first-child]:text-[1.0625rem]">
              {gap.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 grid items-center gap-10 xl:grid-cols-[1fr_minmax(0,28rem)_1fr] xl:gap-12">
            <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-1 xl:gap-10">
              {gap.stats.slice(0, 2).map((stat) => (
                <GapStat key={stat.id} stat={stat} />
              ))}
            </ul>

            <figure className="order-first mx-auto w-full max-w-md xl:order-none xl:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_0_0_6px_var(--surface),0_0_0_7px_var(--line),var(--shadow-float)]">
                <Image
                  src="/images/sef/cohort-gap.jpg"
                  alt="A Somboh Educational Foundation cohort standing together at the front of a classroom."
                  fill
                  placeholder="blur"
                  blurDataURL={imageBlur.sefCohortGap}
                  sizes="(min-width: 1024px) 28rem, 100vw"
                  className="object-cover"
                />
              </div>
            </figure>

            <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-1 xl:gap-10 xl:justify-self-end">
              {gap.stats.slice(2).map((stat) => (
                <GapStat key={stat.id} stat={stat} />
              ))}
            </ul>
          </div>

          <div className="mt-3 border-t border-line ">
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

      <PaperTear from="var(--gold-wash)" to="var(--surface)" />
    </>
  );
}
