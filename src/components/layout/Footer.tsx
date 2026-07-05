import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Instagram, Music2, Linkedin, Star } from "lucide-react";
import Container from "@/components/common/Container";
import { navLinks, contactInfo } from "@/data/navigation";

// Only "Website Development" has a dedicated landing page today
// (/services/websites); the rest link to the Services hub until they get one.
const serviceLinks = [
  { label: "Website Development", href: "/services/websites" },
  { label: "E-Commerce", href: "/services" },
  { label: "CRM & ERP Systems", href: "/services" },
  { label: "Billing & Inventory", href: "/services" },
  { label: "BI Dashboards", href: "/services" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-paper">
      {/* Full-bleed light band consistent with the rest of the site; content
          is held to the site grid via Container so it aligns with the page. */}
      <Container className="py-14 sm:py-16">
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
                  src="/logo-navy.webp"
                  alt="NavyaEdTech"
                  width={614}
                  height={719}
                  className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <p className="text-sm leading-relaxed text-faint">
                We turn digital investment into revenue, efficiency, and lasting
                competitive advantage for ambitious businesses.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-heading">
                Quick Links
              </h4>
              <ul className="space-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      data-cursor="hover"
                      className="text-faint transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-heading">
                Services
              </h4>
              <ul className="space-y-3 text-sm">
                {serviceLinks.map((s) => (
                  <li key={s.label}>
                    <Link
                      to={s.href}
                      data-cursor="hover"
                      className="text-faint transition-colors hover:text-primary"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.18em] text-heading">
                Contact
              </h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    data-cursor="hover"
                    className="group flex items-center gap-2.5 text-faint transition-colors hover:text-primary"
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
                    className="group flex items-center gap-2.5 text-faint transition-colors hover:text-primary"
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
                    className="group flex items-center gap-2.5 text-faint transition-colors hover:text-primary"
                  >
                    <SocialIcon icon={Music2} />
                    TikTok {contactInfo.tiktok}
                  </a>
                </li>
                <li>
                  <a
                    href={contactInfo.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group flex items-center gap-2.5 text-faint transition-colors hover:text-primary"
                  >
                    <SocialIcon icon={Linkedin} />
                    LinkedIn {contactInfo.linkedin}
                  </a>
                </li>
                <li>
                  <a
                    href={contactInfo.googleReviewUrl}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="hover"
                    className="group flex items-center gap-2.5 text-faint transition-colors hover:text-primary"
                  >
                    <SocialIcon icon={Star} />
                    Review Us On Google
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Animated gradient divider */}
          <motion.div
            className="my-10 h-px w-full origin-left bg-gradient-to-r from-transparent via-line to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="flex flex-col items-center justify-between gap-4 text-xs text-faint sm:flex-row">
            <p>© {new Date().getFullYear()} Navya EdTech. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <Link
                to="/share-your-story"
                data-cursor="hover"
                className="transition-colors hover:text-primary"
              >
                Share Your Story
              </Link>
              <Link
                to="/privacy-policy"
                data-cursor="hover"
                className="transition-colors hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                data-cursor="hover"
                className="transition-colors hover:text-primary"
              >
                Terms of Service
              </Link>
            </div>
          </div>
      </Container>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: typeof Mail }) {
  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-haze text-primary ring-1 ring-line transition-all duration-300 group-hover:bg-sky group-hover:ring-primary/30">
      <Icon size={15} strokeWidth={1.9} />
    </span>
  );
}
