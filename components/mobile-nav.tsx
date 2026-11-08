"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Drawer } from "vaul";
import { programs } from "@/content/programs";
import { footer, navigation } from "@/content/site";
import { ui } from "@/content/ui";
import { useFocusRestore, useOverlayHistory } from "@/lib/hooks";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight, ChevronDown, CloseIcon } from "./icons";
import { Wordmark } from "./wordmark";

export function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useOverlayHistory(open, () => onOpenChange(false));
  useFocusRestore(open);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      if (open) onOpenChange(false);
    }
  }, [pathname, open, onOpenChange]);

  const closeIfSamePage = (href: string) => {
    if (href.split("#")[0] === pathname) onOpenChange(false);
  };

  return (
    <Drawer.Root
      open={open}
      onOpenChange={onOpenChange}
      direction="bottom"
      shouldScaleBackground={false}
      setBackgroundColorOnScale={false}
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[70] bg-[#06101f]/45" />
        <Drawer.Content
          id="mobile-navigation"
          className="fixed inset-x-0 bottom-0 z-[80] flex max-h-[90dvh] flex-col rounded-t-[1.75rem] border-t border-line bg-paper outline-none"
          aria-describedby="mobile-nav-description"
        >
          <Drawer.Handle className="mx-auto mb-1 mt-3 h-1.5 w-11 shrink-0 rounded-full bg-line-strong" />
          <Drawer.Title className="sr-only">{ui.mobileNavTitle}</Drawer.Title>
          <Drawer.Description id="mobile-nav-description" className="sr-only">
            Site navigation and program links.
          </Drawer.Description>

          <div className="safe-bottom overflow-y-auto px-5 pb-6 pt-2 sm:px-7">
            <div className="flex items-center justify-between gap-4 border-b border-line pb-5">
              <Wordmark onClick={() => onOpenChange(false)} />
              <button
                type="button"
                className="icon-btn tap"
                onClick={() => onOpenChange(false)}
                aria-label={ui.closeMenu}
              >
                <CloseIcon />
              </button>
            </div>

            <nav aria-label={ui.primaryNav} className="py-2">
              {navigation.primary.map((item) => {
                if (item.menu === "about") {
                  return (
                    <details
                      key={item.label}
                      className="group border-b border-line"
                    >
                      <summary className="flex min-h-[60px] list-none items-center justify-between py-3 font-display text-[1.9rem] leading-none tracking-[-0.03em] text-ink">
                        About Us
                        <ChevronDown className="h-5 w-5 text-ink-soft transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <ul className="pb-4">
                        {navigation.about.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              prefetch
                              onClick={() => onOpenChange(false)}
                              className="flex min-h-[48px] items-center py-2 text-[0.9375rem] font-medium text-ink-soft"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  );
                }
                if (item.menu === "programs") {
                  return (
                    <details
                      key={item.label}
                      className="group border-b border-line"
                    >
                      <summary className="flex min-h-[60px] list-none items-center justify-between py-3 font-display text-[1.9rem] leading-none tracking-[-0.03em] text-ink">
                        Programs
                        <ChevronDown className="h-5 w-5 text-ink-soft transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <ul className="pb-4">
                        {programs.map((program) => (
                          <li key={program.slug}>
                            <Link
                              href={`/programs/${program.slug}`}
                              prefetch
                              onClick={() => onOpenChange(false)}
                              className="flex min-h-[48px] items-center gap-3 py-2 text-[0.9375rem] font-medium text-ink-soft"
                            >
                              <span className="tnum w-6 font-display text-sm">
                                {program.number}
                              </span>
                              {program.title}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/programs"
                            prefetch
                            onClick={() => onOpenChange(false)}
                            className="mt-1 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-ink"
                          >
                            {ui.nav.allPrograms}
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </li>
                      </ul>
                    </details>
                  );
                }
                return (
                  <div key={item.label} className="border-b border-line">
                    <Link
                      href={item.href!}
                      prefetch
                      onClick={() => closeIfSamePage(item.href!)}
                      className="flex min-h-[60px] items-center justify-between py-3 font-display text-[1.9rem] leading-none tracking-[-0.03em] text-ink"
                    >
                      {item.label}
                      <ArrowRight className="h-5 w-5 text-ink-soft" />
                    </Link>
                  </div>
                );
              })}
            </nav>

            <Link
              href={navigation.cta.href}
              prefetch
              onClick={() => onOpenChange(false)}
              className="btn btn-gold mt-6 w-full"
            >
              {ui.nav.apply}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              prefetch
              onClick={() => onOpenChange(false)}
              className="mt-3 flex min-h-[44px] items-center justify-center text-sm font-medium text-ink-soft underline decoration-line-strong underline-offset-4"
            >
              {footer.contactHeading}: {siteConfig.contact.email}
            </Link>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
