import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Instagram, Music2 } from "lucide-react";
import Container from "@/components/common/Container";
import { navLinks, contactInfo } from "@/data/navigation";

const serviceLinks = [
  "Website Development",
  "E-Commerce",
  "CRM & ERP Systems",
  "Billing & Inventory",
  "BI Dashboards",
];

export default function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 pb-10 pt-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              to="/"
              data-cursor="hover"
              className="group inline-flex items-center"
              aria-label="Navya EdTech home"
            >
              <img
                src="/logo.png"
                alt="NavyaEdTech"
                width={420}
                height={162}
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed text-ink-muted">
              Innovate. Build. Elevate. We craft high-performance websites and smart
              business systems for growing companies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    data-cursor="hover"
                    className="text-ink-muted transition-colors hover:text-brand-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    to="/services"
                    data-cursor="hover"
                    className="text-ink-muted transition-colors hover:text-brand-light"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ink">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  data-cursor="hover"
                  className="group flex items-center gap-2.5 text-ink-muted transition-colors hover:text-brand-light"
                >
                  <SocialIcon icon={Mail} />
                  {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="group flex items-center gap-2.5 text-ink-muted transition-colors hover:text-brand-light"
                >
                  <SocialIcon icon={Instagram} />
                  Instagram {contactInfo.instagram}
                </a>
              </li>
              <li>
                <a
                  href={contactInfo.tiktokUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="group flex items-center gap-2.5 text-ink-muted transition-colors hover:text-brand-light"
                >
                  <SocialIcon icon={Music2} />
                  TikTok {contactInfo.tiktok}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated gradient divider */}
        <motion.div
          className="my-10 h-px w-full origin-left bg-gradient-to-r from-transparent via-brand to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Navya EdTech. All rights reserved.</p>
          <p>Built with precision — Innovate. Build. Elevate.</p>
        </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: typeof Mail }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg glass text-cyan-accent transition-all duration-300 group-hover:shadow-glow-sm group-hover:ring-1 group-hover:ring-brand/40">
      <Icon size={15} strokeWidth={1.9} />
    </span>
  );
}
