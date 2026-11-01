import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { ArrowRight, MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
// import { PaperTear } from "@/components/paper-tear"; (its section is hidden below)
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig, isPlaceholder } from "@/lib/site-config";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: contactPage.meta.title,
  description: contactPage.meta.description,
  path: contactPage.meta.path,
});

export default function ContactPage() {
  const channels = contactPage.channels;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        eyebrow={contactPage.hero.eyebrow}
        title={contactPage.hero.title}
        lede={contactPage.hero.lede}
      />

      <section
        aria-labelledby="contact-details-heading"
        className="section bg-surface"
      >
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="card p-6 sm:p-7">
              <h2 id="contact-details-heading" className="eyebrow">
                {channels.heading}
              </h2>

              <dl className="mt-7 space-y-6">
                <Channel
                  icon={<MailIcon className="h-5 w-5" />}
                  label={channels.emailLabel}
                  value={siteConfig.contact.email}
                />
                <Channel
                  icon={<PhoneIcon className="h-5 w-5" />}
                  label={channels.phoneLabel}
                  value={siteConfig.contact.phone}
                />
                <Channel
                  icon={<MapPinIcon className="h-5 w-5" />}
                  label={channels.addressLabel}
                  value={[
                    siteConfig.contact.addressLine,
                    siteConfig.contact.city,
                    siteConfig.contact.region,
                    siteConfig.contact.country,
                  ].join(", ")}
                />
                <Channel
                  label={channels.registrationLabel}
                  value={siteConfig.registrationNumber}
                />
                <Channel
                  label={channels.socialLabel}
                  value={[
                    siteConfig.social.instagram,
                    siteConfig.social.linkedin,
                  ].join(" · ")}
                />
              </dl>

              <p className="mt-7 rounded-[1.1rem] border border-gold/35 bg-gold/[0.07] px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                {channels.placeholderNote}
              </p>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-sm font-semibold text-ink">
                Applying for support?
              </p>
              <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft">
                The student interest form has the questions we actually need.
              </p>
              <Link
                href="/get-involved#students"
                prefetch
                className="link-quiet mt-3 text-sm"
              >
                Go to the student form
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="panel paper-stack p-5 sm:p-8">
              <h2 className="display-3">{contactPage.form.heading}</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
                {contactPage.form.intro}
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
              <p className="mt-5 text-[0.8125rem] leading-relaxed text-ink-soft">
                {contactPage.response.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* "After you send": folded into one line under the form.
      <PaperTear from="var(--surface)" to="var(--paper)" />

      <section
        aria-labelledby="contact-response-heading"
        className="section-tight relative overflow-hidden bg-paper"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-48 h-[24rem] w-[24rem] rounded-full border border-gold/25"
        />
        <div className="shell relative grid gap-6 md:grid-cols-12">
          <div className="md:col-span-3">
            <p className="eyebrow">After you send</p>
          </div>
          <div className="md:col-span-7 md:col-start-5">
            <h2
              id="contact-response-heading"
              className="display-3 max-w-[22ch]"
            >
              {contactPage.response.heading}
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">
              {contactPage.response.body}
            </p>
          </div>
        </div>
      </section>
      */}
    </>
  );
}

function Channel({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
  label: string;
  value: string;
}) {
  const placeholder = value.includes("[") || isPlaceholder(value.trim());

  return (
    <div className="flex gap-3">
      {icon ? (
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink-soft">
          {icon}
        </span>
      ) : (
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
      )}
      <div className="min-w-0">
        <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
          {label}
        </dt>
        <dd
          className={`mt-1 break-words text-[0.9375rem] leading-relaxed ${
            placeholder ? "text-ink-soft" : "text-ink"
          }`}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
