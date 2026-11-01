import Link from "next/link";
import { ArchMedia } from "@/components/arch-media";
import { ArrowRight } from "@/components/icons";
import { homePage } from "@/content/home";

/** "Who we serve", with the pinned photograph beside it. */
export function ServeSection() {
  const { serve } = homePage;

  return (
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

          <Link
            href={serve.link.href}
            prefetch
            className="link-quiet mt-6 text-sm"
          >
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
  );
}
