"use client";

import { involvePage } from "@/content/involve";
import { ArrowRight } from "../icons";

export function SubmitButton({
  pending,
  label = involvePage.form.submit,
}: {
  pending: boolean;
  label?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="btn btn-forest shrink-0 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? involvePage.form.submitting : label}
      <ArrowRight className="h-4 w-4" />
    </button>
  );
}
