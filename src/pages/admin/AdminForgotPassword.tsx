/**
 * Request a password-reset email. Supabase sends a magic link back to
 * /admin/reset-password where the new password is set.
 */
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { KeyRound, MailCheck } from "lucide-react";
import { Spinner } from "@/components/common/Spinner";
import Seo from "@/components/common/Seo";
import Container from "@/components/common/Container";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function AdminForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) {
      setError("Enter your account email.");
      return;
    }
    setLoading(true);
    const { error: resetError } = await requestPasswordReset(email.trim());
    setLoading(false);
    if (resetError) {
      setError(resetError);
      return;
    }
    setSent(true);
  };

  return (
    <>
      <Seo
        title="Reset Password | Navya EdTech"
        description="Restricted area."
        path="/admin/forgot-password"
        index={false}
      />

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-bg py-20">
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

        <Container className="relative max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl glass p-8 ring-1 ring-white/10 sm:p-10"
          >
            {sent ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand/20 ring-1 ring-brand/40">
                  <MailCheck size={22} className="text-brand-light" />
                </div>
                <h1 className="mt-5 font-display text-xl font-semibold text-ink">
                  Check your email
                </h1>
                <p className="mt-2 text-sm text-ink-muted">
                  If an account exists for{" "}
                  <span className="text-ink">{email}</span>, we've sent a link to
                  reset your password.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20 ring-1 ring-brand/40">
                    <KeyRound size={20} className="text-brand-light" />
                  </div>
                  <div>
                    <h1 className="font-display text-xl font-semibold text-ink">
                      Forgot password
                    </h1>
                    <p className="text-sm text-ink-muted">
                      We'll email you a reset link
                    </p>
                  </div>
                </div>

                {!isSupabaseConfigured && (
                  <p className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                    Supabase is not configured.
                  </p>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-ink">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@navyaedtech.com"
                      className={inputCls}
                    />
                  </div>

                  {error && (
                    <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !isSupabaseConfigured}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-bg shadow-glow-sm transition-all duration-300 hover:shadow-glow disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Spinner />
                        Sending...
                      </>
                    ) : (
                      "Send reset link"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>

          <p className="mt-6 text-center text-xs text-ink-muted">
            <Link to="/admin/login" className="transition-colors hover:text-ink">
              ← Back to sign in
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}

const inputCls = cn(
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 outline-none transition-all duration-200",
  "focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(245, 166, 35,0.18)]"
);
