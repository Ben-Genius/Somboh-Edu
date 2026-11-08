import Link from "next/link";
import type { Metadata } from "next";
import { FaqList } from "@/components/faq";
import { HashTabs } from "@/components/hash-tabs";
import { JsonLd } from "@/components/json-ld";
import { ArrowRight } from "@/components/icons";
// import { PageHero } from "@/components/page-hero"; (replaced by FaqHero)
import { FaqHero } from "@/components/heroes/faq-hero";
import { faqCategories, faqs, faqsByCategory } from "@/content/faq";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers about applying to SEF Ghana, who we serve, what support includes, what it costs to apply, and how schools, universities and donors can partner.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ])}
      />
      <JsonLd data={faqJsonLd(faqs)} />

      {/* Previous shared hero, replaced by a page-specific one:
      <PageHero
        sketch="idea"
        eyebrow="Questions"
        title="Straight answers."
        lede="Who can apply, what support includes, what it costs, and what we can and cannot promise. If your question is not here, ask us directly."
      />
      */}
      <FaqHero />

      <section aria-labelledby="faq-heading" className="section bg-blue-wash">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* On phones the aside dissolves into the grid (display: contents) so
          the tabs come straight after the heading and the "Still have a
          question?" card follows the answers. On desktop it stays a sticky
          sidebar. */}
          <aside className="max-lg:contents lg:col-span-4">
            <div className="max-lg:contents lg:sticky lg:top-[calc(var(--nav-height)+2rem)]">
              <div className="max-lg:order-1">
                <h2 id="faq-heading" className="display-3 max-w-[14ch]">
                  Find your question.
                </h2>
                <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-ink-soft">
                  Four short sections, one tab each. Every answer is written
                  from what SEF actually publishes, not from what sounds
                  reassuring.
                </p>
              </div>

              {/* Section chips removed: the FAQ hero's contents table already
              lists these four sections with counts, so this was the same
              list twice.
              <nav
                aria-label="FAQ sections"
                className="mt-7 flex flex-wrap gap-2 lg:flex-col lg:items-start"
              >
                {faqCategories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="chip tap"
                  >
                    {category.label}
                  </a>
                ))}
              </nav>
              */}

              <div className="panel paper-stack squircle bg-surface p-5 max-lg:order-3 sm:p-6 lg:mt-8">
                <p className="font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-ink">
                  Still have a question?
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">
                  Send it to a person. If the answer belongs here, we will add
                  it.
                </p>
                <Link
                  href="/contact"
                  prefetch
                  className="btn btn-forest mt-5 w-full"
                >
                  Ask SEF
                  <span className="btn-arrow" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0 space-y-11 max-lg:order-2 lg:col-span-8">
            {/* Previous long vertical list, one section per category:
            {faqCategories.map((category, index) => (
              <section
                key={category.id}
                id={category.id}
                aria-labelledby={`${category.id}-heading`}
                className="scroll-mt-40"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2
                    id={`${category.id}-heading`}
                    className="display-3 text-ink"
                  >
                    {category.label}
                  </h2>
                  <span className="tnum font-display text-sm text-ink-soft">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
                  {category.description}
                </p>
                <div className="mt-5">
                  <FaqList
                    items={faqsByCategory(category.id)}
                    idPrefix={category.id}
                    openFirst={index === 0}
                  />
                </div>
              </section>
            ))}
            */}
            <HashTabs
              label="FAQ sections"
              panelClassName="pt-6"
              tabs={faqCategories.map((category) => ({
                id: category.id,
                label: (
                  <span className="flex items-center gap-2">
                    {category.label}
                    <span className="tnum grid h-5 min-w-5 place-items-center rounded-full bg-surface px-1.5 text-[0.6875rem] text-ink-soft">
                      {faqsByCategory(category.id).length}
                    </span>
                  </span>
                ),
              }))}
              panels={Object.fromEntries(
                faqCategories.map((category) => [
                  category.id,
                  <div key={category.id}>
                    <p className="max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
                      {category.description}
                    </p>
                    <div className="mt-5">
                      <FaqList
                        items={faqsByCategory(category.id)}
                        idPrefix={category.id}
                        openFirst
                      />
                    </div>
                  </div>,
                ]),
              )}
            />

            <div className="rounded-[1.25rem] border border-gold/40 bg-gold-wash p-6 sm:p-8">
              <p className="eyebrow">Next step</p>
              <h2 className="display-3 mt-4 max-w-[20ch]">Ready to start?</h2>
              <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
                The student interest form is an expression of interest, not an
                offer of a place. Tell us where you are and what you are aiming
                for.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/get-involved#students"
                  prefetch
                  className="btn btn-forest"
                >
                  Apply for support
                  <span className="btn-arrow" aria-hidden="true">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
                <Link href="/programs" prefetch className="link-quiet text-sm">
                  See the five programs
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
