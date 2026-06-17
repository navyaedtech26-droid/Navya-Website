import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { easeEntrance, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.6, ease: easeEntrance, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
