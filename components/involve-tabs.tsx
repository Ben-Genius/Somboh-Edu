"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import type { TabId } from "@/content/types";

const ORDER: TabId[] = ["students", "partners", "donors"];

/**
 * The hash has to be read before the browser paints, otherwise a deep link such
 * as /get-involved#donors shows the students panel for a frame and then swaps.
 * useLayoutEffect is skipped during server rendering, where there is no hash.
 */
const useBrowserLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Accessible tabs that also respond to the URL hash, so header links such as
 * /get-involved#partners open the right panel. All panels stay mounted so a
 * half-filled form survives a tab switch.
 */
export function InvolveTabs({
  tabs,
  panels,
  label,
}: {
  tabs: readonly { id: TabId; label: string }[];
  panels: Record<TabId, ReactNode>;
  label: string;
}) {
  const [active, setActive] = useState<TabId>("students");
  const [ready, setReady] = useState(false);

  useBrowserLayoutEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      if (ORDER.includes(hash as TabId)) setActive(hash as TabId);
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
  }, []);

  const select = (id: TabId) => {
    setActive(id);
    const url = new URL(window.location.href);
    url.hash = id;
    window.history.replaceState(null, "", url);
  };

  const onKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next: TabId | null = null;

    if (event.key === "ArrowRight") {
      next = ORDER[(index + 1) % ORDER.length]!;
    } else if (event.key === "ArrowLeft") {
      next = ORDER[(index - 1 + ORDER.length) % ORDER.length]!;
    } else if (event.key === "Home") {
      next = ORDER[0]!;
    } else if (event.key === "End") {
      next = ORDER[ORDER.length - 1]!;
    }

    if (!next) return;
    event.preventDefault();
    select(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <div
      className="involve-tabs"
      data-active={ready ? active : undefined}
    >
      <div className="no-scrollbar overflow-x-auto border-b border-line">
        <div
          role="tablist"
          aria-label={label}
          className="flex min-w-max gap-1"
        >
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
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {ORDER.map((id) => {
        return (
          <div
            key={id}
            id={id}
            role="tabpanel"
            aria-labelledby={`tab-${id}`}
            data-panel={id}
            data-default={id === ORDER[0] ? "" : undefined}
            tabIndex={0}
            className="involve-panel scroll-mt-40 pt-10 outline-none"
          >
            {panels[id]}
          </div>
        );
      })}
    </div>
  );
}
