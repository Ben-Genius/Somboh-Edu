type SendResult =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "failed" };

const FROM = "SEF Ghana Website <onboarding@resend.dev>";

function recipient(): string | null {
  const value = process.env.CONTACT_TO_EMAIL?.trim();
  if (!value || value.startsWith("[") || !value.includes("@")) return null;
  return value;
}

export function emailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && recipient());
}

/**
 * Sends through Resend's HTTP API. No SDK: one fewer dependency and a smaller
 * server bundle. If either env var is missing we return "not-configured" and
 * the UI says so plainly; we never pretend a message was sent.
 */
export async function sendEmail(input: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = recipient();

  if (!apiKey || !to) return { ok: false, reason: "not-configured" };

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        subject: `[SEF website] ${input.subject}`,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "Resend rejected the message",
        response.status,
        await response.text().catch(() => ""),
      );
      return { ok: false, reason: "failed" };
    }

    return { ok: true };
  } catch (error) {
    console.error("Could not reach Resend", error);
    return { ok: false, reason: "failed" };
  }
}

export async function sendVerificationEmail(to: string, code: string) {
  return sendEmail({
    subject: "Your SEF email verification code",
    text: [
      "Your SEF Ghana verification code is:",
      "",
      code,
      "",
      "It expires in ten minutes. If you did not request it, you can ignore this message.",
    ].join("\n"),
    replyTo: recipient() ?? undefined,
  });
}
