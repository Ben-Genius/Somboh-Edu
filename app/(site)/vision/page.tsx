import type { Metadata } from "next";
// import { PhotoFrame } from "@/components/arch-media"; (wide photo hidden below)
// import { CampusImage } from "@/components/campus-image"; (old detail layout, commented out below)
import { JsonLd } from "@/components/json-ld";
// import { PageHero } from "@/components/page-hero"; (replaced by VisionHero)
import { VisionHero } from "@/components/heroes/vision-hero";
import { PaperTear } from "@/components/paper-tear";
import { SectionHeading } from "@/components/section-heading";
import { ReadMore } from "@/components/ui/read-more";
// import { ViewTransition } from "@/components/view-transition"; (old detail layout)
import { FutureTabs } from "@/components/vision/future-tabs";
import { visionPage } from "@/content/vision";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: visionPage.meta.title,
  description: visionPage.meta.description,
  path: visionPage.meta.path,
});

export default function VisionPage() {
  const { intro, pillars, sections, closing } = visionPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Vision", path: "/vision" },
        ])}
      />

      {/* Previous shared hero, replaced by a page-specific one:
      <PageHero
        sketch="abroad"
        eyebrow={visionPage.hero.eyebrow}
        title={visionPage.hero.title}
        lede={visionPage.hero.lede}
      />
      */}
      <VisionHero />

      <section
        aria-labelledby="vision-intro-heading"
        className="section-tight bg-surface"
      >
        <div className="shell grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-6">
            <p className="eyebrow">{intro.eyebrow}</p>
            <h2
              id="vision-intro-heading"
              className="display-2 mt-6 max-w-[20ch]"
            >
              {intro.heading}
            </h2>
          </div>
          <div className="lg:col-span-6">
            <p className="font-display text-[1.3rem] leading-relaxed tracking-[-0.015em] text-ink">
              {intro.paragraphs[0]}
            </p>
            {intro.paragraphs.length > 1 ? (
              <ReadMore>
                <div className="prose-editorial mt-5">
                  {intro.paragraphs.slice(1).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </ReadMore>
            ) : null}
          </div>
        </div>
      </section>


      <section
        id="what-transformation-looks-like"
        aria-labelledby="vision-pillars-heading"
        className="section-tight bg-blue-wash"
      >
        <div className="shell">
          <SectionHeading
            id="vision-pillars-heading"
            eyebrow={pillars.eyebrow}
            heading={pillars.heading}
          />

          <ol className="mt-12 grid gap-4 sm:grid-cols-2">
            {pillars.items.map((item) => (
              <li key={item.number} className="card card-lift p-7 sm:p-8">
                <span className="tnum grid h-10 w-10 place-items-center rounded-full border border-gold/45 bg-gold/10 font-display text-[0.85rem] text-gold-ink">
                  {item.number}
                </span>
                <h3 className="mt-6 font-display text-[1.65rem] leading-tight tracking-[-0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="vision-detail-heading"
        className="section-tight bg-surface"
      >
        <div className="shell">
          <div className="border-b border-line pb-8">
            <p className="eyebrow">In detail</p>
            <h2
              id="vision-detail-heading"
              className="display-2 mt-6 max-w-[20ch]"
            >
              What that future asks of us.
            </h2>
          </div>

          <div className="mt-10">
            <FutureTabs sections={sections} />
          </div>


        </div>
      </section>

      <PaperTear from="var(--surface)" to="var(--forest)" />

      <section
        aria-labelledby="vision-closing-heading"
        className="section-tight on-forest relative overflow-hidden"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 -top-48 h-[30rem] w-[30rem] rounded-full border border-white/12"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 -top-24 h-[18rem] w-[18rem] rounded-full border border-white/12"
        />

        <div className="shell relative grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-2">
            <p className="eyebrow">The destination</p>
          </div>
          <div className="lg:col-span-9 lg:col-start-4">
            <h2
              id="vision-closing-heading"
              className="font-display text-[clamp(2.2rem,4.8vw,4.1rem)] leading-[1.04] tracking-[-0.04em] text-[var(--on-forest)]"
            >
              “{closing.quote}”
            </h2>
            <p className="mt-7 max-w-2xl text-[1rem] leading-relaxed text-[var(--on-forest)] opacity-80">
              {closing.body}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
