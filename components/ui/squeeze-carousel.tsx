"use client";

import Image from "next/image";
import {
  type ComponentProps,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   slides                                   */
/* -------------------------------------------------------------------------- */

export type SqueezeSlide = {
  /** Stable key. Falls back to the position in the array. */
  id?: string | number;
  /** Read out for the panel's tab, and the default copy's opening line. */
  title: string;
  /** The grey sentence that runs on from the title in the default copy. */
  description?: string;
  /** Picture for the panel. It crops from the middle as the panel narrows. */
  image?: string;
  /** Alt text for that picture. Leave it out and the picture reads as decoration. */
  imageAlt?: string;
  /** Blur placeholder for `next/image`. */
  blurDataURL?: string;
  /** Any CSS background, used when there is no picture. */
  background?: string;
  /** Sits in the corner of the open panel: a label, a number, a caption. */
  overlay?: ReactNode;
};

/* -------------------------------------------------------------------------- */
/*                                  geometry                                  */
/* -------------------------------------------------------------------------- */

/** A number is read as pixels; a string goes through as written. */
type Size = number | string;

const size = (value: Size) => (typeof value === "number" ? `${value}px` : value);

const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, value));

/**
 * The row is four columns and a tail of slats, and it is a strip that slides
 * rather than a ring that turns.
 *
 * Four columns share out whatever is left once the open card, the slats and
 * the gaps are paid for. The open card starts from a 16:9 block and then gives
 * a little back, hence the negative first share. Column −1 and anything past
 * column 3 is a slat, so a card leaving the front narrows to a slat and
 * carries on out of the left edge.
 */
const SHARES = [-0.06, 0.61, 0.3, 0.15];

/** The hovered column takes more room. */
const STRETCHED = [0, 0.71, 0.4, 0.25];

/** Its neighbours give a little up to pay for it. */
const SQUEEZED = [-0.12, 0.59, 0.28, 0.13];

/** One card in the strip. `key` keeps React on the same node as the strip grows. */
type Card = { key: number; slide: number };

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  return reduced;
}

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

export type SqueezeCarouselProps = {
  slides: SqueezeSlide[];
  /** Which panel starts open. Default `0`. */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /**
   * The copy under the row for one slide. Every slide's copy is rendered in
   * the same cell so the block keeps the height of the tallest; `shown` says
   * which one is visible.
   */
  renderCopy?: (slide: SqueezeSlide, index: number, shown: boolean) => ReactNode;
  /** Height of the row. Default `clamp(180px, 32cqi, 340px)`. */
  height?: Size;
  slatWidth?: Size;
  slatGap?: Size;
  /** Space between the four columns. */
  gap?: Size;
  /** Corner rounding on a panel. */
  radius?: Size;
  /** Milliseconds the slide takes. */
  duration?: number;
  /** Widen the panel under the pointer. */
  hoverGrow?: boolean;
  autoplay?: boolean;
  interval?: number;
  /** Show the two arrow buttons. */
  controls?: boolean;
  /** What a screen reader calls the carousel. */
  label?: string;
  /** `sizes` for the pictures. */
  sizes?: string;
  panelClassName?: string;
} & Omit<ComponentProps<"div">, "onSelect">;

/**
 * A carousel that gives one panel the room and squeezes the rest into slats
 * down the right-hand side. Opening a slat widens it and slides the row along;
 * the copy underneath cross-fades to match.
 */
export function SqueezeCarousel({
  slides,
  defaultIndex = 0,
  onIndexChange,
  renderCopy,
  height = "clamp(180px, 32cqi, 340px)",
  slatWidth = 8,
  slatGap = 8,
  gap = 16,
  radius = 6,
  duration = 1000,
  hoverGrow = true,
  autoplay = false,
  interval = 6000,
  controls = true,
  label = "Featured",
  sizes = "(min-width: 1024px) 60vw, 100vw",
  panelClassName,
  className,
  style,
  ...props
}: SqueezeCarouselProps) {
  const count = slides.length;
  const wrap = (i: number) => ((i % count) + count) % count;

  // Four columns plus a tail of slats. Fewer slides, shorter tail.
  const slats = clamp(count - 4, 1, 3);
  const visible = 4 + slats;

  const reduced = useReducedMotion();
  const ms = reduced ? 0 : duration;

  const ids = useId();
  const seed = useRef(0);

  /* --- the strip ---------------------------------------------------------- */

  const firstWindow = () =>
    Array.from({ length: visible }, (_, p) => ({
      key: seed.current++,
      slide: wrap(defaultIndex + p),
    }));

  const [cards, setCards] = useState<Card[]>(firstWindow);
  // Which column each card sits in: its place in the strip plus this. Stepping
  // on pushes it down, so the card that was column 0 becomes column −1.
  const [column, setColumn] = useState(0);
  const columnRef = useRef(0);
  const forward = useRef(true);
  // How far the strip is slid, counted in slats. It parts company with
  // `column` for the one frame after a trim or before a step back, where the
  // strip has to move without being seen to.
  const [slid, setSlid] = useState(0);
  const [still, setStill] = useState(false);
  const [hover, setHover] = useState(-1);

  const open = cards[-column]?.slide ?? defaultIndex;
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // A step leaves the strip longer than it needs to be. Once the movement has
  // finished, cut it back to the cards on show and reset the numbers: the
  // same picture, so nothing may animate on the way.
  const settle = useCallback(() => {
    setCards((strip) =>
      forward.current ? strip.slice(-visible) : strip.slice(0, visible),
    );
    columnRef.current = 0;
    setColumn(0);
    setSlid(0);
    setStill(true);
  }, [visible]);

  useLayoutEffect(() => {
    if (!still) return;
    const id = requestAnimationFrame(() => setStill(false));
    return () => cancelAnimationFrame(id);
  }, [still]);

  const step = useCallback(
    (by: number) => {
      if (count < 2 || by === 0) return;

      timers.current.forEach(clearTimeout);
      timers.current = [];
      forward.current = by > 0;

      if (by > 0) {
        // The incoming slat joins the tail at full size before anything
        // moves, so the end of the row is never a slat short.
        setCards((strip) => [
          ...strip,
          ...Array.from({ length: by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(strip[strip.length - 1]!.slide + 1 + k),
          })),
        ]);
        columnRef.current -= by;
        setColumn(columnRef.current);
        setSlid((s) => s - by);
      } else {
        // Going back, the strip grows at the front, which shoves everything
        // right. Slide it left by the same amount with no transition, then
        // let it ease home.
        setCards((strip) => [
          ...Array.from({ length: -by }, (_, k) => ({
            key: seed.current++,
            slide: wrap(strip[0]!.slide - (-by - k)),
          })),
          ...strip,
        ]);
        setSlid((s) => s + by);
        setStill(true);
        timers.current.push(window.setTimeout(() => setSlid(0), 0));
      }

      timers.current.push(window.setTimeout(settle, ms + 20));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, ms, settle],
  );

  useEffect(() => {
    onIndexChange?.(open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* --- autoplay ----------------------------------------------------------- */

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!autoplay || paused || reduced || count < 2) return;
    const timer = window.setTimeout(() => step(1), interval);
    return () => clearTimeout(timer);
  }, [autoplay, paused, reduced, count, open, interval, step]);

  /* --- keyboard ----------------------------------------------------------- */

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number | undefined> = {
      ArrowRight: 1,
      ArrowLeft: -1,
    };
    const by = moves[event.key];
    if (by === undefined) return;
    event.preventDefault();
    step(by);
  };

  if (!count) return null;

  /* --- render ------------------------------------------------------------- */

  const slat = size(slatWidth);
  const resting = !(hoverGrow && hover >= 0 && hover <= 3 && !reduced);

  /** The share a column takes, once the pointer has had its say. */
  const shareOf = (col: number) => {
    if (resting) return SHARES[col]!;
    return hover === col ? STRETCHED[col]! : SQUEEZED[col]!;
  };

  /** A column's width, worked out in CSS so nothing needs measuring. */
  const widthOf = (col: number) => {
    if (col < 0 || col > 3) return slat;
    if (col === 0)
      return `calc(var(--sq-hero) + var(--sq-room) * ${shareOf(0)})`;
    return `calc(var(--sq-room) * ${shareOf(col)})`;
  };

  const vars = {
    "--sq-h": size(height),
    "--sq-gap": size(gap),
    "--sq-slat-gap": size(slatGap),
    "--sq-radius": size(radius),
    "--sq-ms": `${ms}ms`,
    "--sq-ease": "cubic-bezier(0.16, 1, 0.3, 1)",
    // A 16:9 block sets both the open card and the size every picture is
    // drawn at, so a picture keeps one scale however narrow its card gets.
    "--sq-hero": "calc(var(--sq-h) * 16 / 9)",
    "--sq-room": `calc(100cqi - var(--sq-hero) - ${slats} * var(--sq-slat-gap) - 3 * var(--sq-gap) - ${slats} * ${slat})`,
  } as CSSProperties;

  const move = `translateX(calc(${slid} * (${slat} + var(--sq-gap))))`;

  return (
    <div
      className={cn("flex w-full flex-col", className)}
      // Widths below read the width this carousel is given, not the window.
      style={{ containerType: "inline-size", ...vars, ...style }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setHover(-1);
      }}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      {...props}
    >
      {controls && count > 1 ? (
        <div className="mb-4 flex justify-end gap-2">
          <Arrow back label="Previous" onClick={() => step(-1)} />
          <Arrow label="Next" onClick={() => step(1)} />
        </div>
      ) : null}

      <div className="w-full overflow-hidden" style={{ height: "var(--sq-h)" }}>
        <div
          role="tablist"
          aria-label={label}
          aria-orientation="horizontal"
          // The open tab holds focus; arrow keys bubble up to here.
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="flex h-full w-max"
          style={{
            transform: move,
            transition: still ? "none" : "transform var(--sq-ms) var(--sq-ease)",
          }}
        >
          {cards.map((card, place) => {
            const col = place + column;
            const slide = slides[card.slide]!;
            const front = col === 0;

            return (
              <button
                key={card.key}
                type="button"
                role="tab"
                id={`${ids}-tab-${card.key}`}
                aria-selected={front}
                aria-controls={`${ids}-panel`}
                aria-label={slide.title}
                tabIndex={front ? 0 : -1}
                onMouseMove={() => hoverGrow && setHover(col)}
                onClick={() => col > 0 && step(col)}
                className={cn(
                  "relative isolate h-full shrink-0 cursor-pointer overflow-hidden bg-clay p-0",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
                  panelClassName,
                )}
                style={{
                  width: widthOf(col),
                  marginLeft:
                    place === 0
                      ? 0
                      : col < 4
                        ? "var(--sq-gap)"
                        : "var(--sq-slat-gap)",
                  borderRadius: `min(var(--sq-radius), calc(${widthOf(col)} / 2))`,
                  transitionProperty: "width, margin-left",
                  transitionDuration: still ? "0s" : "var(--sq-ms)",
                  transitionTimingFunction: "var(--sq-ease)",
                }}
              >
                <Picture slide={slide} sizes={sizes} />

                {slide.overlay ? (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end p-4 pt-16 @lg:p-6 @lg:pt-20"
                    style={{
                      opacity: front ? 1 : 0,
                      transition: "opacity var(--sq-ms) var(--sq-ease)",
                      backgroundImage:
                        "linear-gradient(to top, rgb(0 0 0 / 0.55), transparent)",
                    }}
                  >
                    {slide.overlay}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`${ids}-panel`}
        role="tabpanel"
        aria-live="polite"
        className="mt-6 grid @xl:mt-8"
      >
        {slides.map((slide, i) => {
          const shown = i === open;

          return (
            <div
              key={slide.id ?? i}
              aria-hidden={!shown}
              inert={!shown}
              className="col-start-1 row-start-1"
              style={{
                opacity: shown ? 1 : 0,
                visibility: shown ? "visible" : "hidden",
                transition:
                  "opacity var(--sq-ms) var(--sq-ease), visibility var(--sq-ms)",
              }}
            >
              {renderCopy ? (
                renderCopy(slide, i, shown)
              ) : (
                <p className="max-w-[46rem] text-balance text-[15px] leading-[1.6] @lg:text-[17px]">
                  <span className="text-ink">{slide.title}</span>{" "}
                  {slide.description ? (
                    <span className="text-ink-soft">{slide.description}</span>
                  ) : null}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   pieces                                   */
/* -------------------------------------------------------------------------- */

/**
 * Drawn at a fixed 16:9 block and centred, never at the width of its card,
 * so the card only ever changes how much of the picture you can see and the
 * picture is never rescaled mid-slide.
 */
function Picture({ slide, sizes }: { slide: SqueezeSlide; sizes: string }) {
  const box = { width: "var(--sq-hero)", minWidth: "100%" } as const;

  if (slide.image) {
    return (
      <Image
        src={slide.image}
        alt={slide.imageAlt ?? ""}
        width={1600}
        height={900}
        sizes={sizes}
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : "empty"}
        blurDataURL={slide.blurDataURL}
        className="absolute inset-y-0 left-1/2 h-full max-w-none -translate-x-1/2 object-cover"
        style={box}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-1/2 -translate-x-1/2"
      style={{ background: slide.background, ...box }}
    />
  );
}

function Arrow({
  back = false,
  label,
  onClick,
}: {
  back?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="tap grid size-10 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-ink hover:bg-forest-deep hover:text-[var(--on-forest)]"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d={
            back
              ? "M9.6 2.6 5.1 7.1h9.1v1.8H5.1l4.5 4.5-1.2 1.2-6-6L1.8 8l.6-.6 6-6 1.2 1.2Z"
              : "M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z"
          }
        />
      </svg>
    </button>
  );
}
