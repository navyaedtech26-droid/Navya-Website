import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, contactInfo } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  /** Receives focus back when the menu closes, so it isn't dropped from a
   *  now `aria-hidden` panel (see the layout effect below). */
  triggerRef?: RefObject<HTMLButtonElement | null>;
}

export default function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Browsers block `aria-hidden` on an element that still contains focus.
  // If a link inside the drawer has focus when it closes (e.g. Escape was
  // pressed instead of clicking a link), move focus to the button that
  // opened it before the drawer becomes aria-hidden.
  useLayoutEffect(() => {
    if (open) return;
    const active = document.activeElement;
    if (active && asideRef.current?.contains(active)) {
      triggerRef?.current?.focus();
    }
  }, [open, triggerRef]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-heading/40 backdrop-blur-sm transition-opacity ease-out lg:hidden",
          open ? "pointer-events-auto opacity-100 duration-base" : "pointer-events-none opacity-0 duration-fast"
        )}
      />
      <aside
        ref={asideRef}
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-[100dvh] w-[82%] max-w-sm flex-col card-light border-l border-line px-7 py-7 lg:hidden overflow-y-auto",
          "transition-[transform,opacity] ease-drawer",
          open
            ? "translate-x-0 opacity-100 duration-base"
            : "pointer-events-none translate-x-full opacity-0 duration-fast"
        )}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={(e) => {
              onClose();
              if (location.pathname === "/") {
                e.preventDefault();
                window.location.reload();
              }
            }}
            aria-label="Navya EdTech home"
            tabIndex={open ? 0 : -1}
          >
            <img
              src="/logo-navy.webp"
              alt="NavyaEdTech"
              width={614}
              height={719}
              decoding="async"
              className="h-11 w-auto object-contain"
            />
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper text-faint transition-[background-color,transform] duration-fast ease-out hover:bg-haze hover:text-heading active:scale-[0.97]"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-10 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isMegaMenu = !!link.children;
            const isExpanded = expandedMenus.includes(link.label);

            if (isMegaMenu) {
              return (
                <div key={link.label} className="flex flex-col">
                  <button
                    onClick={() => toggleMenu(link.label)}
                    tabIndex={open ? 0 : -1}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-medium transition-[color,transform] duration-fast ease-out active:scale-[0.98] text-heading hover:text-primary"
                  >
                    {link.label}
                    <ChevronDown size={20} className={cn("text-faint transition-transform duration-300", isExpanded && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden px-4 flex flex-col gap-3"
                      >
                        {link.children?.map(child => (
                          <Link
                            key={child.label}
                            to={child.href}
                            onClick={onClose}
                            tabIndex={open ? 0 : -1}
                            className="font-medium text-faint hover:text-primary py-2 border-l-2 border-line pl-4"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const active = location.pathname === link.href;
            return (
              <Link
                key={link.label}
                to={link.href!}
                onClick={onClose}
                tabIndex={open ? 0 : -1}
                className={cn(
                  "flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-medium transition-[color,transform] duration-fast ease-out active:scale-[0.98]",
                  active ? "text-primary" : "text-heading hover:text-primary"
                )}
              >
                {link.label}
                <ArrowUpRight size={20} className="text-faint" />
              </Link>
            );
          })}
        </nav>

        <div className="mt-12 space-y-3 border-t border-line pt-6 text-sm text-faint">
          <a
            href={`mailto:${contactInfo.email}`}
            tabIndex={open ? 0 : -1}
            className="block hover:text-primary font-medium"
          >
            {contactInfo.email}
          </a>
          <p>Facebook <a href={contactInfo.facebookUrl} className="hover:text-primary transition-colors underline decoration-line underline-offset-4">{contactInfo.facebook}</a></p>
          <p>LinkedIn <a href={contactInfo.linkedinUrl} className="hover:text-primary transition-colors underline decoration-line underline-offset-4">{contactInfo.linkedin}</a></p>
        </div>
      </aside>
    </>
  );
}
