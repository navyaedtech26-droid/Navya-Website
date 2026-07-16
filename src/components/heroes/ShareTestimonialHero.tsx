import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";
import HeroShell from "./HeroShell";
import BeamsBackground from "@/components/effects/BeamsBackground";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function ShareTestimonialHero() {
  return (
    <HeroShell
      bgImage="/testimonials/testimonials.avif"
      bgImageWidth={1717}
      bgImageHeight={916}
      backdrop={<BeamsBackground intensity="strong" />}
      contentClassName="mx-auto max-w-5xl text-center py-10 lg:py-16"
    >
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        
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
          className="font-display text-5xl font-bold tracking-tight text-heading md:text-6xl lg:text-7xl leading-[1.1]"
        >
          Share Your <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-light to-primary">Experience</span>
        </motion.h1>

        {/* Supporting Paragraph */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-faint md:text-xl font-medium"
        >
          If we've built something for you, tell us how it went. Your stories help us improve and are often featured to inspire other enterprise leaders.
        </motion.p>

        {/* Call to action hint */}
        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#testimonial-form"
            className="group relative inline-flex items-center justify-center gap-3 rounded-2xl bg-heading px-10 py-5 text-base font-bold text-white shadow-xl shadow-heading/10 transition-all duration-300 hover:bg-black hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span>Share Your Story</span>
            <motion.span
              aria-hidden
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </HeroShell>
  );
}
