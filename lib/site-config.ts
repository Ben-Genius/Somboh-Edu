/**
 * Every unverified organizational detail lives here, and only here.
 * Values wrapped in [square brackets] are placeholders, not facts.
 * Fill them in before launch. See TODO.md.
 */
export const siteConfig = {
  name: "Somboh Educational Foundation",
  shortName: "SEF Ghana",
  tagline: "Brilliant minds. Equal chances. Global futures.",
  description:
    "Somboh Educational Foundation (SEF Ghana) helps brilliant students from every background win admission and full funding to top universities at home and abroad.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://sef-ghana.example").replace(
    /\/$/,
    "",
  ),
  locale: "en_GH",
  contact: {
    email: "[Add email]",
    phone: "[Add phone]",
    whatsapp: "[Add WhatsApp number]",
    addressLine: "[Add street address]",
    city: "[Add city]",
    region: "[Add region]",
    country: "Ghana",
  },
  social: {
    instagram: "[Add Instagram URL]",
    linkedin: "[Add LinkedIn URL]",
    x: "[Add X URL]",
  },
  registrationNumber: "[Add registration number]",
  paymentLink: "[Add payment link]",
  newsletterProvider: "[Add newsletter provider]",
  partnerLogos: "[Add partner logos and written permissions]",
  photography: "[Add photography]",
  // Not displayed anywhere yet; recorded so they are not invented later.
  unverifiedCounts: {
    studentsServed: "[Add student count]",
    scholarshipsSecured: "[Add scholarship total]",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** True when a config value is still an unfilled [placeholder]. */
export function isPlaceholder(value: string): boolean {
  return value.trim().startsWith("[") && value.trim().endsWith("]");
}
