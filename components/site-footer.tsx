import Link from "next/link";
import { footer, navigation } from "@/content/site";
import { sources } from "@/content/sources";
import { ui } from "@/content/ui";
import { siteConfig } from "@/lib/site-config";
import { formatYear } from "@/lib/utils";
import { ArrowUp } from "./icons";
import { KenteDivider } from "./kente-divider";
import { NewsletterForm } from "./newsletter-form";
import { Wordmark } from "./wordmark";

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="site-footer footer-safe bg-surface"
    >
      <KenteDivider idSuffix="footer" className="text-forest" />
      <div className="shell">
        <div className="grid gap-12 py-14 md:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Wordmark />
            <p className="mt-7 max-w-md font-display text-2xl leading-snug tracking-[-0.02em] text-ink">
              {siteConfig.tagline}
            </p>
            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-ink-soft">
              {footer.statement}
            </p>
          </div>

          <div className="panel paper-stack squircle bg-clay p-6 sm:p-8">
            <NewsletterForm />
          </div>
        </div>

        <div className="grid gap-10 border-t border-line py-12 sm:grid-cols-2 lg:grid-cols-[0.8fr_1fr_1.4fr]">
          <div>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {footer.exploreHeading}
            </h2>
            <ul className="mt-3">
              {navigation.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    prefetch
                    className="tap inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-ink transition-colors hover:text-ink-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {footer.contactHeading}
            </h2>
            <dl className="mt-4 space-y-3 text-[0.875rem] leading-relaxed">
              <div>
                <dt className="text-ink-soft">Email</dt>
                <dd className="text-ink">{siteConfig.contact.email}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Phone</dt>
                <dd className="text-ink">{siteConfig.contact.phone}</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Address</dt>
                <dd className="text-ink">
                  {siteConfig.contact.addressLine}, {siteConfig.contact.city},{" "}
                  {siteConfig.contact.region}, {siteConfig.contact.country}
                </dd>
              </div>
              <div>
                <dt className="text-ink-soft">Social</dt>
                <dd className="text-ink">
                  Instagram: {siteConfig.social.instagram}
                  <br />
                  LinkedIn: {siteConfig.social.linkedin}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              {footer.sourcesHeading}
            </h2>
            <ol
              id="data-sources"
              className="mt-4 space-y-2.5 text-[0.8125rem] leading-relaxed text-ink-soft"
            >
              {sources.map((source) => (
                <li key={source.id} className="flex gap-2">
                  <span className="tnum shrink-0 text-ink">
                    {sources.indexOf(source) + 1}.
                  </span>
                  <span>{source.citation}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[0.75rem] leading-relaxed text-ink-soft">
              {ui.sources.label}: every figure links to one of these published
              sources.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-6 text-[0.75rem] leading-relaxed text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {formatYear()} {footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>
              {footer.registrationLabel}: {siteConfig.registrationNumber}
            </p>
            <a
              href="#top"
              className="tap inline-flex min-h-[44px] items-center gap-1.5 font-medium text-ink underline decoration-line-strong underline-offset-4"
            >
              {footer.backToTop}
              <ArrowUp className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
