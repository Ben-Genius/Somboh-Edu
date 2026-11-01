"use client";

import { useEffect } from "react";

/**
 * Sources sit in a closed <details>. Following a footnote (by click, or by
 * landing on a #source- URL) opens the list that holds the target first, so
 * the jump lands on visible text.
 */
export function SourcesOpener() {
  useEffect(() => {
    const open = (hash: string) => {
      if (!hash.startsWith("#source-")) return;
      const target = document.getElementById(hash.slice(1));
      const details = target?.closest("details");
      if (details && !details.open) details.open = true;
    };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#source-"]',
      );
      if (link) open(link.getAttribute("href")!);
    };

    open(window.location.hash);
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
