import type { ReactNode } from "react";
import { PaperMotion } from "@/components/paper-motion";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { ui } from "@/content/ui";
import { Toaster } from "sonner";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <div id="top" />
      <a href="#main-content" className="skip-link">
        {ui.skipToContent}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <PaperMotion />
      <SiteFooter />
      <Toaster
        position="bottom-center"
        theme="system"
        duration={6000}
        toastOptions={{
          style: {
            background: "var(--paper)",
            color: "var(--ink)",
            border: "1px solid var(--line-strong)",
            borderRadius: "0.9rem",
          },
        }}
      />
    </>
  );
}
