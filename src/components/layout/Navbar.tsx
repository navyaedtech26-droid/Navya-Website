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
            // A full-bleed white bar consistent with the rest of the light
            // site. It gains a soft card shadow on scroll; the bottom
            // hairline keeps it separated from the content below.
            "w-full border-b transition-all duration-300",
            scrolled
              ? "border-line bg-paper shadow-card"
              : "border-transparent bg-paper/90 backdrop-blur-md"
          )}
        >
          {/* Inner content is capped to the site grid so the logo and CTA line
              up with the page content below rather than the screen edges. */}
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3">
          <Link
            to="/"
            data-cursor="hover"
            className="group flex items-center"
            aria-label="Navya EdTech home"
          >
            <img
              src="/logo-navy.webp"
              alt="NavyaEdTech"
              width={614}
              height={719}
              decoding="async"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12"
            />
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <RouterNavLink
                key={link.href}
                to={link.href}
                data-cursor="hover"
                className="group relative rounded-xl px-4 py-2 text-sm font-medium text-faint transition-colors hover:bg-haze hover:text-heading aria-[current=page]:text-heading"
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
              className="hidden rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow duration-300 hover:shadow-glow sm:inline-flex"
            >
              Let's Talk
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper text-heading shadow-sm transition-colors hover:bg-haze lg:hidden"
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
