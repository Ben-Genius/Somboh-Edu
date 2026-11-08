import Image from "next/image";
import { Fragment } from "react";
import { SketchAccent } from "@/components/blueprint-sketches";
import { missionPage } from "@/content/mission";
import { imageBlur } from "@/lib/blur";
import { HeroTitle } from "./hero-title";

/** Photographs set into the headline, after the word at each index. */
const inlinePhotos: Record<number, { src: string; blur: keyof typeof imageBlur; position: string }> = {
  0: { src: "/images/sef/student-apply.jpg", blur: "sefStudentApply", position: "50% 28%" },
  2: { src: "/images/sef/classroom.jpg", blur: "sefClassroom", position: "50% 50%" },
};

/** Small snapshots scattered in the margins: many students, many stories. */
const snapshots = [
  {
    src: "/images/sef/cohort-gap.jpg",
    blur: "sefCohortGap" as const,
    className: "left-[3%] top-[18%] w-28 -rotate-6 xl:w-32",
  },
  {
    src: "/images/sef/group-serve.jpg",
    blur: "sefGroupServe" as const,
    className: "right-[4%] top-[12%] w-32 rotate-[5deg] xl:w-36",
  },
  {
    src: "/images/sef/student-next.jpg",
    blur: "sefStudentNext" as const,
    className: "bottom-[14%] right-[9%] w-24 -rotate-3 xl:w-28",
  },
];

/**
 * Mission opener, after "Where Opportunity Takes Root": the headline is set
 * centred with student photographs woven between its words, and a few small
 * snapshots pinned around it.
 */
export function MissionHero() {
  const { hero } = missionPage;
  const words = hero.title.split(" ");

  return (
    <section className="relative overflow-hidden border-b border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(70%_100%_at_50%_100%,var(--gold-wash),transparent_70%)]"
      />

      {snapshots.map((shot) => (
        <figure
          key={shot.src}
          aria-hidden="true"
          className={`absolute hidden bg-paper p-1.5 pb-5 shadow-[var(--shadow-float)] lg:block ${shot.className}`}
        >
          <span className="absolute -top-2 left-1/2 h-4 w-10 -translate-x-1/2 rotate-2 bg-[var(--tape)]" />
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={shot.src}
              alt=""
              fill
              placeholder="blur"
              blurDataURL={imageBlur[shot.blur]}
              sizes="9rem"
              className="object-cover"
            />
          </div>
        </figure>
      ))}

      <div className="shell relative flex flex-col items-center pb-16 pt-12 text-center lg:pb-24 lg:pt-20">
        <div className="flex items-center gap-3">
          <p className="eyebrow">{hero.eyebrow}</p>
          <SketchAccent drawing="idea" motion="pop" className="w-10 rotate-6" />
        </div>

        <HeroTitle className="display-1 mt-8 max-w-[13ch] text-ink lg:text-[clamp(4rem,7.4vw,7.2rem)]">
          {words.map((word, index) => {
            const photo = inlinePhotos[index];
            return (
              <Fragment key={`${word}-${index}`}>
                {word}{" "}
                {photo ? (
                  <span
                    aria-hidden="true"
                    className="relative mx-[0.06em] inline-block h-[0.74em] w-[1.45em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline shadow-[0_0_0_3px_var(--surface),0_0_0_4px_var(--line)]"
                  >
                    <Image
                      src={photo.src}
                      alt=""
                      fill
                      priority
                      placeholder="blur"
                      blurDataURL={imageBlur[photo.blur]}
                      sizes="12rem"
                      className="object-cover"
                      style={{ objectPosition: photo.position }}
                    />
                  </span>
                ) : null}
                {photo ? " " : null}
              </Fragment>
            );
          })}
        </HeroTitle>

        <p className="lede mx-auto mt-9 max-w-[34rem]">{hero.lede}</p>
      </div>
    </section>
  );
}
