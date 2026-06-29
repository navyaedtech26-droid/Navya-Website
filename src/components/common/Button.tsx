import { forwardRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-bg shadow-glow-sm hover:shadow-glow",
  secondary:
    "glass text-ink hover:bg-white/[0.07] hover:ring-brand/40",
  ghost: "text-ink-muted hover:text-ink",
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium tracking-wide ring-1 ring-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light";

export const Button = forwardRef<
  HTMLButtonElement,
  BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, variant = "primary", className, ...props }, ref) => {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
});
Button.displayName = "Button";

interface LinkButtonProps extends BaseProps {
  to: string;
  external?: boolean;
}

export function LinkButton({
  children,
  to,
  variant = "primary",
  external,
  className,
}: LinkButtonProps) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={to} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
    </Link>
  );
}
