import type { Variants, Transition } from "framer-motion";

// Shared easing + spring tokens — defined once, reused everywhere.
export const easeEntrance: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springInteractive: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
};

export const springSoft: Transition = {
  type: "spring",
  stiffness: 90,
  damping: 20,
};

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

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: easeEntrance },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45, ease: easeEntrance } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easeEntrance },
  },
};

// Word-by-word reveal for headlines. Kept snappy: a tight stagger and short
// per-word duration so long headlines finish quickly instead of crawling in.
export const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03, delayChildren: 0 },
  },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: "0.4em", rotateX: -25 },
  visible: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
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
