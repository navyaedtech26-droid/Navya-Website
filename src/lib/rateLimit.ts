/**
 * Lightweight client-side rate limiting backed by localStorage.
 *
 * This is a UX guard, not a security boundary — it stops accidental
 * double-submits and trivial spam from the same browser. The real enforcement
 * lives server-side (see the throttle trigger in `supabase/schema.sql`).
 */

/** Milliseconds remaining before `key` is allowed again, or 0 if ready now. */
export function cooldownRemaining(key: string, windowMs: number): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(storageKey(key));
  if (!raw) return 0;
  const last = Number(raw);
  if (!Number.isFinite(last)) return 0;
  const elapsed = Date.now() - last;
  return elapsed >= windowMs ? 0 : windowMs - elapsed;
}

/** Stamp `key` as just-used so subsequent calls are throttled. */
export function markUsed(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(storageKey(key), String(Date.now()));
  } catch {
    // Storage can be unavailable (private mode); failing open is fine here.
  }
}

/** Human-friendly "try again in N seconds" string. */
export function cooldownMessage(remainingMs: number): string {
  const secs = Math.ceil(remainingMs / 1000);
  return `Please wait ${secs} second${secs === 1 ? "" : "s"} before trying again.`;
}

function storageKey(key: string): string {
  return `navya:cooldown:${key}`;
}
