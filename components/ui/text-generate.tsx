"use client";

import { useReveal } from "./use-reveal";

/** Words surface one after another, coming into focus as they arrive. */
export function TextGenerate({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  /** Seconds before the first word. */
  delay?: number;
}) {
  const { ref, state } = useReveal<HTMLParagraphElement>();
  const words = text.split(" ");

  return (
    <p ref={ref} data-reveal={state} className={`text-generate ${className}`}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="tg-word"
          style={{ transitionDelay: `${delay + index * 0.035}s` }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
