import { Code2, Database, Cloud, Cpu, Boxes, Globe, type LucideIcon } from "lucide-react";
import { useReducedMotion } from "@/hooks/useMediaQuery";

// Six faces of a CSS-3D cube that rotates continuously in space.
const faces: { icon: LucideIcon; label: string; transform: string }[] = [
  { icon: Globe, label: "Web", transform: "rotateY(0deg) translateZ(var(--half))" },
  { icon: Database, label: "Data", transform: "rotateY(90deg) translateZ(var(--half))" },
  { icon: Cloud, label: "Cloud", transform: "rotateY(180deg) translateZ(var(--half))" },
  { icon: Cpu, label: "Systems", transform: "rotateY(-90deg) translateZ(var(--half))" },
  { icon: Code2, label: "Code", transform: "rotateX(90deg) translateZ(var(--half))" },
  { icon: Boxes, label: "Scale", transform: "rotateX(-90deg) translateZ(var(--half))" },
];

interface RotatingCube3DProps {
  size?: number;
}

export default function RotatingCube3D({ size = 200 }: RotatingCube3DProps) {
  const reduced = useReducedMotion();
  const half = size / 2;

  return (
    <div
      className="relative flex items-center justify-center [perspective:1100px]"
      style={{ width: size, height: size }}
    >
      {/* Glow puddle */}
      <div className="absolute inset-0 rounded-full bg-brand/20 blur-[70px]" />

      <div
        className="relative [transform-style:preserve-3d]"
        style={
          {
            width: size,
            height: size,
            "--half": `${half}px`,
            animation: reduced ? undefined : "cube-spin 18s linear infinite",
          } as React.CSSProperties
        }
      >
        {faces.map(({ icon: Icon, label, transform }) => (
          <div
            key={label}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border border-brand/30 bg-gradient-to-br from-bg-900/80 to-surface/60 text-brand-light shadow-glow-sm backdrop-blur-sm"
            style={{ transform, backfaceVisibility: "hidden" }}
          >
            <Icon size={size * 0.18} strokeWidth={1.5} className="text-cyan-accent" />
            <span className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
              {label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes cube-spin {
          0% { transform: rotateX(-20deg) rotateY(0deg); }
          100% { transform: rotateX(-20deg) rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
