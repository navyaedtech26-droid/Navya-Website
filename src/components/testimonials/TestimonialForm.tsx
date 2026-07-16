import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Star, Heart } from "lucide-react";
import { Field, Input, Textarea } from "@/components/common/Field";
import { Honeypot } from "@/components/common/Honeypot";
import Turnstile from "@/components/common/Turnstile";
import { Spinner } from "@/components/common/Spinner";
import { useToast } from "@/components/common/Toast";
import { useSpamGuard } from "@/hooks/useSpamGuard";
import { isTurnstileConfigured } from "@/lib/turnstile";
import { submitTestimonial } from "@/services/testimonials";
import { cn } from "@/lib/utils";

interface FormState {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const initial: FormState = { quote: "", name: "", role: "", company: "", rating: 5 };
const COOLDOWN_MS = 30000;

export default function TestimonialForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const guard = useSpamGuard("testimonial", COOLDOWN_MS);
  const toast = useToast();

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.quote.trim() || !form.name.trim()) {
      toast.error("Please share a few words and your name.");
      return;
    }
    if (guard.isBot) return; // bot
    const spamError = guard.check("Please take a moment before submitting.");
    if (spamError) {
      toast.error(spamError);
      return;
    }

    if (isTurnstileConfigured() && !captchaToken) {
      toast.error("Please complete the verification below.");
      return;
    }

    setStatus("loading");
    const res = await submitTestimonial(
      {
        quote: form.quote,
        name: form.name,
        role: form.role,
        company: form.company,
        rating: form.rating,
      },
      captchaToken ?? undefined
    );
    if (res.ok) {
      guard.markUsed();
      setStatus("success");
    } else {
      setStatus("idle");
      toast.error(res.error ?? "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[24rem] flex-col items-center justify-center rounded-3xl bg-white shadow-sm ring-1 ring-line/50 p-10 text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
          <Heart className="text-primary" aria-hidden="true" />
        </div>
        <h3 className="mt-6 font-display text-2xl font-semibold text-heading">
          Thank you!
        </h3>
        <p className="mt-3 max-w-sm text-faint">
          Your story has been received. Our team will review it and may
          feature it on the site soon.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl bg-white shadow-sm ring-1 ring-line/50 p-7 sm:p-9"
    >
      <Honeypot
        id="company_url"
        label="Company URL (leave blank)"
        value={guard.honeypot}
        onChange={guard.setHoneypot}
      />

      <div className="flex flex-col gap-5">
        <Field label="Your experience" id="quote" required>
          <Textarea
            id="quote"
            value={form.quote}
            onChange={(e) => set("quote", e.target.value)}
            rows={5}
            placeholder="Working with Navya EdTech was…"
            className="resize-none"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name" id="name" required>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Jane Doe"
            />
          </Field>
          <Field label="Role" id="role">
            <Input
              id="role"
              value={form.role}
              onChange={(e) => set("role", e.target.value)}
              placeholder="Founder"
            />
          </Field>
        </div>

        <Field label="Company" id="company">
          <Input
            id="company"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Kathmandu Cart"
          />
        </Field>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-heading">Your rating</span>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => set("rating", n)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                className="rounded-md p-1 transition-transform hover:scale-110"
              >
                <Star
                  size={26}
                  className={cn(
                    n <= form.rating
                      ? "fill-accent text-accent"
                      : "text-slate-300"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <Turnstile
        className="mt-5"
        onVerify={setCaptchaToken}
        onExpire={() => setCaptchaToken(null)}
        onError={() => setCaptchaToken(null)}
      />

      <button
        type="submit"
        disabled={status === "loading"}
        data-cursor="hover"
        className="group mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Spinner />
            Submitting...
          </>
        ) : (
          <>
            <Send size={16} />
            Submit My Story
          </>
        )}
      </button>
    </form>
  );
}
