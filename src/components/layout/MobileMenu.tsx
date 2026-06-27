import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, ArrowUpRight } from "lucide-react";
import { navLinks, contactInfo } from "@/data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-bg-deep/70 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      <aside className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[82%] max-w-sm flex-col glass border-l border-white/10 px-7 py-7 lg:hidden">
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
            className="flex h-11 w-11 items-center justify-center rounded-xl glass text-ink-muted hover:text-ink"
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
                className={`flex items-center justify-between rounded-2xl px-4 py-4 font-display text-2xl font-medium ${
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
      </aside>
    </>
  );
}
