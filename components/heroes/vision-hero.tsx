import Image from "next/image";
import { visionPage } from "@/content/vision";
import { imageBlur } from "@/lib/blur";
import { HeroTitle } from "./hero-title";

/**
 * Vision opener, after "Deferred Damage": one full-bleed photograph held in
 * brand blue, a thin inset frame, the headline top-left and the line that
 * explains it bottom-left. Restraint carries it; nothing else competes.
 */
export function VisionHero() {
  const { hero } = visionPage;

  return (
    <section className="bg-surface px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
      <div className="relative isolate flex min-h-[clamp(34rem,86svh,52rem)] flex-col justify-between overflow-hidden rounded-[1.75rem] text-white">
        <Image
          src="/images/knust-great-hall.jpg"
          alt="The Great Hall at KNUST in Kumasi, photographed from the lawn."
          fill
          priority
          placeholder="blur"
          blurDataURL={imageBlur.knust}
          sizes="100vw"
          className="-z-20 object-cover object-[50%_60%]"
        />
        {/* Duotone: the warm photograph pulled into the brand blue. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[#2f6fd0] mix-blend-multiply"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,54,122,0.6)_0%,rgba(8,54,122,0.05)_50%,rgba(6,24,56,0.7)_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-white/35 sm:inset-5"
        />

        <div className="relative px-7 pt-10 sm:px-12 sm:pt-14 lg:px-16 lg:pt-16">
          <p className="eyebrow !text-white/80">{hero.eyebrow}</p>
          <HeroTitle className="display-1 mt-7 max-w-[15ch] text-white lg:text-[clamp(3.6rem,6.4vw,6.6rem)]">
            {hero.title}
            <span className="text-gold">.</span>
          </HeroTitle>
        </div>

        <div className="relative grid gap-8 px-7 pb-10 sm:px-12 sm:pb-12 lg:grid-cols-12 lg:items-end lg:px-16 lg:pb-14">
          <p className="max-w-[38ch] font-display text-[1.15rem] leading-snug tracking-[-0.015em] text-white/90 sm:text-[1.3rem] lg:col-span-6">
            {hero.lede}
          </p>
          <div className="flex flex-col gap-1 text-[0.65rem] uppercase tracking-[0.16em] text-white/65 lg:col-span-4 lg:col-start-9 lg:items-end lg:text-right">
            <span>Ghana · the destination</span>
            <span className="normal-case tracking-normal">
              Placeholder photograph: the Great Hall, KNUST, Kumasi. Photo by
              Pnlarbi, CC BY 4.0.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
