import { Gauge, LayoutGrid, ShieldCheck, Headset } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PageHero from "@/components/common/PageHero";
import ServiceGrid from "@/components/services/ServiceGrid";
import EngagementPlans from "@/components/services/EngagementPlans";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import {
  websiteServices,
  appServices,
  systemServices,
  biServices,
  socialMediaServices,
} from "@/data/services";
import { servicesFaqs } from "@/data/faqs";
import {
  faqPageSchema,
  serviceListSchema,
  breadcrumbSchema,
} from "@/lib/structuredData";

export default function Services() {
  return (
    <PageTransition>
      <Seo
        title="Services | Navya EdTech"
        description="Explore Navya EdTech website development, app development, e-commerce, ERP, CRM, billing, LMS, business intelligence, system development, and social media services."
        path="/services"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          serviceListSchema([
            ...websiteServices,
            ...appServices,
            ...systemServices,
            ...biServices,
            ...socialMediaServices,
          ]),
          faqPageSchema(servicesFaqs),
        ]}
      />

      <PageHero
        eyebrow="Our Services"
        title="Websites, Systems & Social Built for"
        highlight="Business Growth"
        subtitle="From professional websites and complete business systems to result-driven social media, Navya EdTech builds solutions that are fast, secure, scalable, and easy to manage."
        highlights={[
          { icon: LayoutGrid, label: "Web · Systems · Social" },
          { icon: Gauge, label: "Speed & SEO-first builds" },
          { icon: ShieldCheck, label: "Secure & scalable" },
          { icon: Headset, label: "Ongoing support" },
        ]}
        primaryCta={{ label: "Start Your Project", to: "/contact" }}
        secondaryCta={{ label: "Read the Blog", to: "/blog" }}
      />

      <ServiceGrid
        eyebrow="Website Development"
        title="Websites That"
        highlight="Convert"
        items={websiteServices}
      />

      <ServiceGrid
        eyebrow="App Development"
        title="Apps That"
        highlight="Engage"
        items={appServices}
      />

      <ServiceGrid
        eyebrow="System Development"
        title="Systems That"
        highlight="Scale"
        items={systemServices}
      />

      <ServiceGrid
        eyebrow="Business Intelligence"
        title="Data That"
        highlight="Drives Decisions"
        items={biServices}
      />

      <ServiceGrid
        eyebrow="Social Media Services"
        title="Grow Your Brand"
        highlight="Online"
        items={socialMediaServices}
      />

      <EngagementPlans />

      <FaqSection
        eyebrow="Services FAQ"
        title="Answers Before You"
        highlight="Begin"
        subtitle="The practical details on how we build, deploy, and support your project."
        items={servicesFaqs}
      />

      <CTASection
        title="Have a Project in Mind?"
        subtitle="Tell us what you're building and we'll make it real."
        buttonLabel="Start Your Project"
      />
    </PageTransition>
  );
}
