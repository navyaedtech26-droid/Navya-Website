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
    >
      {children}
    </motion.main>
  );
}
