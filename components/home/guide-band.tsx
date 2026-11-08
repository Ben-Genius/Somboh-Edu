import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { guideStages } from "@/content/guide";
import { homePage } from "@/content/home";

/**
 * A slim pointer to the student guide: its four stages as stops on a road,
 * each linking to that stage. The steps themselves stay on /guide.
 */
export function GuideBand() {
  const { guide } = homePage;

  return (
    <section
      aria-labelledby="guide-band-heading"
      className="section-tight border-y border-line bg-gold-wash"
    >
      <div className="shell grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <div className="lg:col-span-4">
          <p className="eyebrow">{guide.eyebrow}</p>
          <h2
            id="guide-band-heading"
            className="display-3 mt-4 max-w-[20ch] text-ink"
          >
            {guide.heading}
          </h2>
          <Link
            href={guide.href}
            prefetch
            className="link-quiet mt-5 inline-flex min-h-[44px] items-center gap-1.5 text-sm"
          >
            {guide.linkLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4 lg:col-span-8">
          <span
            aria-hidden="true"
            className="absolute left-5 right-5 top-5 hidden border-t-2 border-dashed border-gold-ink/50 sm:block"
          />
          {guideStages.map((stage) => (
            <li key={stage.id} className="relative">
              <Link
                href={`${guide.href}#${stage.id}`}
                className="group flex flex-col items-start gap-3"
              >
                <span className="tnum grid h-10 w-10 place-items-center rounded-full border-2 border-gold-ink bg-surface font-display text-[0.8125rem] font-semibold text-ink transition-colors duration-300 group-hover:bg-gold group-focus-visible:bg-gold">
                  {stage.number}
                </span>
                <span>
                  <span className="block font-display text-[1.1rem] font-semibold leading-tight tracking-[-0.02em] text-ink underline-offset-4 group-hover:underline">
                    {stage.short}
                  </span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-soft">
                    {stage.when}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
