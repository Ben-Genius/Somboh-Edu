"use client";

import { unstable_ViewTransition as ReactViewTransition } from "react";
import type { ReactNode } from "react";

type ViewTransitionProps = {
  children?: ReactNode;
  name?: string;
  share?: "auto" | "morph" | "text" | (string & {});
  enter?: string;
  exit?: string;
  update?: string;
  default?: string;
};

/**
 * Experimental React View Transition wrapper. Next enables it via
 * experimental.viewTransition; browsers without support simply render the
 * children and navigate normally.
 */
export function ViewTransition({
  children,
  name,
  share,
  enter,
  exit,
  update,
  default: defaultClass,
}: ViewTransitionProps) {
  return (
    <ReactViewTransition
      name={name}
      share={share}
      enter={enter}
      exit={exit}
      update={update}
      default={defaultClass}
    >
      {children}
    </ReactViewTransition>
  );
}
