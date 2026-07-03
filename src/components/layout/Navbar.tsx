import { useEffect, useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { easeEntrance } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={isDesktop ? (reduceMotion ? { opacity: 0 } : { y: -24, opacity: 0 }) : false}
        animate={{ y: 0, opacity: 1 }}
        transition={isDesktop ? { duration: 0.4, ease: easeEntrance } : { duration: 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav
          className={cn(
            // A full-bleed deep-navy bar that matches the footer surface, on
            // every page. It deepens slightly and gains a shadow on scroll; the
            // bottom hairline keeps it separated from the content below.
            "w-full border-b transition-all duration-300",
            scrolled
              ? "border-white/10 bg-bg shadow-lg shadow-bg/30"
              : "border-white/5 bg-bg/95 backdrop-blur-md"
          )}
        >
          {/* Inner content is capped to the site grid so the logo and CTA line
              up with the page content below rather than the screen edges. */}
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <Link
            to="/"
            data-cursor="hover"
            className="group flex items-center"
            aria-label="Navya EdTech home"
          >
            <img
              src="/logo.png"
              alt="NavyaEdTech"
              width={420}
              height={162}
              decoding="async"
              className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-10"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <RouterNavLink
                key={link.href}
                to={link.href}
                data-cursor="hover"
                className="group relative rounded-xl px-4 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-primary transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </>
                )}
              </RouterNavLink>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              data-cursor="hover"
              className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark sm:inline-flex"
            >
              Let's Talk
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-bg-900/85 text-ink shadow-sm backdrop-blur-md transition-colors hover:bg-bg-900 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
