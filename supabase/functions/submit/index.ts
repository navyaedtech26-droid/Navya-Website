// Supabase Edge Function: `submit`
//
// Endpoint for contact and testimonial form submissions. Verifies the Cloudflare
// Turnstile token server-side, applies a per-IP rate limit on top of the
// existing per-email DB throttle, inserts the row with the service role
// (bypassing RLS), and — best effort, after the row is saved — emails the
// team (and visitor) via Resend. See supabase/README.md for the full setup story.
//
// Deploy:  supabase functions deploy submit --no-verify-jwt
// Secrets: TURNSTILE_SECRET_KEY, RESEND_API_KEY, CONTACT_FROM, CONTACT_NOTIFY_TO
//          (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically)

import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const TURNSTILE_SECRET_KEY = Deno.env.get("TURNSTILE_SECRET_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const CONTACT_FROM = Deno.env.get("CONTACT_FROM") || "Navya EdTech <hello@navyaedtech.com>";
const CONTACT_NOTIFY_TO = Deno.env.get("CONTACT_NOTIFY_TO");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

const IP_MAX_HITS = 8;
const IP_WINDOW = "10 minutes";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

interface ContactPayload {
  name: string;
  email: string;
  phone?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
  company_website?: string | null;
}

interface TestimonialPayload {
  quote: string;
  name: string;
  role: string | null;
  company: string | null;
  rating: number;
}

type Body =
  | { type: "contact"; token?: string; payload: ContactPayload }
  | { type: "testimonial"; token?: string; payload: TestimonialPayload };

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/** Visitor-authored text only ever goes into emails as escaped HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function background(promise: Promise<unknown>): void {
  const waitUntil = (globalThis as { EdgeRuntime?: { waitUntil?: (p: Promise<unknown>) => void } })
    .EdgeRuntime?.waitUntil;
  const guarded = promise.catch((err) => console.error("background task failed", err));
  if (waitUntil) waitUntil(guarded);
}

function clientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || null;
  return req.headers.get("cf-connecting-ip");
}

async function verifyTurnstile(token: string | undefined, ip: string | null): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;

  const form = new URLSearchParams();
  form.set("secret", TURNSTILE_SECRET_KEY);
  form.set("response", token);
  if (ip) form.set("remoteip", ip);

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("turnstile verify failed", err);
    return false;
  }
}

async function sendEmail(opts: {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  if (!RESEND_API_KEY || !CONTACT_FROM || opts.to.length === 0) return;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    console.error("resend send failed", res.status, await res.text());
  }
}

function notifyRecipients(): string[] {
  const configured = (CONTACT_NOTIFY_TO ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (configured.length > 0) return configured;
  return ["navyaedtech26@gmail.com"];
}

/**
 * Premium branded HTML template for the visitor auto-reply confirmation email.
 */
function renderVisitorConfirmationEmail(data: {
  name: string;
  email: string;
  service?: string | null;
  budget?: string | null;
  phone?: string | null;
  message: string;
}): string {
  const safeName = escapeHtml(data.name);
  const safeService = escapeHtml(data.service || "Enterprise Technology Services");
  const safeBudget = escapeHtml(data.budget || "To be discussed");
  const safePhone = escapeHtml(data.phone || "Not provided");
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thank you for contacting Navya EdTech</title>
  </head>
  <body style="margin:0; padding:0; background-color:#F4F6F9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F6F9; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #E2E8F0; box-shadow:0 8px 30px rgba(8,30,77,0.06);">
            <!-- Top Brand Accent Bar -->
            <tr>
              <td style="height:5px; background:linear-gradient(90deg, #081E4D 0%, #1E6BFF 100%); line-height:5px; font-size:0;">&nbsp;</td>
            </tr>
            <!-- Header with Logo -->
            <tr>
              <td style="padding:36px 44px 20px 44px;" align="left">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <a href="https://navyaedtech.com" target="_blank" style="text-decoration:none; display:inline-block;">
                        <img src="https://navyaedtech.com/logo.jpg" width="140" alt="Navya EdTech" style="display:block; border:0; outline:none; border-radius:8px;" />
                      </a>
                    </td>
                    <td align="right">
                      <span style="display:inline-block; padding:6px 14px; font-size:11px; font-weight:700; letter-spacing:0.8px; text-transform:uppercase; color:#1E6BFF; background-color:#EFF6FF; border:1px solid #DBEAFE; border-radius:24px;">
                        2-Hour Response SLA
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Hero Greeting -->
            <tr>
              <td style="padding:10px 44px 20px 44px;">
                <h1 style="margin:0; font-size:24px; line-height:32px; color:#081E4D; font-weight:800; letter-spacing:-0.4px;">
                  Thank you for reaching out, ${safeName}!
                </h1>
                <p style="margin:12px 0 0 0; font-size:15px; line-height:24px; color:#4A5568;">
                  We have received your request regarding <strong>${safeService}</strong>. Our enterprise consulting and engineering team has been notified and is reviewing your requirements.
                </p>
              </td>
            </tr>
            <!-- Project Summary Box -->
            <tr>
              <td style="padding:0 44px 24px 44px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:20px;">
                  <tr>
                    <td>
                      <div style="font-size:11px; font-weight:800; color:#1E6BFF; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">
                        Inquiry Summary
                      </div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; line-height:22px;">
                        <tr>
                          <td style="padding:4px 0; color:#64748B; width:130px; font-weight:500;">Service Required:</td>
                          <td style="padding:4px 0; color:#081E4D; font-weight:600;">${safeService}</td>
                        </tr>
                        <tr>
                          <td style="padding:4px 0; color:#64748B; font-weight:500;">Budget Range:</td>
                          <td style="padding:4px 0; color:#081E4D; font-weight:600;">${safeBudget}</td>
                        </tr>
                        <tr>
                          <td style="padding:4px 0; color:#64748B; font-weight:500;">Work Email:</td>
                          <td style="padding:4px 0; color:#081E4D; font-weight:600;">${safeEmail}</td>
                        </tr>
                        <tr>
                          <td style="padding:4px 0; color:#64748B; font-weight:500;">Phone Number:</td>
                          <td style="padding:4px 0; color:#081E4D; font-weight:600;">${safePhone}</td>
                        </tr>
                      </table>
                      <div style="margin-top:16px; padding-top:14px; border-top:1px dashed #CBD5E1;">
                        <div style="font-size:12px; font-weight:600; color:#64748B; margin-bottom:6px;">Your Project Message:</div>
                        <div style="font-size:13px; line-height:20px; color:#334155; white-space:pre-wrap; background-color:#ffffff; padding:12px 14px; border-radius:8px; border:1px solid #E2E8F0;">${safeMessage}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Next Steps -->
            <tr>
              <td style="padding:0 44px 28px 44px;">
                <div style="font-size:13px; font-weight:700; color:#081E4D; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:14px;">
                  What Happens Next
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; line-height:22px;">
                  <tr>
                    <td valign="top" style="width:28px; padding-right:12px;">
                      <div style="width:24px; height:24px; border-radius:50%; background-color:#081E4D; color:#ffffff; font-size:12px; font-weight:700; text-align:center; line-height:24px;">1</div>
                    </td>
                    <td style="padding-bottom:12px;">
                      <strong style="color:#081E4D;">Technical Review:</strong> <span style="color:#64748B;">Our strategy experts evaluate your project scope and objectives.</span>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" style="width:28px; padding-right:12px;">
                      <div style="width:24px; height:24px; border-radius:50%; background-color:#1E6BFF; color:#ffffff; font-size:12px; font-weight:700; text-align:center; line-height:24px;">2</div>
                    </td>
                    <td style="padding-bottom:12px;">
                      <strong style="color:#081E4D;">Direct Follow-up:</strong> <span style="color:#64748B;">We will connect with you via email or phone to confirm details.</span>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" style="width:28px; padding-right:12px;">
                      <div style="width:24px; height:24px; border-radius:50%; background-color:#38BDF8; color:#081E4D; font-size:12px; font-weight:700; text-align:center; line-height:24px;">3</div>
                    </td>
                    <td>
                      <strong style="color:#081E4D;">Strategic Roadmap:</strong> <span style="color:#64748B;">You receive a tailored execution plan, architecture guide, and transparent estimate.</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- CTA Button -->
            <tr>
              <td style="padding:0 44px 36px 44px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:10px; background-color:#081E4D;">
                      <a href="https://navyaedtech.com/portfolio" target="_blank" style="display:inline-block; padding:14px 28px; font-size:14px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:10px; letter-spacing:0.2px;">
                        Explore Our Case Studies &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:28px 44px; background-color:#F8FAFC; border-top:1px solid #E2E8F0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <div style="font-size:13px; font-weight:700; color:#081E4D; margin-bottom:4px;">Navya EdTech</div>
                      <div style="font-size:12px; line-height:18px; color:#64748B;">
                        Enterprise Software · Digital Transformation · Cloud & AI Solutions<br />
                        Kathmandu, Nepal &nbsp;|&nbsp; <a href="mailto:hello@navyaedtech.com" style="color:#1E6BFF; text-decoration:none;">hello@navyaedtech.com</a> &nbsp;|&nbsp; <a href="https://navyaedtech.com" target="_blank" style="color:#1E6BFF; text-decoration:none;">navyaedtech.com</a>
                      </div>
                      <div style="font-size:11px; line-height:16px; color:#94A3B8; margin-top:12px;">
                        &copy; 2026 Navya EdTech. All rights reserved. You are receiving this because you submitted a consultation request on navyaedtech.com.
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Premium branded HTML template for the team internal notification email.
 */
function renderTeamNotificationEmail(data: {
  name: string;
  email: string;
  service?: string | null;
  budget?: string | null;
  phone?: string | null;
  message: string;
}): string {
  const safeName = escapeHtml(data.name);
  const safeService = escapeHtml(data.service || "Unspecified Service");
  const safeBudget = escapeHtml(data.budget || "Unspecified Budget");
  const safePhone = escapeHtml(data.phone || "Not provided");
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message);
  const replySubject = encodeURIComponent(`Re: Consultation inquiry with Navya EdTech (${data.service || "Project"})`);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Lead: ${safeName}</title>
  </head>
  <body style="margin:0; padding:0; background-color:#F4F6F9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F6F9; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #E2E8F0; box-shadow:0 8px 30px rgba(8,30,77,0.06);">
            <!-- Top Alert Bar -->
            <tr>
              <td style="height:5px; background:linear-gradient(90deg, #F59E0B 0%, #1E6BFF 100%); line-height:5px; font-size:0;">&nbsp;</td>
            </tr>
            <!-- Header with Logo & Alert Badge -->
            <tr>
              <td style="padding:36px 44px 20px 44px;" align="left">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <a href="https://navyaedtech.com" target="_blank" style="text-decoration:none; display:inline-block;">
                        <img src="https://navyaedtech.com/logo.jpg" width="130" alt="Navya EdTech" style="display:block; border:0; outline:none; border-radius:8px;" />
                      </a>
                    </td>
                    <td align="right">
                      <span style="display:inline-block; padding:6px 14px; font-size:11px; font-weight:800; letter-spacing:0.8px; text-transform:uppercase; color:#B45309; background-color:#FEF3C7; border:1px solid #FDE68A; border-radius:24px;">
                        🔥 New Inbound Lead
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Lead Headline -->
            <tr>
              <td style="padding:10px 44px 16px 44px;">
                <h1 style="margin:0; font-size:22px; line-height:30px; color:#081E4D; font-weight:800; letter-spacing:-0.4px;">
                  New Consultation Request: ${safeName}
                </h1>
                <p style="margin:8px 0 0 0; font-size:14px; line-height:22px; color:#64748B;">
                  A new client has submitted the contact form on <a href="https://navyaedtech.com" style="color:#1E6BFF; font-weight:600; text-decoration:none;">navyaedtech.com</a>.
                </p>
              </td>
            </tr>
            <!-- Quick Action CTA -->
            <tr>
              <td style="padding:0 44px 24px 44px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:10px; background-color:#1E6BFF;">
                      <a href="mailto:${safeEmail}?subject=${replySubject}" style="display:inline-block; padding:12px 24px; font-size:14px; font-weight:700; color:#ffffff; text-decoration:none; border-radius:10px;">
                        Reply Directly to ${safeName} &rarr;
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Structured Lead Details -->
            <tr>
              <td style="padding:0 44px 28px 44px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:20px;">
                  <tr>
                    <td>
                      <div style="font-size:11px; font-weight:800; color:#081E4D; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">
                        Prospect Information
                      </div>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; line-height:24px;">
                        <tr>
                          <td style="padding:6px 0; color:#64748B; width:130px; font-weight:500;">Full Name:</td>
                          <td style="padding:6px 0; color:#081E4D; font-weight:700;">${safeName}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0; color:#64748B; font-weight:500;">Work Email:</td>
                          <td style="padding:6px 0; font-weight:600;">
                            <a href="mailto:${safeEmail}" style="color:#1E6BFF; text-decoration:underline;">${safeEmail}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0; color:#64748B; font-weight:500;">Phone:</td>
                          <td style="padding:6px 0; color:#081E4D; font-weight:600;">
                            <a href="tel:${safePhone}" style="color:#081E4D; text-decoration:none;">${safePhone}</a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0; color:#64748B; font-weight:500;">Service Needed:</td>
                          <td style="padding:6px 0; color:#081E4D; font-weight:700;">${safeService}</td>
                        </tr>
                        <tr>
                          <td style="padding:6px 0; color:#64748B; font-weight:500;">Budget Range:</td>
                          <td style="padding:6px 0; color:#059669; font-weight:700;">${safeBudget}</td>
                        </tr>
                      </table>
                      <div style="margin-top:16px; padding-top:14px; border-top:1px dashed #CBD5E1;">
                        <div style="font-size:12px; font-weight:700; color:#081E4D; margin-bottom:8px;">Project Scope & Description:</div>
                        <div style="font-size:13px; line-height:22px; color:#1E293B; white-space:pre-wrap; background-color:#ffffff; padding:14px 16px; border-radius:8px; border:1px solid #E2E8F0; font-family:monospace;">${safeMessage}</div>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Admin Dashboard Link -->
            <tr>
              <td style="padding:0 44px 32px 44px;">
                <p style="margin:0; font-size:13px; line-height:20px; color:#64748B;">
                  This inquiry has also been stored in your database. 
                  <a href="https://navyaedtech.com/admin/messages" target="_blank" style="color:#081E4D; font-weight:700; text-decoration:underline;">
                    Manage Messages in Admin Dashboard &rarr;
                  </a>
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:24px 44px; background-color:#F8FAFC; border-top:1px solid #E2E8F0;">
                <div style="font-size:12px; line-height:18px; color:#94A3B8;">
                  Navya EdTech Internal Notification Engine · Powered by Resend & Supabase Edge Functions.
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Premium branded HTML template for testimonial reviews.
 */
function renderTestimonialNotificationEmail(payload: TestimonialPayload): string {
  const safeName = escapeHtml(payload.name);
  const safeRole = escapeHtml(payload.role || "Client");
  const safeCompany = escapeHtml(payload.company || "Enterprise Client");
  const safeQuote = escapeHtml(payload.quote);
  const ratingStars = "★".repeat(payload.rating) + "☆".repeat(Math.max(0, 5 - payload.rating));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Testimonial Submitted</title>
  </head>
  <body style="margin:0; padding:0; background-color:#F4F6F9; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F4F6F9; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; border:1px solid #E2E8F0; box-shadow:0 8px 30px rgba(8,30,77,0.06);">
            <tr>
              <td style="height:5px; background:linear-gradient(90deg, #F5A623 0%, #1E6BFF 100%); line-height:5px; font-size:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:36px 44px 20px 44px;" align="left">
                <img src="https://navyaedtech.com/logo.jpg" width="130" alt="Navya EdTech" style="display:block; border:0; outline:none; border-radius:8px;" />
              </td>
            </tr>
            <tr>
              <td style="padding:10px 44px 20px 44px;">
                <h1 style="margin:0; font-size:22px; line-height:30px; color:#081E4D; font-weight:800;">
                  New Testimonial (Pending Review)
                </h1>
                <p style="margin:8px 0 0 0; font-size:14px; line-height:22px; color:#64748B;">
                  A new review has been submitted and is waiting for approval in your admin dashboard.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 44px 28px 44px;">
                <div style="background-color:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:20px;">
                  <div style="font-size:18px; color:#F59E0B; margin-bottom:8px;">${ratingStars} (${payload.rating}/5)</div>
                  <div style="font-size:15px; font-weight:700; color:#081E4D;">${safeName}</div>
                  <div style="font-size:13px; color:#64748B; margin-bottom:14px;">${safeRole} &middot; ${safeCompany}</div>
                  <blockquote style="margin:0; padding:12px 16px; background-color:#ffffff; border-left:3px solid #F5A623; border-radius:4px; font-style:italic; color:#334155; font-size:14px; line-height:22px;">
                    &ldquo;${safeQuote}&rdquo;
                  </blockquote>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:0 44px 32px 44px;">
                <a href="https://navyaedtech.com/admin/testimonials" style="display:inline-block; background-color:#081E4D; color:#ffffff; font-size:14px; font-weight:700; padding:12px 24px; text-decoration:none; border-radius:8px;">
                  Review & Publish Testimonial &rarr;
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 44px; background-color:#F8FAFC; border-top:1px solid #E2E8F0;">
                <div style="font-size:12px; color:#94A3B8;">Navya EdTech Admin Notification</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function handleContact(payload: ContactPayload) {
  if (payload.company_website && payload.company_website.trim() !== "") {
    return json({ ok: true });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  const phone = payload.phone?.trim() || null;
  const service = payload.service?.trim() || null;
  const budget = payload.budget?.trim() || null;

  if (!name || !email || !message) {
    return json({ ok: false, error: "Please fill in all required fields." }, 400);
  }

  const { data, error } = await admin
    .from("contact_submissions")
    .insert({
      name,
      email,
      phone,
      service,
      budget,
      message,
      status: "new",
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === "23514") {
      return json({ ok: false, error: error.message }, 400);
    }
    console.error("contact insert failed", error);
    return json({ ok: false, error: "Something went wrong. Please try again." }, 400);
  }

  const to = notifyRecipients();
  if (to.length > 0) {
    background(
      sendEmail({
        to,
        replyTo: email,
        subject: `New Lead: ${name} (${service || "Consultation"})`,
        html: renderTeamNotificationEmail({
          name,
          email,
          phone,
          service,
          budget,
          message,
        }),
      })
    );
  }

  // Premium auto-reply to visitor
  if (email) {
    background(
      sendEmail({
        to: [email],
        subject: `Thank you for contacting Navya EdTech — We've received your inquiry`,
        html: renderVisitorConfirmationEmail({
          name,
          email,
          phone,
          service,
          budget,
          message,
        }),
      })
    );
  }

  return json({ ok: true, id: data?.id });
}

async function handleTestimonial(payload: TestimonialPayload) {
  const { data, error } = await admin
    .from("testimonials")
    .insert({
      quote: payload.quote,
      name: payload.name,
      role: payload.role,
      company: payload.company,
      rating: payload.rating,
      is_published: false,
      sort_order: 0,
    })
    .select("id")
    .single();

  if (error) {
    return json({ ok: false, error: "Something went wrong. Please try again." }, 400);
  }

  const to = notifyRecipients();
  if (to.length > 0) {
    background(
      sendEmail({
        to,
        subject: `New testimonial from ${payload.name} (pending review)`,
        html: renderTestimonialNotificationEmail(payload),
      })
    );
  }

  return json({ ok: true, id: data?.id });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  if (body.type !== "testimonial" && body.type !== "contact") {
    return json({ ok: false, error: "Invalid submission type." }, 400);
  }
  if (!body.payload) {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const ip = clientIp(req);

  const { data: withinLimit, error: ipError } = await admin.rpc("register_ip_hit", {
    p_ip: ip ?? "",
    p_kind: body.type,
    p_max: IP_MAX_HITS,
    p_window: IP_WINDOW,
  });
  if (ipError) {
    console.error("register_ip_hit failed", ipError);
  } else if (withinLimit === false) {
    return json({ ok: false, error: "Too many submissions. Please try again later." }, 429);
  }

  const verified = await verifyTurnstile(body.token, ip);
  if (!verified) {
    return json({ ok: false, error: "Verification failed. Please try again." }, 400);
  }

  if (body.type === "contact") {
    return handleContact(body.payload);
  }

  return handleTestimonial(body.payload);
});
