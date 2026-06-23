import { useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitContact } from "@/services/contact";
import { cooldownRemaining, cooldownMessage, markUsed } from "@/lib/rateLimit";

/** Minimum time (ms) a human plausibly needs to fill the form. */
const MIN_FILL_MS = 3000;
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Honeypot value + first-render timestamp: invisible bot traps.
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef(Date.now());

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
    setSubmitError(null);
    if (!validate()) return;

    // Submitted implausibly fast → almost certainly automated.
    if (Date.now() - mountedAt.current < MIN_FILL_MS) {
      setSubmitError("Please take a moment to review your details before sending.");
      return;
    }

    // Don't let the same browser hammer the form.
    const remaining = cooldownRemaining("contact", SUBMIT_COOLDOWN_MS);
    if (remaining > 0) {
      setSubmitError(cooldownMessage(remaining));
      return;
    }

    setStatus("loading");

    const result = await submitContact({
      name: form.name,
      email: form.email,
      phone: form.phone,
      service: form.service,
      budget: form.budget,
      message: form.message,
      company_website: honeypot,
    });

    if (result.ok) {
      markUsed("contact");
      setStatus("success");
    } else {
      setStatus("idle");
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
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
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <motion.circle
              cx="20"
              cy="20"
              r="18"
              stroke="#1E6BFF"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <motion.path
              d="M12 20.5l5.5 5.5L29 14"
              stroke="#3B82F6"
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
      {/* Honeypot: hidden from humans, irresistible to bots. Kept out of the
          tab order and the accessibility tree. */}
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website (leave blank)</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Full Name"
          required
          error={errors.name}
          id="name"
        >
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Jane Doe"
            className={inputCls(errors.name)}
          />
        </Field>

        <Field label="Email Address" required error={errors.email} id="email">
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="jane@company.com"
            className={inputCls(errors.email)}
          />
        </Field>

        <Field label="Phone Number" id="phone">
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="+977 98xxxxxxxx"
            className={inputCls()}
          />
        </Field>

        <Field label="Service Interested In" required error={errors.service} id="service">
          <select
            id="service"
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={cn(inputCls(errors.service), "appearance-none")}
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((s) => (
              <option key={s} value={s} className="bg-surface text-ink">
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Project Budget Range" id="budget" className="sm:col-span-2">
          <select
            id="budget"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={cn(inputCls(), "appearance-none")}
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-surface text-ink">
                {b}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Project Description"
          required
          error={errors.message}
          id="message"
          className="sm:col-span-2"
        >
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={5}
            placeholder="Tell us about your project, goals, and timeline..."
            className={cn(inputCls(errors.message), "resize-none")}
          />
        </Field>
      </div>

      {submitError && (
        <p className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        data-cursor="hover"
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-6 py-4 text-sm font-semibold text-white shadow-glow-sm transition-all duration-300 hover:shadow-glow disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" />
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

function inputCls(error?: string) {
  return cn(
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all duration-200",
    "focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(30,107,255,0.18)]",
    error ? "border-red-500/60" : "border-white/10"
  );
}

function Field({
  label,
  id,
  required,
  error,
  children,
  className,
}: {
  label: string;
  id: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
        {required && <span className="ml-1 text-cyan-accent">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-400"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
