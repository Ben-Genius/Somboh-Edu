"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const RADIUS = 11;
const INSET = 2;
const CORNER_ARM = 15;
const BAR_LENGTH = 46;

/**
 * The navigation's outer frame: a hairline track around the pill, and two
 * strokes that rest on the corners and slide along the track to sit above and
 * below whichever item is hovered or focused. The strokes are the
 * same path drawn from opposite ends, moved with dash offsets only, so there
 * is no layout work per frame.
 *
 * Items opt in with `data-nav-item`.
 */
export function NavFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const wrapper = useRef<HTMLDivElement>(null);
  const track = useRef<SVGPathElement>(null);
  const top = useRef<SVGPathElement>(null);
  const bottom = useRef<SVGPathElement>(null);
  const rest = useRef<() => void>(() => {});

  useEffect(() => {
    const root = wrapper.current;
    const trackPath = track.current;
    const topPath = top.current;
    const bottomPath = bottom.current;
    if (!root || !trackPath || !topPath || !bottomPath) return;

    let straightH = 0;
    let arcLen = 0;
    let total = 0;
    let left = 0;
    let right = 0;
    let hovered: HTMLElement | null = null;

    const setTransition = (on: boolean) => {
      const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
      const value = on
        ? `stroke-dashoffset 420ms ${ease}, stroke-dasharray 420ms ${ease}`
        : "none";
      topPath.style.transition = value;
      bottomPath.style.transition = value;
    };

    const draw = (dash: string, topOffset: number, bottomOffset: number) => {
      topPath.style.strokeDasharray = dash;
      bottomPath.style.strokeDasharray = dash;
      topPath.style.strokeDashoffset = `${-topOffset}`;
      bottomPath.style.strokeDashoffset = `${-bottomOffset}`;
    };

    const corners = () => {
      const bracket = CORNER_ARM + arcLen + CORNER_ARM;
      const start = Math.max(0, straightH - CORNER_ARM);
      draw(`${bracket} ${total}`, start, start);
    };

    const onItem = (item: HTMLElement) => {
      const box = root.getBoundingClientRect();
      const rect = item.getBoundingClientRect();
      const centre = rect.left - box.left + rect.width / 2;
      const topStart =
        straightH + arcLen + (centre - (left + RADIUS)) - BAR_LENGTH / 2;
      const bottomStart =
        straightH + arcLen + (right - RADIUS - centre) - BAR_LENGTH / 2;
      draw(`${BAR_LENGTH} ${total}`, topStart, bottomStart);
    };

    const settle = () => {
      if (hovered) onItem(hovered);
      else corners();
    };
    rest.current = () => {
      hovered = null;
      settle();
    };

    const measure = () => {
      const { width: W, height: H } = root.getBoundingClientRect();
      left = INSET;
      right = W - INSET;
      const bottomEdge = H - INSET;
      const R = RADIUS;
      straightH = bottomEdge - INSET - 2 * R;
      arcLen = (Math.PI * R) / 2;

      trackPath.setAttribute(
        "d",
        `M ${left + R} ${INSET} L ${right - R} ${INSET} A ${R} ${R} 0 0 1 ${right} ${INSET + R} L ${right} ${bottomEdge - R} A ${R} ${R} 0 0 1 ${right - R} ${bottomEdge} L ${left + R} ${bottomEdge} A ${R} ${R} 0 0 1 ${left} ${bottomEdge - R} L ${left} ${INSET + R} A ${R} ${R} 0 0 1 ${left + R} ${INSET} Z`,
      );
      topPath.setAttribute(
        "d",
        `M ${left} ${bottomEdge - R} L ${left} ${INSET + R} A ${R} ${R} 0 0 1 ${left + R} ${INSET} L ${right - R} ${INSET} A ${R} ${R} 0 0 1 ${right} ${INSET + R} L ${right} ${bottomEdge - R}`,
      );
      bottomPath.setAttribute(
        "d",
        `M ${right} ${INSET + R} L ${right} ${bottomEdge - R} A ${R} ${R} 0 0 1 ${right - R} ${bottomEdge} L ${left + R} ${bottomEdge} A ${R} ${R} 0 0 1 ${left} ${bottomEdge - R} L ${left} ${INSET + R}`,
      );
      total = topPath.getTotalLength();

      setTransition(false);
      settle();
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransition(true)),
      );
    };

    const target = (event: Event) =>
      (event.target as Element | null)?.closest<HTMLElement>(
        "[data-nav-item]",
      ) ?? null;

    const onOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const item = target(event);
      if (item && item !== hovered) {
        hovered = item;
        onItem(item);
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      const item = target(event);
      if (item) {
        hovered = item;
        onItem(item);
      }
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!root.contains(event.relatedTarget as Node | null)) rest.current();
    };
    const onLeave = () => rest.current();

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    document.fonts?.ready.then(measure);

    root.addEventListener("pointerover", onOver);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("focusin", onFocusIn);
    root.addEventListener("focusout", onFocusOut);

    return () => {
      observer.disconnect();
      root.removeEventListener("pointerover", onOver);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("focusin", onFocusIn);
      root.removeEventListener("focusout", onFocusOut);
    };
  }, []);

  // Route changed: the current item moved, so the resting stroke moves too.
  useEffect(() => {
    rest.current();
  }, [pathname]);

  return (
    <div
      ref={wrapper}
      className="nav-frame relative inline-flex items-center justify-center p-[9px]"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <path ref={track} className="nav-track" />
        <path ref={top} className="nav-stroke" />
        <path ref={bottom} className="nav-stroke" />
      </svg>
      {children}
    </div>
  );
}
