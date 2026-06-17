import { motion } from "framer-motion";
import { Search, Gauge, ShieldCheck, Users, Server, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface Chip {
  label: string;
  icon: LucideIcon;
  className: string;
  amp: number;
  dur: number;
  delay: number;
}

const chips: Chip[] = [
  { label: "SEO Ready", icon: Search, className: "left-[-6%] top-[12%]", amp: 12, dur: 5, delay: 0 },
  { label: "Fast Load", icon: Gauge, className: "right-[-8%] top-[26%]", amp: 14, dur: 6, delay: 0.6 },
  { label: "Secure Build", icon: ShieldCheck, className: "left-[-10%] bottom-[24%]", amp: 10, dur: 7, delay: 1.1 },
  { label: "CRM Module", icon: Users, className: "right-[-6%] bottom-[14%]", amp: 13, dur: 5.5, delay: 0.3 },
  { label: "ERP Ready", icon: Server, className: "left-[42%] top-[-7%]", amp: 11, dur: 6.5, delay: 0.9 },
];

export default function FloatingTechCards() {
  const reduced = useReducedMotion();
  return (
    <>
      {chips.map((chip) => {
        const Icon = chip.icon;
        return (
          <motion.div
            key={chip.label}
            className={`absolute z-30 flex items-center gap-2 rounded-xl glass px-3.5 py-2 text-xs font-medium text-ink shadow-glow-sm ring-1 ring-white/10 ${chip.className}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              reduced
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: 1, y: [0, -chip.amp, 0] }
            }
            transition={{
              opacity: { duration: 0.6, delay: chip.delay + 0.5 },
              scale: { duration: 0.6, delay: chip.delay + 0.5 },
              y: {
                duration: chip.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: chip.delay,
              },
            }}
          >
            <Icon size={14} className="text-cyan-accent" strokeWidth={2} />
            {chip.label}
          </motion.div>
        );
      })}
    </>
  );
}
