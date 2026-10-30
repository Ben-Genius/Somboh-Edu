"use server";

import { involvePage } from "@/content/involve";
import type { ActionResult } from "@/lib/action-types";
import {
  emailConfigured,
  sendEmail,
  sendVerificationEmail,
} from "@/lib/email";
import {
  claimIdempotency,
  completeIdempotency,
  releaseIdempotency,
} from "@/lib/idempotency";
import {
  contactSchema,
  donorSchema,
  fieldErrorsFrom,
  newsletterSchema,
  otpCodeSchema,
  otpEmailSchema,
  partnerSchema,
  studentSchema,
} from "@/lib/schemas";
import { clearCode, issueCode, verifyCode } from "@/lib/verification";

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const NOT_CONFIGURED = involvePage.form.notConfiguredBody;
const GENERIC_ERROR =
  "We could not send your message just now. Nothing was sent. Please try again in a moment.";

function text(fd: FormData, name: string): string {
  return String(fd.get(name) ?? "").trim();
}

function checkbox(fd: FormData, name: string): string | undefined {
  return fd.get(name) === "on" ? "on" : undefined;
}

function keyFrom(fd: FormData): string {
  return text(fd, "idempotencyKey");
}

function duplicateResult(): ActionResult {
  return {
    status: "success",
    message: involvePage.form.duplicateMessage,
    duplicate: true,
  };
}

function missingKey(): ActionResult {
  return {
    status: "error",
    message: "Please reload the page and submit again.",
  };
}

async function persist(input: {
  formData: FormData;
  scope: string;
  subject: string;
  body: string;
  replyTo?: string;
  successMessage: string;
}): Promise<ActionResult> {
  const key = keyFrom(input.formData);
  if (!UUID.test(key)) return missingKey();

  // A filled honeypot gets a quiet, generic success and is never emailed.
  if (text(input.formData, "company")) {
    return { status: "success", message: input.successMessage };
  }

  const claim = claimIdempotency(key, input.scope);
  if (claim !== "claimed") return duplicateResult();

  const result = await sendEmail({
    subject: input.subject,
    text: input.body,
    replyTo: input.replyTo,
  });

  if (!result.ok) {
    releaseIdempotency(key, input.scope);
    return {
      status: result.reason === "not-configured" ? "not_configured" : "error",
      message:
        result.reason === "not-configured" ? NOT_CONFIGURED : GENERIC_ERROR,
    };
  }

  completeIdempotency(key, input.scope);
  return { status: "success", message: input.successMessage };
}

function lines(rows: Array<[string, string | string[] | undefined]>): string {
  return rows
    .filter(([, value]) => value !== undefined && value !== "")
    .map(([label, value]) => `${label}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join("\n");
}

function footer(): string {
  return [
    "",
    "—",
    "Sent from the SEF Ghana website.",
    "Reply directly to this message to reach the sender.",
  ].join("\n");
}

export async function submitStudentInterest(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = studentSchema.safeParse({
    firstName: text(formData, "firstName"),
    lastName: text(formData, "lastName"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    region: text(formData, "region"),
    school: text(formData, "school"),
    completionYear: text(formData, "completionYear"),
    stage: text(formData, "stage"),
    interests: formData.getAll("interests").map(String),
    message: text(formData, "message"),
    emailVerified: String(formData.get("emailVerified") ?? ""),
    consent: checkbox(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: involvePage.form.errorHeading,
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const data = parsed.data;

  return persist({
    formData,
    scope: "student",
    subject: `Student interest — ${data.firstName} ${data.lastName}`,
    replyTo: data.email,
    successMessage: involvePage.form.successHeading,
    body: [
      lines([
        ["Name", `${data.firstName} ${data.lastName}`],
        ["Email", data.email],
        ["Email verified", data.emailVerified ? "Yes" : "No (optional step skipped)"],
        ["Phone", data.phone],
        ["Region", data.region],
        ["School", data.school],
        ["Completion year", data.completionYear],
        ["Current stage", data.stage],
        ["Program interests", data.interests],
        ["What they are aiming for", data.message],
      ]),
      footer(),
    ].join("\n"),
  });
}

export async function submitPartnerInquiry(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = partnerSchema.safeParse({
    name: text(formData, "name"),
    role: text(formData, "role"),
    organisation: text(formData, "organisation"),
    email: text(formData, "email"),
    country: text(formData, "country"),
    type: text(formData, "type"),
    message: text(formData, "message"),
    consent: checkbox(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: involvePage.form.errorHeading,
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const data = parsed.data;

  return persist({
    formData,
    scope: "partner",
    subject: `Partnership inquiry — ${data.organisation}`,
    replyTo: data.email,
    successMessage: involvePage.form.successHeading,
    body: [
      lines([
        ["Name", data.name],
        ["Role", data.role],
        ["Organisation", data.organisation],
        ["Organisation type", data.type],
        ["Email", data.email],
        ["Country", data.country],
        ["Message", data.message],
      ]),
      footer(),
    ].join("\n"),
  });
}

export async function submitDonorInquiry(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = donorSchema.safeParse({
    name: text(formData, "name"),
    email: text(formData, "email"),
    country: text(formData, "country"),
    interest: text(formData, "interest"),
    message: text(formData, "message"),
    consent: checkbox(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: involvePage.form.errorHeading,
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const data = parsed.data;

  return persist({
    formData,
    scope: "donor",
    subject: `Donor inquiry — ${data.name}`,
    replyTo: data.email,
    successMessage: involvePage.form.successHeading,
    body: [
      lines([
        ["Name", data.name],
        ["Email", data.email],
        ["Country", data.country],
        ["Interest", data.interest],
        ["Message", data.message],
      ]),
      footer(),
    ].join("\n"),
  });
}

export async function submitContact(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = contactSchema.safeParse({
    name: text(formData, "name"),
    email: text(formData, "email"),
    topic: text(formData, "topic"),
    message: text(formData, "message"),
    consent: checkbox(formData, "consent"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: involvePage.form.errorHeading,
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const data = parsed.data;

  return persist({
    formData,
    scope: "contact",
    subject: `Contact message — ${data.topic}`,
    replyTo: data.email,
    successMessage: involvePage.form.successHeading,
    body: [
      lines([
        ["Name", data.name],
        ["Email", data.email],
        ["Topic", data.topic],
        ["Message", data.message],
      ]),
      footer(),
    ].join("\n"),
  });
}

export async function subscribeNewsletter(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = newsletterSchema.safeParse({
    email: text(formData, "email"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check your email address.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  return persist({
    formData,
    scope: "newsletter",
    subject: "Newsletter signup",
    replyTo: parsed.data.email,
    successMessage: "You're on the list.",
    body: [
      "A visitor asked to join SEF's occasional updates.",
      "",
      lines([["Email", parsed.data.email]]),
      footer(),
      "",
      "TODO: add this address to the mailing list provider once configured.",
    ].join("\n"),
  });
}

export async function requestEmailCode(rawEmail: string): Promise<ActionResult> {
  const parsed = otpEmailSchema.safeParse({ email: rawEmail });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Enter a valid email address first.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const normalized = parsed.data.email.toLowerCase();
  const issued = issueCode(normalized);

  if (issued.retryAfter) {
    return {
      status: "error",
      message: `Please wait ${issued.retryAfter} seconds before requesting another code.`,
    };
  }

  if (!emailConfigured()) {
    if (process.env.NODE_ENV !== "production") {
      return {
        status: "stub",
        message:
          "Development stub — no email was sent. Use the code below, then configure RESEND_API_KEY before launch.",
        devCode: issued.code,
      };
    }

    clearCode(normalized);
    return {
      status: "not_configured",
      message: NOT_CONFIGURED,
    };
  }

  const sent = await sendVerificationEmail(normalized, issued.code);
  if (!sent.ok) {
    clearCode(normalized);
    return {
      status: sent.reason === "not-configured" ? "not_configured" : "error",
      message: sent.reason === "not-configured" ? NOT_CONFIGURED : GENERIC_ERROR,
    };
  }

  return {
    status: "success",
    message: "Code sent. Check your inbox.",
  };
}

export async function verifyEmailCode(
  rawEmail: string,
  rawCode: string,
): Promise<ActionResult> {
  const parsed = otpCodeSchema.safeParse({ email: rawEmail, code: rawCode });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Enter the six-digit code.",
      fieldErrors: fieldErrorsFrom(parsed.error),
    };
  }

  const normalized = parsed.data.email.toLowerCase();
  const result = verifyCode(normalized, parsed.data.code);

  if (result === "ok") {
    return {
      status: "success",
      message: "Email verified.",
      verified: true,
    };
  }

  if (result === "expired") {
    return {
      status: "error",
      message: "That code has expired. Request a new one.",
    };
  }

  if (result === "too-many") {
    return {
      status: "error",
      message: "Too many attempts. Request a new code.",
    };
  }

  return {
    status: "error",
    message: "That code is not correct. Try again.",
  };
}
