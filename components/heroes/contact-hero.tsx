import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { contactPage } from "@/content/contact";
import { imageBlur } from "@/lib/blur";
import { SketchAccent } from "@/components/blueprint-sketches";
import { HeroTitle } from "./hero-title";

/** Quick routes for the commonest reasons people write. */
const routes = [
  { label: "I want to apply", href: "/get-involved#students" },
  { label: "We want to partner", href: "/get-involved#partners" },
  { label: "Something else", href: "#contact-form" },
];

/**
 * Contact opener, after "Where Next": a plain headline, a gold arc holding a
 * portrait, and a capsule card overlapping the arc that routes the reader
 * before they write a word.
 */
export function ContactHero() {
  const { hero } = contactPage;

  return (
    <section className="relative overflow-hidden border-b border-line bg-hero-blend">
      <div className="shell relative grid gap-12 pb-14 pt-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-16 lg:pt-14">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <p className="eyebrow">{hero.eyebrow}</p>
            <SketchAccent drawing="idea" motion="scribble" until="never" label={false} className="w-11 -rotate-3" />
          </div>
          <HeroTitle className="display-1 mt-7 max-w-[11ch] text-ink">
            {hero.title}
          </HeroTitle>
          <p className="lede mt-7 max-w-[28rem]">{hero.lede}</p>
        </div>

        <div className="relative mx-auto w-full max-w-[26rem] pb-16 lg:col-span-5 lg:col-start-8 lg:max-w-none lg:pb-12">
          {/* The arc: a gold doorway with the portrait standing in it. */}
          <div className="relative mx-auto aspect-[4/5] w-[78%] rounded-t-full bg-gold p-[6%] pb-0">
            <div className="relative h-full overflow-hidden rounded-t-full">
              <Image
                src="/images/sef/student-next.jpg"
                alt="A smiling Somboh Educational Foundation student in an SEF T-shirt."
                fill
                priority
                placeholder="blur"
                blurDataURL={imageBlur.sefStudentNext}
                sizes="(min-width: 1024px) 26vw, 70vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-[min(19rem,88%)] rounded-[1.5rem] border border-line bg-surface p-4 shadow-[var(--shadow-float)] sm:p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              What is it about?
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {routes.map((route) => (
                <li key={route.label}>
                  <Link
                    href={route.href}
                    prefetch={route.href.startsWith("/")}
                    className="tap group flex min-h-[44px] items-center justify-between gap-3 rounded-full border border-line px-4 text-[0.875rem] font-medium text-ink transition-colors hover:border-forest hover:bg-forest hover:text-white"
                  >
                    {route.label}
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
