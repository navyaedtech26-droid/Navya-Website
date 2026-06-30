import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { useRichMotion } from "@/hooks/useMediaQuery";

/** Desktop-only mouse-following radial glow, positioned within its relative parent. */
export default function HeroSpotlight() {
  const enabled = useRichMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.4);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });

  const px = useTransform(sx, (n) => `${n * 100}%`);
  const py = useTransform(sy, (n) => `${n * 100}%`);
  const background = useMotionTemplate`radial-gradient(600px circle at ${px} ${py}, rgba(30, 107, 255,0.14), transparent 65%)`;

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX / window.innerWidth);
      y.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-[5]"
      style={{ background }}
    />
  );
}
