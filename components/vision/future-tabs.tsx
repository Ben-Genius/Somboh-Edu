"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type SVGProps,
} from "react";
import { SombohMark } from "@/components/somboh-logo";
import { ReadMore } from "@/components/ui/read-more";
import { imageBlur } from "@/lib/blur";

export type FutureSection = {
  id: string;
  eyebrow: string;
  heading: string;
  summary: string;
  caption: string;
  points: readonly string[];
  paragraphs: readonly string[];
  image: {
    src: string;
    alt: string;
    blur: keyof typeof imageBlur;
    /** CSS object-position, to keep the subject in the portrait crop. */
    position?: string;
    credit: string;
  };
};

/* Line icons, one per part of the vision, drawn to match the icon set. */
function Glyph({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

const glyphs: Record<string, ReactNode> = {
  // People linked in a ring.
  community: (
    <>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M10.6 6.6 6.2 15.2M13.4 6.6l4.4 8.6M7 17.5h10" />
      <circle cx="12" cy="13" r="1.2" />
    </>
  ),
  // A lighthouse beam.
  beacon: (
    <>
      <path d="M10 21l1-11h2l1 11M9 21h6M10.5 10l.5-3h2l.5 3" />
      <path d="M12 4V3M7 6.5 4 5M17 6.5 20 5M7 9H4M17 9h3" />
    </>
  ),
  // Ripples from one point.
  catalyst: (
    <>
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="5" />
      <path d="M19.5 9a8 8 0 0 1 0 6M4.5 15a8 8 0 0 1 0-6M15 4.5a8 8 0 0 1 4.5 4.5M9 19.5A8 8 0 0 1 4.5 15" />
    </>
  ),
  // A globe.
  leaders: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.5 5.2 3.5 8.5s-1.1 6.1-3.5 8.5c-2.4-2.4-3.5-5.2-3.5-8.5S9.6 5.9 12 3.5Z" />
    </>
  ),
  // An open hand holding a heart.
  contribute: (
    <>
      <path d="M12 10.5s-3.5-2-3.5-4.3A1.9 1.9 0 0 1 12 5.3a1.9 1.9 0 0 1 3.5.9c0 2.3-3.5 4.3-3.5 4.3Z" />
      <path d="M3 14h3l3.5 1.5h3a1.5 1.5 0 0 1 0 3H9M12.5 18.5l5-2.3a1.6 1.6 0 0 1 1.8 2.6L14 21.5H7L3 20" />
    </>
  ),
};

/* Blue, orange, violet, as in the reference. */
const dots = ["#1f6fe5", "#f08a1c", "#8b3fd9"];

/** How long each tab shows before moving on by itself. */
const DWELL_MS = 7000;
/** Text up to this length is shown in full; longer text gets Read more. */
const SHORT_TEXT = 920;

/**
 * "What that future asks of us": a vertical list of the five parts of the
 * vision, a photograph card, and a detail panel with three key points.
 * Short text is shown in full; long text shows a summary with Read more.
 * Tabs move on by themselves (a line fills across the active tab), pausing
 * while the pointer or focus is inside, while the section is off-screen, and
 * for good once someone opens Read more. Reduced-motion users get no autoplay.
 * Every panel stays in the HTML so search engines read all of it; links such
 * as /vision#leaders open that tab.
 */
export function FutureTabs({ sections }: { sections: readonly FutureSection[] }) {
  const [active, setActive] = useState(sections[0]!.id);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [autoplay, setAutoplay] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const idsKey = sections.map((section) => section.id).join("|");

  useEffect(() => {
    const ids = idsKey.split("|");
    const sync = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (ids.includes(hash)) setActive(hash);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [idsKey]);

  // Autoplay only for people who have not asked for reduced motion.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAutoplay(!query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Count down only while the section is on screen.
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // On phones the tabs are a scrolling row: keep the active one in view,
  // scrolling the row only, never the page.
  useEffect(() => {
    const tab = document.getElementById(`future-tab-${active}`);
    const row = tab?.parentElement;
    if (!tab || !row || row.scrollWidth <= row.clientWidth) return;
    const offset = tab.getBoundingClientRect().left - row.getBoundingClientRect().left;
    row.scrollTo({ left: row.scrollLeft + offset - 16, behavior: "smooth" });
  }, [active]);

  const running = autoplay && !stopped;
  const paused = hovered || focused || !inView;

  const advance = () => {
    const index = sections.findIndex((section) => section.id === active);
    setActive(sections[(index + 1) % sections.length]!.id);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = sections.length - 1;
    let next: number | undefined;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === undefined) return;
    event.preventDefault();
    const id = sections[next]!.id;
    setActive(id);
    document.getElementById(`future-tab-${id}`)?.focus();
  };

  return (
    <div
      ref={root}
      className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12"
      onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(event) => {
        // Only keyboard focus pauses; a mouse click on a tab should not.
        if (event.target.matches(":focus-visible")) setFocused(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      {/* Tab list: a column on large screens, a scrolling row on phones. */}
      <div className="min-w-0 lg:col-span-3">
        <div
          role="tablist"
          aria-label="Parts of our vision"
          aria-orientation="vertical"
          className="no-scrollbar -mx-4 flex gap-1 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
        >
          {sections.map((section, index) => {
            const selected = section.id === active;
            return (
              <button
                key={section.id}
                id={`future-tab-${section.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`future-panel-${section.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(section.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`tap group relative flex min-h-[52px] shrink-0 items-center gap-3 border-line px-3 text-left text-[0.9375rem] transition-colors duration-300 lg:min-h-[56px] lg:border-b lg:px-0 ${selected ? "text-ink" : "text-ink-soft/55 hover:text-ink-soft"
                  }`}
              >
                {/* Active rule: across the top on large screens, under the
                    label on phones. While autoplay runs it fills up as a timer. */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-[2px] overflow-hidden transition-opacity duration-300 lg:bottom-auto lg:top-0 ${selected ? "opacity-100" : "opacity-0"
                    } ${running ? "bg-forest/15" : "bg-forest"}`}
                >
                  {selected && running ? (
                    <span
                      key={active}
                      className="future-progress absolute inset-0 origin-left bg-forest"
                      style={{
                        animationDuration: `${DWELL_MS}ms`,
                        animationPlayState: paused ? "paused" : "running",
                      }}
                      onAnimationEnd={advance}
                    />
                  ) : null}
                </span>
                <Glyph
                  className={`h-6 w-6 shrink-0 transition-colors ${selected ? "text-forest" : "text-current"
                    }`}
                >
                  {glyphs[section.id]}
                </Glyph>
                <span className={`whitespace-nowrap lg:whitespace-normal ${selected ? "font-medium" : ""}`}>
                  {section.eyebrow}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {sections.map((section) => {
        const selected = section.id === active;
        return (
          <div
            key={section.id}
            id={`future-panel-${section.id}`}
            role="tabpanel"
            aria-labelledby={`future-tab-${section.id}`}
            hidden={!selected}
            className="future-swap grid min-w-0 grid-cols-[minmax(0,1fr)] gap-6 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-9"
          >
            {/* Photograph card. */}
            <figure className="flex flex-col lg:col-span-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] sm:aspect-auto sm:min-h-[24rem] sm:flex-1 bg-clay shadow-[var(--shadow-float)]">
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  fill
                  placeholder="blur"
                  blurDataURL={imageBlur[section.image.blur]}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="future-photo object-cover"
                  style={{ objectPosition: section.image.position }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#061838]/85 via-[#061838]/35 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span
                    className="block h-8 w-8"
                    style={{ "--brand-blue": "#ffffff" } as CSSProperties}
                  >
                    <SombohMark className="h-full w-full" />
                  </span>
                  <p className="mt-3 max-w-[30ch] text-[0.875rem] leading-snug text-white">
                    {section.caption}
                  </p>
                </div>
              </div>
              <figcaption className="mt-2 text-[0.7rem] leading-relaxed text-ink-soft">
                {section.image.credit}
              </figcaption>
            </figure>

            {/* Detail panel. */}
            <article
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
              className="flex scroll-mt-40 flex-col rounded-[1.25rem] bg-blue-wash p-6 shadow-[var(--shadow-card)] sm:p-7 lg:col-span-5"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-forest/20 bg-surface text-forest">
                  <Glyph className="h-6 w-6">{glyphs[section.id]}</Glyph>
                </span>
                <h3
                  id={`${section.id}-heading`}
                  className="font-display text-[1.55rem] leading-tight tracking-[-0.03em] text-ink"
                >
                  {section.heading}
                </h3>
              </div>
              {section.paragraphs.join(" ").length <= SHORT_TEXT ? (
                // Short enough to read in place: no summary, no Read more.
                <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
                    {section.summary}
                  </p>
                  {/* Opening the detail stops autoplay so the text stays put. */}
                  <div onClickCapture={() => setStopped(true)}>
                    <ReadMore buttonClassName="mt-2">
                      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </ReadMore>
                  </div>
                </>
              )}

              <ul className="mt-auto pt-5">
                {section.points.map((point, index) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 border-b border-line py-3 text-[0.9375rem] leading-snug text-ink last:border-b-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: dots[index % dots.length] }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        );
      })}
    </div>
  );
}
