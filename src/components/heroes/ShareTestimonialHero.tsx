import { motion } from "framer-motion";
import { MessageSquareQuote, Sparkles, Star } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ShareTestimonialHero() {
  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-paper flex flex-col justify-center pt-24 pb-16 lg:pt-40 lg:pb-24 border-b border-line/40">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50/80 via-white to-white" />
      <div className="absolute inset-0 z-0 pointer-events-none light-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)]" />

      {/* Blurred Abstract Shapes */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] h-[40rem] w-[40rem] rounded-full bg-brand/10 blur-[100px]"
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT: Content ── */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            {/* Indicator */}
            <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line/40 bg-white/40 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-widest text-heading uppercase shadow-sm">
              <span className="flex items-center gap-1.5">
                <MessageSquareQuote size={14} className="text-primary" />
                We Value Your Feedback
              </span>
            </motion.div>

            {/* Large Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-heading"
            >
              Share Your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-brand-gradient">Experience.</span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed text-faint max-w-xl font-medium"
            >
              If we've built something for you, tell us how it went. Your stories help us improve and are often featured to inspire other enterprise leaders.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-6">
              <a
                href="#testimonial-form"
                className="group relative flex h-12 sm:h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 sm:px-8 font-semibold text-white shadow-primary-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                Share Your Story
                <motion.span
                  aria-hidden
                  className="inline-block"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.span>
              </a>
              <div className="flex items-center gap-2 text-sm font-semibold text-heading">
                <Star size={18} className="fill-primary text-primary" />
                Takes 2 Minutes
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Visual Showcase ── */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-[460px] w-full mt-10 lg:mt-0 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Soft ambient glow */}
              <div className="absolute h-[70%] w-[70%] rounded-full bg-brand/10 blur-[90px]" />

              {/* Secondary card peeking behind */}
              <div
                aria-hidden
                className="absolute w-full max-w-sm h-[85%] translate-x-6 translate-y-6 rotate-[4deg] rounded-3xl bg-brand/5 ring-1 ring-brand/10"
              />

              {/* Floating testimonial card mockup */}
              <div className="relative w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-line/50 -rotate-2">
                <MessageSquareQuote size={36} className="text-brand/30" />

                <div className="mt-5 space-y-2.5">
                  <div className="h-2.5 w-full rounded-full bg-slate-100" />
                  <div className="h-2.5 w-[85%] rounded-full bg-slate-100" />
                  <div className="h-2.5 w-[60%] rounded-full bg-slate-100" />
                </div>

                <div className="mt-6 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-line/50 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <div className="h-2.5 w-24 rounded-full bg-slate-200" />
                    <div className="mt-1.5 h-2 w-16 rounded-full bg-slate-100" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
