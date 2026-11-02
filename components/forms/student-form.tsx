"use client";

/* eslint-disable @typescript-eslint/no-unused-vars --
   The email-verification panel is commented out in the JSX below; its state
   and handlers stay so it can be switched back on. */

import { useActionState, useRef, useState, useTransition } from "react";
import { ghanaRegions, schoolCompletionYears } from "@/content/ghana";
import { involvePage } from "@/content/involve";
import { programs } from "@/content/programs";
import {
  requestEmailCode,
  submitStudentInterest,
  verifyEmailCode,
} from "@/lib/actions";
import { initialActionResult, type ActionResult } from "@/lib/action-types";
import { useFieldPrefix, useIdempotencyKey } from "@/lib/hooks";
import { CheckIcon, MailIcon } from "../icons";
import {
  CheckboxGroup,
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

const fields = involvePage.studentFields;

export function StudentForm() {
  const prefix = useFieldPrefix();
  const idempotencyKey = useIdempotencyKey();
  const [state, formAction, pending] = useActionState(
    submitStudentInterest,
    initialActionResult,
  );

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpState, setOtpState] = useState<ActionResult>(initialActionResult);
  const [sending, startSending] = useTransition();
  const [checking, startChecking] = useTransition();
  const attemptedCode = useRef("");

  const id = (name: string) => `${prefix}-${name}`;
  const errors = state.fieldErrors ?? {};

  const sendCode = () => {
    if (!email.trim()) {
      setOtpState({
        status: "error",
        message: "Enter your email address first.",
        fieldErrors: { email: "Enter your email address first." },
      });
      return;
    }

    startSending(async () => {
      const result = await requestEmailCode(email);
      setOtpState(result);
      if (result.status === "stub") setCode("");
    });
  };

  const checkCode = (value: string) => {
    if (verified || value.length !== 6) return;

    startChecking(async () => {
      const result = await verifyEmailCode(email, value);
      setOtpState(result);
      if (result.verified) setVerified(true);
    });
  };

  const onCodeChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 6);
    setCode(digits);

    if (digits.length < 6) {
      attemptedCode.current = "";
      return;
    }

    if (attemptedCode.current !== digits) {
      attemptedCode.current = digits;
      checkCode(digits);
    }
  };

  const onEmailChange = (value: string) => {
    setEmail(value);
    setOtpState(initialActionResult);
    setCode("");
    attemptedCode.current = "";
    if (verified) setVerified(false);
  };

  const codeSent =
    otpState.status === "success" ||
    otpState.status === "stub" ||
    otpState.status === "not_configured";

  return (
    <form action={formAction} noValidate className="space-y-6">
      <Honeypot />
      <IdempotencyField value={idempotencyKey} />
      <FormNotice state={state} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id={id("firstName")}
          name="firstName"
          label={fields.firstName}
          autoComplete="given-name"
          required
          error={errors.firstName}
        />
        <TextField
          id={id("lastName")}
          name="lastName"
          label={fields.lastName}
          autoComplete="family-name"
          required
          error={errors.lastName}
        />
        <TextField
          id={id("email")}
          name="email"
          type="email"
          label={fields.email}
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          required
          error={errors.email ?? otpState.fieldErrors?.email}
          className="sm:col-span-2"
        />
        {/* Phone: hidden to keep the form short (optional in lib/schemas.ts).
        <TextField
          id={id("phone")}
          name="phone"
          type="tel"
          label={fields.phone}
          hint={fields.phoneHint}
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
        />
        */}
      </div>

      {/* Email verification: hidden to keep the form short. The server treats it as optional.
      <div className="panel p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-lg">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <MailIcon className="h-4 w-4 text-ink-soft" />
              {fields.verifyHeading}
              <span className="text-[0.75rem] font-normal text-ink-soft">
                (optional)
              </span>
            </p>
            <p className="mt-1 text-[0.8125rem] leading-relaxed text-ink-soft">
              {fields.verifyBody}
            </p>
          </div>

          {verified ? (
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-success">
              <CheckIcon className="h-4 w-4" />
              {fields.verified}
            </p>
          ) : (
            <button
              type="button"
              onClick={sendCode}
              disabled={sending}
              className="btn btn-quiet min-h-[44px] px-4 text-sm disabled:opacity-60"
            >
              {sending
                ? "Sending…"
                : codeSent
                  ? fields.resendCode
                  : fields.sendCode}
            </button>
          )}
        </div>

        {verified ? null : (
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <TextField
              id={id("code")}
              name="verificationCode"
              label={fields.codeLabel}
              hint={fields.codeHint}
              value={code}
              onChange={(event) => onCodeChange(event.target.value)}
              autoComplete="one-time-code"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="000000"
              className="[&_input]:tnum [&_input]:tracking-[0.35em]"
              error={otpState.fieldErrors?.code}
            />
            <button
              type="button"
              onClick={() => checkCode(code)}
              disabled={checking || code.length !== 6}
              className="btn btn-forest min-h-[48px] disabled:opacity-60"
            >
              {checking ? "Checking…" : fields.verify}
            </button>
          </div>
        )}

        <div aria-live="polite" className="mt-3 min-h-[1.25rem] text-[0.8125rem] leading-relaxed">
          {otpState.status === "stub" ? (
            <p className="text-ink-soft">
              {fields.devCodePrefix}{" "}
              <code className="tnum rounded border border-line bg-paper px-1.5 py-0.5 font-semibold tracking-[0.2em] text-ink">
                {otpState.devCode}
              </code>
            </p>
          ) : null}
          {otpState.status === "success" ? (
            <p className="text-success">{otpState.message}</p>
          ) : null}
          {otpState.status === "error" ? (
            <p className="text-danger">{otpState.message}</p>
          ) : null}
          {otpState.status === "not_configured" ? (
            <p className="text-ink-soft">{otpState.message}</p>
          ) : null}
        </div>

        {verified ? (
          <input type="hidden" name="emailVerified" value="yes" />
        ) : null}
      </div>
      */}

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id={id("region")}
          name="region"
          label={fields.region}
          placeholder={fields.regionPlaceholder}
          options={ghanaRegions.map((region) => ({
            value: region,
            label: region,
          }))}
          required
          error={errors.region}
        />
        <SelectField
          id={id("completionYear")}
          name="completionYear"
          label={fields.completionYear}
          placeholder={fields.completionYearPlaceholder}
          options={schoolCompletionYears.map((year) => ({
            value: year,
            label: year,
          }))}
          required
          error={errors.completionYear}
        />
        {/* School and current stage: hidden to keep the form short (optional in lib/schemas.ts).
        <TextField
          id={id("school")}
          name="school"
          label={fields.school}
          hint={fields.schoolHint}
          autoComplete="organization"
          required
          error={errors.school}
          className="sm:col-span-2"
        />
        <SelectField
          id={id("stage")}
          name="stage"
          label={fields.stage}
          placeholder={fields.stagePlaceholder}
          options={fields.stageOptions.map((option) => ({
            value: option,
            label: option,
          }))}
          required
          error={errors.stage}
          className="sm:col-span-2"
        />
        */}
      </div>

      <CheckboxGroup
        id={id("interests")}
        name="interests"
        legend={fields.interests}
        options={programs.map((program) => ({
          value: program.slug,
          label: program.title,
        }))}
        required
        error={errors.interests}
      />

      <TextareaField
        id={id("message")}
        name="message"
        label={fields.message}
        hint={fields.messageHint}
        required
        error={errors.message}
        rows={4}
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
