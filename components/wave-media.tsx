import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { imageBlur } from "@/lib/blur";

type BlurKey = keyof typeof imageBlur;

type WaveShape = {
  inset?: number;
  ampX?: number;
  ampY?: number;
  waves?: number;
  phase?: number;
  steps?: number;
};

/**
 * A rectangle whose four edges are cut as slow paper waves. Points are
 * percentages, so the same clip scales from a 320px phone to a wide desktop.
 * Two sine components keep it from looking mechanically regular.
 */
function wavePolygon({
  inset = 0.024,
  ampX = 0.011,
  ampY = 0.012,
  waves = 3,
  phase = 0,
  steps = 36,
}: WaveShape = {}): string {
  const points: string[] = [];
  const ripple = (t: number, offset: number) =>
    Math.sin(t * Math.PI * 2 * waves + phase + offset) +
    0.2 *
      Math.sin(t * Math.PI * 2 * (waves + 3) + phase * 1.6 + offset * 1.9);
  const push = (x: number, y: number) =>
    points.push(`${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`);

  const span = 1 - inset * 2;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    push(inset + span * t, inset + ampY * ripple(t, 0));
  }
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    push(1 - inset + ampX * ripple(t, 1.3), inset + span * t);
  }
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    push(1 - inset - span * t, 1 - inset + ampY * ripple(t, 2.6));
  }
  for (let i = 1; i < steps; i++) {
    const t = i / steps;
    push(inset + ampX * ripple(t, 3.9), 1 - inset - span * t);
  }

  return `polygon(${points.join(", ")})`;
}

/**
 * A circle cut with scissors: the radius ripples around the circumference, so
 * the edge reads as a hand-cut disc rather than a perfect geometric ring.
 * Percentages keep it round only when the frame is square, which is how the
 * hero uses it.
 */
function circlePolygon({
  inset = 0.018,
  amp = 0.022,
  waves = 10,
  phase = -0.4,
  steps = 160,
}: {
  inset?: number;
  amp?: number;
  waves?: number;
  phase?: number;
  steps?: number;
} = {}): string {
  const points: string[] = [];
  const base = 0.5 - inset;
  const ripple = (angle: number) =>
    Math.sin(angle * waves + phase) +
    0.24 * Math.sin(angle * (waves + 3) + phase * 1.7 + 0.9);

  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const radius = base * (1 + amp * ripple(angle));
    const x = 0.5 + Math.cos(angle) * radius;
    const y = 0.5 + Math.sin(angle) * radius;
    points.push(`${(x * 100).toFixed(2)}% ${(y * 100).toFixed(2)}%`);
  }

  return `polygon(${points.join(", ")})`;
}

const PHOTO_WAVE = circlePolygon();
const NOTE_WAVE = wavePolygon({
  inset: 0.032,
  ampX: 0.011,
  ampY: 0.016,
  waves: 2,
  phase: 0.7,
  steps: 28,
});

/**
 * The hero photograph as a disc of paper cut by hand: a white mat, the image
 * clipped to a rippled circular edge, and a second sheet of clay paper slipped
 * behind it. Waves are the only decorative shape in the hero.
 */
export function WaveMedia({
  src,
  alt,
  caption,
  blur,
  priority = false,
  sizes = "(min-width: 1024px) 48vw, 100vw",
  badge,
  ratio = "1 / 1",
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  blur: BlurKey;
  priority?: boolean;
  sizes?: string;
  badge?: ReactNode;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure
      className={`relative ${className}`}
      style={
        {
          "--wave-photo": PHOTO_WAVE,
          "--wave-note": NOTE_WAVE,
        } as CSSProperties
      }
    >
      <div className="relative">
        <span aria-hidden="true" className="wave-sheet" />

        <div className="wave-shadow">
          <span aria-hidden="true" className="wave-mat" />
          <div
            className="wave-photo"
            style={{ aspectRatio: ratio }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              placeholder="blur"
              blurDataURL={imageBlur[blur]}
              sizes={sizes}
              className="object-cover"
            />
          </div>
        </div>

        {badge ? (
          <div className="absolute inset-x-0 -bottom-8 z-20 pr-10 sm:-left-8 sm:right-auto sm:w-[21rem] sm:pr-0">
            <div className="wave-note-shadow">
              <div className="wave-note">{badge}</div>
            </div>
          </div>
        ) : null}
      </div>

      <figcaption
        className={`max-w-sm text-[0.72rem] leading-relaxed text-ink-soft ${
          badge ? "mt-16" : "mt-6"
        }`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
