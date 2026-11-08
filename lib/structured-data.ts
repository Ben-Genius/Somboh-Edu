import type { FaqItem } from "@/content/faq";
import type { Program } from "@/content/types";
import { siteConfig, isPlaceholder } from "@/lib/site-config";

export const organisationId = `${siteConfig.url}/#organisation`;

/**
 * Only verified facts enter structured data. Placeholder contact details and
 * social links are omitted rather than published as if they were real.
 */
export function organisationJsonLd(): Record<string, unknown> {
  const address: Record<string, unknown> = {
    "@type": "PostalAddress",
    addressCountry: "GH",
  };

  if (!isPlaceholder(siteConfig.contact.city)) {
    address.addressLocality = siteConfig.contact.city;
  }
  if (!isPlaceholder(siteConfig.contact.region)) {
    address.addressRegion = siteConfig.contact.region;
  }
  if (!isPlaceholder(siteConfig.contact.addressLine)) {
    address.streetAddress = siteConfig.contact.addressLine;
  }

  const sameAs = [siteConfig.social.instagram, siteConfig.social.linkedin, siteConfig.social.x]
    .filter((value) => !isPlaceholder(value))
    .filter((value) => value.startsWith("http"));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["NGO", "EducationalOrganization"],
    "@id": organisationId,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.description,
    address,
    areaServed: { "@type": "Country", name: "Ghana" },
  };

  if (!isPlaceholder(siteConfig.contact.email)) {
    data.email = siteConfig.contact.email;
  }
  if (!isPlaceholder(siteConfig.contact.phone)) {
    data.telephone = siteConfig.contact.phone;
  }
  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }

  return data;
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

/**
 * FAQ rich results. Only questions the foundation can substantiate belong in
 * `content/faq.ts`; this helper publishes exactly what is there.
 */
export function faqJsonLd(items: FaqItem[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/**
 * One course entry per program page, tied to the organisation node in the
 * root layout. A course describes the support, not a qualification.
 */
export function programJsonLd(program: Program): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.summary,
    url: `${siteConfig.url}/programs/${program.slug}`,
    inLanguage: "en",
    provider: {
      "@type": "EducationalOrganization",
      "@id": organisationId,
      name: siteConfig.name,
    },
  };
}
