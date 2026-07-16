/**
 * Set a new password. Reached via the email link from /admin/forgot-password,
 * which establishes a short-lived recovery session (Supabase handles the token
 * in the URL automatically). On success we send the admin to sign in again.
 */
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, CheckCircle2 } from "lucide-react";
import { LoadingScreen, Spinner } from "@/components/common/Spinner";
import Seo from "@/components/common/Seo";
import Container from "@/components/common/Container";
import { useAuth } from "@/context/AuthContext";
import { useAuthCallback } from "@/hooks/useAuthCallback";
import { isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export default function AdminResetPassword() {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const { status, errorMessage } = useAuthCallback();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setLoading(true);
    const { error: updateError } = await updatePassword(password);
    setLoading(false);
    if (updateError) {
      setError(updateError);
      return;
    }
    setDone(true);
    setTimeout(() => navigate("/admin/login", { replace: true }), 2200);
  };

  return (
    <>
      <Seo
        title="Set New Password | Navya EdTech"
        description="Restricted area."
        path="/admin/reset-password"
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
            {done ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200">
                  <CheckCircle2 size={22} className="text-emerald-600" />
                </div>
                <h1 className="mt-5 font-display text-xl font-semibold text-heading">
                  Password updated
                </h1>
                <p className="mt-2 text-sm text-faint">
                  Redirecting you to sign in…
                </p>
              </div>
            ) : status === "pending" ? (
              <LoadingScreen label="Confirming your link…" className="min-h-0 py-6" />
            ) : status === "error" ? (
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 ring-1 ring-red-200">
                  <ShieldAlert size={22} className="text-red-600" />
                </div>
                <h1 className="mt-5 font-display text-xl font-semibold text-heading">
                  Link expired or already used
                </h1>
                <p className="mt-2 text-sm text-faint">{errorMessage}</p>
                <Link
                  to="/admin/forgot-password"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark"
                >
                  Request a new link
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
                    <ShieldCheck size={20} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="font-display text-xl font-semibold text-heading">
                      Set a new password
                    </h1>
                    <p className="text-sm text-faint">Choose something strong</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm font-medium text-heading">
                      New Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={inputCls}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="confirm" className="text-sm font-medium text-heading">
                      Confirm Password
                    </label>
                    <input
                      id="confirm"
                      type="password"
                      autoComplete="new-password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
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
                        Updating...
                      </>
                    ) : (
                      "Update password"
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
  "focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(8,30,77,0.15)]"
);
