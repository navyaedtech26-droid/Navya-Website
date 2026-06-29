/**
 * Cloudflare Turnstile config. The **site** key is public (safe in the browser);
 * the matching **secret** key lives only in the Supabase Edge Function
 * (`TURNSTILE_SECRET_KEY`) and verifies tokens server-side.
 *
 * When `VITE_TURNSTILE_SITE_KEY` is absent the whole feature is a no-op: the
 * widget renders nothing and form submissions take the direct path. So local
 * dev and not-yet-configured deployments keep working.
 */
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as
  | string
  | undefined;

/** True when a Turnstile site key is configured. */
export function isTurnstileConfigured(): boolean {
  return Boolean(TURNSTILE_SITE_KEY);
}
