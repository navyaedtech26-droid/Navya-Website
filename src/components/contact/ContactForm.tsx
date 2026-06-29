import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Field, Input, Textarea, Select } from "@/components/common/Field";
import { Honeypot } from "@/components/common/Honeypot";
import Turnstile from "@/components/common/Turnstile";
import { Spinner } from "@/components/common/Spinner";
import { useToast } from "@/components/common/Toast";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { isTurnstileConfigured } from "@/lib/turnstile";
import { submitContact } from "@/services/contact";

/** Cooldown between submissions from this browser. */
const SUBMIT_COOLDOWN_MS = 20000;

const services = [
  "Static Website",
  "Dynamic Website",
  "E-Commerce Website",
  "Inventory Management System",
  "CRM System",
  "Billing System",
  "Learning Management System",
  "ERP System",
  "BI Implementation",
  "Other",
];

const budgets = [
  "Below NPR 25,000",
  "NPR 25,000 - 50,000",
  "NPR 50,000 - 1,00,000",
  "NPR 1,00,000+",
  "Not Sure Yet",
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const guard = useSpamGuard("contact", SUBMIT_COOLDOWN_MS);
  const toast = useToast();

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Please enter a valid email.";
    if (!form.service) next.service = "Please select a service.";
    if (!form.message.trim()) next.message = "Please describe your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }

    const spamError = guard.check(
      "Please take a moment to review your details before sending."
    );
    if (spamError) {
      toast.error(spamError);
      return;
    }

    if (isTurnstileConfigured() && !captchaToken) {
      toast.error("Please complete the verification below.");
      return;
    }

    setStatus("loading");

    const result = await submitContact(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        message: form.message,
        company_website: guard.honeypot,
      },
      captchaToken ?? undefined
    );

    if (result.ok) {
      guard.markUsed();
      setStatus("success");
    } else {
      setStatus("idle");
      toast.error(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[28rem] flex-col items-center justify-center rounded-3xl glass p-10 text-center ring-1 ring-white/10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/20 ring-1 ring-brand/40"
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              stroke="#F5A623"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M12 20.5l5.5 5.5L29 14"
              stroke="#FFB84D"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
            />
          </svg>
        </motion.div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-ink">Thank you!</h3>
        <p className="mt-3 max-w-sm text-ink-muted">
          Your message has been received. We will respond within 24 hours.
        </p>
        <button
          onClick={() => {
            setForm(initial);
            setStatus("idle");
          }}
          className="mt-7 rounded-xl glass px-5 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl glass p-7 ring-1 ring-white/10 sm:p-9"
    >
      <Honeypot
        id="company_website"
        label="Company website (leave blank)"
        value={guard.honeypot}
        onChange={guard.setHoneypot}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full Name" required error={errors.name} id="name">
          <Input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Doe"
            error={!!errors.name}
          />
        </Field>

        <Field label="Email Address" required error={errors.email} id="email">
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@company.com"
            error={!!errors.email}
          />
        </Field>

        <Field label="Phone Number" id="phone">
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+977 98xxxxxxxx"
          />
        </Field>

        <Field label="Service Interested In" required error={errors.service} id="service">
          <Select
            id="service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            error={!!errors.service}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s} value={s} className="bg-surface text-ink">
                {s}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Project Budget Range" id="budget" className="sm:col-span-2">
          <Select
            id="budget"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-surface text-ink">
                {b}
              </option>
            ))}
          </Select>
        </Field>

        <Field
          label="Project Description"
          required
          error={errors.message}
          id="message"
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={5}
            placeholder="Tell us about your project, goals, and timeline..."
            error={!!errors.message}
            className="resize-none"
          />
        </Field>
      </div>

      <Turnstile
        className="mt-6"
        onVerify={setCaptchaToken}
        onExpire={() => setCaptchaToken(null)}
        onError={() => setCaptchaToken(null)}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        data-cursor="hover"
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-6 py-4 text-sm font-semibold text-bg shadow-glow-sm transition-all duration-300 hover:shadow-glow disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Spinner />
            Sending...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}
