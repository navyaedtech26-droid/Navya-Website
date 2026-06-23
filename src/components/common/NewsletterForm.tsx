import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { subscribeNewsletter } from "@/services/newsletter";
import { cooldownRemaining, cooldownMessage, markUsed } from "@/lib/rateLimit";
import { cn } from "@/lib/utils";

const COOLDOWN_MS = 15000;

export default function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const remaining = cooldownRemaining("newsletter", COOLDOWN_MS);
    if (remaining > 0) {
      setError(cooldownMessage(remaining));
      return;
    }

    setStatus("loading");
    const res = await subscribeNewsletter(email, source);
    if (res.ok) {
      markUsed("newsletter");
      setStatus("done");
    } else {
      setStatus("idle");
      setError(res.error ?? "Something went wrong. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <p className="flex items-center gap-2 text-sm text-emerald-300">
        <CheckCircle2 size={16} />
        You're subscribed — thanks for joining us!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className={cn(
            "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 outline-none transition-all duration-200",
            "focus:border-brand/60 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(30,107,255,0.18)]"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          data-cursor="hover"
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow-sm transition-all duration-300 hover:shadow-glow disabled:opacity-70"
        >
          {status === "loading" ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <Send size={15} />
              Subscribe
            </>
          )}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </form>
  );
}
