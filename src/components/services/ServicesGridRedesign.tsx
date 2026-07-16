import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code,
  Globe,
  Smartphone,
  Cpu,
  Database,
  Palette,
  Cloud,
  Compass,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Container from "@/components/common/Container";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const SERVICES_DATA = [
  {
    icon: Code,
    id: "custom-software",
    title: "Custom Software Development",
    description:
      "Engineered tailor-made business applications designed to solve unique organizational bottlenecks. From database-heavy backend management tools to cloud-connected automations, we build reliable, secure, and highly scalable solutions.",
    benefits: [
      "Eliminates legacy system inefficiencies and human error.",
      "Scales seamlessly with user headcount and transactional volume.",
      "Creates proprietary IP that increases company valuation.",
    ],
    idealClient: "Mid-market corporations & high-growth technology companies.",
    ctaLabel: "Architect Your Solution",
    ctaLink: "/contact?service=custom-software",
    image: "/vector/custom-software-development.avif",
  },
  {
    icon: Globe,
    id: "websites",
    title: "Website Design & Development",
    description:
      "Speed, security, and search performance rolled into a gorgeous custom interface. We build corporate websites, e-commerce stores, and high-performance landing pages that load instantly and turn traffic into qualified pipeline.",
    benefits: [
      "Optimized for organic search engine visibility (SEO).",
      "Sub-second load times that keep visitors engaged.",
      "Easy-to-manage CMS integration for marketing teams.",
    ],
    idealClient: "Enterprise brands, consumer merchants, & marketing teams.",
    ctaLabel: "Build Your Web Platform",
    ctaLink: "/contact?service=web-dev",
    image: "/vector/web-dev.avif",
  },
  {
    icon: Smartphone,
    id: "mobile-apps",
    title: "Mobile App Development",
    description:
      "Native iOS, Android, and cross-platform apps built using React Native and Flutter. We construct resilient offline-capable apps with fluid micro-interactions, robust security measures, and frictionless API synchronization.",
    benefits: [
      "Enables custom push notification funnels for user re-engagement.",
      "Frictionless offline operational modes with local data storage.",
      "Secure biometric authentication and payment gateways.",
    ],
    idealClient: "Service platforms, subscription networks, & consumer apps.",
    ctaLabel: "Scope Your Mobile App",
    ctaLink: "/contact?service=mobile-dev",
    image: "/vector/mobile-dev.avif",
  },
  {
    icon: Cpu,
    id: "ai-solutions",
    title: "AI & Automation Solutions",
    description:
      "Practical deployment of artificial intelligence to automate high-cost administration, optimize decision metrics, and support customer success. We integrate OpenAI API, build custom chatbots, and engineer structured document parsers.",
    benefits: [
      "Reduces manual data entry costs by up to 80%.",
      "Provides 24/7 intelligent customer responses.",
      "Integrates predictive intelligence into business software.",
    ],
    idealClient: "Operations executives, support teams, & logistics firms.",
    ctaLabel: "Deploy AI Agents",
    ctaLink: "/contact?service=ai-automation",
    image: "/vector/ai-solutions.avif",
  },
  {
    icon: Database,
    id: "erp-solutions",
    title: "ERP & Business Systems",
    description:
      "Consolidated workflows covering inventory, accounting, CRM, HR, operations, and academic administration. We replace fragmented systems with single-source-of-truth architectures that unify reporting and data.",
    benefits: [
      "Centralizes scattered data streams into one dashboard.",
      "Automates invoicing, ledger posting, and payroll.",
      "Provides instant, real-time audit-ready business reports.",
    ],
    idealClient: "Academic institutions, retailers, & inventory-heavy merchants.",
    ctaLabel: "Optimize Core Operations",
    ctaLink: "/contact?service=erp-solutions",
    image: "/vector/erp-solutions.avif",
  },
  {
    icon: Palette,
    id: "ui-ux",
    title: "UI/UX & Design Systems",
    description:
      "Interface design backed by deep user research, structured wireframes, and scalable design systems. We focus on accessibility compliance (WCAG), conversion optimization, and modern visual branding.",
    benefits: [
      "Reduces customer onboarding friction and user support queries.",
      "Increases user activation, retention, and feature engagement.",
      "Establishes a unified, repeatable visual component standard.",
    ],
    idealClient: "Product managers & founders validating early-stage MVPs.",
    ctaLabel: "Design Your Interface",
    ctaLink: "/contact?service=ui-ux",
    image: "/vector/uiux.avif",
  },
  {
    icon: Cloud,
    id: "cloud-infra",
    title: "Cloud & Infrastructure Solutions",
    description:
      "Architecting reliable cloud foundations on AWS, Google Cloud, and Azure. We secure applications with serverless designs, automated CI/CD deployment pipelines, system health monitors, and bulletproof firewalls.",
    benefits: [
      "Prevents costly service downtime with multi-region scaling.",
      "Improves code deployment velocity via automated Git pipelines.",
      "Maintains enterprise-grade data encryption and compliance.",
    ],
    idealClient: "Data-sensitive platforms, SaaS products, & scaling applications.",
    ctaLabel: "Secure Your Infrastructure",
    ctaLink: "/contact?service=cloud-infra",
    image: "/vector/cloud-infrastructure.avif",
  },
  {
    icon: Compass,
    id: "transformation-consulting",
    title: "Digital Transformation Consulting",
    description:
      "Strategic alignment of your technology investments with commercial outcomes. We analyze legacy systems, map business processes, audit licensing costs, and author step-by-step technological upgrade roadmaps.",
    benefits: [
      "Stops waste on redundant, low-value software subscriptions.",
      "Defines a clear, phased, and risk-managed upgrade path.",
      "Prepares workforces for the smooth adoption of new digital tools.",
    ],
    idealClient: "Executive boards, legacy businesses, & investment managers.",
    ctaLabel: "Book a Strategy Workshop",
    ctaLink: "/contact?service=digital-consulting",
    image: "/vector/it-consulting.avif",
  },
];

export default function ServicesGridRedesign() {
  return (
    <section id="our-services" className="py-32 bg-paper relative overflow-hidden">
      <Container>
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-24"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-5">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-haze text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
              Core Capabilities
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="type-heading-l text-heading"
            >
              Enterprise capabilities. <br />
              <span className="text-primary-light">
                Measured by outcomes.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-lg text-faint max-w-2xl mx-auto"
            >
              We don't just write code; we design and execute technology systems that reduce operating cost, unlock new channels, and secure transactional assets.
            </motion.p>
          </div>

          {/* alternating list of cards */}
          <div className="space-y-20">
            {SERVICES_DATA.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-14 rounded-[2rem] card-light hover:shadow-card hover:-translate-y-1 transition-all duration-500"
                >
                  {/* Text Details Column */}
                  <div className={`lg:col-span-7 space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-mist flex items-center justify-center text-primary-light border border-line group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <Icon size={24} />
                      </div>
                      <h3 className="font-display font-semibold text-2xl text-heading group-hover:text-brand transition-colors duration-200">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg text-faint leading-relaxed">
                      {service.description}
                    </p>

                    {/* Key Business Benefits */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                        Key Business Value
                      </h4>
                      <ul className="grid grid-cols-1 gap-2.5">
                        {service.benefits.map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-sm text-heading font-medium">
                            <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal Client tag */}
                    <div className="pt-6 border-t border-line flex flex-wrap items-center gap-3">
                      <span className="text-xs font-bold uppercase text-faint tracking-wider">Ideal For:</span>
                      <span className="px-3 py-1.5 text-xs font-semibold text-primary bg-mist rounded-md border border-line">
                        {service.idealClient}
                      </span>
                    </div>

                    {/* Call to Action */}
                    <div className="pt-2">
                      <Link
                        to={service.ctaLink}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-brand transition-colors duration-200"
                      >
                        {service.ctaLabel}
                        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>

                  {/* Graphic Display Column */}
                  <div className={`lg:col-span-5 flex justify-center items-center h-[300px] relative ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="absolute h-[65%] w-[65%] rounded-full bg-primary/10 blur-[80px] group-hover:bg-primary/15 transition-colors duration-500" />
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="relative w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
