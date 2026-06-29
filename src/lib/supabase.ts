/**
 * Supabase client.
 *
 * Configure these in an `.env` file (copy from `.env.example`):
 *   VITE_SUPABASE_URL       – your project URL,  e.g. https://xyz.supabase.co
 *   VITE_SUPABASE_ANON_KEY  – the public anon key (safe to ship in the browser;
 *                             access is gated by Row-Level Security, not secrecy)
 *
 * When the env vars are absent the client is `null`, so the site still builds
 * and runs locally — callers fall back to static data and log a warning.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { logger } from "@/lib/logger";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** True when Supabase credentials are present. */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  logger.warn(
    "[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set — " +
      "database features are disabled and static fallbacks are used."
  );
}

export const supabase: SupabaseClient<Database> | null = isSupabaseConfigured
  ? createClient<Database>(url!, anonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
