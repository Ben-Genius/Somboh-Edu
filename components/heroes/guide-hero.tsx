import { guidePage, guideStages } from "@/content/guide";
import { SketchAccent } from "@/components/blueprint-sketches";
import { HeroTitle } from "./hero-title";

/**
 * Student guide opener: the headline over a road with four stops. The road
 * is the page's navigation, and its line continues down the stages below,
 * so the hero reads as the start of the journey rather than a banner.
 */
export function GuideHero() {
  const { hero } = guidePage;

  return (
    <section className="relative overflow-hidden border-b border-line bg-gold-wash">
      <div className="shell relative pb-12 pt-10 lg:pb-16 lg:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3">
              <p className="eyebrow">{hero.eyebrow}</p>
              <SketchAccent drawing="compass" motion="float" until="never" label={false} className="w-11 rotate-6" />
            </div>
            <HeroTitle className="display-1 mt-7 max-w-[14ch] text-ink">
              {hero.title}
            </HeroTitle>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[1rem] leading-relaxed text-ink-soft sm:text-[1.0625rem]">
              {hero.lede}
            </p>
            <p className="mt-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-gold-ink">
              {hero.reviewed}
            </p>
          </div>
        </div>

        <nav aria-label={guidePage.stagesHeading} className="mt-12 lg:mt-16">
          <ol className="relative grid gap-0 sm:grid-cols-4">
            {/* The road: down the left on phones, across on wider screens. */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[1.4rem] top-6 w-0 border-l-2 border-dashed border-gold-ink/50 sm:bottom-auto sm:left-6 sm:right-6 sm:top-[1.4rem] sm:h-0 sm:w-auto sm:border-l-0 sm:border-t-2"
            />
            {guideStages.map((stage) => (
              <li key={stage.id} className="relative">
                <a
                  href={`#${stage.id}`}
                  className="group flex items-center gap-4 rounded-[1rem] py-3 sm:flex-col sm:items-start sm:gap-5 sm:py-0 sm:pr-4"
                >
                  <span className="tnum relative grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-gold-ink bg-surface font-display text-sm font-semibold text-ink transition-colors duration-300 group-hover:bg-gold group-focus-visible:bg-gold">
                    {stage.number}
                  </span>
                  <span>
                    <span className="block font-display text-[1.25rem] font-semibold leading-tight tracking-[-0.02em] text-ink underline-offset-4 group-hover:underline">
                      {stage.short}
                    </span>
                    <span className="mt-1 block text-[0.8125rem] leading-snug text-ink-soft">
                      {stage.when}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
