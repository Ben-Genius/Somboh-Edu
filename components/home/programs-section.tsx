import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { homePage } from "@/content/home";
import { ProgramScroll } from "./program-scroll";

/** "What we do": the five programs, told one at a time as the page scrolls. */
export function ProgramsSection() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="section bg-surface"
    >
      <div className="shell">
        <SectionHeading
          id="programs-heading"
          eyebrow={homePage.programs.eyebrow}
          heading={homePage.programs.heading}
          intro={homePage.programs.intro}
        />

        <ProgramScroll />

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
