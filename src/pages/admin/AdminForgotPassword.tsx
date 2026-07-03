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

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-mist py-20">
        <div className="absolute left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/[0.06] blur-[120px]" />
        <div className="light-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <Container className="relative max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl card-light p-8 sm:p-10"
          >
            {sent ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
                  <MailCheck size={22} className="text-primary" />
                </div>
                <h1 className="mt-5 font-display text-xl font-semibold text-heading">
                  Check your email
                </h1>
                <p className="mt-2 text-sm text-faint">
                  If an account exists for{" "}
                  <span className="text-heading">{email}</span>, we've sent a link to
                  reset your password.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
                    <KeyRound size={20} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="font-display text-xl font-semibold text-heading">
                      Forgot password
                    </h1>
                    <p className="text-sm text-faint">
                      We'll email you a reset link
                    </p>
                  </div>
                </div>

                {!isSupabaseConfigured && (
                  <p className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    Supabase is not configured.
                  </p>
                )}

                <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-heading">
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
                    <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || !isSupabaseConfigured}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark disabled:opacity-70"
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

          <p className="mt-6 text-center text-xs text-faint">
            <Link to="/admin/login" className="transition-colors hover:text-heading">
              ← Back to sign in
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}

const inputCls = cn(
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-sm text-heading placeholder:text-faint/70 outline-none transition-all duration-200",
  "focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.15)]"
);
