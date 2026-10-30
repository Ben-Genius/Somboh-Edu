import { sources } from "@/content/sources";

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

export function SourcesList({
  ids,
  id = "sources",
  className = "",
}: {
  ids: string[];
  id?: string;
  className?: string;
}) {
  const unique = Array.from(new Set(ids));
  const used = unique
    .map((sourceId) => sources.find((source) => source.id === sourceId))
    .filter((source): source is (typeof sources)[number] => Boolean(source));

  if (used.length === 0) return null;

  return (
    <ol id={id} className={`space-y-2 text-[0.75rem] leading-relaxed text-ink-soft ${className}`}>
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
  );
}
