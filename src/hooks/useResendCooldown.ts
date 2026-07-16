import { useCallback, useEffect, useState } from "react";

/**
 * Throttles a "resend email" action. `start()` begins the countdown;
 * `canResend` is false until it reaches zero. Purely client-side UX guard —
 * Supabase's own rate limit is still the real enforcement (see supabase/README.md).
 */
export function useResendCooldown(seconds = 60) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = window.setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => window.clearInterval(id);
  }, [remaining]);

  const start = useCallback(() => setRemaining(seconds), [seconds]);

  return { remaining, canResend: remaining === 0, start };
}
