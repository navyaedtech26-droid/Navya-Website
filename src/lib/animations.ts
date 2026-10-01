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





// Professional page transition for route changes.
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: easeEntrance } 
  },
  exit: { 
    opacity: 0, 
    y: -20, 
    scale: 0.98,
    transition: { duration: 0.4, ease: easeEntrance } 
  },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
