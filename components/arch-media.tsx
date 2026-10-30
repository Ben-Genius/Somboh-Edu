import Image from "next/image";
import type { ReactNode } from "react";
import { imageBlur } from "@/lib/blur";
import {
  PeelCurl,
  peelClasses,
  type PeelCorner,
} from "@/components/peel-corner";

type BlurKey = keyof typeof imageBlur;

const stickyClass = "lg:sticky lg:top-[calc(var(--nav-height)+2rem)]";

/**
 * Photography in an arch — the shape of a doorway, used throughout as the
 * "door to university" motif. The picture sits on a white paper mat, with a
 * second sheet slipped behind it at a slight angle, as if pinned by hand.
 *
 * Photography is still temporary; captions carry the credit and say so.
 */
export function ArchMedia({
  src,
  alt,
  caption,
  blur,
  priority = false,
  sizes = "(min-width: 1024px) 38vw, 100vw",
  badge,
  ratio = "4 / 5",
  peel = "br",
  sticky = false,
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
  /** Which corner lifts off the page, or `none` to keep the frame flat. */
  peel?: PeelCorner;
  /** Pin the photograph while the column beside it scrolls (desktop). */
  sticky?: boolean;
  className?: string;
}) {
  return (
    <figure className={`relative ${sticky ? stickyClass : ""} ${className}`}>
      <div className="relative">
        <span
          aria-hidden="true"
          className="paper-backdrop paper-backdrop-arch"
        />

        <div
          className={`arch-frame relative ${peelClasses(peel)}`}
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
            className="peel-photo object-cover"
          />
          <PeelCurl corner={peel} />
        </div>

        {badge ? (
          <div className="absolute inset-x-3 -bottom-7 sm:-left-8 sm:right-10">
            {badge}
          </div>
        ) : null}
      </div>

      <figcaption
        className={`max-w-sm text-[0.72rem] leading-relaxed text-ink-soft ${
          badge ? "mt-14" : "mt-5"
        }`}
      >
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * A plain, softly rounded photograph. Same credit rules as ArchMedia.
 */
export function PhotoFrame({
  src,
  alt,
  caption,
  blur,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  ratio = "4 / 3",
  peel = "br",
  sticky = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  blur: BlurKey;
  priority?: boolean;
  sizes?: string;
  ratio?: string;
  peel?: PeelCorner;
  /** Pin the photograph while the column beside it scrolls (desktop). */
  sticky?: boolean;
  className?: string;
}) {
  return (
    <figure className={`${sticky ? stickyClass : ""} ${className}`}>
      <div className="relative">
        <span
          aria-hidden="true"
          className="paper-backdrop paper-backdrop-photo"
        />
        <div
          className={`photo-frame relative ${peelClasses(peel)}`}
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
            className="peel-photo object-cover"
          />
          <PeelCurl corner={peel} />
        </div>
      </div>
      <figcaption className="mt-3 max-w-md text-[0.72rem] leading-relaxed text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
