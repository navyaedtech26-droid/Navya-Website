import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      data-scroll-progress
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left bg-gradient-to-r from-primary via-primary-light to-secondary"
    />
  );
}
