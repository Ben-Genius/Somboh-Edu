import { sources } from "@/content/sources";
import { ChevronDown } from "./icons";
import { SourcesOpener } from "./sources-opener";

export function sourceNumber(id: string): number {
  const index = sources.findIndex((source) => source.id === id);
  return index === -1 ? 0 : index + 1;
}

export function SourceFootnote({
  sourceId,
  className = "",
}: {
  sourceId: string;
  className?: string;
}) {
  const number = sourceNumber(sourceId);
  const source = sources.find((entry) => entry.id === sourceId);
  if (!source || number === 0) return null;

  return (
    <sup className={className}>
      <a
        href={`#source-${sourceId}`}
        className="footnote-ref"
        aria-label={`Source ${number}: ${source.citation}`}
      >
        {number}
      </a>
    </sup>
  );
}

/** Closed by default; opens on request or when a footnote points into it. */
export function SourcesList({
  ids,
  id = "sources",
  label = "Sources",
  className = "",
}: {
  ids: string[];
  id?: string;
  label?: string;
  className?: string;
}) {
  const unique = Array.from(new Set(ids));
  const used = unique
    .map((sourceId) => sources.find((source) => source.id === sourceId))
    .filter((source): source is (typeof sources)[number] => Boolean(source));

  if (used.length === 0) return null;

  return (
    <details className={`group ${className}`}>
      <SourcesOpener />
      <summary className="tap inline-flex min-h-[44px] cursor-pointer list-none items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft transition-colors hover:text-ink [&::-webkit-details-marker]:hidden">
        {label} ({used.length})
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-open:rotate-180" />
      </summary>
      <ol
        id={id}
        className="mt-2 space-y-2 text-[0.75rem] leading-relaxed text-ink-soft"
      >
        {used.map((source) => (
          <li
            key={source.id}
            id={`source-${source.id}`}
            className="flex scroll-mt-28 gap-2"
          >
            <span className="tnum shrink-0 font-semibold text-ink">
              {sourceNumber(source.id)}.
            </span>
            <span>{source.citation}</span>
          </li>
        ))}
      </ol>
    </details>
  );
}
