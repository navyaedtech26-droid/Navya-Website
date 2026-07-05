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
      bgImageWidth={1584}
      bgImageHeight={672}
      backdrop={<BeamsBackground intensity="strong" />}
      contentClassName="mx-auto max-w-3xl text-center"
    >
      <motion.div variants={staggerContainer(0.12)} initial="hidden" animate="visible">
        <motion.h1
          variants={fadeUp}
          className="type-display text-heading"
        >
          Let&apos;s build your next <span className="text-primary">growth engine</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-faint sm:text-lg"
        >
          Tell us the outcome you&apos;re after — more revenue, lower cost, a better customer experience — and we&apos;ll
          map the fastest, lowest-risk path to it.
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
