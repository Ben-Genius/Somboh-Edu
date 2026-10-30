"use client";

import Link from "next/link";
import { ui } from "@/content/ui";

export default function SiteError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section">
      <div className="shell max-w-2xl">
        <p className="eyebrow">Error</p>
        <h1 className="display-2 mt-6">{ui.error.title}</h1>
        <p className="lede mt-5">{ui.error.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="btn btn-forest">
            {ui.error.retry}
          </button>
          <Link href="/" prefetch className="btn btn-quiet">
            {ui.notFound.link}
          </Link>
        </div>
      </div>
    </section>
  );
}
