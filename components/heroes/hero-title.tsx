import type { ReactNode } from "react";
import { ViewTransition } from "@/components/view-transition";

/**
 * The page h1, wrapped so it morphs from the link that opened the page.
 * Every page hero uses it, whatever its layout.
 */
export function HeroTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ViewTransition name="page-title" share="morph" default="none">
      <h1 className={className}>{children}</h1>
    </ViewTransition>
  );
}
