import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Instagram, Music2, Linkedin, ArrowUp, Send, CheckCircle2 } from "lucide-react";
import Container from "@/components/common/Container";
import { contactInfo } from "@/data/navigation";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

const servicesLinks = [
  { label: "Custom Software", href: "/services/custom-software-development" },
  { label: "Web Development", href: "/services/websites" },
  { label: "Mobile Apps", href: "/services/mobile-app-development" },
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "UI/UX Design", href: "/services/ui-ux-design" },
  { label: "DevOps & Cloud", href: "/services/devops" },
  { label: "IT Consulting", href: "/services/it-consulting" },
  { label: "All Services", href: "/services" },
];

const solutionsLinks = [
  { label: "ERP Systems", href: "/solutions/erp-systems" },
  { label: "CRM Systems", href: "/solutions/crm-systems" },
  { label: "Billing & Invoicing", href: "/solutions/billing-invoicing" },
  { label: "Learning Management", href: "/solutions/learning-management-systems" },
  { label: "Inventory Management", href: "/solutions/inventory-management" },
  { label: "Business Intelligence", href: "/solutions/business-intelligence-analytics" },
  { label: "Digital Transformation", href: "/solutions/digital-transformation" },
];

const industriesLinks = [
  { label: "Schools & Colleges", href: "/industries/schools" },
  { label: "Hospitals & Clinics", href: "/industries/hospitals" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Hotels & Resorts", href: "/industries/hotels" },
  { label: "Retail & E-Commerce", href: "/industries/retail" },
  { label: "Real Estate", href: "/industries/real-estate" },
  { label: "All Industries", href: "/industries" },
];

const resourcesLinks = [
  { label: "Blog & Insights", href: "/blog" },
  { label: "Case Studies", href: "/#case-studies" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus("loading");
    setErrorMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate basic validation
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }
      
      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-paper pt-20 pb-10 border-t border-line overflow-hidden text-faint">
      {/* Light theme glow effects */}
      <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid gap-16 lg:grid-cols-12 mb-20">

          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-3 flex flex-col gap-10">
            <div className="space-y-6">
              <Link to="/" data-cursor="hover" className="inline-block" aria-label="Navya EdTech home">
                <img
                  src="/logo-navy.webp"
                  alt="Navya EdTech"
                  width={614}
                  height={719}
                  decoding="async"
                  className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
                />
              </Link>
              <p className="text-sm leading-relaxed max-w-sm">
                A trusted technology partner building custom software, scalable cloud systems, and high-performance digital experiences.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-heading">
                Newsletter
              </h4>
              <p className="text-sm text-faint">
                Get the latest insights on enterprise architecture and digital transformation.
              </p>
              {status === "success" ? (
                <div className="mt-2 max-w-sm rounded-2xl bg-brand/5 border border-brand/20 p-4 flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-heading">Subscribed Successfully!</h5>
                    <p className="text-xs text-faint mt-1">Thank you for joining our newsletter.</p>
                  </div>
                </div>
              ) : (
                <form className="relative mt-2 max-w-sm flex flex-col gap-2" onSubmit={handleSubscribe}>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email address"
                      disabled={status === "loading"}
                      className="w-full rounded-full bg-white border border-line py-3.5 pl-6 pr-14 text-sm text-heading placeholder-faint/60 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand shadow-sm transition-all disabled:opacity-70"
                    />
                    <button 
                      type="submit" 
                      disabled={status === "loading" || !email}
                      className="absolute right-1.5 top-1.5 bottom-1.5 flex aspect-square items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-brand/20 transition-transform hover:scale-105 hover:bg-brand-light disabled:opacity-70 disabled:hover:scale-100"
                    >
                      {status === "loading" ? (
                        <div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      ) : (
                        <Send size={14} className="-ml-0.5" />
                      )}
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-xs text-red-500 pl-4">{errorMessage}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

            <div className="space-y-10">
              <div>
                <h4 className="mb-6 font-display text-sm font-semibold uppercase tracking-widest text-heading">
                  Services
                </h4>
                <ul className="space-y-4 text-sm">
                  {servicesLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="transition-colors hover:text-brand flex items-center gap-2 group">
                        <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="mb-6 font-display text-sm font-semibold uppercase tracking-widest text-heading">
                  Solutions
                </h4>
                <ul className="space-y-4 text-sm">
                  {solutionsLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="transition-colors hover:text-brand flex items-center gap-2 group">
                        <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="mb-6 font-display text-sm font-semibold uppercase tracking-widest text-heading">
                  Industries
                </h4>
                <ul className="space-y-4 text-sm">
                  {industriesLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="transition-colors hover:text-brand flex items-center gap-2 group">
                        <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="mb-6 font-display text-sm font-semibold uppercase tracking-widest text-heading">
                  Company
                </h4>
                <ul className="space-y-4 text-sm">
                  {companyLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="transition-colors hover:text-brand flex items-center gap-2 group">
                        <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-6 font-display text-sm font-semibold uppercase tracking-widest text-heading">
                  Resources
                </h4>
                <ul className="space-y-4 text-sm">
                  {resourcesLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="transition-colors hover:text-brand flex items-center gap-2 group">
                        <span className="h-px w-0 bg-brand transition-all duration-300 group-hover:w-3"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Social & Contact Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 py-8 border-y border-line">
          <div className="flex flex-wrap items-center gap-8 text-sm">
            <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 transition-colors hover:text-brand group">
              <SocialIcon icon={Mail} />
              {contactInfo.email}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a href={contactInfo.linkedinUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <SocialIcon icon={Linkedin} />
            </a>
            <a href={contactInfo.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <SocialIcon icon={Instagram} />
            </a>
            <a href={contactInfo.tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
              <SocialIcon icon={Music2} />
            </a>
          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="mt-8 flex flex-col-reverse md:flex-row items-center justify-between gap-6 text-xs text-faint">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {new Date().getFullYear()} Navya EdTech. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="transition-colors hover:text-brand">Privacy Policy</Link>
              <Link to="/terms" className="transition-colors hover:text-brand">Terms of Service</Link>
              <Link to="/share-your-story" className="transition-colors hover:text-brand">Share Your Story</Link>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 font-medium transition-colors hover:text-heading group"
          >
            Back to Top
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 transition-colors group-hover:bg-brand group-hover:text-white border border-line">
              <ArrowUp size={14} />
            </span>
          </button>
        </div>

      </Container>
    </footer>
  );
}

function SocialIcon({ icon: Icon }: { icon: typeof Mail }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-faint ring-1 ring-line transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:ring-brand shadow-sm">
      <Icon size={16} strokeWidth={2} />
    </span>
  );
}
