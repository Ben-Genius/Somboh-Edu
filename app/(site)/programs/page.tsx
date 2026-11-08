import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArchMedia } from "@/components/arch-media";
import { ArrowRight, CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PaperTear } from "@/components/paper-tear";
import { ProgramsNav } from "@/components/programs-nav";
import { homePage } from "@/content/home";
import { programImages } from "@/content/program-images";
import { programs } from "@/content/programs";
import { imageBlur } from "@/lib/blur";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "Programs",
  description:
    "Five SEF Ghana programs: SAT preparation, application mentorship, financial aid guidance, skills development, and community engagement for Ghanaian students.",
  path: "/programs",
});

/** The program's photograph; pinned beside its detail on large screens. */
function ProgramPhoto({ slug }: { slug: string }) {
  const image = programImages[slug];
  if (!image) return null;

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] shadow-[0_0_0_5px_var(--surface),0_0_0_6px_var(--line)] max-lg:aspect-[16/10]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          placeholder="blur"
          blurDataURL={imageBlur[image.blur]}
          sizes="(min-width: 1024px) 28vw, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 text-[0.68rem] leading-relaxed text-ink-soft">
        {image.credit}
      </figcaption>
    </figure>
  );
}

export default function ProgramsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
        ])}
      />

      <PageHero
        sketch="book"
        eyebrow="Our programs"
        title="Five programs. One student at a time."
        lede="Support begins with where a student is and what they need next. These programs are built to work together, not in isolation."
        aside={
          <ArchMedia
            src="/images/sef/cohort-programs.jpg"
            alt="A Somboh Educational Foundation cohort standing together at the front of a classroom."
            caption="An SEF cohort at a session."
            blur="sefCohortPrograms"
            ratio="4 / 5"
            sizes="(min-width: 1024px) 24vw, 100vw"
            className="w-full max-w-[15rem]"
          />
        }
      />

      <ProgramsNav />

      <div className="bg-blue-wash">
        <div className="shell space-y-5 py-10 lg:py-14">
          {programs.map((program, index) => (
            <section
              key={program.slug}
              id={program.slug}
              aria-labelledby={`${program.slug}-heading`}
              className="card scroll-mt-40 p-5 sm:p-7 lg:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                <div className="lg:sticky lg:top-[calc(var(--nav-height)+6.5rem)] lg:col-span-4 lg:self-start">
                  <ProgramPhoto slug={program.slug} />
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                      Program {program.number}
                    </p>
                    <p className="tnum text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(programs.length).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <h2
                    id={`${program.slug}-heading`}
                    className="display-2 max-w-[20ch] text-ink"
                  >
                    {program.title}
                  </h2>

                  <p className="mt-5">{program.summary}</p>

                  <div className="mt-8 flex flex-col gap-2 rounded-[1.25rem] border border-line bg-surface px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4">
                    <p className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-ink">
                      {homePage.programs.studentsGetLabel}
                    </p>
                    <p className="text-[0.9375rem] leading-relaxed text-ink">
                      {program.studentsGet}
                    </p>
                  </div>

                  <ul className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                    {program.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-ink-soft"
                      >
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                    <Link
                      href={`/programs/${program.slug}`}
                      prefetch
                      className="btn btn-forest"
                    >
                      Open the program page
                      <span className="btn-arrow" aria-hidden="true">
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </Link>
                    <Link
                      href="/get-involved#students"
                      prefetch
                      className="link-quiet text-sm"
                    >
                      Apply for support
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <PaperTear from="var(--blue-wash)" to="var(--gold-wash)" />

      <section className="section bg-gold-wash">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-8">
            <p className="eyebrow">Next step</p>
            <h2 className="display-2 mt-5 max-w-[20ch]">
              Not sure which program fits?
            </h2>
            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-ink-soft">
              Tell us where you are and what you are aiming for. We will point
              you to the right place, or say plainly if we are not the right
              fit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/get-involved#students"
                prefetch
                className="btn btn-forest"
              >
                Start an interest form
                <span className="btn-arrow" aria-hidden="true">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
              <Link href="/faq" prefetch className="link-quiet text-sm">
                Read the FAQ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="panel paper-stack squircle bg-surface p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Not ready to apply?
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                Read the questions families ask most, from eligibility and cost
                to what happens after the form.
              </p>
              <Link
                href="/faq"
                prefetch
                className="link-quiet mt-4 text-sm"
              >
                Go to the FAQ
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
