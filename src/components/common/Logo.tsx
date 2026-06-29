import { cn } from "@/lib/utils";

interface LogoProps {
  /** Size of the icon badge in pixels. */
  size?: number;
  /** Show the "NavyaEdTech" wordmark next to the icon. */
  showText?: boolean;
  className?: string;
}

/**
 * Navya EdTech brand mark — a trident "N" recreated as a crisp vector so it
 * scales cleanly and matches the dark navbar theme. The white mark sits inside
 * the brand gradient badge for guaranteed contrast on any background.
 */
export default function Logo({ size = 36, showText = true, className }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span
        className="relative flex items-center justify-center rounded-xl bg-brand-gradient shadow-glow-sm"
        style={{ height: size, width: size }}
      >
        <TridentMark className="text-bg" size={size * 0.62} />
      </span>
      {showText && (
        <span className="font-display text-lg font-semibold tracking-tight">
          Navya<span className="text-gradient">EdTech</span>
        </span>
      )}
    </span>
  );
}

export function TridentMark({
  size = 22,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Central shaft with upward arrowhead and downward spear tip */}
        <path d="M32 7 L32 57" />
        <path d="M23 17 L32 7 L41 17" />
        <path d="M25 48 L32 57 L39 48" />
        {/* Left tine bending into the center — the "N" diagonal */}
        <path d="M17 16 L17 35 L32 51" />
        {/* Right tine mirrored */}
        <path d="M47 16 L47 35 L32 51" />
      </g>
    </svg>
  );
}
