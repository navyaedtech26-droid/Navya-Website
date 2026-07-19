import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

interface LegalHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
}

export default function LegalHero({ title, highlight, subtitle }: LegalHeroProps) {
  return (
    <section className="relative min-h-[60svh] overflow-hidden bg-paper flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-20 border-b border-line/40">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50/80 via-white to-white" />
      <div className="absolute inset-0 z-0 pointer-events-none light-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)]" />

      {/* Blurred Abstract Shape */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.28, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[36rem] w-[36rem] rounded-full bg-brand/10 blur-[110px]"
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-2xl text-center"
        >
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line/40 bg-white/40 backdrop-blur-md px-4 py-1.5 text-xs font-bold tracking-widest text-heading uppercase shadow-sm"
          >
            <ShieldCheck size={14} className="text-primary" />
            Legal
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-heading"
          >
            {title} <span className="text-transparent bg-clip-text bg-brand-gradient">{highlight}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-faint font-medium"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
