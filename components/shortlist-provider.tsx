"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useOptimistic,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { ui } from "@/content/ui";
import {
  readShortlistCookie,
  writeShortlistCookie,
} from "@/lib/shortlist";

type MembershipAction = { slug: string; add: boolean };

type ShortlistContextValue = {
  items: string[];
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string, title: string) => void;
  setMembership: (
    slug: string,
    add: boolean,
    title: string,
    options?: { toast?: boolean },
  ) => void;
};

const ShortlistContext = createContext<ShortlistContextValue | null>(null);

export function ShortlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const itemsRef = useRef<string[]>([]);

  const [optimisticItems, applyOptimistic] = useOptimistic(
    items,
    (current, action: MembershipAction) =>
      action.add
        ? current.includes(action.slug)
          ? current
          : [...current, action.slug]
        : current.filter((slug) => slug !== action.slug),
  );

  useEffect(() => {
    const stored = readShortlistCookie();
    itemsRef.current = stored;
    setItems(stored);
    setReady(true);
  }, []);

  const setMembership = (
    slug: string,
    add: boolean,
    title: string,
    options?: { toast?: boolean },
  ) => {
    startTransition(() => {
      applyOptimistic({ slug, add });

      const current = itemsRef.current;
      const next = add
        ? current.includes(slug)
          ? current
          : [...current, slug]
        : current.filter((item) => item !== slug);

      itemsRef.current = next;
      setItems(next);
      writeShortlistCookie(next);

      if (options?.toast === false) return;

      if (add) {
        toast.success(ui.forms.addedToShortlist, {
          description: title,
          action: {
            label: ui.forms.undo,
            onClick: () =>
              setMembership(slug, false, title, { toast: false }),
          },
        });
      } else {
        toast(ui.forms.removedFromShortlist, {
          description: title,
          action: {
            label: ui.forms.undo,
            onClick: () => setMembership(slug, true, title, { toast: false }),
          },
        });
      }
    });
  };

  const toggle = (slug: string, title: string) => {
    setMembership(slug, !itemsRef.current.includes(slug), title);
  };

  const value: ShortlistContextValue = {
    items: optimisticItems,
    ready,
    has: (slug) => optimisticItems.includes(slug),
    toggle,
    setMembership,
  };

  return (
    <ShortlistContext.Provider value={value}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist(): ShortlistContextValue {
  const context = useContext(ShortlistContext);
  if (!context) {
    throw new Error("useShortlist must be used inside ShortlistProvider");
  }
  return context;
}
