import Link from "next/link";
import type { Metadata } from "next";
import { DocumentChecklist } from "@/components/guide/document-checklist";
import { GuideHero } from "@/components/heroes/guide-hero";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import {
  guideAudiences,
  guideDocuments,
  guideNext,
  guideOfficial,
  guidePage,
  guideStages,
} from "@/content/guide";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata(guidePage.meta);

export default function GuidePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: guidePage.meta.title, path: guidePage.meta.path },
        ])}
      />

      <GuideHero />

      {/* The stages: the hero's road continues down the left edge. */}
      <section aria-label={guidePage.stagesHeading} className="section bg-surface">
        <ol className="shell relative">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-[calc(clamp(1.25rem,3.8vw,3.5rem)+1.35rem)] top-0 border-l-2 border-dashed border-line-strong print:hidden"
          />
          {guideStages.map((stage, index) => (
            <li
              key={stage.id}
              id={stage.id}
              className={`relative grid scroll-mt-32 gap-6 pl-16 lg:grid-cols-12 lg:gap-10 ${
                index > 0 ? "mt-16 lg:mt-24" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="tnum absolute left-0 top-0 grid h-11 w-11 place-items-center rounded-full border-2 border-gold-ink bg-surface font-display text-sm font-semibold text-ink"
              >
                {stage.number}
              </span>

              <div className="lg:col-span-5">
                <p className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-ink">
                  {stage.when}
                </p>
                <h2 className="display-3 mt-3 max-w-[18ch] text-ink">
                  {stage.title}
                </h2>
                <p className="mt-4 max-w-[38ch] text-[1rem] leading-relaxed text-ink-soft">
                  {stage.lede}
                </p>
                <Link
                  href={`/programs/${stage.helpSlug}`}
                  prefetch
                  className="link-quiet mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm print:hidden"
                >
                  <span className="text-ink-soft">{guidePage.helpPrefix}</span>
                  {stage.helpLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="lg:col-span-7">
                <ul className="space-y-3">
                  {stage.steps.map((step) => (
                    <li
                      key={step}
                      className="flex gap-3 rounded-[1rem] border border-line bg-clay px-4 py-3.5 text-[0.9375rem] leading-relaxed text-ink"
                    >
                      <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-blue-ink" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                {stage.more ? (
                  <details className="group mt-4">
                    <summary className="tap inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-sm font-semibold text-blue-ink [&::-webkit-details-marker]:hidden">
                      <span className="group-open:hidden">{guidePage.moreLabel}</span>
                      <span className="hidden group-open:inline">{guidePage.lessLabel}</span>
                      <span aria-hidden="true" className="transition-transform duration-300 group-open:rotate-180">
                        ↓
                      </span>
                    </summary>
                    <div className="mt-2 space-y-3 border-l-2 border-gold pl-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                      {stage.more.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id={guideDocuments.id}
        aria-labelledby="documents-heading"
        className="section scroll-mt-24 border-y border-line bg-blue-wash"
      >
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <p className="eyebrow">{guideDocuments.eyebrow}</p>
              <h2 id="documents-heading" className="display-2 mt-6">
                {guideDocuments.heading}
              </h2>
            </div>
            <p className="lede lg:col-span-5">{guideDocuments.intro}</p>
          </div>
          <div className="mt-10">
            <DocumentChecklist />
          </div>
        </div>
      </section>

      <section
        id={guideAudiences.id}
        aria-labelledby="audiences-heading"
        className="section bg-surface"
      >
        <div className="shell">
          <h2 id="audiences-heading" className="display-2 max-w-[18ch]">
            {guideAudiences.heading}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {guideAudiences.groups.map((group) => (
              <div
                key={group.title}
                className="rounded-[1.5rem] border border-line bg-clay p-6 sm:p-8"
              >
                <h3 className="font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">
                  {group.title}
                </h3>
                <ul className="mt-5 space-y-4">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="border-t border-line pt-4 text-[0.9375rem] leading-relaxed text-ink-soft first:border-t-0 first:pt-0"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="display-3">{guideOfficial.heading}</h2>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ink-soft">
                {guideOfficial.body}
              </p>
            </div>
            <ul className="flex flex-wrap content-start gap-2 lg:col-span-7">
              {guideOfficial.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip tap"
                  >
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 flex flex-col items-start gap-5 rounded-[1.5rem] bg-gold-wash p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 print:hidden">
            <div>
              <p className="font-display text-[1.3rem] font-semibold tracking-[-0.02em] text-ink">
                {guideNext.heading}
              </p>
              <p className="mt-1 text-[0.9375rem] text-ink-soft">{guideNext.body}</p>
            </div>
            <Link href={guideNext.cta.href} prefetch className="btn btn-gold shrink-0">
              {guideNext.cta.label}
              <span className="btn-arrow" aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
