import { useEffect, useState } from "react";
import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { easeEntrance } from "@/lib/animations";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeEntrance }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-7xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-300",
            scrolled
              ? "glass shadow-glow-sm"
              : "border border-transparent bg-transparent"
          )}
        >
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
                        "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-brand-gradient transition-transform duration-300",
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
              className="flex h-10 w-10 items-center justify-center rounded-xl glass text-ink lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
