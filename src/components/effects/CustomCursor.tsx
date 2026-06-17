import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRichMotion } from "@/hooks/useMediaQuery";

export default function CustomCursor() {
  const enabled = useRichMotion();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 220, damping: 26, mass: 0.4 });
  const ringY = useSpring(dotY, { stiffness: 220, damping: 26, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    document.body.style.cursor = "none";

    const move = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, [data-cursor="hover"], input, textarea, select, label'
      );
      setHovering(Boolean(interactive));
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [enabled, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-cyan-accent mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-brand-light/70 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{
          width: hovering ? 56 : 30,
          height: hovering ? 56 : 30,
          backgroundColor: hovering ? "rgba(30,107,255,0.14)" : "rgba(30,107,255,0)",
          borderColor: hovering ? "rgba(59,130,246,0.9)" : "rgba(30,107,255,0.6)",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      />
    </>
  );
}
