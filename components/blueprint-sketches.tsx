"use client";

import { useEffect, useId, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Stroke = { d: string; accent?: boolean };

/** How a sketch is put on the page. Each one reads differently on purpose. */
type Motion =
  | "draw" // pencil traces start to end
  | "reverse" // traced from the far end back
  | "scribble" // jerky, stepped, like a hand hatching it in
  | "pop" // springs up from a point while it draws
  | "float"; // draws, then drifts gently

/**
 * Pencil blueprint doodles for the things Somboh works on. Each is drawn by
 * hand in a 124 x 134 box, so it stays crisp at any size and follows the
 * theme through `currentColor`. Accent strokes are the construction lines:
 * dimension ticks, callouts and rays.
 */
const drawings: Record<string, { label: string; strokes: Stroke[] }> = {
  cap: {
    label: "admission",
    strokes: [
      { d: "M60 24 L110 46 L60 68 L10 46 Z" },
      { d: "M30 58 V82 Q60 98 90 82 V58" },
      { d: "M104 49 V80" },
      { d: "M104 80 l-4 12 h8 z" },
      { d: "M10 106 H110", accent: true },
      { d: "M10 101 V111 M110 101 V111", accent: true },
    ],
  },
  book: {
    label: "study support",
    strokes: [
      {
        d: "M60 34 Q35 22 10 30 V86 Q35 78 60 90 Q85 78 110 86 V30 Q85 22 60 34 Z",
      },
      { d: "M60 34 V90" },
      { d: "M20 44 Q34 40 50 46 M20 56 Q34 52 50 58 M20 68 Q34 64 50 70" },
      { d: "M70 46 Q86 40 100 44 M70 58 Q86 52 100 56" },
      { d: "M110 18 L96 30", accent: true },
    ],
  },
  sat: {
    label: "SAT prep",
    strokes: [
      { d: "M18 10 H90 Q96 10 96 16 V108 Q96 114 90 114 H24 Q18 114 18 108 Z" },
      { d: "M32 32 H80 M32 44 H66" },
      {
        d: "M38 66 a6 6 0 1 0 0.1 0 M58 66 a6 6 0 1 0 0.1 0 M78 66 a6 6 0 1 0 0.1 0",
      },
      {
        d: "M38 88 a6 6 0 1 0 0.1 0 M58 88 a6 6 0 1 0 0.1 0 M78 88 a6 6 0 1 0 0.1 0",
      },
      { d: "M54 62 L63 71 M62 71 L54 62" },
      { d: "M100 100 L116 60 L122 63 L106 103 Z", accent: true },
    ],
  },
  university: {
    label: "top universities",
    strokes: [
      { d: "M8 44 L60 16 L112 44 Z" },
      { d: "M18 52 V90 M40 52 V90 M80 52 V90 M102 52 V90" },
      { d: "M8 90 H112 M3 100 H117" },
      { d: "M54 90 V70 Q60 62 66 70 V90" },
      { d: "M60 4 V16", accent: true },
      { d: "M60 4 L72 8 L60 12", accent: true },
    ],
  },
  abroad: {
    label: "study abroad",
    strokes: [
      { d: "M10 62 L112 22 L84 102 L60 74 Z" },
      { d: "M60 74 L112 22" },
      { d: "M60 74 L58 98 L74 84" },
      { d: "M6 112 Q40 92 54 108", accent: true },
    ],
  },
  funding: {
    label: "full funding",
    strokes: [
      { d: "M14 28 H106 V84 H14 Z" },
      { d: "M26 42 H94 M26 54 H78" },
      { d: "M60 90 a14 14 0 1 0 0.1 0" },
      {
        d: "M60 80 l3 7 7 .6 -5.4 4.6 1.7 7 -6.3 -3.8 -6.3 3.8 1.7 -7 -5.4 -4.6 7 -.6 z",
      },
      { d: "M52 106 L48 124 L60 117 L72 124 L68 106" },
    ],
  },
  idea: {
    label: "guidance",
    strokes: [
      { d: "M60 14 a28 28 0 0 1 16 51 v13 H44 V65 A28 28 0 0 1 60 14 Z" },
      { d: "M46 90 H74 M50 100 H70" },
      { d: "M54 78 V58 L60 52 L66 58 V78" },
      {
        d: "M22 22 L14 14 M98 22 L106 14 M12 46 H4 M112 46 H120",
        accent: true,
      },
    ],
  },
  compass: {
    label: "direction",
    strokes: [
      { d: "M60 10 a5 5 0 1 0 0.1 0" },
      { d: "M60 15 V30" },
      { d: "M60 30 L34 100 M60 30 L86 100" },
      { d: "M34 100 l-2 10 M86 100 v10" },
      { d: "M46 66 H74" },
      { d: "M26 116 Q60 88 94 116", accent: true },
    ],
  },
  magnifier: {
    label: "information",
    strokes: [
      { d: "M50 14 a34 34 0 1 0 0.1 0" },
      { d: "M74 74 L108 108 M104 100 l10 10" },
      { d: "M34 44 H62 M34 58 H54" },
      { d: "M14 112 H44", accent: true },
    ],
  },
  key: {
    label: "access",
    strokes: [
      { d: "M34 28 a22 22 0 1 0 0.1 0" },
      { d: "M26 50 a6 6 0 1 0 0.1 0" },
      { d: "M56 50 H112" },
      { d: "M92 50 V70 M104 50 V64" },
      { d: "M10 100 H60", accent: true },
    ],
  },
};

type Placement = {
  drawing: keyof typeof drawings;
  className: string;
  motion: Motion;
};

// Spread across the section: something on the left, the centre and the
// right, each in space the content leaves free at that breakpoint.
const sets: Record<string, Placement[]> = {
  hero: [
    // left, under the hero facts
    {
      drawing: "funding",
      className: "bottom-[3%] left-[4%] w-24 -rotate-3",
      motion: "draw",
    },
    {
      drawing: "book",
      className: "bottom-[2%] left-[22%] w-24 rotate-3",
      motion: "scribble",
    },
    // centre, in the gutter between headline and photograph
    {
      drawing: "cap",
      className: "left-[41%] top-[15%] w-24 -rotate-6",
      motion: "pop",
    },
    {
      drawing: "abroad",
      className: "bottom-[2%] left-[55%] w-24 rotate-6",
      motion: "float",
    },
    // right, around the photograph
    {
      drawing: "sat",
      className: "right-[1.5%] top-[12%] hidden w-24 rotate-6 xl:block",
      motion: "reverse",
    },
    {
      drawing: "university",
      className: "bottom-[8%] right-[2%] hidden w-28 -rotate-2 xl:block",
      motion: "draw",
    },
  ],
  gap: [
    // left column, above and below its two figures
    {
      drawing: "compass",
      className: "left-[12%] top-[36%] w-20 -rotate-6",
      motion: "float",
    },
    {
      drawing: "key",
      className: "bottom-[15%] left-[16%] w-24 rotate-3",
      motion: "draw",
    },
    // centre, between heading and text; right, above its two figures
    {
      drawing: "magnifier",
      className: "left-[46%] top-[8%] w-24 rotate-6",
      motion: "pop",
    },
    {
      drawing: "idea",
      className: "right-[14%] top-[36%] w-20 -rotate-3",
      motion: "scribble",
    },
  ],
  // Inner-page heroes: headline on the left, an optional picture on the
  // right, so the sketches run along the top and through the middle.
  page: [
    {
      drawing: "key",
      className: "left-[30%] top-[10%] w-20 -rotate-3",
      motion: "draw",
    },
    {
      drawing: "idea",
      className: "bottom-[14%] left-[47%] w-20 -rotate-6",
      motion: "reverse",
    },
    {
      drawing: "compass",
      className: "right-[25%] top-[12%] hidden w-20 rotate-6 xl:block",
      motion: "scribble",
    },
  ],
};

export function BlueprintSketches({
  set,
  className = "",
  /** Draw as soon as the page loads, or wait until the sketch scrolls in. */
  onScroll = false,
}: {
  set: keyof typeof sets;
  className?: string;
  onScroll?: boolean;
}) {
  const host = useRef<HTMLDivElement>(null);
  const filterId = `sk-pencil-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const layer = host.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    layer.classList.add("sk-ready");

    const ctx = gsap.context(() => {
      layer
        .querySelectorAll<SVGSVGElement>("[data-sketch]")
        .forEach((svg, index) => {
          const motion = svg.dataset.motion as Motion;
          const paths = Array.from(
            svg.querySelectorAll<SVGPathElement>(".sk-path"),
          );
          const label = svg.querySelector(".sk-label");
          const delay = onScroll ? 0 : 0.6 + index * 0.18;

          const tl = gsap.timeline({
            delay,
            paused: onScroll,
            scrollTrigger: onScroll
              ? { trigger: svg, start: "top 88%", once: true }
              : undefined,
          });

          const from = motion === "reverse" ? -1 : 1;
          const draw = {
            strokeDashoffset: 0,
            duration: motion === "scribble" ? 1.4 : 1.1,
            stagger: motion === "reverse" ? 0.03 : 0.05,
            ease:
              motion === "scribble"
                ? "steps(16)"
                : motion === "reverse"
                  ? "power4.out"
                  : "power2.inOut",
          };

          if (motion === "pop") {
            tl.fromTo(
              svg,
              { scale: 0.55, rotation: "-=12", transformOrigin: "50% 50%" },
              {
                scale: 1,
                rotation: "+=12",
                duration: 1,
                ease: "back.out(1.8)",
              },
              0,
            );
          }

          tl.fromTo(paths, { strokeDashoffset: from }, draw, 0);
          if (label)
            tl.fromTo(
              label,
              { opacity: 0 },
              { opacity: 1, duration: 0.6 },
              ">-0.3",
            );

          if (motion === "float") {
            tl.to(svg, {
              y: -9,
              duration: 2.6,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          }
        });
    }, layer);

    return () => {
      ctx.revert();
      layer.classList.remove("sk-ready");
    };
  }, [set, onScroll]);

  return (
    <div
      ref={host}
      aria-hidden="true"
      className={`hero-sketches pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden lg:block ${className}`}
    >
      <svg width="0" height="0" focusable="false" className="absolute">
        <defs>
          {/* A faint wobble, so lines read as pencil and not vector. */}
          <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.035"
              numOctaves="2"
              seed="4"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.2" />
          </filter>
        </defs>
      </svg>

      {(sets[set] ?? []).map((item) => {
        const drawing = drawings[item.drawing]!;
        return (
          <svg
            key={`${item.drawing}-${item.className}`}
            data-sketch
            data-motion={item.motion}
            viewBox="0 0 124 134"
            focusable="false"
            className={`absolute ${item.className} text-ink-soft`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: `url(#${filterId})` }}
          >
            {drawing.strokes.map((stroke, index) => (
              <path
                key={index}
                d={stroke.d}
                pathLength={1}
                className="sk-path"
                style={
                  stroke.accent
                    ? { stroke: "var(--gold)", strokeWidth: 1.3 }
                    : undefined
                }
              />
            ))}
            <text
              x="62"
              y="131"
              textAnchor="middle"
              className="sk-label"
              fill="currentColor"
              stroke="none"
              fontSize="11"
            >
              {drawing.label}
            </text>
          </svg>
        );
      })}
    </div>
  );
}
