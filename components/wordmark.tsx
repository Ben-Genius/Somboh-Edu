import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      prefetch
      className="tap group flex shrink-0 flex-col justify-center leading-none"
      aria-label={`${siteConfig.name} — home`}
    >
      <span className="font-display text-[1.45rem] font-semibold leading-none tracking-[-0.03em] text-ink">
        SEF Ghana
      </span>
      <span className="mt-1 text-[0.56rem] font-semibold uppercase leading-none tracking-[0.155em] text-ink-soft max-[380px]:hidden">
        Somboh Educational Foundation
      </span>
    </Link>
  );
}
