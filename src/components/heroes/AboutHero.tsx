import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function AboutHero() {
  return (
    <section className="relative min-h-[90svh] overflow-hidden bg-paper flex flex-col justify-center pt-32 pb-20 lg:pt-40 lg:pb-32 border-b border-line/40">
      {/* Premium Dark Tech Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-slate-50/80 via-white to-white" />
      <div className="absolute inset-0 z-0 pointer-events-none light-grid opacity-[0.85] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      
      {/* Blurred Abstract Shapes - More sophisticated & subtle */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-[50rem] w-[50rem] rounded-full bg-brand/10 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -top-[10%] right-[10%] h-[40rem] w-[40rem] rounded-full bg-primary/10 blur-[100px]" 
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Content */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left max-w-2xl"
          >
            {/* Trust Badge */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary shadow-sm backdrop-blur-md">
                <ShieldCheck size={16} className="text-primary" />
                <span className="leading-none">Trusted by 50+ Industry Leaders</span>
                <div className="flex items-center ml-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} className="fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Enterprise Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-heading"
            >
              Engineering <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-brand-gradient">exceptional futures.</span>
            </motion.h1>
            
            {/* Mission Statement */}
            <motion.div variants={fadeUp} className="mt-8 border-l-4 border-primary pl-5 py-1">
              <p className="text-xl sm:text-2xl font-semibold text-heading leading-snug">
                Our mission is to bridge the gap between complex enterprise needs and elegant, scalable technology.
              </p>
            </motion.div>
            
            {/* Company Overview */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg sm:text-xl leading-relaxed text-faint max-w-xl"
            >
              We're Navya EdTech — a digital transformation partner helping ambitious founders and global enterprises turn technology
              investment into revenue, operational efficiency, and lasting competitive advantage.
            </motion.p>
            
            {/* Primary CTA */}
            <motion.div variants={fadeUp} className="mt-10">
              <Link
                to="/contact"
                className="group relative flex h-14 items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-10 font-semibold text-white shadow-primary-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                Partner With Us
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Team Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative w-full h-[300px] sm:h-[400px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0"
          >
            {/* Ambient glow behind illustration */}
            <div className="absolute inset-0 bg-brand/10 blur-[80px] rounded-full scale-75" />
            <img
              src="/vectors1/about%20us.avif"
              alt="Navya EdTech Team Collaboration"
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
              loading="eager"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
