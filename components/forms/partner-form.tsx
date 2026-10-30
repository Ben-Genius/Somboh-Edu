"use client";

import { useActionState } from "react";
import { involvePage } from "@/content/involve";
import { submitPartnerInquiry } from "@/lib/actions";
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

const fields = involvePage.partnerFields;

export function PartnerForm() {
  const prefix = useFieldPrefix();
  const idempotencyKey = useIdempotencyKey();
  const [state, formAction, pending] = useActionState(
    submitPartnerInquiry,
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
          id={id("role")}
          name="role"
          label={fields.role}
          autoComplete="organization-title"
          error={errors.role}
        />
        <TextField
          id={id("organisation")}
          name="organisation"
          label={fields.organisation}
          autoComplete="organization"
          required
          error={errors.organisation}
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
        <TextField
          id={id("country")}
          name="country"
          label={fields.country}
          autoComplete="country-name"
          required
          error={errors.country}
        />
        <SelectField
          id={id("type")}
          name="type"
          label={fields.type}
          placeholder={fields.typePlaceholder}
          options={fields.typeOptions.map((option) => ({
            value: option,
            label: option,
          }))}
          required
          error={errors.type}
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
