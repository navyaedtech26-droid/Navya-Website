import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /**
   * Deprecated/no-op: eyebrow badges were removed site-wide. The prop is kept
   * so existing call sites still compile; it renders nothing. Re-add the badge
   * here (and in PageHero) if they're ever wanted back.
   */
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
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
