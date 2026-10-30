import Image from "next/image";
import { imageBlur } from "@/lib/blur";
import {
  PeelCurl,
  peelClasses,
  type PeelCorner,
} from "@/components/peel-corner";

type BlurKey = keyof typeof imageBlur;

/**
 * Photography is temporary. Captions name the photographer and licence, and
 * say plainly that the image is not SEF programme photography.
 */
export function CampusImage({
  src,
  alt,
  caption,
  blur,
  priority = false,
  ratio = "4 / 3",
  sizes = "(min-width: 1024px) 45vw, 100vw",
  peel = "br",
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  blur: BlurKey;
  priority?: boolean;
  ratio?: string;
  sizes?: string;
  peel?: PeelCorner;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className={`relative overflow-hidden rounded-[1.25rem] border border-line bg-clay squircle ${peelClasses(peel)}`}
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
      <figcaption className="mt-3 max-w-md text-[0.75rem] leading-relaxed text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
