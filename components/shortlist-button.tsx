"use client";

import { ui } from "@/content/ui";
import { CheckIcon, PlusIcon } from "./icons";
import { useShortlist } from "./shortlist-provider";

export function ShortlistButton({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const { has, toggle, ready } = useShortlist();
  const active = has(slug);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-busy={!ready}
      disabled={!ready}
      onClick={() => toggle(slug, title)}
      className={`tap inline-flex min-h-[44px] items-center gap-2 rounded-full border px-4 text-sm font-semibold transition-colors ${
        active
          ? "border-forest bg-forest text-[var(--on-forest)]"
          : "border-line-strong bg-transparent text-ink hover:border-ink hover:bg-clay"
      } disabled:cursor-wait disabled:opacity-60 ${className}`}
    >
      {active ? (
        <CheckIcon className="h-4 w-4" />
      ) : (
        <PlusIcon className="h-4 w-4" />
      )}
      {active ? ui.forms.shortlistedLabel : ui.forms.shortlistLabel}
    </button>
  );
}
