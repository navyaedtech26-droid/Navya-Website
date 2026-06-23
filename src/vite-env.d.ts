/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GA4 measurement ID, e.g. "G-XXXXXXXXXX". Optional. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
  /** Supabase project URL, e.g. "https://xyz.supabase.co". */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase public anon key (safe in the browser; gated by RLS). */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
