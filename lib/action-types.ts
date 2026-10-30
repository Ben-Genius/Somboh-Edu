export type ActionStatus =
  | "idle"
  | "success"
  | "error"
  | "not_configured"
  | "stub";

export type ActionResult = {
  status: ActionStatus;
  message: string;
  fieldErrors?: Record<string, string>;
  duplicate?: boolean;
  devCode?: string;
  verified?: boolean;
};

export const initialActionResult: ActionResult = {
  status: "idle",
  message: "",
};
