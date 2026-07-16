/**
 * Unified landing page for Supabase auth email redirects reached from an
 * admin's inbox: signup confirmation, magic-link/OTP sign-in, and email-change
 * confirmation. Supabase auto-consumes the URL token via detectSessionInUrl —
 * this page just waits for the result and routes the admin onward. Password
 * recovery links go to /admin/reset-password instead (separate flow).
 */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, MailCheck, ShieldAlert } from "lucide-react";
import Seo from "@/components/common/Seo";
import Container from "@/components/common/Container";
import { LoadingScreen } from "@/components/common/Spinner";
import { useAuthCallback } from "@/hooks/useAuthCallback";
import { supabase } from "@/lib/supabase";

type LinkType = "signup" | "magiclink" | "email_change" | "invite" | null;

const COPY: Record<Exclude<LinkType, null>, { confirming: string; success: string }> = {
  signup: { confirming: "Confirming your account…", success: "Account confirmed" },
  magiclink: { confirming: "Signing you in…", success: "Signed in" },
  email_change: { confirming: "Confirming your new email…", success: "Email updated" },
  invite: { confirming: "Confirming your invite…", success: "Invite accepted" },
};

function readLinkType(): LinkType {
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const search = new URLSearchParams(window.location.search);
  return (hash.get("type") || search.get("type")) as LinkType;
}

export default function AdminConfirm() {
  const navigate = useNavigate();
  const { status, errorMessage } = useAuthCallback();
  const [linkType] = useState<LinkType>(readLinkType);
  const [roleChecked, setRoleChecked] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  // Once Supabase has established the session, confirm the account actually
  // has admin access before sending it anywhere — the email link alone
  // doesn't grant dashboard access (role is still granted manually, see
  // AdminLogin.tsx).
  useEffect(() => {
    if (status !== "success" || !supabase) return;
    let cancelled = false;

    (async () => {
      const { data: userData } = await supabase!.auth.getUser();
      const { data } = await supabase!
        .from("profiles")
        .select("role")
        .eq("id", userData.user?.id ?? "")
        .maybeSingle();
      if (cancelled) return;

      const isAdmin = data?.role === "admin";
      setHasAdminAccess(isAdmin);
      setRoleChecked(true);

      if (isAdmin) {
        setTimeout(() => navigate("/admin", { replace: true }), 1200);
      } else {
        await supabase!.auth.signOut();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status, navigate]);

  const copy = COPY[linkType ?? "signup"];

  return (
    <>
      <Seo
        title="Confirming… | Navya EdTech"
        description="Restricted area."
        path="/admin/confirm"
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
            className="rounded-3xl card-light p-8 text-center sm:p-10"
          >
            {status === "pending" && (
              <>
                <LoadingScreen label={copy.confirming} className="min-h-0 py-2" />
                <p className="mt-4 text-sm text-faint">{copy.confirming}</p>
              </>
            )}

            {status === "error" && (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 ring-1 ring-red-200">
                  <ShieldAlert size={22} className="text-red-600" />
                </div>
                <h1 className="mt-5 font-display text-xl font-semibold text-heading">
                  Link expired or already used
                </h1>
                <p className="mt-2 text-sm text-faint">{errorMessage}</p>
                <Link
                  to="/admin/login"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark"
                >
                  Back to sign in
                </Link>
              </>
            )}

            {status === "success" && !roleChecked && (
              <LoadingScreen label="Checking access…" className="min-h-0 py-2" />
            )}

            {status === "success" && roleChecked && hasAdminAccess && (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-200">
                  <CheckCircle2 size={22} className="text-emerald-600" />
                </div>
                <h1 className="mt-5 font-display text-xl font-semibold text-heading">
                  {copy.success}
                </h1>
                <p className="mt-2 text-sm text-faint">Redirecting you now…</p>
              </>
            )}

            {status === "success" && roleChecked && !hasAdminAccess && (
              <>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/30">
                  <MailCheck size={22} className="text-primary" />
                </div>
                <h1 className="mt-5 font-display text-xl font-semibold text-heading">
                  Email confirmed
                </h1>
                <p className="mt-2 text-sm text-faint">
                  Your email is confirmed, but this account doesn't have admin access yet.
                  Ask an existing administrator to grant it.
                </p>
                <Link
                  to="/admin/login"
                  className="mt-6 inline-flex items-center justify-center rounded-2xl border border-line bg-white px-6 py-3 text-sm font-semibold text-heading transition-colors duration-300 hover:bg-mist"
                >
                  Back to sign in
                </Link>
              </>
            )}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
