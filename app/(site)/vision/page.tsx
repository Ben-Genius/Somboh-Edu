import type { Metadata } from "next";
// import { PhotoFrame } from "@/components/arch-media"; (wide photo hidden below)
import { CampusImage } from "@/components/campus-image";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PaperTear } from "@/components/paper-tear";
import { SectionHeading } from "@/components/section-heading";
import { SourceFootnote, SourcesList } from "@/components/sources";
import { ReadMore } from "@/components/ui/read-more";
import { ViewTransition } from "@/components/view-transition";
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
  const { intro, distance, pillars, sections, closing } = visionPage;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Vision", path: "/vision" },
        ])}
      />

      <PageHero
        sketch="abroad"
        eyebrow={visionPage.hero.eyebrow}
        title={visionPage.hero.title}
        lede={visionPage.hero.lede}
      />

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
        aria-labelledby="vision-distance-heading"
        className="section-tight bg-gold-wash"
      >
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">{distance.label}</p>
              <h2
                id="vision-distance-heading"
                className="display-2 mt-6 max-w-[15ch]"
              >
                The distance to travel.
              </h2>
              <p className="lede mt-6">{distance.body}</p>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="grid gap-4 sm:grid-cols-2">
                {distance.stats.map((stat) => (
                  <li key={stat.id} className="card card-lift p-6">
                    <div className="flex items-baseline gap-1">
                      <span className="stat-value text-[clamp(2.8rem,5vw,3.9rem)] text-ink">
                        {stat.value}
                        {stat.unit ? (
                          <span className="text-[0.48em] tracking-normal">
                            {stat.unit}
                          </span>
                        ) : null}
                      </span>
                      <SourceFootnote
                        sourceId={stat.sourceId}
                        className="ml-1"
                      />
                    </div>
                    <p className="mt-4 text-[0.875rem] leading-snug text-ink-soft">
                      {stat.label}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <SourcesList
                  ids={distance.stats.map((stat) => stat.sourceId)}
                  id="vision-sources"
                />
              </div>
            </div>
          </div>

          {/* Wide photograph: hidden to keep the page short.
          <PhotoFrame
            src="/images/knust-great-hall.jpg"
            alt="The Great Hall at KNUST in Kumasi, photographed from the lawn."
            caption="Placeholder photograph: the Great Hall, KNUST, Kumasi. Photo by Pnlarbi, CC BY 4.0. Not an SEF program image."
            blur="knust"
            ratio="21 / 7"
            sizes="(min-width: 1024px) 104rem, 100vw"
            className="mt-14"
          />
          */}
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

          <div className="mt-2">
            {sections.map((section, index) => (
              <article
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-5">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <ViewTransition name={`vision-${section.id}`} default="none">
                    <h3
                      id={`${section.id}-heading`}
                      className="display-3 mt-4 max-w-[22ch] text-ink"
                    >
                      {section.heading}
                    </h3>
                  </ViewTransition>
                </div>
                <div className="md:col-span-7">
                  <ReadMore label="Read more" buttonClassName="md:mt-0">
                    <div className="prose-editorial mt-5">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>

                    {index === 0 ? (
                      <CampusImage
                        src="/images/balme-library.jpg"
                        alt="The Balme Library at the University of Ghana, Accra."
                        caption="Placeholder photograph: Balme Library, University of Ghana, Accra. Photo by Cca Raheem, CC BY 4.0. Not an SEF program image."
                        blur="balme"
                        ratio="16 / 10"
                        sizes="(min-width: 768px) 55vw, 100vw"
                        className="mt-8"
                      />
                    ) : null}
                  </ReadMore>
                </div>
              </article>
            ))}
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
