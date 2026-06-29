import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageTransition } from "@/lib/animations";

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      // `relative` makes this the containing block for the decorative
      // absolutely-positioned blobs inside the page's sections, so `clip`
      // actually trims their horizontal overflow. Without it those blobs anchor
      // to the root, widen the mobile layout viewport, and push the fixed
      // navbar (and its hamburger) off-centre. `clip` avoids a scroll container
      // so sticky/scroll-anchoring keep working.
      className="relative overflow-x-clip"
    >
      {children}
    </motion.main>
  );
}
