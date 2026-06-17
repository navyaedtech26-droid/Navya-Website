import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeUp, staggerContainer, viewportOnce, easeEntrance } from "@/lib/animations";
import type { Faq } from "@/data/faqs";

interface FaqSectionProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  items: Faq[];
}

export default function FaqSection({
  eyebrow = "Questions & Answers",
  title,
  highlight,
  subtitle,
  items,
}: FaqSectionProps) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]" />
      <Container className="relative">
        <SectionHeading eyebrow={eyebrow} title={title} highlight={highlight} subtitle={subtitle} />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-12 flex max-w-3xl flex-col gap-3"
        >
          {items.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.question}
                variants={fadeUp}
                className={`overflow-hidden rounded-2xl glass ring-1 transition-colors duration-300 ${
                  isOpen ? "ring-brand/40 shadow-glow-sm" : "ring-white/10"
                }`}
              >
                <button
                  data-cursor="hover"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-semibold text-ink sm:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ duration: 0.3, ease: easeEntrance }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ring-1 transition-colors ${
                      isOpen
                        ? "bg-brand/20 text-cyan-accent ring-brand/40"
                        : "text-ink-muted ring-white/10"
                    }`}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeEntrance }}
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-muted sm:text-base">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
