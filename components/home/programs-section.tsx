import Link from "next/link";
import { BlueprintSketches } from "@/components/blueprint-sketches";
import { ArrowRight } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { homePage } from "@/content/home";
import { ProgramCarousel } from "./program-carousel";

/** "What we do": the five programs as a photo carousel, one open at a time. */
export function ProgramsSection() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="section relative overflow-clip bg-surface"
    >
      <BlueprintSketches set="programs" onScroll />
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <SectionHeading
              id="programs-heading"
              eyebrow={homePage.programs.eyebrow}
              heading={homePage.programs.heading}
            />
          </div>
          <p className="lede lg:col-span-5">{homePage.programs.intro}</p>
        </div>

        <ProgramCarousel />

        <div className="mt-8 flex justify-end">
          <Link href="/programs" prefetch className="link-quiet text-sm">
            All five programs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
