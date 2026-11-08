"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

/**
 * The hash has to be read before the browser paints, otherwise a deep link
 * such as /faq#cost shows the first panel for a frame and then swaps.
 * useLayoutEffect is skipped during server rendering, where there is no hash.
 */
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

export type HashTab = { id: string; label: ReactNode };

/**
 * Accessible tabs driven by the URL hash, so links such as /faq#cost or
 * /get-involved#partners open the right panel. A hash that points inside a
 * panel (an element whose id starts with "<tab id>-") opens that panel too.
 * All panels stay mounted and in the HTML: forms keep their input, and search
 * engines still read every panel. Before hydration, CSS uses :target.
 */
export function HashTabs({
  tabs,
  panels,
  label,
  panelClassName = "pt-10",
  tabClassName = "",
}: {
  tabs: readonly HashTab[];
  panels: Record<string, ReactNode>;
  label: string;
  panelClassName?: string;
  tabClassName?: string;
}) {
  const ids = tabs.map((tab) => tab.id);
  const [active, setActive] = useState(ids[0]!);
  const [ready, setReady] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const idsKey = ids.join("|");

  useBrowserLayoutEffect(() => {
    const order = idsKey.split("|");
    const sync = (event?: Event) => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (!hash) return;
      const match = order.find((id) => hash === id || hash.startsWith(`${id}-`));
      if (!match) return;
      setActive(match);
      // The target was hidden when the browser tried to scroll to it, so
      // scroll once it is visible. Open a linked question as well.
      if (event) {
        requestAnimationFrame(() => {
          const target = document.getElementById(hash);
          if (target instanceof HTMLDetailsElement) target.open = true;
          (target ?? root.current)?.scrollIntoView({ block: "start" });
        });
      } else {
        const target = document.getElementById(hash);
        if (target instanceof HTMLDetailsElement) target.open = true;
      }
    };

    sync();
    // `ready` hands panel visibility over to React. Until then CSS uses the
    // URL fragment, so a deep link is already correct at first paint.
    setReady(true);
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, [idsKey]);

  const select = (id: string) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(null, "", url);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: string | undefined;
    if (event.key === "ArrowRight") next = ids[(index + 1) % ids.length];
    else if (event.key === "ArrowLeft") next = ids[(index - 1 + ids.length) % ids.length];
    else if (event.key === "Home") next = ids[0];
    else if (event.key === "End") next = ids[ids.length - 1];
    if (!next) return;
    event.preventDefault();
    select(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <div ref={root} className="hash-tabs scroll-mt-40" data-ready={ready ? "" : undefined}>
      <div className="no-scrollbar overflow-x-auto border-b border-line">
        <div role="tablist" aria-label={label} className="flex min-w-max gap-1">
          {tabs.map((tab, index) => {
            const selected = active === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={tab.id}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(tab.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`tap min-h-[52px] border-b-2 px-4 text-[0.9375rem] font-semibold transition-colors ${
                  selected
                    ? "border-gold text-ink"
                    : "border-transparent text-ink-soft hover:text-ink"
                } ${tabClassName}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {ids.map((id, index) => (
        <div
          key={id}
          id={id}
          role="tabpanel"
          aria-labelledby={`tab-${id}`}
          data-default={index === 0 ? "" : undefined}
          data-selected={active === id ? "" : undefined}
          tabIndex={0}
          className={`hash-panel scroll-mt-40 outline-none ${panelClassName}`}
        >
          {panels[id]}
        </div>
      ))}
    </div>
  );
}
