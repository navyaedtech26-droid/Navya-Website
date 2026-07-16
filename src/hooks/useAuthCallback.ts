import { useEffect, useState } from "react";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type CallbackStatus = "pending" | "success" | "error";

interface CallbackResult {
  status: CallbackStatus;
  event: AuthChangeEvent | null;
  session: Session | null;
  errorMessage: string | null;
}

const ERROR_MESSAGES: Record<string, string> = {
  otp_expired: "This link has expired. Request a new one below.",
  access_denied: "This link is invalid or has already been used.",
};

const GENERIC_ERROR = "This link is invalid or has expired. Request a new one below.";

/** Supabase redirects failed exchanges back with #error=...&error_code=...
 *  in the URL fragment (or query, depending on flow) rather than throwing —
 *  the client never gets a session, so this is the only place to catch it. */
function parseRedirectError(): string | null {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const search = new URLSearchParams(window.location.search);
  const error = hash.get("error") || search.get("error");
  const errorCode = hash.get("error_code") || search.get("error_code");
  const errorDescription = hash.get("error_description") || search.get("error_description");
  if (!error && !errorCode) return null;
  if (errorCode && ERROR_MESSAGES[errorCode]) return ERROR_MESSAGES[errorCode];
  if (errorDescription) return decodeURIComponent(errorDescription.replace(/\+/g, " "));
  return GENERIC_ERROR;
}

/**
 * Resolves the outcome of a Supabase auth email redirect (signup
 * confirmation, magic link, email change). The client auto-consumes the URL
 * fragment via `detectSessionInUrl`, so this hook just waits for the
 * resulting auth event — or surfaces an explicit `#error=...` from an
 * expired/already-used link, or times out if neither ever arrives.
 */
export function useAuthCallback(timeoutMs = 2500): CallbackResult {
  const [result, setResult] = useState<CallbackResult>(() => {
    const errorMessage = parseRedirectError();
    return errorMessage
      ? { status: "error", event: null, session: null, errorMessage }
      : { status: "pending", event: null, session: null, errorMessage: null };
  });

  useEffect(() => {
    if (!supabase || parseRedirectError()) return;

    let settled = false;
    const settle = (next: CallbackResult) => {
      if (settled) return;
      settled = true;
      setResult(next);
    };

    const { data: sub } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session) => {
      if (event === "SIGNED_IN" || event === "PASSWORD_RECOVERY" || event === "USER_UPDATED") {
        settle({ status: "success", event, session, errorMessage: null });
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        settle({ status: "success", event: null, session: data.session, errorMessage: null });
      }
    });

    const t = window.setTimeout(() => {
      settle({ status: "error", event: null, session: null, errorMessage: GENERIC_ERROR });
    }, timeoutMs);

    return () => {
      sub.subscription.unsubscribe();
      window.clearTimeout(t);
    };
    // Runs once on mount — this is a one-shot redirect-result listener, not a
    // reactive subscription to `timeoutMs`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
}
