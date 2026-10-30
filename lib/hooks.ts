"use client";

import { useEffect, useId, useRef, useState } from "react";

let overlayCounter = 0;

/**
 * Predictive back for overlays. Opening pushes one history entry; the system
 * back gesture closes the overlay instead of leaving the page. A UI close
 * removes that entry again. Focus is restored to the trigger.
 *
 * For navigations from inside an overlay, call `skipHistoryOnClose()` before
 * closing; the router will already have changed the URL.
 */
export function useOverlayHistory(open: boolean, onClose: () => void) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const idRef = useRef("");
  const pushedRef = useRef(false);
  const openedHref = useRef("");
  const skipBackRef = useRef(false);

  if (!idRef.current) {
    overlayCounter += 1;
    idRef.current = `sef-overlay-${overlayCounter}`;
  }

  useEffect(() => {
    if (!open) return;

    const id = idRef.current;
    if (!pushedRef.current) {
      openedHref.current = window.location.href;
      window.history.pushState(
        { ...(window.history.state ?? {}), __sefOverlay: id },
        "",
      );
      pushedRef.current = true;
    }

    const onPop = () => {
      pushedRef.current = false;
      skipBackRef.current = false;
      closeRef.current();
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [open]);

  useEffect(() => {
    if (open) return;
    if (!pushedRef.current) return;

    pushedRef.current = false;

    if (skipBackRef.current) {
      skipBackRef.current = false;
      return;
    }

    // If the URL changed, the close happened during a navigation. Do not
    // rewind the history stack in that case.
    if (window.location.href !== openedHref.current) return;

    if (window.history.state?.__sefOverlay === idRef.current) {
      window.history.back();
    }
  }, [open]);

  return {
    skipHistoryOnClose: () => {
      skipBackRef.current = true;
    },
  };
}

export function useFocusRestore(open: boolean) {
  const previous = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      previous.current = document.activeElement as HTMLElement | null;
      return;
    }

    const element = previous.current;
    previous.current = null;
    if (element && document.contains(element)) {
      window.requestAnimationFrame(() => element.focus());
    }
  }, [open]);
}

/** One idempotency key per form mount. Empty until hydration, never rendered
 * as a mismatch. */
export function useIdempotencyKey(): string {
  const [key, setKey] = useState("");

  useEffect(() => {
    setKey(crypto.randomUUID());
  }, []);

  return key;
}

/** A stable id prefix for form fields, so labels stay linked to inputs. */
export function useFieldPrefix(): string {
  return useId().replace(/[^a-zA-Z0-9_-]/g, "");
}
