import type * as React from "react";

declare module "react" {
  type ExperimentalViewTransitionProps = {
    children?: React.ReactNode;
    name?: string;
    share?: "auto" | "morph" | "text" | (string & {});
    enter?: string;
    exit?: string;
    update?: string;
    default?: string;
  };

  export const unstable_ViewTransition: React.ComponentType<ExperimentalViewTransitionProps>;
}
