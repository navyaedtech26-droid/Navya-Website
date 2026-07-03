import { motion } from "framer-motion";
import { Clock, MessageSquare, FileText, ShieldCheck } from "lucide-react";
import HeroShell from "./HeroShell";
import BeamsBackground from "@/components/effects/BeamsBackground";
import { fadeUp, staggerContainer } from "@/lib/animations";

const HIGHLIGHTS = [
  { icon: Clock, label: "Reply within 24 hours" },
  { icon: MessageSquare, label: "Free consultation" },
  { icon: FileText, label: "No-obligation quote" },
  { icon: ShieldCheck, label: "Your details stay private" },
];

export default function ContactHero() {
  return (
    <HeroShell
      bgImage="/contact/contact.avif"
      backdrop={<BeamsBackground intensity="strong" />}
      contentClassName="mx-auto max-w-3xl text-center"
    >
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-heading sm:text-5xl md:text-6xl"
        >
          Let&apos;s build something <span className="text-primary">great together</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-faint sm:text-lg"
        >
          Have an idea or project? Tell us what you&apos;re building and we&apos;ll turn it into a powerful digital
          solution.
        </motion.p>

        <motion.ul
          variants={fadeUp}
          className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-2.5"
        >
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-faint shadow-sm sm:text-sm"
            >
              <Icon size={15} className="text-primary" strokeWidth={2} />
              {label}
            </li>
          ))}
        </motion.ul>

        <motion.a
          variants={fadeUp}
          href="#contact-form"
          className="group mt-9 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-200 hover:bg-primary-dark"
        >
          Start the conversation
          <motion.span
            aria-hidden
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </HeroShell>
  );
}
