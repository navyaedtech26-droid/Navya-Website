import { useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, Star, Heart } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import { submitTestimonial } from "@/services/testimonials";
import { cooldownRemaining, cooldownMessage, markUsed } from "@/lib/rateLimit";
import { cn } from "@/lib/utils";

interface FormState {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
}

const initial: FormState = { quote: "", name: "", role: "", company: "", rating: 5 };

const MIN_FILL_MS = 3000;
const COOLDOWN_MS = 30000;

export default function ShareTestimonial() {
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const mountedAt = useRef(Date.now());

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.quote.trim() || !form.name.trim()) {
      setError("Please share a few words and your name.");
      return;
    }
    if (honeypot.trim() !== "") return; // bot
    if (Date.now() - mountedAt.current < MIN_FILL_MS) {
      setError("Please take a moment before submitting.");
      return;
    }
    const remaining = cooldownRemaining("testimonial", COOLDOWN_MS);
    if (remaining > 0) {
      setError(cooldownMessage(remaining));
      return;
    }

    setStatus("loading");
    const res = await submitTestimonial({
      quote: form.quote,
      name: form.name,
      role: form.role,
      company: form.company,
      rating: form.rating,
    });
    if (res.ok) {
      markUsed("testimonial");
      setStatus("success");
    } else {
      setStatus("idle");
      setError(res.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <PageTransition>
      <Seo
        title="Share Your Story | Navya EdTech"
        description="Worked with Navya EdTech? Share your experience — we'd love to feature your story."
        path="/share-your-story"
      />

      <PageHero
        eyebrow="We'd Love to Hear From You"
        title="Share Your"
        highlight="Experience"
        subtitle="If we've built something for you, tell us how it went. Approved stories are featured on our site."
      />

      <section className="relative py-12">
        <Container className="max-w-2xl">
          <Reveal>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[24rem] flex-col items-center justify-center rounded-3xl glass p-10 text-center ring-1 ring-white/10"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/20 ring-1 ring-brand/40">
                  <Heart className="text-brand-light" />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold text-ink">
                  Thank you!
                </h3>
                <p className="mt-3 max-w-sm text-ink-muted">
                  Your story has been received. Our team will review it and may
                  feature it on the site soon.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl glass p-7 ring-1 ring-white/10 sm:p-9"
              >
                {/* Honeypot */}
                <div
                  aria-hidden
                  className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="company_url">Company URL (leave blank)</label>
                  <input
                    id="company_url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="quote" className="text-sm font-medium text-ink">
                      Your experience <span className="text-cyan-accent">*</span>
                    </label>
                    <textarea
                      id="quote"
                      value={form.quote}
                      onChange={(e) => set("quote", e.target.value)}
                      rows={5}
                      placeholder="Working with Navya EdTech was…"
                      className={cn(inputCls, "resize-none")}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-ink">
                        Your name <span className="text-cyan-accent">*</span>
                      </label>
                      <input
                        id="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Jane Doe"
                        className={inputCls}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="role" className="text-sm font-medium text-ink">
                        Role
                      </label>
                      <input
                        id="role"
                        value={form.role}
                        onChange={(e) => set("role", e.target.value)}
                        placeholder="Founder"
                        className={inputCls}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-sm font-medium text-ink">
                      Company
                    </label>
                    <input
                      id="company"
                      value={form.company}
                      onChange={(e) => set("company", e.target.value)}
                      placeholder="Kathmandu Cart"
                      className={inputCls}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-ink">Your rating</span>
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
                                ? "fill-amber-300 text-amber-300"
                                : "text-white/20"
                            )}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {error && (
                  <p className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
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
            )}
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  );
}

const inputCls = cn(
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all duration-200",
  "focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(30,107,255,0.18)]"
);
