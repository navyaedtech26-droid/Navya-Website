// =============================================================================
// Transactional email (Resend) — admin notifications + visitor auto-reply
// =============================================================================
// Thin wrapper over the Resend REST API (https://resend.com). No SDK: a single
// fetch keeps the Edge Function small and cold-start friendly.
//
// Entirely optional and self-disabling: with no RESEND_API_KEY set, every helper
// is a no-op — exactly like the Turnstile feature degrades without a secret. So
// this is safe to ship before email is configured.
//
// Secrets (set once, alongside TURNSTILE_SECRET_KEY):
//   supabase secrets set RESEND_API_KEY=re_xxx
//   supabase secrets set CONTACT_FROM="Navya EdTech <hello@your-domain.com>"
//   supabase secrets set CONTACT_NOTIFY_TO=team@your-domain.com   # comma-separated ok
// CONTACT_FROM must use a domain you've verified in Resend.
//
// Design notes:
//  - Every send is best-effort and never throws: a contact message is already
//    saved before we email, so an email outage must not fail the submission.
//  - All visitor-supplied text is HTML-escaped before interpolation.
// =============================================================================

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** True when transactional email is configured (API key + verified sender). */
export function emailEnabled(): boolean {
  return Boolean(Deno.env.get("RESEND_API_KEY") && Deno.env.get("CONTACT_FROM"));
}

/** Escape the five HTML-significant characters so user text can't inject markup. */
function esc(value: unknown): string {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

interface SendOptions {
  to: string | string[];
  subject: string;
  html: string;
  /** Reply-To address (e.g. the visitor, so admin can reply in one click). */
  replyTo?: string;
}

/**
 * Send one email via Resend. Returns true on success, false on any failure —
 * never throws, so callers can fire-and-forget without try/catch.
 */
async function send(opts: SendOptions): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("CONTACT_FROM");
  if (!apiKey || !from) return false;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Resend send failed", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend send threw", err);
    return false;
  }
}

/** Minimal shared HTML shell so the two templates stay consistent. */
function layout(title: string, body: string): string {
  return `<!doctype html><html><body style="margin:0;background:#0b0b12;padding:24px;font-family:Arial,Helvetica,sans-serif;color:#e7e7ef">
  <div style="max-width:560px;margin:0 auto;background:#14141f;border:1px solid #262638;border-radius:16px;overflow:hidden">
    <div style="padding:20px 24px;border-bottom:1px solid #262638;font-weight:700;font-size:16px;color:#fff">Navya EdTech</div>
    <div style="padding:24px">
      <h1 style="margin:0 0 16px;font-size:18px;color:#fff">${esc(title)}</h1>
      ${body}
    </div>
  </div>
</body></html>`;
}

export interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
}

function row(label: string, value: unknown): string {
  if (!value) return "";
  return `<tr><td style="padding:4px 12px 4px 0;color:#9a9ab0;vertical-align:top;white-space:nowrap">${esc(
    label
  )}</td><td style="padding:4px 0;color:#e7e7ef">${esc(value)}</td></tr>`;
}

/** Notify the team that a new contact message arrived. */
export async function notifyNewContact(data: ContactEmailData): Promise<boolean> {
  const to = Deno.env.get("CONTACT_NOTIFY_TO");
  if (!to) return false; // nobody to notify
  const recipients = to.split(",").map((s) => s.trim()).filter(Boolean);
  if (recipients.length === 0) return false;

  const body = `
    <table style="border-collapse:collapse;font-size:14px;width:100%">
      ${row("Name", data.name)}
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Service", data.service)}
      ${row("Budget", data.budget)}
    </table>
    <div style="margin-top:16px;padding:14px;background:#0b0b12;border:1px solid #262638;border-radius:10px;white-space:pre-wrap;font-size:14px;line-height:1.5">${esc(
      data.message
    )}</div>`;

  return send({
    to: recipients,
    subject: `New enquiry from ${data.name}`,
    html: layout("New contact enquiry", body),
    replyTo: data.email, // reply goes straight to the visitor
  });
}

/** Acknowledge the visitor so they know the message landed. */
export async function autoReplyContact(data: ContactEmailData): Promise<boolean> {
  if (!data.email) return false;
  const body = `
    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#cfcfe0">Hi ${esc(
      data.name
    )},</p>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#cfcfe0">Thanks for reaching out to Navya EdTech — we've received your message and a member of our team will get back to you shortly.</p>
    <p style="margin:0 0 4px;font-size:13px;color:#9a9ab0">For reference, here's what you sent:</p>
    <div style="margin-top:8px;padding:14px;background:#0b0b12;border:1px solid #262638;border-radius:10px;white-space:pre-wrap;font-size:13px;line-height:1.5;color:#cfcfe0">${esc(
      data.message
    )}</div>
    <p style="margin:16px 0 0;font-size:13px;color:#9a9ab0">— The Navya EdTech team</p>`;

  return send({
    to: data.email,
    subject: "We've received your message — Navya EdTech",
    html: layout("Thanks for getting in touch", body),
  });
}

/** Notify the team that a testimonial is awaiting review. */
export async function notifyNewTestimonial(data: {
  name: string;
  quote: string;
  role?: string | null;
  company?: string | null;
  rating?: number;
}): Promise<boolean> {
  const to = Deno.env.get("CONTACT_NOTIFY_TO");
  if (!to) return false;
  const recipients = to.split(",").map((s) => s.trim()).filter(Boolean);
  if (recipients.length === 0) return false;

  const who = [data.role, data.company].filter(Boolean).join(", ");
  const body = `
    <table style="border-collapse:collapse;font-size:14px;width:100%">
      ${row("Name", data.name)}
      ${row("Role", who)}
      ${row("Rating", data.rating ? `${data.rating} / 5` : "")}
    </table>
    <div style="margin-top:16px;padding:14px;background:#0b0b12;border:1px solid #262638;border-radius:10px;white-space:pre-wrap;font-size:14px;line-height:1.5;font-style:italic">“${esc(
      data.quote
    )}”</div>
    <p style="margin:16px 0 0;font-size:13px;color:#9a9ab0">Review and publish it from the admin dashboard.</p>`;

  return send({
    to: recipients,
    subject: `New testimonial from ${data.name} (pending review)`,
    html: layout("New testimonial to review", body),
  });
}

/**
 * Run email work in the background so the HTTP response isn't blocked on the
 * Resend round-trip. Falls back to awaiting inline if the runtime lacks
 * `EdgeRuntime.waitUntil`. Errors are swallowed (each helper is already safe).
 */
export function dispatch(work: Promise<unknown>): void {
  const runtime = (globalThis as { EdgeRuntime?: { waitUntil(p: Promise<unknown>): void } })
    .EdgeRuntime;
  if (runtime?.waitUntil) {
    runtime.waitUntil(work.catch((e) => console.error("email dispatch failed", e)));
  } else {
    // No background API — let it run, but don't await (best-effort).
    void work.catch((e) => console.error("email dispatch failed", e));
  }
}
