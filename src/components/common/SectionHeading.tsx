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
  /**
   * Surface the heading sits on. "dark" (default) = legacy navy pages: light
   * text + gold highlight. "light" = professional redesign: near-black heading
   * + blue highlight. Default keeps every non-migrated page byte-identical.
   */
  tone?: "dark" | "light";
}

export default function SectionHeading({
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  tone = "light",
}: SectionHeadingProps) {
  const light = tone === "light";
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
        className={cn(
          "max-w-3xl font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl",
          light ? "text-heading" : "text-ink"
        )}
      >
        {title}{" "}
        {highlight && (
          <span className={light ? "text-primary" : "text-gradient"}>{highlight}</span>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-faint" : "text-ink-muted",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
