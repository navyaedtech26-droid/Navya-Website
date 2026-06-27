import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { navLinks, contactInfo } from "@/data/navigation";
import { easeEntrance } from "@/lib/animations";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-bg-deep/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[82%] max-w-sm flex-col glass border-l border-white/10 px-7 py-7 lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.3, ease: easeEntrance }}
          >
            <div className="flex items-center justify-between">
              <Link to="/" onClick={onClose} aria-label="Navya EdTech home">
                <img
                  src="/logo.png"
                  alt="NavyaEdTech"
                  width={420}
                  height={162}
                  decoding="async"
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-xl glass text-ink-muted transition-colors hover:text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <nav className="mt-12 flex flex-col gap-2">
              {navLinks.map((link) => {
                const active = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-medium transition-colors ${
                      active ? "text-gradient" : "text-ink hover:text-brand-light"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight size={20} className="text-ink-muted" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto space-y-3 border-t border-white/10 pt-6 text-sm text-ink-muted">
              <a href={`mailto:${contactInfo.email}`} className="block hover:text-ink">
                {contactInfo.email}
              </a>
              <p>Instagram {contactInfo.instagram}</p>
              <p>TikTok {contactInfo.tiktok}</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
