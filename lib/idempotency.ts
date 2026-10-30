type Entry =
  | { state: "pending"; createdAt: number }
  | { state: "done"; createdAt: number };

type Store = Map<string, Entry>;

/**
 * Development-grade idempotency. A Map lives for the lifetime of the server
 * process. It is deliberately replaced by a shared store in production.
 *
 * TODO(prod): swap this module for Upstash Redis / Vercel KV with
 * `SET key 1 NX EX 86400` and mark the entry done after the email is accepted.
 * See README.md, "Idempotency in production".
 */
const globalForIdempotency = globalThis as unknown as {
  __sefIdempotency?: Store;
};

const store: Store =
  globalForIdempotency.__sefIdempotency ??
  (globalForIdempotency.__sefIdempotency = new Map());

const DAY_MS = 24 * 60 * 60 * 1000;

function prune(now: number) {
  for (const [key, entry] of store) {
    if (now - entry.createdAt > DAY_MS) store.delete(key);
  }
}

export type ClaimResult = "claimed" | "already-pending" | "already-done";

/** Atomically-ish claims a key for 24 hours. Returns duplicate state. */
export function claimIdempotency(
  key: string,
  scope: string,
  now = Date.now(),
): ClaimResult {
  prune(now);
  const composite = `${scope}:${key}`;
  const existing = store.get(composite);

  if (existing) {
    return existing.state === "done" ? "already-done" : "already-pending";
  }

  store.set(composite, { state: "pending", createdAt: now });
  return "claimed";
}

/** Frees a claim when no email was sent, so a retry can work. */
export function releaseIdempotency(key: string, scope: string): void {
  store.delete(`${scope}:${key}`);
}

export function completeIdempotency(key: string, scope: string): void {
  const composite = `${scope}:${key}`;
  const existing = store.get(composite);
  if (existing) {
    store.set(composite, { state: "done", createdAt: existing.createdAt });
  }
}
