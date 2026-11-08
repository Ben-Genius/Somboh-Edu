import Image from "next/image";
import { missionPage } from "@/content/mission";
import { imageBlur } from "@/lib/blur";

const tile = "relative overflow-hidden rounded-[1rem] bg-ink/10";

/**
 * Who we serve, in photographs: the group across the top, then one student
 * large with two more stacked beside. Many students, one cohort.
 */
export function ServeMosaic({ className = "" }: { className?: string }) {
  const { wide, portraits, caption } = missionPage.serveImages;
  const [large, ...small] = portraits;

  return (
    <figure className={className}>
      <div className="grid grid-cols-[3fr_2fr] gap-2">
        <div className={`${tile} col-span-2 aspect-[16/9]`}>
          <Image
            src={wide.src}
            alt={wide.alt}
            fill
            placeholder="blur"
            blurDataURL={imageBlur[wide.blur]}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[50%_22%]"
          />
        </div>

        {large ? (
          <div className={`${tile} row-span-2 aspect-[3/4]`}>
            <Image
              src={large.src}
              alt={large.alt}
              fill
              placeholder="blur"
              blurDataURL={imageBlur[large.blur]}
              sizes="(min-width: 1024px) 24vw, 60vw"
              className="object-cover object-[50%_20%]"
            />
          </div>
        ) : null}

        {small.map((photo) => (
          <div key={photo.src} className={tile}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              placeholder="blur"
              blurDataURL={imageBlur[photo.blur]}
              sizes="(min-width: 1024px) 16vw, 40vw"
              className="object-cover object-[50%_18%]"
            />
          </div>
        ))}
      </div>
      <figcaption className="mt-3 text-[0.75rem] leading-relaxed text-ink-soft">
        {caption}
      </figcaption>
    </figure>
  );
}
