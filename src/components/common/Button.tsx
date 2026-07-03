import { forwardRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Tone = "dark" | "light";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  /**
   * Surface the button sits on. "dark" (default) = legacy navy pages.
   * "light" = professional redesign: solid-blue primary, bordered white
   * secondary, muted ghost. Default keeps non-migrated pages unchanged.
   */
  tone?: Tone;
  className?: string;
}

const variants: Record<Tone, Record<Variant, string>> = {
  dark: {
    primary: "bg-brand-gradient text-white shadow-glow-sm hover:shadow-glow ring-1 ring-white/10",
    secondary: "glass text-ink hover:bg-white/[0.07] hover:ring-brand/40 ring-1 ring-white/10",
    ghost: "text-ink-muted hover:text-ink ring-1 ring-white/10",
  },
  light: {
    primary:
      "bg-primary text-white shadow-primary-sm ring-1 ring-primary/0 hover:bg-primary-dark",
    secondary:
      "bg-paper text-heading ring-1 ring-line hover:bg-mist hover:ring-primary/40",
    ghost: "text-faint ring-1 ring-transparent hover:text-heading",
  },
};

const base =
  "relative inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";

export const Button = forwardRef<
  HTMLButtonElement,
  BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, variant = "primary", tone = "dark", className, ...props }, ref) => {
  return (
    <button ref={ref} className={cn(base, variants[tone][variant], className)} {...props}>
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
  tone = "light",
  external,
  className,
}: LinkButtonProps) {
  const cls = cn(base, variants[tone][variant], className);
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
