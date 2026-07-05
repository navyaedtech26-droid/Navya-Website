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
        className="fixed inset-0 z-[60] bg-heading/40 backdrop-blur-sm lg:hidden"
        onClick={onClose}
      />
      <aside className="fixed right-0 top-0 z-[70] flex h-[100dvh] w-[82%] max-w-sm flex-col card-light border-l border-line px-7 py-7 lg:hidden">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={onClose} aria-label="Navya EdTech home">
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
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-paper text-faint hover:bg-haze hover:text-heading"
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
                  active ? "text-primary" : "text-heading hover:text-primary"
                }`}
              >
                {link.label}
                <ArrowUpRight size={20} className="text-faint" />
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 border-t border-line pt-6 text-sm text-faint">
          <a href={`mailto:${contactInfo.email}`} className="block hover:text-primary">
            {contactInfo.email}
          </a>
          <p>Instagram {contactInfo.instagram}</p>
          <p>TikTok {contactInfo.tiktok}</p>
          <p>LinkedIn {contactInfo.linkedin}</p>
        </div>
      </aside>
    </>
  );
}
