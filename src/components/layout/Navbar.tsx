import { useEffect, useRef, useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, ChevronDown } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { easeEntrance } from "@/lib/animations";
import { cn } from "@/lib/utils";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const location = useLocation();
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  // Close mega menu on route change
  useEffect(() => {
    setHoveredMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: easeEntrance }}
        className="fixed inset-x-0 top-0 z-50"
        onMouseLeave={() => setHoveredMenu(null)}
      >
        <nav
          className={cn(
            "w-full border-b backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-slow ease-out",
            scrolled
              ? "border-line bg-paper/85 shadow-card"
              : "border-transparent bg-paper/70"
          )}
        >
          <div className="mx-auto flex w-full max-w-enterprise items-center justify-between px-5 py-2.5 sm:px-8 sm:py-3 relative">
            <Link
              to="/"
              data-cursor="hover"
              className="group flex items-center z-10"
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

            {/* Desktop Navigation */}
            <div className="hidden items-center h-full gap-2 lg:flex lg:absolute lg:left-1/2 lg:-translate-x-1/2">
              {navLinks.map((link) => {
                const isMegaMenu = !!link.children;
                
                return (
                  <div 
                    key={link.label}
                    className="relative group h-full flex items-center px-2 py-4"
                    onMouseEnter={() => isMegaMenu && setHoveredMenu(link.label)}
                  >
                    {isMegaMenu ? (
                      <button className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-faint transition-colors hover:text-heading">
                        {link.label}
                        <ChevronDown size={14} className={cn("transition-transform duration-200", hoveredMenu === link.label && "rotate-180")} />
                      </button>
                    ) : (
                      <RouterNavLink
                        to={link.href!}
                        className={({ isActive }) => cn(
                          "rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:text-heading",
                          isActive ? "text-heading" : "text-faint"
                        )}
                      >
                        {link.label}
                      </RouterNavLink>
                    )}

                    {/* Mega Menu Dropdown */}
                    {isMegaMenu && (
                      <AnimatePresence>
                        {hoveredMenu === link.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.98 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className={cn(
                              "absolute top-full left-0 mt-1 rounded-2xl enterprise-glass shadow-card-hover overflow-hidden",
                              (link.children?.length ?? 0) > 6
                                ? "w-[90vw] max-w-[620px]"
                                : "w-[400px]"
                            )}
                          >
                            <div
                              className={cn(
                                "p-4 grid gap-1",
                                (link.children?.length ?? 0) > 6 && "sm:grid-cols-2"
                              )}
                            >
                              {link.children?.map((child) => (
                                <Link
                                  key={child.label}
                                  to={child.href}
                                  className="group flex flex-col gap-0.5 rounded-xl p-3 transition-colors hover:bg-slate-50"
                                >
                                  <span className="font-semibold text-heading group-hover:text-brand transition-colors">
                                    {child.label}
                                  </span>
                                  {child.description && (
                                    <span className="text-xs text-faint leading-snug">
                                      {child.description}
                                    </span>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 z-10">
              <Link
                to="/contact"
                className="hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-primary-sm transition-transform hover:-translate-y-0.5 active:scale-95 sm:inline-flex"
              >
                Book Free Consultation
              </Link>
              <button
                ref={menuToggleRef}
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper text-heading shadow-sm transition-colors hover:bg-haze active:scale-95 lg:hidden"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={menuToggleRef} />
    </>
  );
}
