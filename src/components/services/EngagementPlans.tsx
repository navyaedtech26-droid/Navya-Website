import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import TiltCard from "@/components/effects/TiltCard";
import { plans } from "@/data/plans";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function EngagementPlans() {
  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]" />
      <Container className="relative">
        <SectionHeading
          eyebrow="How We Work Together"
          title="Engagements That"
          highlight="Fit Your Stage"
          subtitle="Every project is custom-quoted, but most partnerships start from one of these. No lock-in, no surprises, just the right scope for where you are."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.div key={plan.name} variants={fadeUp} className="h-full">
              <TiltCard intensity={6} className="h-full">
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-2xl glass p-8 ${
                    plan.highlighted ? "ring-1 ring-brand/50 shadow-glow" : "ring-1 ring-white/10"
                  }`}
                >
                  {plan.highlighted && (
                    <>
                      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-brand to-transparent" />
                      <span className="absolute right-5 top-5 rounded-full bg-brand/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-accent ring-1 ring-brand/40">
                        Most Popular
                      </span>
                    </>
                  )}

                  <IconBadge icon={plan.icon} size="lg" />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{plan.name}</h3>
                  <p className="mt-1 text-sm font-medium text-brand-light">{plan.tagline}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-ink-muted">
                    Best for {plan.bestFor}
                  </p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm text-ink/90">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand/20 text-cyan-accent">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    data-cursor="hover"
                    className={`group mt-8 inline-flex items-center justify-center gap-1.5 rounded-lg px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-brand text-white hover:-translate-y-0.5 hover:shadow-glow"
                        : "border border-white/10 text-ink hover:border-brand/50 hover:bg-brand/10"
                    }`}
                  >
                    Get a Quote
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 text-center text-sm text-ink-muted"
        >
          Not sure which fits?{" "}
          <Link to="/contact" data-cursor="hover" className="font-semibold text-brand-light hover:text-cyan-accent">
            Talk to us
          </Link>{" "}
          and we'll shape the right plan around your goals.
        </motion.p>
      </Container>
    </section>
  );
}
