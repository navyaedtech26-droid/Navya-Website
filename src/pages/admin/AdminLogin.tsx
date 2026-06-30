/**
 * Admin sign-in. Single-purpose: there is no public sign-up. Access to the
 * dashboard is restricted to accounts whose profile role is `admin`
 * (granted manually in the database — see supabase/schema.sql).
 */
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import Seo from "@/components/common/Seo";
import Container from "@/components/common/Container";
import { Field, Input } from "@/components/common/Field";
import { Spinner } from "@/components/common/Spinner";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, isAdmin, signIn, signOut, loading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Signed in as an admin → go straight to the dashboard.
  useEffect(() => {
    if (user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await signIn(email.trim(), password);

    if (signInError) {
      setLoading(false);
      setError(signInError);
      return;
    }

    // Sign-in succeeded — confirm the account is actually an admin before
    // admitting it. The profile in context may lag a tick, so check directly.
    const { data } = await supabase!
      .from("profiles")
      .select("role")
      .eq("id", (await supabase!.auth.getUser()).data.user?.id ?? "")
      .maybeSingle();

    setLoading(false);

    if (data?.role !== "admin") {
      await signOut();
      setError("This account does not have admin access.");
      return;
    }

    navigate("/admin", { replace: true });
  };

  return (
    <>
      <Seo
        title="Admin Sign In | Navya EdTech"
        description="Restricted area."
        path="/admin/login"
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
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/20 ring-1 ring-brand/40">
                <ShieldCheck size={20} className="text-brand-light" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-ink">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-ink-muted">Sign in to manage content</p>
              </div>
            </div>

            {!isSupabaseConfigured && (
              <p className="mt-6 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
                Supabase is not configured. Add your keys to
                <code className="mx-1 rounded bg-white/10 px-1">.env</code>
                to enable the dashboard.
              </p>
            )}

            <form onSubmit={handleSubmit} noValidate className="mt-7 flex flex-col gap-4">
              <Field label="Email Address" id="email">
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@navyaedtech.com"
                />
              </Field>

              <Field label="Password" id="password">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    title={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-0 flex items-center px-3.5 text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:text-brand-light"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>

              <div className="-mt-1 flex justify-end">
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-medium text-ink-muted transition-colors hover:text-brand-light"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || authLoading || !isSupabaseConfigured}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-6 py-3.5 text-sm font-semibold text-white shadow-glow-sm transition-all duration-300 hover:shadow-glow disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Spinner />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </motion.div>

          <p className="mt-6 text-center text-xs text-ink-muted">
            <Link to="/" className="transition-colors hover:text-ink">
              ← Back to website
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
