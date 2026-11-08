"use client";

import { useEffect, useState } from "react";
import { guideDocuments } from "@/content/guide";

const storageKey = "sef-guide-documents";

/**
 * The documents list, with ticks a student can keep. Ticks live in this
 * browser only (a per-viewer convenience); the list works the same without
 * them, and prints as a paper checklist.
 */
export function DocumentChecklist() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) setDone(JSON.parse(saved));
    } catch {
      // Storage blocked or unreadable: start with nothing ticked.
    }
  }, []);

  function toggle(item: string) {
    setDone((current) => {
      const next = current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item];
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Not saved; the tick still shows for this visit.
      }
      return next;
    });
  }

  const total = guideDocuments.groups.reduce(
    (count, group) => count + group.items.length,
    0,
  );
  const ticked = done.length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
        <p className="tnum text-[0.875rem] font-semibold text-ink" aria-live="polite">
          {ticked} of {total} collected
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="btn btn-quiet print:hidden"
        >
          {guideDocuments.printLabel}
        </button>
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
        {guideDocuments.groups.map((group) => (
          <fieldset key={group.title}>
            <legend className="font-display text-[1.15rem] font-semibold tracking-[-0.015em] text-ink">
              {group.title}
            </legend>
            <ul className="mt-4 space-y-1">
              {group.items.map((item) => {
                const checked = done.includes(item);
                return (
                  <li key={item}>
                    <label className="flex min-h-[44px] cursor-pointer items-start gap-3 rounded-[0.75rem] px-2 py-2.5 transition-colors hover:bg-surface">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(item)}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--forest)]"
                      />
                      <span
                        className={`text-[0.9375rem] leading-snug ${
                          checked ? "text-ink-soft line-through decoration-ink-soft/60" : "text-ink"
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>

      <p className="mt-6 text-[0.8125rem] text-ink-soft print:hidden">
        {guideDocuments.savedNote}
      </p>
    </div>
  );
}
