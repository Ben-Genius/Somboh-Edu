import type { Metadata } from "next";

/**
 * Page-level metadata. The root layout supplies the title template, so `title`
 * here should be the short page name, not the full browser title.
 */
export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  openGraphTitle?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const openGraphTitle = input.openGraphTitle ?? `${input.title} — SEF Ghana`;

  return {
    title: input.absoluteTitle ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "website",
      locale: "en_GH",
      siteName: "Somboh Educational Foundation",
      title: openGraphTitle,
      description: input.description,
      url: input.path,
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: input.description,
    },
  };
}
