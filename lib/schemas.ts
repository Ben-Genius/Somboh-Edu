import { z } from "zod";
import { ghanaRegions } from "@/content/ghana";

const required = (label: string, max = 200) =>
  z
    .string({ required_error: `Please enter ${label}.` })
    .trim()
    .min(1, `Please enter ${label}.`)
    .max(max, `Please keep this under ${max} characters.`);

const email = z
  .string({ required_error: "Please enter your email address." })
  .trim()
  .min(1, "Please enter your email address.")
  .email("Enter a valid email address.")
  .max(254, "Please use a shorter email address.");

const optional = (max = 2000) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters.`)
    .optional()
    .transform((value) => value ?? "");

const consent = z
  .string()
  .optional()
  .refine((value) => value === "on", "Please confirm that we may contact you.");

export const studentSchema = z.object({
  firstName: required("your first name", 80),
  lastName: required("your last name", 80),
  email,
  phone: optional(40),
  region: z.enum(ghanaRegions, {
    errorMap: () => ({ message: "Choose your region." }),
  }),
  school: required("your school", 160),
  completionYear: z
    .string()
    .regex(/^\d{4}$/, "Choose your completion year."),
  stage: required("where you are now", 80),
  interests: z
    .array(z.string().min(1).max(80))
    .min(1, "Choose at least one program."),
  message: required("a sentence about what you are aiming for", 3000),
  emailVerified: z.string().optional(),
  consent,
});

export const partnerSchema = z.object({
  name: required("your name", 120),
  role: optional(120),
  organisation: required("your organisation", 160),
  email,
  country: required("your country", 80),
  type: required("your organisation type", 80),
  message: required("a sentence about the partnership", 3000),
  consent,
});

export const donorSchema = z.object({
  name: required("your name", 120),
  email,
  country: required("your country", 80),
  interest: required("what you are interested in", 120),
  message: required("what you would like to know", 3000),
  consent,
});

export const contactSchema = z.object({
  name: required("your name", 120),
  email,
  topic: required("a topic", 120),
  message: required("your message", 3000),
  consent,
});

export const newsletterSchema = z.object({ email });

export const otpEmailSchema = z.object({ email });

export const otpCodeSchema = z.object({
  email,
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the six-digit code."),
});

export type FieldErrors = Record<string, string>;

export function fieldErrorsFrom(error: z.ZodError): FieldErrors {
  const flat = error.flatten().fieldErrors;
  const result: FieldErrors = {};
  for (const [key, messages] of Object.entries(flat)) {
    if (messages && messages.length > 0) result[key] = messages[0]!;
  }
  return result;
}
