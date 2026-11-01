import Link from "next/link";
import { homePage } from "@/content/home";
import { ArrowRight } from "./icons";

export function CtaPaths() {
  const cta = homePage.cta;

  return (
    <section className="section on-forest relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[32rem] w-[32rem] rounded-full border border-white/12"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-24 h-[20rem] w-[20rem] rounded-full border border-white/12"
      />

      <div className="shell relative">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow">{cta.eyebrow}</p>
            <h2 className="display-2 mt-6 max-w-[18ch] text-[var(--on-forest)]">
              {cta.heading}
            </h2>
          </div>
          <p className="lede lg:col-span-5">{cta.intro}</p>
        </div>

        <ol className="mt-12 border-t border-white/15">
          {cta.paths.map((path, index) => (
            <li key={path.href} className="border-b border-white/15">
              <Link
                href={path.href}
                prefetch
                className="group grid gap-4 py-8 transition-colors hover:bg-white/5 md:grid-cols-12 md:items-start md:gap-6 md:px-4"
              >
                <span className="tnum font-display text-sm text-[var(--on-forest)] opacity-60 md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="md:col-span-4">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[var(--on-forest)] opacity-65">
                    {path.label}
                  </span>
                  <span className="mt-3 block font-display text-[1.75rem] leading-tight tracking-[-0.03em] text-[var(--on-forest)] sm:text-[2.1rem]">
                    {path.title}
                  </span>
                </span>
                <span className="max-w-lg text-[0.9375rem] leading-relaxed text-[var(--on-forest)] opacity-80 md:col-span-5">
                  {path.body}
                </span>
                <span className="flex items-center gap-2 text-sm font-semibold text-[var(--on-forest)] md:col-span-2 md:justify-end">
                  {path.linkLabel}
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-white/30 transition-all duration-300 group-hover:border-[var(--on-forest)] group-hover:bg-[var(--on-forest)] group-hover:text-[var(--forest)]">
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
