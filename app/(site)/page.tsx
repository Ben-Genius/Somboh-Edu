import type { Metadata } from "next";
import { CtaPaths } from "@/components/cta-paths";
import { FounderNote } from "@/components/founder-note";
import { GapSection } from "@/components/home/gap-section";
import { HomeHero } from "@/components/home/hero";
import { ProgramsSection } from "@/components/home/programs-section";
import { PaperTear } from "@/components/paper-tear";
import { homePage } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";
import { ServeSection } from "@/components/home/serve-section";

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

      <FounderNote compact />
      <PaperTear from="var(--blue-wash)" to="var(--forest)" />
      <CtaPaths />
    </>
  );
}
