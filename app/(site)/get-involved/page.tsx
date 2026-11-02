import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArchMedia } from "@/components/arch-media";
import { DonorForm } from "@/components/forms/donor-form";
import { PartnerForm } from "@/components/forms/partner-form";
import { StudentForm } from "@/components/forms/student-form";
import { InvolveTabs } from "@/components/involve-tabs";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { PaperTear } from "@/components/paper-tear";
import { contactPage } from "@/content/contact";
import { involvePage } from "@/content/involve";
import { siteConfig } from "@/lib/site-config";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const revalidate = 3600;

export const metadata: Metadata = pageMetadata({
  title: involvePage.meta.title,
  description: involvePage.meta.description,
  path: involvePage.meta.path,
});

const tabs = involvePage.tabs;

export default function GetInvolvedPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Get involved", path: "/get-involved" },
        ])}
      />

      <PageHero
        sketch="key"
        eyebrow={involvePage.hero.eyebrow}
        title={involvePage.hero.title}
        lede={involvePage.hero.lede}
      />

      <section
        aria-label="Ways to get involved"
        className="section-tight bg-blend"
      >
        <div className="shell">
          {/* "Three ways in" heading: hidden, the page hero already says it.
          <div className="grid gap-6 md:grid-cols-12">
            <div className="md:col-span-3">
              <p className="eyebrow">Three ways in</p>
            </div>
            <div className="md:col-span-8 md:col-start-5">
              <h2 id="ways-heading" className="display-2 max-w-[22ch]">
                The same door, approached from three directions.
              </h2>
            </div>
          </div>
          */}

          {/* The tab panels carry the #students, #partners and #donors ids, so
              links such as /get-involved#partners land on the panel itself and
              CSS can reveal it before hydration. */}

          <InvolveTabs
            label={involvePage.tabsLabel}
            tabs={tabs}
            panels={{
              students: <StudentsPanel />,
              partners: <PartnersPanel />,
              donors: <DonorsPanel />,
            }}
          />
        </div>
      </section>

      <PaperTear from="var(--gold-wash)" to="var(--forest)" />

      <section className="section-tight on-forest relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-36 -top-44 h-[24rem] w-[24rem] rounded-full border border-white/12"
        />
        <div className="shell relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow">Not sure where to start?</p>
            <h2 className="display-3 mt-4 max-w-[26ch] text-[var(--on-forest)]">
              Send a general message and we will route it.
            </h2>
            <p className="mt-2 max-w-xl text-[0.875rem] leading-relaxed text-[var(--on-forest)] opacity-75">
              {contactPage.form.intro}
            </p>
          </div>
          <Link href="/contact" prefetch className="btn btn-quiet shrink-0">
            Go to contact
          </Link>
        </div>
      </section>
    </>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-[1.1rem] border border-gold/35 bg-gold/[0.07] px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-soft">
      {children}
    </p>
  );
}

function StudentsPanel() {
  const content = involvePage.students;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="display-2 mt-6 max-w-[14ch]">{content.heading}</h2>
        <p className="lede mt-5">{content.intro}</p>
        <Note>{content.note}</Note>
        <ArchMedia
          src="/images/sef/student-apply.jpg"
          alt="A smiling Somboh Educational Foundation student in a navy SEF T-shirt."
          caption="A Somboh Educational Foundation student."
          blur="sefStudentApply"
          ratio="4 / 5"
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="mt-10"
        />
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <div className="panel paper-stack p-5 sm:p-7">
          <StudentForm />
        </div>
      </div>
    </div>
  );
}

function PartnersPanel() {
  const content = involvePage.partners;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="display-2 mt-6 max-w-[14ch]">{content.heading}</h2>
        <p className="lede mt-5">{content.intro}</p>
        <Note>{content.note}</Note>
        <ArchMedia
          src="/images/sef/cohort-partners.jpg"
          alt="A Somboh Educational Foundation cohort standing together at the front of a classroom."
          caption="An SEF cohort at a session."
          blur="sefCohortPartners"
          ratio="4 / 5"
          sizes="(min-width: 1024px) 30vw, 100vw"
          peel="bl"
          className="mt-10"
        />
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <div className="panel paper-stack p-5 sm:p-7">
          <PartnerForm />
        </div>
      </div>
    </div>
  );
}

function DonorsPanel() {
  const content = involvePage.donors;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 className="display-2 mt-6 max-w-[14ch]">{content.heading}</h2>
        <p className="lede mt-5">{content.intro}</p>
        <Note>{content.note}</Note>

        <div className="mt-6 rounded-[1.1rem] border border-dashed border-line-strong px-4 py-3">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            {content.paymentLabel}
          </p>
          <p className="mt-1 break-words font-mono text-[0.75rem] text-ink-soft">
            {siteConfig.paymentLink}
          </p>
        </div>

        <ArchMedia
          src="/images/sef/group-donors.jpg"
          alt="Somboh Educational Foundation students standing together in SEF T-shirts."
          caption="Somboh Educational Foundation students."
          blur="sefGroupDonors"
          ratio="4 / 5"
          sizes="(min-width: 1024px) 30vw, 100vw"
          className="mt-10"
        />
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <div className="panel paper-stack p-5 sm:p-7">
          <DonorForm />
        </div>
      </div>
    </div>
  );
}
