"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { programs } from "@/content/programs";
import { navigation } from "@/content/site";
import { ui } from "@/content/ui";
import { ArrowRight, MenuIcon } from "./icons";
import { NavDropdown, type NavDropdownItem } from "./nav-dropdown";
import { NavFrame } from "./nav-frame";
import { Wordmark } from "./wordmark";

const MobileNav = dynamic(
  () => import("./mobile-nav").then((module) => module.MobileNav),
  { ssr: false },
);

const CommandMenu = dynamic(
  () => import("./command-menu").then((module) => module.CommandMenu),
  { ssr: false },
);

const aboutItems: NavDropdownItem[] = navigation.about.map((item) => ({
  key: item.href,
  title: item.label,
  description: item.description,
  href: item.href,
}));

const programItems: NavDropdownItem[] = programs.map((program) => ({
  key: program.slug,
  title: program.title,
  description: program.menuDescription,
  href: `/programs#${program.slug}`,
  number: program.number,
}));

const itemClass =
  "tap flex h-full items-center justify-center px-[1.1rem] py-3.5 text-[0.9375rem] font-medium tracking-wide";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [commandMounted, setCommandMounted] = useState(false);

  const openMenu = () => {
    setMenuMounted(true);
    setMenuOpen(true);
  };

  const openCommand = useCallback(() => {
    setCommandMounted(true);
    setCommandOpen(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openCommand();
        return;
      }

      if (
        event.key === "/" &&
        !typing &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        openCommand();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openCommand]);

  return (
    <>
      <header
        data-scrolled={scrolled}
        className="site-header sticky top-0 z-50"
      >
        <div className="flex min-h-[var(--nav-height)] items-center justify-between gap-4 px-6 py-3 sm:px-12 lg:px-16">
          <Wordmark />

          <div className="flex items-center gap-2 lg:gap-5">
            <div className="hidden lg:block">
              <NavFrame>
                <nav
                  aria-label={ui.primaryNav}
                  className="nav-glass nav-links-group relative z-10 flex items-stretch rounded-[4px]"
                >
                  {navigation.primary.map((item) => {
                    const href = "href" in item ? item.href : undefined;
                    const active =
                      item.menu === "about"
                        ? navigation.about.some(
                            (entry) => entry.href === pathname,
                          )
                        : href === "/"
                          ? pathname === "/"
                          : href !== undefined && pathname.startsWith(href);

                    if (item.menu === "about") {
                      return (
                        <NavDropdown
                          key={item.label}
                          label={item.label}
                          heading={ui.nav.aboutLabel}
                          items={aboutItems}
                          active={active}
                        />
                      );
                    }

                    if (item.menu === "programs") {
                      return (
                        <NavDropdown
                          key={item.label}
                          label={item.label}
                          href={href}
                          heading={ui.nav.menuLabel}
                          items={programItems}
                          footerLink={{
                            label: ui.nav.allPrograms,
                            href: "/programs",
                          }}
                          active={active}
                        />
                      );
                    }

                    return (
                      <Link
                        key={item.label}
                        href={href!}
                        prefetch
                        data-nav-item
                        data-active={active}
                        aria-current={active ? "page" : undefined}
                        className={`nav-item ${itemClass}`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                  <Link
                    href={navigation.cta.href}
                    prefetch
                    data-nav-item
                    className={`nav-item nav-cta ml-1 px-7 font-semibold ${itemClass} `}
                  >
                    {ui.nav.apply}
                  </Link>
                </nav>
              </NavFrame>
            </div>

            <Link
              href={navigation.cta.href}
              prefetch
              className="btn btn-gold hidden md:inline-flex lg:hidden"
            >
              {ui.nav.apply}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={openMenu}
              aria-label={ui.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="icon-btn tap lg:hidden"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {menuMounted ? (
        <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
      ) : null}

      {commandMounted ? (
        <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
      ) : null}
    </>
  );
}
