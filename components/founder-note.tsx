import Link from "next/link";
import { homePage } from "@/content/home";
import { ArchMedia } from "./arch-media";
import { ArrowRight } from "./icons";

/**
 * The founder's message. In full on the mission page; `compact` is the home
 * page's version: the conviction and the signature, with a link to the rest.
 */
export function FounderNote({ compact = false }: { compact?: boolean }) {
  const founder = homePage.founder;

  if (compact) {
    return (
      <section
        aria-labelledby="founder-heading"
        className="section-tight bg-paper"
      >
        <div className="shell grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">{founder.eyebrow}</p>
            <h2
              id="founder-heading"
              className="display-3 mt-5 max-w-[14ch] text-ink"
            >
              {founder.heading}
            </h2>
          </div>
          <figure className="lg:col-span-8">
            <blockquote className="card paper-note rounded-[1.5rem] p-6 sm:p-8">
              <p className="font-display text-[1.4rem] leading-snug tracking-[-0.025em] text-ink sm:text-[1.7rem]">
                “{founder.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <span className="flex items-baseline gap-3">
                <span className="font-display text-[1.6rem] italic leading-none text-ink">
                  {founder.signature}
                </span>
                <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  {founder.role}
                </span>
              </span>
              <Link
                href="/mission#founder"
                prefetch
                className="link-quiet text-sm"
              >
                Read the founder&apos;s full message
                <ArrowRight className="h-4 w-4" />
              </Link>
            </figcaption>
          </figure>
        </div>
      </section>
    );
  }

  return (
    <section id="founder" className="section bg-paper">
      <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <ArchMedia
            src="/images/founder-slot.jpg"
            alt={founder.imageAlt}
            caption={`${founder.imageCaption}. ${founder.imageAlt}`}
            blur="founder"
            ratio="4 / 5"
            sizes="(min-width: 1024px) 30vw, 100vw"
          />

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {founder.promiseHeading}
            </p>
            <div className="mt-4 space-y-4">
              {founder.promise.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[0.875rem] leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="eyebrow">{founder.eyebrow}</p>
          <h2 className="display-2 mt-6 max-w-[16ch] text-ink">
            {founder.heading}
          </h2>

          <blockquote className="card paper-note mt-10 rounded-[1.5rem] p-6 sm:p-8">
            <p className="font-display text-[1.5rem] leading-snug tracking-[-0.025em] text-ink sm:text-[1.85rem]">
              “{founder.quote}”
            </p>
          </blockquote>

          <div className="prose-editorial mt-8">
            {founder.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-10 flex flex-wrap items-baseline gap-3 border-t border-line pt-8">
            <span className="font-display text-[2rem] italic leading-none text-ink">
              {founder.signature}
            </span>
            <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {founder.role}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
