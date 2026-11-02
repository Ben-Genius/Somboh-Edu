import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { organisationJsonLd } from "@/lib/structured-data";
import "./globals.css";

/**
 * One grotesk for display and interface, in the spirit of the reference
 * wordmark: a wide, quiet family that holds up from 16px to 8rem. Archivo has
 * the weight range for both, so headlines and captions share a skeleton.
 */
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://sef-ghana.example",
  ),
  title: {
    default: "SEF Ghana — Brilliant minds. Equal chances.",
    template: "%s — SEF Ghana",
  },
  description:
    "Somboh Educational Foundation helps brilliant Ghanaian students win admission and full funding to top universities at home and abroad.",
  applicationName: "Somboh Educational Foundation",
  authors: [{ name: "Somboh Educational Foundation" }],
  creator: "Somboh Educational Foundation",
  publisher: "Somboh Educational Foundation",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Somboh Educational Foundation",
    title: "SEF Ghana — Brilliant minds. Equal chances.",
    description:
      "SAT preparation, essay mentorship, and full-scholarship guidance for Ghanaian students applying to top universities.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEF Ghana — Brilliant minds. Equal chances.",
    description:
      "SAT preparation, essay mentorship, and full-scholarship guidance for Ghanaian students applying to top universities.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  colorScheme: "light dark" as const,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1220" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GH" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={organisationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
