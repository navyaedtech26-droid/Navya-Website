/**
 * Base URL for Supabase auth email redirects (signup confirmation, magic
 * link, password reset, email change). Uses VITE_SITE_URL when set (so
 * production always redirects to the real domain even if the request
 * somehow originates elsewhere), and falls back to the current origin so
 * local dev works with zero config.
 */
const configuredSiteUrl = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(
  /\/+$/,
  ""
);

export function authRedirectUrl(path: string): string {
  const base = configuredSiteUrl || window.location.origin;
  return `${base}${path}`;
}
