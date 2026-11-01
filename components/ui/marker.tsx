"use client";

import type { ReactNode } from "react";
import { useReveal } from "./use-reveal";

/** A gold highlighter stroke drawn under a phrase as it scrolls in. */
export function Marker({
  children,
  className = "",
  delay = 0.4,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, state } = useReveal<HTMLSpanElement>(0.8);

  return (
    <span
      ref={ref}
      data-reveal={state}
      className={`marker ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}
