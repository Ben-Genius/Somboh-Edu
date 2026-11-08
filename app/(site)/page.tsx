import type { Metadata } from "next";
import { CtaPaths } from "@/components/cta-paths";
import { FounderNote } from "@/components/founder-note";
import { FaqBrief } from "@/components/home/faq-brief";
import { GapSection } from "@/components/home/gap-section";
import { GuideBand } from "@/components/home/guide-band";
import { HomeHero } from "@/components/home/hero";
import { ProgramsSection } from "@/components/home/programs-section";
import { PaperTear } from "@/components/paper-tear";
import { ProofSection } from "@/components/proof-section";
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

/**
 * Each section lives in components/home; this file only sets the order.
 * The home page stays a short overview: who we serve, the commitment and the
 * founder's full message live on the mission page, one click away.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <GapSection />
      <ProgramsSection />
      {/* For students not ready to apply: the free guide, by stage. */}
      <GuideBand />
      {/* The questions that decide whether a family applies. */}
      <FaqBrief />
      {/* Dated results and named voices; renders nothing until verified. */}
      <ProofSection />

      <FounderNote compact />
      <PaperTear from="var(--blue-wash)" to="var(--forest)" />
      <CtaPaths />
    </>
  );
}
