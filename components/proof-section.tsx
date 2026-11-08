import Image from "next/image";
import { SectionHeading } from "@/components/section-heading";
import { impactSection, publishedImpact } from "@/content/impact";
import { publishedVoices, voicesSection } from "@/content/voices";

/**
 * Proof of SEF's own work: dated results, then named voices. Each half
 * renders only when it has verified content, and the section renders nothing
 * at all until one of them does, so no empty shell or invented figure ever
 * ships. Fill content/impact.ts and content/voices.ts to turn it on.
 */
export function ProofSection() {
  if (publishedImpact.length === 0 && publishedVoices.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="proof-heading"
      className="section border-y border-line bg-surface"
    >
      <div className="shell">
        {publishedImpact.length > 0 ? (
          <>
            <SectionHeading
              id="proof-heading"
              eyebrow={impactSection.eyebrow}
              heading={impactSection.heading}
            />
            <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {publishedImpact.map((figure) => (
                <li key={figure.label} className="border-t border-line-strong pt-5">
                  <span className="stat-value text-[clamp(2.2rem,3.6vw,3rem)] text-ink">
                    {figure.value}
                  </span>
                  <p className="mt-3 text-[1rem] font-semibold leading-snug text-ink">
                    {figure.label}
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-soft">
                    As of {figure.asOf}. {figure.basis}.
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        {publishedVoices.length > 0 ? (
          <div className={publishedImpact.length > 0 ? "mt-20" : undefined}>
            {publishedImpact.length > 0 ? (
              <p className="eyebrow">{voicesSection.eyebrow}</p>
            ) : (
              <SectionHeading
                id="proof-heading"
                eyebrow={voicesSection.eyebrow}
                heading={voicesSection.heading}
              />
            )}
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {publishedVoices.map((voice) => (
                <li key={voice.name}>
                  <figure className="flex h-full flex-col justify-between rounded-[1.5rem] border border-line bg-clay p-6 sm:p-7">
                    <blockquote className="font-display text-[1.15rem] leading-snug tracking-[-0.015em] text-ink">
                      <p>“{voice.quote}”</p>
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3">
                      {voice.image ? (
                        <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={voice.image.src}
                            alt={voice.image.alt}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </span>
                      ) : null}
                      <span>
                        <span className="block text-[0.9375rem] font-semibold text-ink">
                          {voice.name}
                        </span>
                        <span className="block text-[0.8125rem] text-ink-soft">
                          {voice.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
