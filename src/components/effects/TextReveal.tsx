import { Fragment } from "react";
import { motion } from "framer-motion";
import { wordContainer, wordChild } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Words that should render with the gradient highlight (matched case-insensitively, joined). */
  highlight?: string;
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
}

export default function TextReveal({
  text,
  className,
  highlight,
  delay = 0,
  as = "h1",
}: TextRevealProps) {
  const words = text.split(" ");
  const highlightWords = highlight ? highlight.toLowerCase().split(" ") : [];

  const MotionTag = motion[as];

  return (
    <MotionTag
      variants={wordContainer}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: delay }}
      className={cn("inline-block [perspective:800px]", className)}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isHighlight = highlightWords.includes(word.toLowerCase().replace(/[.,!]/g, ""));
        return (
          <Fragment key={`${word}-${i}`}>
            <span className="relative inline-block overflow-hidden align-bottom">
              <motion.span
                variants={wordChild}
                className={cn(
                  "inline-block",
                  isHighlight && "text-ink"
                )}
                style={{ transformOrigin: "bottom" }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
