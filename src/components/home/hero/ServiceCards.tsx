import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ACCENT,
  CARD_ACCENT,
  easeEntrance,
  type HoverRef,
  type ServiceCard,
} from "./data";

// ─── Service Card (3D cursor tilt + spotlight) ────────────────────────────────
export function ServiceCardItem({
  card,
  index,
  hoverRef,
  registerRef,
}: {
  card: ServiceCard;
  index: number;
  hoverRef: HoverRef;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  const Icon = card.icon;
  const accent = CARD_ACCENT[index] ?? ACCENT.blue;
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const inner = innerRef.current;
    if (!inner) return;
    const r = inner.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 14;
    const ry = (px - 0.5) * 16;
    inner.style.transform = `perspective(620px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(120px circle at ${px * 100}% ${py * 100}%, rgba(96,165,250,0.22), transparent 70%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const handleEnter = () => { hoverRef.current = index; };
  const handleLeave = () => {
    hoverRef.current = null;
    const inner = innerRef.current;
    if (inner) inner.style.transform = "perspective(620px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={registerRef}
      initial={{ opacity: 0, scale: 0.85, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeEntrance, delay: 2.1 + index * 0.25 }}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group absolute ${card.style} z-30 w-[116px] sm:w-[172px] origin-center cursor-pointer`}
      style={{ animation: `svcFloat${card.float} ${card.dur}s ease-in-out infinite ${2.6 + index * 0.25}s` }}
    >
      <div
        ref={innerRef}
        className="relative overflow-hidden rounded-2xl border border-[rgba(245, 166, 35,0.22)] bg-[rgba(13,22,40,0.82)] px-2.5 py-2 sm:px-3.5 sm:py-3 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-200 ease-out group-hover:border-[rgba(245, 166, 35,0.55)] group-hover:shadow-[0_12px_40px_-12px_rgba(245, 166, 35,0.5)]"
        style={{ transform: "perspective(620px)", transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* cursor-tracking spotlight */}
        <span ref={glowRef} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200" />
        {/* sweep glow on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(245, 166, 35,0.14)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        {/* top accent line */}
        <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#F5A623]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-center gap-2 sm:gap-2.5">
          <span
            className="relative flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#F5A623]/30 to-[#FF7A59]/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6"
            style={{ color: `rgb(${accent})`, boxShadow: `inset 0 0 0 1px rgba(${accent},0.4)` }}
          >
            <span className="absolute inset-0 rounded-lg sm:rounded-xl blur-md opacity-60" style={{ background: `rgba(${accent},0.25)` }} />
            <Icon size={14} strokeWidth={1.75} className="relative z-10 sm:hidden" />
            <Icon size={17} strokeWidth={1.75} className="relative z-10 hidden sm:block" />
          </span>
          <p
            className="text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.16em]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: `rgb(${accent})` }}
          >
            {card.tag}
          </p>
        </div>

        <p className="relative mt-2 sm:mt-2.5 text-[0.78rem] sm:text-[0.95rem] font-bold leading-tight text-white">
          {card.title}
        </p>
        <p className="relative mt-0.5 text-[9px] sm:text-[10px] leading-snug text-[#E9DCEB]">
          {card.sub}
        </p>
      </div>
    </motion.div>
  );
}
