import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ui } from "@/content/ui";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        {ui.skipToContent}
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="section">
          <div className="shell max-w-2xl">
            <p className="eyebrow">404</p>
            <h1 className="display-2 mt-6">{ui.notFound.title}</h1>
            <p className="lede mt-5">{ui.notFound.body}</p>
            <Link href="/" prefetch className="btn btn-forest mt-8">
              {ui.notFound.link}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
