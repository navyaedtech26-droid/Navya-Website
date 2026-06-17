import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-light"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent animate-pulse-glow" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        className="max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-4xl md:text-5xl"
      >
        {title}{" "}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
