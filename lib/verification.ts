import { createHash, randomInt, timingSafeEqual } from "node:crypto";

type CodeEntry = {
  hash: string;
  expiresAt: number;
  sentAt: number;
  attempts: number;
};

const globalForCodes = globalThis as unknown as {
  __sefEmailCodes?: Map<string, CodeEntry>;
};

const codes =
  globalForCodes.__sefEmailCodes ??
  (globalForCodes.__sefEmailCodes = new Map<string, CodeEntry>());

const CODE_TTL_MS = 10 * 60 * 1000;
const RESEND_COOLDOWN_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

export function hashCode(code: string): string {
  return createHash("sha256").update(code).digest("hex");
}

export function issueCode(email: string): { code: string; retryAfter?: number } {
  const now = Date.now();
  const existing = codes.get(email);
  if (existing && now - existing.sentAt < RESEND_COOLDOWN_MS) {
    return {
      code: "",
      retryAfter: Math.ceil((RESEND_COOLDOWN_MS - (now - existing.sentAt)) / 1000),
    };
  }

  const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
  codes.set(email, {
    hash: hashCode(code),
    expiresAt: now + CODE_TTL_MS,
    sentAt: now,
    attempts: 0,
  });

  return { code };
}

export type VerifyResult = "ok" | "expired" | "invalid" | "too-many";

export function verifyCode(email: string, code: string): VerifyResult {
  const entry = codes.get(email);
  if (!entry) return "expired";
  if (Date.now() > entry.expiresAt) {
    codes.delete(email);
    return "expired";
  }
  if (entry.attempts >= MAX_ATTEMPTS) {
    codes.delete(email);
    return "too-many";
  }

  entry.attempts += 1;

  const provided = Buffer.from(hashCode(code), "hex");
  const expected = Buffer.from(entry.hash, "hex");
  const matches =
    provided.length === expected.length && timingSafeEqual(provided, expected);

  if (!matches) {
    if (entry.attempts >= MAX_ATTEMPTS) codes.delete(email);
    return "invalid";
  }

  codes.delete(email);
  return "ok";
}

export function clearCode(email: string): void {
  codes.delete(email);
}
