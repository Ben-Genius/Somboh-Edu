import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { visionPage } from "@/content/vision";
import { imageBlur } from "@/lib/blur";
import { SketchAccent } from "@/components/blueprint-sketches";
import { HeroTitle } from "./hero-title";

/**
 * Vision opener, after "Deferred Damage": one full-bleed photograph held in
 * navy scrims behind the type only, a thin inset frame, the headline top-left and the line that
 * explains it bottom-left. Restraint carries it; nothing else competes.
 */
export function VisionHero() {
  const { hero } = visionPage;

  return (
    <section className="bg-surface px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
      <div className="relative isolate flex min-h-[clamp(34rem,86svh,52rem)] flex-col justify-between overflow-hidden rounded-[1.75rem] text-white">
        {/* Was the KNUST Great Hall (sepia, low detail), shown in a blue duotone:
        <Image src="/images/knust-great-hall.jpg" blurDataURL={imageBlur.knust} ... />
        */}
        <Image
          src="/images/vision/community-gathering.jpg"
          alt="A large, smiling group of young African leaders gathered together for a photograph at a conference."
          fill
          priority
          placeholder="blur"
          blurDataURL={imageBlur.visionGathering}
          sizes="100vw"
          className="-z-20 object-cover object-[50%_70%]"
        />
        {/* Scrims in brand navy, only where the type sits, so faces stay clear. */}
        <div
          aria-hidden="true"
          className="scrim-vision absolute inset-0 -z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 rounded-[1.25rem] border border-white/35 sm:inset-5"
        />

        <div className="relative px-7 pt-10 sm:px-12 sm:pt-14 lg:px-16 lg:pt-16">
          <div className="flex items-center gap-3">
            <p className="eyebrow !text-white/80">{hero.eyebrow}</p>
            <SketchAccent drawing="abroad" motion="float" until="never" label={false} tone="light" className="w-12 -rotate-6" />
          </div>
          <HeroTitle className="display-1 mt-7 max-w-[15ch] text-white lg:text-[clamp(3.6rem,6.4vw,6.6rem)]">
            {hero.title}
            <span className="text-gold">.</span>
          </HeroTitle>
        </div>

        <div className="relative grid gap-8 px-7 pb-10 sm:px-12 sm:pb-12 lg:grid-cols-12 lg:items-end lg:px-16 lg:pb-14">
          <div className="lg:col-span-6">
            <p className="max-w-[38ch] font-display text-[1.15rem] leading-snug tracking-[-0.015em] text-white/90 sm:text-[1.3rem]">
              {hero.lede}
            </p>
            {/* The vision needs partners to happen; ask for them here. */}
            <Link
              href="/get-involved#partners"
              prefetch
              className="btn btn-gold mt-7"
            >
              Partner with SEF
              <span className="btn-arrow" aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
          <div className="flex flex-col gap-1 text-[0.65rem] uppercase tracking-[0.16em] text-white/65 lg:col-span-4 lg:col-start-9 lg:items-end lg:text-right">
            <span>Ghana · the destination</span>
            <span className="normal-case tracking-normal">
              Stock photograph: Young African Leaders Initiative, West Africa.
              Photo by USAID in Africa, public domain. Not an SEF program
              image.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
