/**
 * Admin sign-in. Single-purpose: there is no public sign-up. Access to the
 * dashboard is restricted to accounts whose profile role is `admin`
 * (granted manually in the database — see supabase/schema.sql). Supports
 * both password sign-in and a passwordless email link/code (never creates a
 * new account — see AuthContext.signInWithOtp).
 */
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, MailCheck } from "lucide-react";
import Seo from "@/components/common/Seo";
import Container from "@/components/common/Container";
import { Field, Input } from "@/components/common/Field";
import { Spinner } from "@/components/common/Spinner";
import { useAuth } from "@/context/AuthContext";
import { useResendCooldown } from "@/hooks/useResendCooldown";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

/** Confirms the just-authenticated account actually has admin access; signs
 *  it back out otherwise. Shared by the password and OTP sign-in paths. */
async function admitIfAdmin(signOut: () => Promise<void>): Promise<string | null> {
  const { data } = await supabase!
    .from("profiles")
    .select("role")
    .eq("id", (await supabase!.auth.getUser()).data.user?.id ?? "")
    .maybeSingle();

  if (data?.role !== "admin") {
    await signOut();
    return "This account does not have admin access.";
  }
  return null;
}

export default function AdminLogin() {
  const navigate = useNavigate();
  const { user, isAdmin, signIn, signInWithOtp, verifyOtp, signOut, loading: authLoading } =
    useAuth();

  const [mode, setMode] = useState<"password" | "otp">("password");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [otpEmail, setOtpEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const otpCooldown = useResendCooldown(60);

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
    const admitError = await admitIfAdmin(signOut);
    setLoading(false);
    if (admitError) {
      setError(admitError);
      return;
    }

    navigate("/admin", { replace: true });
  };

  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (!otpEmail.trim()) {
      setOtpError("Enter your account email.");
      return;
    }

    setOtpLoading(true);
    const { error: sendError } = await signInWithOtp(otpEmail.trim());
    setOtpLoading(false);

    if (sendError) {
      setOtpError(sendError);
      return;
    }
    setOtpSent(true);
    otpCooldown.start();
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    if (otpCode.trim().length < 6) {
      setOtpError("Enter the 6-digit code from your email.");
      return;
    }

    setOtpLoading(true);
    const { error: verifyError } = await verifyOtp(otpEmail.trim(), otpCode.trim());

    if (verifyError) {
      setOtpLoading(false);
      setOtpError(verifyError);
      return;
    }

    const admitError = await admitIfAdmin(signOut);
    setOtpLoading(false);
    if (admitError) {
      setOtpError(admitError);
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
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
                <ShieldCheck size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-heading">
                  Admin Dashboard
                </h1>
                <p className="text-sm text-faint">Sign in to manage content</p>
              </div>
            </div>

            {!isSupabaseConfigured && (
              <p className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Supabase is not configured. Add your keys to
                <code className="mx-1 rounded bg-amber-100 px-1">.env</code>
                to enable the dashboard.
              </p>
            )}

            <div className="mt-6 grid grid-cols-2 gap-1 rounded-xl bg-mist p-1">
              {(["password", "otp"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMode(tab)}
                  aria-pressed={mode === tab}
                  className={cn(
                    "rounded-lg py-2 text-xs font-semibold transition-colors",
                    mode === tab ? "bg-white text-primary shadow-sm" : "text-faint hover:text-heading"
                  )}
                >
                  {tab === "password" ? "Password" : "Email link or code"}
                </button>
              ))}
            </div>

            {mode === "password" ? (
            <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-4">
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
                    className="absolute inset-y-0 right-0 flex items-center px-3.5 text-faint transition-colors hover:text-heading focus:outline-none focus-visible:text-primary"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </Field>

              <div className="-mt-1 flex justify-end">
                <Link
                  to="/admin/forgot-password"
                  className="text-xs font-medium text-faint transition-colors hover:text-primary"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || authLoading || !isSupabaseConfigured}
                className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark disabled:opacity-70"
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
            ) : (
            <div className="mt-6 flex flex-col gap-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} noValidate className="flex flex-col gap-4">
                  <Field label="Email Address" id="otp-email">
                    <Input
                      id="otp-email"
                      type="email"
                      autoComplete="email"
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      placeholder="admin@navyaedtech.com"
                    />
                  </Field>

                  {otpError && (
                    <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                      {otpError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={otpLoading || authLoading || !isSupabaseConfigured}
                    className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark disabled:opacity-70"
                  >
                    {otpLoading ? (
                      <>
                        <Spinner />
                        Sending...
                      </>
                    ) : (
                      "Send link & code"
                    )}
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-3">
                    <MailCheck size={18} className="mt-0.5 shrink-0 text-primary" />
                    <p className="text-sm text-heading">
                      We sent a sign-in link and a 6-digit code to{" "}
                      <span className="font-medium">{otpEmail}</span>. Click the link, or enter
                      the code below.
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} noValidate className="flex flex-col gap-4">
                    <Field label="6-digit code" id="otp-code">
                      <Input
                        id="otp-code"
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                        placeholder="123456"
                      />
                    </Field>

                    {otpError && (
                      <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                        {otpError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={otpLoading || !isSupabaseConfigured}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark disabled:opacity-70"
                    >
                      {otpLoading ? (
                        <>
                          <Spinner />
                          Verifying...
                        </>
                      ) : (
                        "Verify & sign in"
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={!otpCooldown.canResend || otpLoading}
                      className="text-xs font-medium text-faint transition-colors hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {otpCooldown.canResend
                        ? "Resend link & code"
                        : `Resend in ${otpCooldown.remaining}s`}
                    </button>
                  </form>
                </>
              )}
            </div>
            )}
          </motion.div>

          <p className="mt-6 text-center text-xs text-faint">
            <Link to="/" className="transition-colors hover:text-heading">
              ← Back to website
            </Link>
          </p>
        </Container>
      </section>
    </>
  );
}
