import type { FaqItem } from "@/content/faq";
import { PlusIcon } from "./icons";

/**
 * Native `<details>` disclosure: it opens without JavaScript, keeps the
 * answer in the HTML for search engines, and is keyboard accessible by
 * default. The plus mark rotates into a close mark.
 */
export function FaqList({
  items,
  idPrefix,
  openFirst = false,
}: {
  items: FaqItem[];
  idPrefix: string;
  openFirst?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-line bg-surface">
      {items.map((item, index) => (
        <details
          key={item.id}
          id={`${idPrefix}-${item.id}`}
          open={openFirst && index === 0}
          className="group border-b border-line last:border-b-0"
        >
          <summary className="tap flex cursor-pointer list-none items-start justify-between gap-5 px-5 py-5 transition-colors hover:bg-clay/40 sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="max-w-[52ch] font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[1.15rem]">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-ink-soft transition-transform duration-300 group-open:rotate-45"
            >
              <PlusIcon className="h-4 w-4" />
            </span>
          </summary>
          <div className="px-5 pb-6 sm:px-6">
            <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
