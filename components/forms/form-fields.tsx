"use client";

import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { useId } from "react";
import { involvePage } from "@/content/involve";
import type { ActionResult } from "@/lib/action-types";
import { CheckIcon } from "../icons";

type BaseField = {
  id: string;
  name: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function ids(id: string, hint?: string, error?: string) {
  return {
    hintId: hint ? `${id}-hint` : undefined,
    errorId: error ? `${id}-error` : undefined,
    describedBy:
      [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
        .filter(Boolean)
        .join(" ") || undefined,
  };
}

function FieldMessage({
  hint,
  error,
  hintId,
  errorId,
}: {
  hint?: string;
  error?: string;
  hintId?: string;
  errorId?: string;
}) {
  return (
    <>
      {hint ? (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </>
  );
}

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="field-label">
      {children}
      {required ? (
        <span aria-hidden="true" className="text-gold-ink">
          {" "}
          *
        </span>
      ) : (
        <span className="ml-1.5 text-[0.75rem] font-normal text-ink-soft">
          (optional)
        </span>
      )}
    </label>
  );
}

export function TextField({
  id,
  name,
  label,
  hint,
  error,
  required,
  className = "",
  ...input
}: BaseField &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "className">) {
  const { hintId, errorId, describedBy } = ids(id, hint, error);

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        {...input}
        id={id}
        name={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="field-input"
      />
      <FieldMessage
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export function SelectField({
  id,
  name,
  label,
  hint,
  error,
  required,
  options,
  placeholder,
  className = "",
  ...select
}: BaseField & {
  options: readonly { value: string; label: string }[];
  placeholder?: string;
} & Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "id" | "name" | "className"
  >) {
  const { hintId, errorId, describedBy } = ids(id, hint, error);

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select
        {...select}
        id={id}
        name={name}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="field-input"
        defaultValue={select.defaultValue ?? ""}
      >
        <option value="" disabled>
          {placeholder ?? "Select one"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldMessage
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export function TextareaField({
  id,
  name,
  label,
  hint,
  error,
  required,
  className = "",
  rows = 5,
  ...textarea
}: BaseField &
  Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "id" | "name" | "className"
  >) {
  const { hintId, errorId, describedBy } = ids(id, hint, error);

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        {...textarea}
        id={id}
        name={name}
        rows={rows}
        required={required}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="field-input"
      />
      <FieldMessage
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </div>
  );
}

export function CheckboxGroup({
  id,
  name,
  legend,
  hint,
  error,
  options,
  required,
  className = "",
}: {
  id: string;
  name: string;
  legend: string;
  hint?: string;
  error?: string;
  options: readonly { value: string; label: string }[];
  required?: boolean;
  className?: string;
}) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <fieldset
      aria-required={required || undefined}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      className={className}
    >
      <legend className="field-label">
        {legend}
        {required ? (
          <span aria-hidden="true" className="text-gold-ink">
            {" "}
            *
          </span>
        ) : null}
      </legend>
      <div className="grid gap-x-6 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option.value} className="choice">
            <input type="checkbox" name={name} value={option.value} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldMessage
        hint={hint}
        error={error}
        hintId={hintId}
        errorId={errorId}
      />
    </fieldset>
  );
}

export function ConsentField({
  id,
  label,
  error,
}: {
  id: string;
  label: string;
  error?: string;
}) {
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div>
      <label className="choice" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          name="consent"
          value="on"
          required
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormNotice({
  state,
  className = "",
}: {
  state: ActionResult;
  className?: string;
}) {
  if (state.status === "idle") return null;

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-xl border border-success/35 bg-success/10 px-4 py-3 text-sm leading-relaxed text-ink ${className}`}
      >
        <p className="flex items-start gap-2 font-semibold">
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          {state.message}
        </p>
        {state.duplicate ? (
          <p className="mt-1 pl-6 text-ink-soft">
            {involvePage.form.duplicateMessage}
          </p>
        ) : null}
      </div>
    );
  }

  if (state.status === "not_configured") {
    return (
      <div
        role="alert"
        className={`rounded-xl border border-gold/50 bg-gold/10 px-4 py-3 text-sm leading-relaxed ${className}`}
      >
        <p className="font-semibold text-ink">
          {involvePage.form.notConfiguredHeading}
        </p>
        <p className="mt-1 text-ink-soft">{state.message}</p>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm leading-relaxed ${className}`}
    >
      <p className="font-semibold text-ink">{state.message}</p>
      {state.fieldErrors ? (
        <p className="mt-1 text-ink-soft">
          Please check the highlighted fields.
        </p>
      ) : null}
    </div>
  );
}

export function Honeypot() {
  const id = useId();

  return (
    <div aria-hidden="true" className="sr-only">
      <label htmlFor={id}>Company</label>
      <input
        id={id}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

export function IdempotencyField({ value }: { value: string }) {
  return <input type="hidden" name="idempotencyKey" value={value} readOnly />;
}

export function FormFootnote() {
  return (
    <p className="text-[0.75rem] leading-relaxed text-ink-soft">
      {involvePage.form.requiredHint}
    </p>
  );
}
