"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared by the text effects. Server HTML is always the finished text, so the
 * page reads without JavaScript. Once mounted (and only if motion is allowed)
 * the effect "arms" — hides itself — and plays the first time it scrolls in.
 */
export function useReveal<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "armed" | "played">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setState("armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("played");
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, state };
}
