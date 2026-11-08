import Link from "next/link";
import { SketchAccent } from "@/components/blueprint-sketches";
import { FaqList } from "@/components/faq";
import { ArrowRight } from "@/components/icons";
import { faqs } from "@/content/faq";
import { homePage } from "@/content/home";

/**
 * The questions that decide whether a family applies, answered on the home
 * page, with the full FAQ one click away. The answers come from the FAQ
 * content itself, so the two never drift apart.
 */
export function FaqBrief() {
  const brief = homePage.faqBrief;
  const items = brief.ids.flatMap((id) => faqs.filter((faq) => faq.id === id));
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="faq-brief-heading" className="section-tight bg-surface">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <p className="eyebrow">{brief.eyebrow}</p>
            <SketchAccent
              drawing="magnifier"
              motion="pop"
              until="never"
              label={false}
              className="w-11 rotate-6"
            />
          </div>
          <h2 id="faq-brief-heading" className="display-2 mt-6 max-w-[14ch]">
            {brief.heading}
          </h2>
          <p className="mt-5 max-w-[30ch] text-[1rem] leading-relaxed text-ink-soft">
            {brief.intro}
          </p>
          <Link href={brief.href} prefetch className="link-quiet mt-6 text-sm">
            {brief.linkLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="lg:col-span-8">
          <FaqList items={items} idPrefix="home-faq" openFirst />
        </div>
      </div>
    </section>
  );
}
