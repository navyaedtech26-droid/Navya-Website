/**
 * Contact form submissions. Sent directly from the browser via EmailJS — no
 * backend at all. EmailJS's public key is safe to expose (unlike a raw
 * Resend/SMTP key): restrict abuse via EmailJS dashboard → Account →
 * Security → "Allowed origins", set to this site's domain.
 */
import emailjs from "@emailjs/browser";
import { logger } from "@/lib/logger";

const log = logger.scope("contact");

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const NOTIFY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_NOTIFY_TEMPLATE_ID as string | undefined;
const AUTOREPLY_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID as
  | string
  | undefined;

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
  /** Honeypot — must always be empty for a real human. */
  company_website?: string;
}

export interface SubmitResult {
  ok: boolean;
  error?: string;
}

/**
 * Email a contact message via EmailJS. Returns `{ ok }` so the UI can react.
 */
export async function submitContact(input: ContactInput): Promise<SubmitResult> {
  // Honeypot tripped → a bot filled a field humans never see. Pretend success
  // so we don't reveal the trap, but never send the request.
  if (input.company_website && input.company_website.trim() !== "") {
    return { ok: true };
  }

  if (!PUBLIC_KEY || !SERVICE_ID || !NOTIFY_TEMPLATE_ID) {
    // No backend configured (e.g. local dev) — don't hard-fail the UI.
    log.warn("EmailJS is not configured (VITE_EMAILJS_*); message was not sent.");
    return { ok: true };
  }

  const templateParams = {
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone?.trim() || "Not provided",
    service: input.service || "Not specified",
    budget: input.budget || "Not specified",
    message: input.message.trim(),
  };

  try {
    await emailjs.send(SERVICE_ID, NOTIFY_TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY });

    if (AUTOREPLY_TEMPLATE_ID) {
      // Best-effort: a failed auto-reply shouldn't fail the whole submission.
      emailjs
        .send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, { publicKey: PUBLIC_KEY })
        .catch((err) => log.warn("auto-reply failed", err));
    }

    return { ok: true };
  } catch (err) {
    log.error("submit failed", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
