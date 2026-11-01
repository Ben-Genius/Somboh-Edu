"use client";

import { useActionState } from "react";
import { involvePage } from "@/content/involve";
import { submitDonorInquiry } from "@/lib/actions";
import { initialActionResult } from "@/lib/action-types";
import { useFieldPrefix, useIdempotencyKey } from "@/lib/hooks";
import {
  ConsentField,
  FormFootnote,
  FormNotice,
  Honeypot,
  IdempotencyField,
  SelectField,
  TextField,
  TextareaField,
} from "./form-fields";
import { SubmitButton } from "./submit-button";

const fields = involvePage.donorFields;

export function DonorForm() {
  const prefix = useFieldPrefix();
  const idempotencyKey = useIdempotencyKey();
  const [state, formAction, pending] = useActionState(
    submitDonorInquiry,
    initialActionResult,
  );
  const errors = state.fieldErrors ?? {};
  const id = (name: string) => `${prefix}-${name}`;

  return (
    <form action={formAction} noValidate className="space-y-6">
      <Honeypot />
      <IdempotencyField value={idempotencyKey} />
      <FormNotice state={state} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id={id("name")}
          name="name"
          label={fields.name}
          autoComplete="name"
          required
          error={errors.name}
        />
        <TextField
          id={id("email")}
          name="email"
          type="email"
          label={fields.email}
          autoComplete="email"
          inputMode="email"
          required
          error={errors.email}
        />
        {/* Country: hidden to keep the form short (optional in lib/schemas.ts).
        <TextField
          id={id("country")}
          name="country"
          label={fields.country}
          autoComplete="country-name"
          required
          error={errors.country}
        />
        */}
        <SelectField
          id={id("interest")}
          name="interest"
          label={fields.interest}
          placeholder={fields.interestPlaceholder}
          options={fields.interestOptions.map((option) => ({
            value: option,
            label: option,
          }))}
          required
          error={errors.interest}
        />
      </div>

      <TextareaField
        id={id("message")}
        name="message"
        label={fields.message}
        hint={fields.messageHint}
        required
        error={errors.message}
      />

      <p className="rounded-xl border border-line bg-paper px-4 py-3 text-[0.8125rem] leading-relaxed text-ink-soft">
        {fields.paymentNote}
      </p>

      <ConsentField
        id={id("consent")}
        label={involvePage.form.consent}
        error={errors.consent}
      />

      <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <FormFootnote />
        <SubmitButton pending={pending} />
      </div>
    </form>
  );
}
