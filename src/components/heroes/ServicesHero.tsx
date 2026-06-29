import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Smartphone,
  LayoutDashboard,
  LineChart,
  Share2,
  Gauge,
  ShieldCheck,
  Headset,
} from "lucide-react";
import HeroShell from "./HeroShell";
import IconBadge from "@/components/common/IconBadge";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useMediaQuery";

const SERVICES = [
  { icon: Globe, title: "Website Development", sub: "Landing pages to e-commerce", span: "sm:col-span-2" },
  { icon: Smartphone, title: "App Development", sub: "Apps that engage" },
  { icon: LayoutDashboard, title: "System Development", sub: "Software that runs ops" },
  { icon: LineChart, title: "Business Intelligence", sub: "Data into decisions" },
  { icon: Share2, title: "Social Media", sub: "Grow your brand", span: "sm:col-span-2" },
];

const CHIPS = [
  { icon: Gauge, label: "Speed & SEO-first builds" },
  { icon: ShieldCheck, label: "Secure & scalable" },
  { icon: Headset, label: "Ongoing support" },
];

function GridBackdrop({ still }: { still: boolean }) {
  return (
    <>
      <div className="absolute inset-0 bg-grid-pattern bg-[length:56px_56px] opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent" />
      <motion.div
        className="absolute right-[-5%] top-[5%] h-[40rem] w-[40rem] rounded-full bg-brand/20 blur-[130px]"
        animate={still ? undefined : { opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-8%] h-[34rem] w-[34rem] rounded-full bg-cyan-accent/12 blur-[120px]"
        animate={still ? undefined : { opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

export default function ServicesHero() {
  const reduced = useReducedMotion();

  return (
    <HeroShell
      backdrop={<GridBackdrop still={reduced} />}
      contentClassName="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14"
    >
      {/* Left — headline + CTAs */}
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-ink sm:text-5xl md:text-6xl"
        >
          Websites, Systems &amp; Social built for <span className="text-gradient">Business Growth</span>
        </motion.h1>

        <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          From professional websites and complete business systems to result-driven social media, Navya EdTech builds
          solutions that are fast, secure, scalable, and easy to manage.
        </motion.p>

        <motion.ul variants={fadeUp} className="mt-7 flex flex-wrap gap-2.5">
          {CHIPS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-medium text-ink-muted ring-1 ring-white/10 sm:text-sm"
            >
              <Icon size={15} className="text-cyan-accent" strokeWidth={2} />
              {label}
            </li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-bg shadow-glow-sm transition-all duration-200 hover:bg-brand-light hover:shadow-glow"
          >
            Start Your Project
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center rounded-xl glass px-6 py-3 text-sm font-semibold text-ink-muted ring-1 ring-white/10 transition-colors duration-200 hover:text-ink hover:ring-brand/40"
          >
            Read the Blog
          </Link>
        </motion.div>
      </motion.div>

      {/* Right — bento preview of service categories */}
      <motion.ul
        variants={staggerContainer(0.08, 0.2)}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 gap-3"
      >
        {SERVICES.map(({ icon: Icon, title, sub, span }) => (
          <motion.li
            key={title}
            variants={fadeUp}
            whileHover={reduced ? undefined : { y: -4 }}
            className={`group relative overflow-hidden rounded-2xl glass p-4 text-left ring-1 ring-white/10 transition-colors duration-300 hover:ring-brand/40 ${span ?? ""}`}
          >
            <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <IconBadge icon={Icon} size="sm" />
            <span className="mt-3 block text-sm font-semibold text-ink">{title}</span>
            <span className="mt-0.5 block text-xs text-ink-muted">{sub}</span>
          </motion.li>
        ))}
      </motion.ul>
    </HeroShell>
  );
}
