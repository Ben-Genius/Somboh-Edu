import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { involvePage } from "@/content/involve";
import { imageBlur } from "@/lib/blur";
import { HeroTitle } from "./hero-title";

/** One door per audience, each the same size so no reader is second. */
const doors = [
  { id: "students", label: "I am a student", line: "Apply for support" },
  { id: "partners", label: "I am a school or university", line: "Partner with SEF" },
  { id: "donors", label: "I want to give", line: "Fund a student" },
] as const;

/**
 * Get-involved opener, after Hope Cancer Resources: a photograph held in one
 * navy, and the audiences side by side as equal doors that open their own
 * tab below.
 */
export function InvolveHero() {
  const { hero } = involvePage;

  return (
    <section className="bg-surface px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[1.75rem] text-white">
        <Image
          src="/images/sef/group-donors.jpg"
          alt="Somboh Educational Foundation students standing together in SEF T-shirts."
          fill
          priority
          placeholder="blur"
          blurDataURL={imageBlur.sefGroupDonors}
          sizes="100vw"
          className="-z-20 object-cover object-[50%_35%] grayscale"
        />
        <div
          aria-hidden="true"
          className="scrim-involve absolute inset-0 -z-10"
        />

        <div className="px-7 pb-8 pt-12 sm:px-12 sm:pt-16 lg:px-16 lg:pb-12 lg:pt-20">
          <p className="eyebrow !text-white/80">{hero.eyebrow}</p>
          <HeroTitle className="display-1 mt-7 max-w-[13ch] text-white">
            {hero.title}
          </HeroTitle>
          <p className="mt-6 max-w-[38ch] text-[1.0625rem] leading-relaxed text-white/90 sm:text-[1.2rem]">
            {hero.lede}
          </p>

          <nav
            aria-label="Choose how you want to get involved"
            className="mt-12 grid gap-3 sm:grid-cols-3 lg:mt-16"
          >
            {doors.map((door) => (
              <a
                key={door.id}
                href={`#${door.id}`}
                className="group flex min-h-[7.5rem] flex-col justify-between rounded-[1.25rem] scrim-glass border border-white/30 p-5 backdrop-blur-md transition-colors duration-300 hover:border-white hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink"
              >
                <span className="font-display text-[1.25rem] font-semibold leading-tight tracking-[-0.02em]">
                  {door.label}
                </span>
                <span className="mt-4 flex items-center justify-between text-[0.8125rem] font-semibold opacity-90">
                  {door.line}
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-[var(--on-gold)] transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
