import { useState } from "react";
import { Send, CheckCircle2, ShieldCheck, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsletterCTA({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-primary w-[100vw] left-1/2 -ml-[50vw] border-y border-primary-light/30",
        className
      )}
    >
      {/* Technology-themed background */}
      <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-dark/80 opacity-90" />
      
      {/* Abstract geometric shape */}
      <div aria-hidden className="absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-brand opacity-20 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          
          {/* Left Column: Value Prop */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[0.6875rem] font-bold uppercase tracking-widest text-brand-light backdrop-blur">
              <Mail size={12} />
              The Developer Dispatch
            </div>
            <h3 className="mt-8 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl lg:leading-[1.1]">
              Stay ahead of the technology curve.
            </h3>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-lg">
              Join 15,000+ engineering leaders. Get our latest insights on software architecture, performance optimization, and building resilient systems delivered straight to your inbox.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-primary-light flex items-center justify-center text-[0.625rem] font-bold text-white shadow-sm overflow-hidden relative">
                     <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-white/80">Trusted by technical leaders.</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="w-full max-w-lg lg:ml-auto">
            <div className="border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-2xl">
              <h4 className="text-xl font-semibold text-white mb-2">Subscribe to our newsletter</h4>
              <p className="text-sm text-white/60 mb-8">One email per week. Unsubscribe at any time.</p>
              
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-6">
                  <div className="h-12 w-12 rounded-full bg-brand/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="text-brand-light" size={24} />
                  </div>
                  <h5 className="text-lg font-medium text-white">Subscription confirmed</h5>
                  <p className="text-sm text-white/70 mt-2">Thanks for joining. Check your inbox for the welcome issue.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-white/50">
                      Work Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-none border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white placeholder:text-white/30 outline-none backdrop-blur transition-all focus:border-brand-light focus:bg-white/20 focus:ring-1 focus:ring-brand-light"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-none bg-brand px-6 text-sm font-semibold uppercase tracking-widest text-white transition-all hover:bg-brand-light disabled:opacity-70"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe Now"}
                    <Send size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                  <p className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-white/40">
                    <ShieldCheck size={14} /> Your data is secure and never shared.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
