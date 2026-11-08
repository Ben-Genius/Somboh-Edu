import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArchMedia } from "@/components/arch-media";
import { CheckIcon, ArrowRight } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PaperTear } from "@/components/paper-tear";
import { ProgramsNav } from "@/components/programs-nav";
import { programImages } from "@/content/program-images";
import { programBySlug, programs } from "@/content/programs";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbJsonLd,
  programJsonLd,
} from "@/lib/structured-data";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return programs.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = programBySlug(slug);

  if (!program) {
    return {};
  }

  return pageMetadata({
    title: program.title,
    description: program.metaDescription,
    path: `/programs/${program.slug}`,
  });
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = programBySlug(slug);

  if (!program) {
    notFound();
  }

  const image = programImages[program.slug]!;
  const index = programs.findIndex((entry) => entry.slug === program.slug);
  const previous = programs[(index - 1 + programs.length) % programs.length]!;
  const next = programs[(index + 1) % programs.length]!;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: program.title, path: `/programs/${program.slug}` },
        ])}
      />
      <JsonLd data={programJsonLd(program)} />

      <PageHero
        sketch="book"
        eyebrow={`Program ${program.number} of ${String(programs.length).padStart(2, "0")}`}
        title={program.title}
        lede={program.summary}
        aside={
          <ArchMedia
            src={image.src}
            alt={image.alt}
            caption={image.credit}
            blur={image.blur}
            ratio="4 / 5"
            sizes="(min-width: 1024px) 24vw, 100vw"
            className="w-full max-w-[15rem]"
          />
        }
      />

      <ProgramsNav />

      <section className="section bg-blue-wash">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">The work</p>
            <div className="prose-editorial mt-5">
              {program.detail.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-9 rounded-[1.25rem] border border-line bg-surface p-5 sm:p-6">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-gold-ink">
                What students get
              </p>
              <p className="mt-3 font-display text-[1.35rem] leading-snug tracking-[-0.02em] text-ink sm:text-[1.5rem]">
                {program.studentsGet}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="panel paper-stack squircle bg-surface p-5 sm:p-6">
              <h2 className="font-display text-[1.15rem] font-semibold tracking-[-0.02em] text-ink">
                What the program includes
              </h2>
              <ul className="mt-4 space-y-3">
                {program.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-ink-soft"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5">
                <Link
                  href="/get-involved#students"
                  prefetch
                  className="btn btn-forest w-full"
                >
                  Apply for support
                  <span className="btn-arrow" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link
                  href="/get-involved#partners"
                  prefetch
                  className="link-quiet justify-center text-sm"
                >
                  Partner with SEF
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaperTear from="var(--blue-wash)" to="var(--gold-wash)" />

      <section className="section-tight bg-gold-wash">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Keep exploring</p>
              <h2 className="display-3 mt-4 max-w-[18ch]">
                Five programs. One student at a time.
              </h2>
            </div>
            <Link
              href="/programs"
              prefetch
              className="link-quiet text-sm"
            >
              All five programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <nav
            aria-label="Previous and next program"
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            <Link
              href={`/programs/${previous.slug}`}
              prefetch
              className="card card-lift group flex flex-col gap-2 p-5"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Previous · {previous.number}
              </span>
              <span className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                {previous.title}
              </span>
            </Link>
            <Link
              href={`/programs/${next.slug}`}
              prefetch
              className="card card-lift group flex flex-col gap-2 p-5 sm:text-right"
            >
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                Next · {next.number}
              </span>
              <span className="font-display text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                {next.title}
              </span>
            </Link>
          </nav>
        </div>
      </section>
    </>
  );
}
