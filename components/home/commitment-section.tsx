import { CommitmentCycle } from "@/components/commitment-cycle";
import { SectionHeading } from "@/components/section-heading";
import { homePage } from "@/content/home";

/** "Our commitment to Ghana": prepare, admit, return, reach back. */
export function CommitmentSection() {
  return (
    <section
      id="commitment"
      aria-labelledby="commitment-heading"
      className="section bg-surface"
    >
      <div className="shell">
        <SectionHeading
          id="commitment-heading"
          eyebrow={homePage.commitment.eyebrow}
          heading={homePage.commitment.heading}
          intro={homePage.commitment.body}
        />
        <div className="mt-12">
          <CommitmentCycle />
        </div>
        <p className="mt-10 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-soft">
          {homePage.commitment.closing}
        </p>
      </div>
    </section>
  );
}
