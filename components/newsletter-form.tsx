"use client";

import { useActionState, useEffect, useOptimistic, useRef, useState } from "react";
import { toast } from "sonner";
import { footer } from "@/content/site";
import { ui } from "@/content/ui";
import { subscribeNewsletter } from "@/lib/actions";
import { initialActionResult, type ActionResult } from "@/lib/action-types";
import { useFieldPrefix, useIdempotencyKey } from "@/lib/hooks";
import { ArrowRight, CheckIcon } from "./icons";

export function NewsletterForm() {
  const prefix = useFieldPrefix();
  const idempotencyKey = useIdempotencyKey();
  const [email, setEmail] = useState("");
  const [state, formAction, pending] = useActionState(
    subscribeNewsletter,
    initialActionResult,
  );
  const [optimistic, addOptimistic] = useOptimistic<ActionResult, ActionResult>(
    state,
    (_current, next) => next,
  );
  const previousStatus = useRef(state.status);

  useEffect(() => {
    if (state.status === "error" && previousStatus.current !== "error") {
      toast.error(ui.forms.newsletterError);
    }
    previousStatus.current = state.status;
  }, [state.status]);

  const fieldId = `${prefix}-newsletter-email`;
  const messageId = `${prefix}-newsletter-message`;
  const showSuccess = optimistic.status === "success";
  const showError =
    optimistic.status === "error" || optimistic.status === "not_configured";
  const errorText = optimistic.fieldErrors?.email ?? optimistic.message;

  return (
    <div>
      <p className="eyebrow">{footer.newsletter.heading}</p>
      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-soft">
        {footer.newsletter.body}
      </p>

      <form
        className="mt-5"
        action={async (formData) => {
          formData.set("idempotencyKey", idempotencyKey);
          addOptimistic({
            status: "success",
            message: footer.newsletter.success,
          });
          await formAction(formData);
        }}
      >
        <div className="flex items-center gap-2">
          <label htmlFor={fieldId} className="sr-only">
            {footer.newsletter.label}
          </label>
          <input
            id={fieldId}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={footer.newsletter.placeholder}
            aria-invalid={showError ? true : undefined}
            aria-describedby={messageId}
            className="field-input"
          />
          <button
            type="submit"
            disabled={pending}
            className="btn btn-forest shrink-0 px-4 disabled:opacity-60"
          >
            {showSuccess ? (
              <>
                <CheckIcon className="h-4 w-4" />
                <span className="sr-only">{footer.newsletter.success}</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">{footer.newsletter.button}</span>
                <ArrowRight className="h-4 w-4 sm:hidden" />
              </>
            )}
          </button>
        </div>

        <div
          id={messageId}
          aria-live="polite"
          className={`mt-2 min-h-[1.25rem] text-xs leading-snug ${
            showError ? "text-danger" : "text-ink-soft"
          }`}
        >
          {showSuccess
            ? footer.newsletter.success
            : showError
              ? errorText
              : footer.newsletter.privacy}
        </div>

        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
          defaultValue=""
        />
        <input
          type="hidden"
          name="idempotencyKey"
          value={idempotencyKey}
          readOnly
        />
      </form>
    </div>
  );
}
