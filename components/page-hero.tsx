import type { ReactNode } from "react";
import { BlueprintSketches, SketchAccent } from "./blueprint-sketches";
import { ViewTransition } from "./view-transition";

/**
 * Page opener: white ground, one oversized headline, a single arc in the
 * margin. Images come later in the page so the headline keeps its weight.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  aside,
  sketch = "compass",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  aside?: ReactNode;
  /** The small sketch shown beside the eyebrow on phones and tablets. */
  sketch?: Parameters<typeof SketchAccent>[0]["drawing"];
}) {
  return (
    <section className="bg-hero-blend relative overflow-hidden border-b border-line">
      <BlueprintSketches set="page" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-56 h-[34rem] w-[34rem] rounded-full border border-gold/25"
      />

      <div className="shell relative pb-14 pt-10 lg:pb-16 lg:pt-14">
        <div className="flex items-start justify-between gap-4">
          <p className="eyebrow">{eyebrow}</p>
          {/* Negative bottom margin: the sketch hangs into the space
              above the headline instead of pushing it down. */}
          <SketchAccent
            drawing={sketch}
            motion="pop"
            className="-mb-12 -mt-3 w-14 shrink-0 rotate-6 sm:w-16"
          />
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
            <ViewTransition name="page-title" share="morph" default="none">
              <h1 className="display-1 max-w-[16ch] text-ink">{title}</h1>
            </ViewTransition>
            <p className="lede mt-7">{lede}</p>
          </div>

          {aside ? (
            <div className="lg:col-span-4 lg:flex lg:justify-end">{aside}</div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
