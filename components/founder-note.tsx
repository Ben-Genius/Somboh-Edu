import { homePage } from "@/content/home";
import { ArchMedia } from "./arch-media";

export function FounderNote() {
  const founder = homePage.founder;

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
