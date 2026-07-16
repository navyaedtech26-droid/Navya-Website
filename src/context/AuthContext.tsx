/* eslint-disable react-refresh/only-export-components */
/**
 * Authentication + user data.
 *
 * Wraps Supabase Auth and exposes the current session, the signed-in user's
 * profile row, and the common auth actions. When Supabase is not configured
 * everything is null / no-op so the rest of the app keeps working.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { authRedirectUrl } from "@/lib/authRedirect";
import { logger } from "@/lib/logger";
import type { ProfileRow } from "@/types/database";

const log = logger.scope("auth");

interface AuthResult {
  error?: string;
}

interface AuthContextType {
  loading: boolean;
  session: Session | null;
  user: User | null;
  profile: ProfileRow | null;
  /**
   * Set when the most recent profile fetch failed (network/RLS). The profile
   * is cleared rather than left stale so the UI never trusts old data.
   */
  profileError: string | null;
  /** True only once the profile is loaded and its role is 'admin'. */
  isAdmin: boolean;
  signUp: (email: string, password: string, fullName?: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  /** Email a magic link + one-time code that return to /admin/confirm. Never
   *  creates a new account — only an already-provisioned admin can use it. */
  signInWithOtp: (email: string) => Promise<AuthResult>;
  /** Verify the 6-digit code from the magic-link email without leaving the page. */
  verifyOtp: (email: string, token: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  /** Email a password-reset link that returns to /admin/reset-password. */
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  /** Set a new password for the currently-recovering session. */
  updatePassword: (password: string) => Promise<AuthResult>;
  /** Request an email-change confirmation link that returns to /admin/confirm. */
  updateEmail: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  const loadProfile = useCallback(async (userId: string | undefined) => {
    if (!supabase || !userId) {
      setProfile(null);
      setProfileError(null);
      return;
    }
    // This runs fire-and-forget from onAuthStateChange, so any failure must be
    // caught here — an unhandled rejection would otherwise leave the profile
    // (and `isAdmin`) silently stale with nothing surfaced to the UI.
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();
      if (error) throw error;
      setProfile(data ?? null);
      setProfileError(null);
    } catch (err) {
      log.error("failed to load profile", err, { userId });
      setProfile(null);
      setProfileError("We couldn't load your account details. Please retry.");
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth
      .getSession()
      .then(async ({ data }) => {
        setSession(data.session);
        await loadProfile(data.session?.user.id);
      })
      .catch((err) => log.error("failed to restore session", err))
      .finally(() => setLoading(false));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      void loadProfile(next?.user.id);
    });

    return () => sub.subscription.unsubscribe();
  }, [loadProfile]);

  const signUp = useCallback<AuthContextType["signUp"]>(
    async (email, password, fullName) => {
      if (!supabase) return { error: "Authentication is not configured." };
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: authRedirectUrl("/admin/confirm"),
        },
      });
      return { error: error?.message };
    },
    []
  );

  const signIn = useCallback<AuthContextType["signIn"]>(async (email, password) => {
    if (!supabase) return { error: "Authentication is not configured." };
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message };
  }, []);

  const signInWithOtp = useCallback<AuthContextType["signInWithOtp"]>(async (email) => {
    if (!supabase) return { error: "Authentication is not configured." };
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: authRedirectUrl("/admin/confirm"),
        // Admin sign-in is invite-only — a magic link must never provision a
        // new account, only authenticate an existing one.
        shouldCreateUser: false,
      },
    });
    return { error: error?.message };
  }, []);

  const verifyOtp = useCallback<AuthContextType["verifyOtp"]>(async (email, token) => {
    if (!supabase) return { error: "Authentication is not configured." };
    const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    return { error: error?.message };
  }, []);

  const signOut = useCallback(async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setProfile(null);
    setProfileError(null);
  }, []);

  const refreshProfile = useCallback(
    () => loadProfile(session?.user.id),
    [loadProfile, session]
  );

  const requestPasswordReset = useCallback<AuthContextType["requestPasswordReset"]>(
    async (email) => {
      if (!supabase) return { error: "Authentication is not configured." };
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: authRedirectUrl("/admin/reset-password"),
      });
      return { error: error?.message };
    },
    []
  );

  const updatePassword = useCallback<AuthContextType["updatePassword"]>(
    async (password) => {
      if (!supabase) return { error: "Authentication is not configured." };
      const { error } = await supabase.auth.updateUser({ password });
      return { error: error?.message };
    },
    []
  );

  const updateEmail = useCallback<AuthContextType["updateEmail"]>(async (email) => {
    if (!supabase) return { error: "Authentication is not configured." };
    const { error } = await supabase.auth.updateUser(
      { email },
      { emailRedirectTo: authRedirectUrl("/admin/confirm") }
    );
    return { error: error?.message };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        session,
        user: session?.user ?? null,
        profile,
        profileError,
        isAdmin: profile?.role === "admin",
        signUp,
        signIn,
        signInWithOtp,
        verifyOtp,
        signOut,
        refreshProfile,
        requestPasswordReset,
        updatePassword,
        updateEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
