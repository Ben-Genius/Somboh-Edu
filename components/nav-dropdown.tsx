"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { isPointInTriangle, type Point } from "@/lib/safe-triangle";
import { ArrowRight, ChevronDown } from "./icons";

export type NavDropdownItem = {
  key: string;
  title: string;
  description: string;
  href: string;
  number?: string;
};

/**
 * A header item that opens a panel of links on hover, focus or click. With an
 * `href` the label is also a link to its own page; without one it is a button.
 */
export function NavDropdown({
  label,
  href,
  heading,
  items,
  footerLink,
  active = false,
  className = "",
}: {
  label: string;
  href?: string;
  heading: string;
  items: readonly NavDropdownItem[];
  footerLink?: { label: string; href: string };
  active?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  const triggerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const lastPoint = useRef<Point | null>(null);

  const clearTimer = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const openMenu = () => {
    clearTimer();
    setOpen(true);
  };

  const closeSoon = (delay = 180) => {
    clearTimer();
    timer.current = window.setTimeout(() => setOpen(false), delay);
  };

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerMove = (event: PointerEvent) => {
      const panel = panelRef.current?.getBoundingClientRect();
      const start = lastPoint.current;
      if (!panel || !start) return;

      const point = { x: event.clientX, y: event.clientY };
      const insidePanel =
        point.x >= panel.left &&
        point.x <= panel.right &&
        point.y >= panel.top &&
        point.y <= panel.bottom;

      if (insidePanel) {
        clearTimer();
        return;
      }

      // The safe triangle: last pointer position on the trigger, then the
      // two top corners of the panel. Moving diagonally through the gap keeps
      // the menu open instead of dropping it.
      if (
        isPointInTriangle(
          point,
          start,
          { x: panel.left, y: panel.top },
          { x: panel.right, y: panel.top },
        )
      ) {
        clearTimer();
      }
    };

    document.addEventListener("pointermove", onPointerMove);
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => () => clearTimer(), []);

  const triggerClass =
    "tap flex h-full w-full items-center gap-1.5 px-[1.1rem] py-3.5 text-[0.9375rem] font-medium tracking-wide text-ink";
  const triggerProps = {
    "aria-expanded": open,
    "aria-controls": panelId,
    "aria-current": active ? ("page" as const) : undefined,
    className: triggerClass,
    onPointerEnter: (event: React.PointerEvent) => {
      lastPoint.current = { x: event.clientX, y: event.clientY };
      if (event.pointerType === "mouse") openMenu();
    },
    onPointerMove: (event: React.PointerEvent) => {
      lastPoint.current = { x: event.clientX, y: event.clientY };
    },
    onFocus: openMenu,
  };
  const chevron = (
    <ChevronDown
      className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}
    />
  );

  return (
    <div
      data-nav-item
      data-active={active}
      className={`nav-item relative flex ${className}`}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") closeSoon();
      }}
    >
      {href ? (
        <Link
          ref={triggerRef as React.Ref<HTMLAnchorElement>}
          href={href}
          prefetch
          {...triggerProps}
        >
          {label}
          {chevron}
        </Link>
      ) : (
        <button
          ref={triggerRef as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={() => setOpen((value) => !value)}
          {...triggerProps}
        >
          {label}
          {chevron}
        </button>
      )}

      <div
        className={`absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-5 transition-[opacity,transform] duration-200 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div
          ref={panelRef}
          id={panelId}
          inert={!open}
          className="panel squircle overflow-hidden p-2"
          onPointerEnter={clearTimer}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse") closeSoon(120);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setOpen(false);
            }
          }}
        >
          <p className="px-3 pb-2 pt-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            {heading}
          </p>
          <ul>
            {items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  prefetch
                  onClick={() => setOpen(false)}
                  className="group grid items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-paper focus-visible:bg-paper"
                  style={{
                    gridTemplateColumns: item.number
                      ? "2rem 1fr auto"
                      : "1fr auto",
                  }}
                >
                  {item.number ? (
                    <span className="tnum mt-0.5 font-display text-sm text-ink-soft">
                      {item.number}
                    </span>
                  ) : null}
                  <span>
                    <span className="block text-[0.9375rem] font-semibold leading-snug text-ink">
                      {item.title}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-ink-soft">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight className="mt-1 h-4 w-4 text-ink-soft transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </li>
            ))}
          </ul>
          {footerLink ? (
            <div className="mt-1 border-t border-line px-3 pb-1 pt-3">
              <Link
                href={footerLink.href}
                prefetch
                onClick={() => setOpen(false)}
                className="link-quiet text-sm"
              >
                {footerLink.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
