import type { Variants } from "framer-motion";

// Shared easing + spring tokens — defined once, reused everywhere.
export const easeEntrance: [number, number, number, number] = [0.22, 1, 0.36, 1];



// Container that staggers its children entrances.
export const staggerContainer = (stagger = 0.05, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

// Standard fade + 24px rise entrance.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeEntrance },
  },
};





// Page transition for route changes.
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeEntrance } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: easeEntrance } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
