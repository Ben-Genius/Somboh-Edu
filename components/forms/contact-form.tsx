"use client";

import { useActionState } from "react";
import { involvePage } from "@/content/involve";
import { submitContact } from "@/lib/actions";
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

const fields = involvePage.contactForm;

export function ContactForm() {
  const prefix = useFieldPrefix();
  const idempotencyKey = useIdempotencyKey();
  const [state, formAction, pending] = useActionState(
    submitContact,
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
        <SelectField
          id={id("topic")}
          name="topic"
          label={fields.topic}
          placeholder={fields.topicPlaceholder}
          options={fields.topicOptions.map((option) => ({
            value: option,
            label: option,
          }))}
          required
          error={errors.topic}
          className="sm:col-span-2"
        />
      </div>

      <TextareaField
        id={id("message")}
        name="message"
        label={fields.message}
        hint={fields.messageHint}
        required
        error={errors.message}
        rows={7}
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
