"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaperTear } from "./paper-tear";

let registered = false;

function register() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

/**
 * GSAP paper motion.
 *
 * On every route change two stacked sheets of paper lift out of the viewport,
 * torn edge first — a warm top sheet over a darker under-sheet offset by 18px
 * — and the page settles underneath the rip. Each section below the fold then
 * rises into place once, as it enters the viewport.
 *
 * The reveal setup is deferred by a tick so it never writes inline styles
 * before React has hydrated the server-rendered page. Everything is skipped
 * under `prefers-reduced-motion`, and the page is fully readable without JS:
 * GSAP only hides elements it is about to animate.
 */
export function PaperMotion() {
  const pathname = usePathname();
  const router = useRouter();
  const veil = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const coverGuard = useRef<number | null>(null);
  const context = useRef<gsap.Context | null>(null);
  const lastPath = useRef(pathname);

  // The sheet is rendered by this component only, so it is safe to move it
  // before paint and it never causes a hydration mismatch. The first paint is
  // left alone: the server-rendered page should never wait for an animation.
  useLayoutEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const sheet = veil.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!sheet || reduce) return;

    register();
    gsap.killTweensOf(sheet);
    gsap.set(sheet, { display: "block", yPercent: 0 });

    // Hand over from the covering sheet in the same frame: both are plain
    // paper at this point, so the swap is invisible.
    if (coverGuard.current) window.clearTimeout(coverGuard.current);
    covering.current = false;
    if (cover.current) {
      gsap.killTweensOf(cover.current);
      gsap.set(cover.current, { display: "none" });
    }

    // If the tab is in the background, requestAnimationFrame does not tick and
    // GSAP cannot advance. A timeout guarantees the sheet is never left over
    // the page, even then.
    const safety = window.setTimeout(() => {
      gsap.set(sheet, { display: "none" });
    }, 1800);

    gsap.to(sheet, {
      yPercent: -102,
      rotation: -0.6,
      transformOrigin: "50% 100%",
      duration: 0.95,
      delay: 0.04,
      ease: "power4.inOut",
      onComplete: () => gsap.set(sheet, { display: "none" }),
    });

    return () => window.clearTimeout(safety);
  }, [pathname]);

  // Internal link clicks: tear a sheet up over the page, then navigate.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        covering.current
      ) {
        return;
      }

      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        "a[href]",
      );
      const sheet = cover.current;
      if (!link || !sheet) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      event.stopPropagation();
      covering.current = true;

      register();
      gsap.killTweensOf(sheet);
      gsap.set(sheet, { display: "block", y: window.innerHeight + 80 });
      gsap.to(sheet, {
        y: 0,
        duration: 0.7,
        ease: "power3.inOut",
        onComplete: () => {
          router.push(url.pathname + url.search + url.hash);
          // If the route never arrives, do not leave the page covered.
          coverGuard.current = window.setTimeout(() => {
            covering.current = false;
            gsap.to(sheet, {
              y: window.innerHeight + 80,
              duration: 0.6,
              ease: "power3.inOut",
              onComplete: () => gsap.set(sheet, { display: "none" }),
            });
          }, 4000);
        },
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Section reveals wait for hydration.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const timer = window.setTimeout(() => {
      register();

      context.current = gsap.context(() => {
        const sections = gsap.utils
          .toArray<HTMLElement>("main section")
          .filter((el) => !el.parentElement?.closest("section"));

        // Tears open as they come up the screen.
        gsap.utils.toArray<HTMLElement>("main .paper-tear").forEach((tear) => {
          const edge = tear.querySelector("svg");
          if (!edge || tear.getBoundingClientRect().top < window.innerHeight * 0.9) {
            return;
          }
          gsap.fromTo(
            edge,
            { scaleY: 0.15, transformOrigin: "50% 0%" },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: tear,
                start: "top 100%",
                end: "top 62%",
                scrub: true,
              },
            },
          );
        });

        // The sheet behind a photograph starts crooked and settles flat-ish,
        // like paper being pressed down.
        gsap.utils
          .toArray<HTMLElement>("main .paper-backdrop")
          .forEach((backdrop) => {
            if (backdrop.getBoundingClientRect().top < window.innerHeight * 0.9) {
              return;
            }
            gsap.from(backdrop, {
              rotation: -6,
              x: -12,
              y: -14,
              ease: "none",
              scrollTrigger: {
                trigger: backdrop,
                start: "top 95%",
                end: "top 50%",
                scrub: true,
              },
            });
          });

        sections.forEach((section) => {
          const shell = section.querySelector<HTMLElement>(":scope > .shell");
          const onScreen =
            section.getBoundingClientRect().top < window.innerHeight * 0.92;

          // Content: the shell's blocks rise in one after another.
          // Anything already on screen is left alone: the sheet transition is
          // its entrance, and hiding it now would flash.
          if (shell && !onScreen) {
            gsap.from(Array.from(shell.children), {
              y: 40,
              autoAlpha: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: shell, start: "top 88%", once: true },
            });
          }
        });
      });

      ScrollTrigger.refresh();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      context.current?.revert();
      context.current = null;
    };
  }, [pathname]);

  return (
    <>
    <div
      ref={cover}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[111] hidden h-[100svh] bg-paper"
    >
      <PaperTear
        flip
        className="absolute inset-x-0 bottom-full"
        from="var(--paper)"
        to="transparent"
      />
    </div>
    <div
      ref={veil}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[110] hidden h-[100svh]"
    >
      <div className="route-veil-under">
        <PaperTear from="var(--sheet-b)" to="transparent" />
      </div>
      <div className="route-veil-sheet">
        <PaperTear
          className="absolute inset-x-0 top-full"
          from="var(--paper)"
          to="transparent"
        />
      </div>
    </div>
    </>
  );
}
