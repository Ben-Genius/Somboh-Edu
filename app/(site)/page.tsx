import type { Metadata } from "next";
import { CtaPaths } from "@/components/cta-paths";
import { FounderNote } from "@/components/founder-note";
import { CommitmentSection } from "@/components/home/commitment-section";
import { GapSection } from "@/components/home/gap-section";
import { HomeHero } from "@/components/home/hero";
import { ProgramsSection } from "@/components/home/programs-section";
import { ServeSection } from "@/components/home/serve-section";
import { PaperTear } from "@/components/paper-tear";
import { homePage } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: homePage.meta.title,
  description: homePage.meta.description,
  path: "/",
  openGraphTitle: homePage.meta.title,
  absoluteTitle: true,
});

/** Each section lives in components/home; this file only sets the order. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <GapSection />
      <ProgramsSection />
      <ServeSection />
      <CommitmentSection />
      <FounderNote />
      <PaperTear from="var(--paper)" to="var(--forest)" />
      <CtaPaths />
    </>
  );
}
