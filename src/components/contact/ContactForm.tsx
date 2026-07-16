import { useState, type FormEvent, type InputHTMLAttributes, type SelectHTMLAttributes } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";
import { Honeypot } from "@/components/common/Honeypot";
import Turnstile from "@/components/common/Turnstile";
import { Spinner } from "@/components/common/Spinner";
import { useToast } from "@/components/common/Toast";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { isTurnstileConfigured } from "@/lib/turnstile";
import { submitContact } from "@/services/contact";

const SUBMIT_COOLDOWN_MS = 20000;

const services = [
  "Digital Transformation",
  "Enterprise Architecture",
  "Custom Software Development",
  "Web Application Development",
  "Cloud Migration & Strategy",
  "Dedicated Development Team",
  "Other",
];

const budgets = [
  "Rs. 50,000 - 1 Lakh",
  "Rs. 1 Lakh - 3 Lakhs",
  "Rs. 3 Lakhs - 10 Lakhs",
  "Rs. 10 Lakhs+",
  "Not Sure Yet",
];

const timelines = [
  "Immediately",
  "Within 1-3 months",
  "Within 3-6 months",
  "Strategic Planning Phase",
];

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

function InputField({ id, label, type = "text", error, ...props }: InputFieldProps) {
  return (
    <div className="relative z-0 w-full group">
      <input
        type={type}
        id={id}
        className={`peer block w-full appearance-none rounded-2xl border ${error ? 'border-red-500 bg-red-50/30' : 'border-line/70 bg-white'} px-5 pb-3 pt-7 text-sm font-medium text-heading focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10 shadow-sm transition-all`}
        placeholder=" "
        {...props}
      />
      <label
        htmlFor={id}
        className={`absolute left-5 top-5 z-10 origin-[0] -translate-y-3 scale-75 text-sm font-medium ${error ? 'text-red-500' : 'text-faint'} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-brand`}
      >
        {label}
      </label>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 ml-1 text-xs font-semibold text-red-500">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  options: string[];
  error?: string;
}

function SelectField({ id, label, options, error, className, ...props }: SelectFieldProps) {
  return (
    <div className={`relative z-0 w-full group ${className || ""}`}>
      <select
        id={id}
        className={`peer block w-full appearance-none rounded-2xl border ${error ? 'border-red-500 bg-red-50/30' : 'border-line/70 bg-white'} px-5 pb-3 pt-7 pr-10 text-sm font-medium text-heading focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10 shadow-sm transition-all`}
        {...props}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={`absolute left-5 top-2.5 z-10 origin-[0] scale-75 text-xs font-bold uppercase tracking-wider ${error ? 'text-red-500' : 'text-brand'} duration-300`}
      >
        {label}
      </label>
      <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center pt-2">
        <ChevronDown className="h-4 w-4 text-faint" />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 ml-1 text-xs font-semibold text-red-500">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

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

    const name = form.name.trim();
    if (!name) next.name = "Full Name is required";
    else if (name.length < 2) next.name = "Please enter your full name";

    const email = form.email.trim();
    if (!email) next.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Invalid email format";

    const phone = form.phone.trim();
    if (phone && !/^[+]?[\d\s()-]{7,20}$/.test(phone))
      next.phone = "Invalid phone number";

    if (!form.service) next.service = "Please select a service";

    const message = form.message.trim();
    if (!message) next.message = "Project Description is required";
    else if (message.length < 10) next.message = "Please provide a bit more detail";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fill in the required fields correctly.");
      return;
    }

    const spamError = guard.check("Please review your details before sending.");
    if (spamError) {
      toast.error(spamError);
      return;
    }

    if (isTurnstileConfigured() && !captchaToken) {
      toast.error("Please complete the security verification below.");
      return;
    }

    setStatus("loading");

    const formattedMessage = `Company: ${form.company || 'Not provided'}\nTimeline: ${form.timeline || 'Not specified'}\n\n${form.message}`;

    const result = await submitContact(
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        service: form.service,
        budget: form.budget,
        message: formattedMessage,
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[40rem] flex-col items-center justify-center rounded-[2rem] bg-white p-12 text-center shadow-xl shadow-black/5 ring-1 ring-line/50"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 14 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-brand/10 ring-8 ring-brand/5 mb-8"
        >
          <CheckCircle2 className="h-10 w-10 text-brand" strokeWidth={2.5} />
        </motion.div>
        <h3 className="font-display text-3xl font-bold text-heading mb-4">Request Received</h3>
        <p className="text-lg text-faint max-w-sm mb-10 leading-relaxed">
          Our enterprise strategy team has received your request and will follow up within our 2-hour SLA window.
        </p>
        <button
          onClick={() => {
            setForm(initial);
            setStatus("idle");
          }}
          className="rounded-2xl bg-slate-50 border border-line px-8 py-4 font-semibold text-heading shadow-sm transition-all hover:bg-slate-100 hover:border-line/80"
        >
          Submit Another Request
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[2.5rem] bg-white p-8 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.06)] ring-1 ring-line/50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-primary-light to-primary"></div>

      <div className="mb-12">
        <h3 className="font-display text-2xl font-bold text-heading">Schedule a Consultation</h3>
        <p className="mt-3 text-sm text-faint leading-relaxed">Tell us about your organization and the challenges you're looking to solve. We'll ensure the right strategic experts review your inquiry.</p>
      </div>

      <Honeypot
        id="company_website"
        label="Company website (leave blank)"
        value={guard.honeypot}
        onChange={guard.setHoneypot}
      />

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <InputField
          id="name"
          label="Full Name *"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          error={errors.name}
        />
        <InputField
          id="company"
          type="text"
          label="Company Name"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />

        <InputField
          id="email"
          type="email"
          label="Work Email *"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />
        <InputField
          id="phone"
          type="tel"
          label="Phone Number"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />

        <div className="sm:col-span-2 my-2 border-b border-dashed border-line/70 w-full"></div>

        <SelectField
          id="service"
          label="Service Required *"
          options={services}
          value={form.service}
          onChange={(e) => update("service", e.target.value)}
          error={errors.service}
          className="sm:col-span-2"
        />
        <SelectField
          id="budget"
          label="Budget Range"
          options={budgets}
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
        />
        <SelectField
          id="timeline"
          label="Timeline"
          options={timelines}
          value={form.timeline}
          onChange={(e) => update("timeline", e.target.value)}
        />

        <div className="relative z-0 w-full group sm:col-span-2">
          <textarea
            id="message"
            rows={5}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={`peer block w-full resize-none appearance-none rounded-2xl border ${errors.message ? 'border-red-500 bg-red-50/30' : 'border-line/70 bg-white'} px-5 pb-3 pt-7 text-sm font-medium text-heading focus:border-brand focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand/10 shadow-sm transition-all`}
            placeholder=" "
          />
          <label
            htmlFor="message"
            className={`absolute left-5 top-5 z-10 origin-[0] -translate-y-3 scale-75 text-sm font-medium ${errors.message ? 'text-red-500' : 'text-faint'} duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-brand`}
          >
            Project Description *
          </label>
          <AnimatePresence>
            {errors.message && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-2 ml-1 text-xs font-semibold text-red-500">
                {errors.message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </div>

      <Turnstile
        className="mt-8"
        onVerify={setCaptchaToken}
        onExpire={() => setCaptchaToken(null)}
        onError={() => setCaptchaToken(null)}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className="group mt-10 flex w-full items-center justify-center gap-3 rounded-2xl bg-heading px-8 py-5 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-black hover:shadow-xl hover:shadow-heading/10 hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === "loading" ? (
          <>
            <Spinner />
            <span>Processing Request...</span>
          </>
        ) : (
          <>
            <span>Submit Inquiry</span>
            <Send size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </>
        )}
      </button>
      <p className="mt-5 text-center text-xs text-faint">
        By submitting, you agree to our <a href="/privacy-policy" className="underline hover:text-heading">Privacy Policy</a>. Information is securely handled.
      </p>
    </form>
  );
}
