import { useRef, useState } from "react";
import { cooldownRemaining, cooldownMessage, markUsed } from "@/lib/rateLimit";

/** Minimum time (ms) a human plausibly needs to fill a form before submitting. */
const MIN_FILL_MS = 3000;

export interface SpamGuard {
  /** Current honeypot value — bind to a `<Honeypot>`. */
  honeypot: string;
  setHoneypot: (value: string) => void;
  /** True when the honeypot was filled (almost certainly a bot). */
  isBot: boolean;
  /**
   * Validate submission timing and the per-browser cooldown. Returns a
   * user-facing error message to display, or `null` when it's safe to proceed.
   * `tooSoonMessage` lets each form keep its own wording.
   */
  check: (tooSoonMessage?: string) => string | null;
  /** Start the cooldown window — call after a successful submit. */
  markUsed: () => void;
}

/**
 * Lightweight client-side spam defences shared by the public forms: a honeypot,
 * a "filled too fast to be human" timing check, and a per-browser submit
 * cooldown. Server-side validation still applies — this only trims obvious junk.
 */
export function useSpamGuard(key: string, cooldownMs: number): SpamGuard {
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef(Date.now());

  const check = (tooSoonMessage = "Please take a moment before submitting.") => {
    if (Date.now() - mountedAt.current < MIN_FILL_MS) return tooSoonMessage;
    const remaining = cooldownRemaining(key, cooldownMs);
    if (remaining > 0) return cooldownMessage(remaining);
    return null;
  };

  return {
    honeypot,
    setHoneypot,
    isBot: honeypot.trim() !== "",
    check,
    markUsed: () => markUsed(key),
  };
}
