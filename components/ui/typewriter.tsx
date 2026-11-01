"use client";

import { Fragment } from "react";
import { useReveal } from "./use-reveal";

/**
 * Letters typed in one by one behind a blinking caret. Words never break
 * mid-word, and screen readers get the plain heading through aria-label.
 */
export function Typewriter({
  text,
  as: Tag = "h3",
  id,
  className = "",
  speed = 0.028,
}: {
  text: string;
  as?: "h2" | "h3" | "p";
  id?: string;
  className?: string;
  /** Seconds per letter. */
  speed?: number;
}) {
  const { ref, state } = useReveal<HTMLHeadingElement>(0.6);

  // Each word with the position of its first letter in the whole line, so
  // the delays run on across words (spaces count as a beat too).
  const words = text
    .split(" ")
    .reduce<{ word: string; start: number }[]>((list, word) => {
      const last = list[list.length - 1];
      const start = last ? last.start + last.word.length + 1 : 0;
      return [...list, { word, start }];
    }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      aria-label={text}
      data-reveal={state}
      className={`typewriter ${className}`}
      style={{ "--tw-total": `${text.length * speed}s` } as React.CSSProperties}
    >
      <span aria-hidden="true">
        {words.map(({ word, start }, w) => (
          <Fragment key={`${word}-${start}`}>
            <span className="whitespace-nowrap">
              {Array.from(word).map((char, c) => (
                <span
                  key={c}
                  className="tw-char"
                  style={{ transitionDelay: `${(start + c) * speed}s` }}
                >
                  {char}
                </span>
              ))}
            </span>
            {/* The space sits outside the word so lines can still break. */}
            {w < words.length - 1 ? " " : null}
          </Fragment>
        ))}
        <span className="tw-caret" />
      </span>
    </Tag>
  );
}
