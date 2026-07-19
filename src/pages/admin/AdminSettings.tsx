/**
 * Authenticated admin-only settings: change the signed-in account's email,
 * and provision a new admin account. Provisioning only sends the signup
 * confirmation email — the new account still needs `role = 'admin'` granted
 * manually in the database (see AdminLogin.tsx), matching this app's
 * existing manual-grant convention.
 */
import { useCallback, useState, type FormEvent } from "react";
import { KeyRound, Mail, UserPlus } from "lucide-react";
import Seo from "@/components/common/Seo";
import { Spinner } from "@/components/common/Spinner";
import { PageHeader, Card, Alert, Field, inputCls } from "@/components/admin/ui";
import { useAuth } from "@/context/AuthContext";
import { useResendCooldown } from "@/hooks/useResendCooldown";
import { cn } from "@/lib/utils";

export default function AdminSettings() {
  const { user, updateEmail, signUp } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const emailCooldown = useResendCooldown(60);

  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePassword, setInvitePassword] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const inviteCooldown = useResendCooldown(60);

  const sendEmailChange = useCallback(async () => {
    setEmailError(null);
    if (!newEmail.trim() || newEmail.trim() === user?.email) {
      setEmailError("Enter a different email address.");
      return;
    }
    setEmailLoading(true);
    const { error } = await updateEmail(newEmail.trim());
    setEmailLoading(false);
    if (error) {
      setEmailError(error);
      return;
    }
    setEmailSent(true);
    emailCooldown.start();
  }, [newEmail, user?.email, updateEmail, emailCooldown]);

  const submitEmailChange = (e: FormEvent) => {
    e.preventDefault();
    void sendEmailChange();
  };

  const sendInvite = useCallback(async () => {
    setInviteError(null);
    if (!inviteEmail.trim() || invitePassword.length < 8) {
      setInviteError("Enter an email and a starting password of at least 8 characters.");
      return;
    }
    setInviteLoading(true);
    const { error } = await signUp(inviteEmail.trim(), invitePassword);
    setInviteLoading(false);
    if (error) {
      setInviteError(error);
      return;
    }
    setInviteSent(true);
    inviteCooldown.start();
  }, [inviteEmail, invitePassword, signUp, inviteCooldown]);

  const submitInvite = (e: FormEvent) => {
    e.preventDefault();
    void sendInvite();
  };

  return (
    <>
      <Seo
        title="Account Settings | Navya EdTech"
        description="Restricted area."
        path="/admin/settings"
        index={false}
      />

      <div className="flex flex-col gap-6">
        <PageHeader
          title="Account Settings"
          subtitle="Manage your sign-in email and provision new admin accounts"
        />

        <Card
          title="Change email"
          subtitle={`Signed in as ${user?.email ?? "N/A"}`}
        >
          {emailSent ? (
            <div className="flex flex-col gap-3">
              <Alert kind="success">
                Confirmation sent to <strong>{newEmail}</strong>. Click the link there to finish.
                Your sign-in email won't change until it's confirmed.
              </Alert>
              <button
                type="button"
                onClick={() => void sendEmailChange()}
                disabled={!emailCooldown.canResend || emailLoading}
                className="self-start text-xs font-medium text-[#6c757d] transition-colors hover:text-[#007bff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {emailCooldown.canResend
                  ? "Resend confirmation"
                  : `Resend in ${emailCooldown.remaining}s`}
              </button>
            </div>
          ) : (
            <form onSubmit={submitEmailChange} className="flex flex-col gap-4">
              <Field label="New email address" htmlFor="new-email">
                <div className="relative">
                  <Mail
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]"
                  />
                  <input
                    id="new-email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="you@navyaedtech.com"
                    className={cn(inputCls, "pl-9")}
                  />
                </div>
              </Field>
              {emailError && <Alert kind="error">{emailError}</Alert>}
              <button
                type="submit"
                disabled={emailLoading}
                className="inline-flex w-fit items-center gap-2 rounded-[3px] bg-[#007bff] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0069d9] disabled:opacity-70"
              >
                {emailLoading && <Spinner size={16} />}
                Send confirmation
              </button>
            </form>
          )}
        </Card>

        <Card
          title="Add an admin"
          subtitle="Sends a signup confirmation email. Grant dashboard access afterwards in the database."
        >
          {inviteSent ? (
            <div className="flex flex-col gap-3">
              <Alert kind="success">
                Confirmation sent to <strong>{inviteEmail}</strong>. Once they confirm, set their{" "}
                <code className="rounded bg-[#f4f6f9] px-1">profiles.role</code> to{" "}
                <code className="rounded bg-[#f4f6f9] px-1">admin</code> in Supabase.
              </Alert>
              <button
                type="button"
                onClick={() => void sendInvite()}
                disabled={!inviteCooldown.canResend || inviteLoading}
                className="self-start text-xs font-medium text-[#6c757d] transition-colors hover:text-[#007bff] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {inviteCooldown.canResend
                  ? "Resend confirmation"
                  : `Resend in ${inviteCooldown.remaining}s`}
              </button>
            </div>
          ) : (
            <form onSubmit={submitInvite} className="flex flex-col gap-4">
              <Field label="Email address" htmlFor="invite-email">
                <div className="relative">
                  <UserPlus
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]"
                  />
                  <input
                    id="invite-email"
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="newadmin@navyaedtech.com"
                    className={cn(inputCls, "pl-9")}
                  />
                </div>
              </Field>
              <Field
                label="Starting password"
                htmlFor="invite-password"
                hint="They can change it after signing in, or use the email link/code instead."
              >
                <div className="relative">
                  <KeyRound
                    size={16}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]"
                  />
                  <input
                    id="invite-password"
                    type="password"
                    value={invitePassword}
                    onChange={(e) => setInvitePassword(e.target.value)}
                    placeholder="••••••••"
                    className={cn(inputCls, "pl-9")}
                  />
                </div>
              </Field>
              {inviteError && <Alert kind="error">{inviteError}</Alert>}
              <button
                type="submit"
                disabled={inviteLoading}
                className="inline-flex w-fit items-center gap-2 rounded-[3px] bg-[#007bff] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0069d9] disabled:opacity-70"
              >
                {inviteLoading && <Spinner size={16} />}
                Send confirmation
              </button>
            </form>
          )}
        </Card>
      </div>
    </>
  );
}
