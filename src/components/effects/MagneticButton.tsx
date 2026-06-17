import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRichMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

interface MagneticButtonProps {
  children: ReactNode;
  to?: string;
  type?: "button" | "submit";
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
  onClick?: () => void;
}

const variants: Record<Variant, string> = {
  primary: "bg-brand-gradient text-white shadow-glow-sm",
  secondary: "glass text-ink ring-1 ring-white/10",
};

export default function MagneticButton({
  children,
  to,
  type = "button",
  variant = "primary",
  className,
  showArrow = true,
  onClick,
}: MagneticButtonProps) {
  const enabled = useRichMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  const handleMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.4);
    y.set(relY * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  const inner = (
    <motion.div
      ref={ref}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold tracking-wide transition-shadow duration-300",
        variants[variant],
        hovered && variant === "primary" && "shadow-glow",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <motion.span
          className="relative z-10"
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <ArrowRight size={16} strokeWidth={2.25} />
        </motion.span>
      )}
      <span className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex focus-visible:outline-none">
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className="inline-flex focus-visible:outline-none"
    >
      {inner}
    </button>
  );
}
