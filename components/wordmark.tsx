import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { SombohMark } from "./somboh-logo";

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      prefetch
      className="tap group flex shrink-0 items-center gap-2.5 leading-none"
      aria-label={`${siteConfig.name} — home`}
    >
      <SombohMark className="h-10 w-12 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5" />
      <span className="flex flex-col justify-center">
        {/* Previous text-only wordmark:
        <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.03em] text-ink">
          SEF Ghana
        </span>
        */}
        <span className="font-display text-[1.5rem] font-bold leading-none tracking-[-0.03em] text-[var(--brand-blue)]">
          Somboh
        </span>
        <span className="mt-1 text-[0.5rem] font-semibold uppercase leading-none tracking-[0.16em] text-[color-mix(in_srgb,var(--brand-gold)_70%,var(--ink))] max-[380px]:hidden">
          Educational Foundation
        </span>
      </span>
    </Link>
  );
}
