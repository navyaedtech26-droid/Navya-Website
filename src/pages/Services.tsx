import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import ServicesHero from "@/components/heroes/ServicesHero";
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
        description="Outcome-driven capabilities from Navya EdTech: revenue-driving websites and e-commerce, cost-cutting ERP, CRM, billing and LMS systems, business intelligence, and social media that converts."
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

      <ServicesHero />

      <ServiceGrid
        eyebrow="Website Development"
        title="Websites That"
        highlight="Convert"
        items={websiteServices}
        moreHref="/services/websites"
        moreLabel="See the business case for a website rebuild"
      />

      <ServiceGrid
        eyebrow="App Development"
        title="Apps That"
        highlight="Engage"
        items={appServices}
        background="bg-mist"
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
        background="bg-mist"
      />

      <ServiceGrid
        eyebrow="Social Media Services"
        title="Attention That Becomes"
        highlight="Revenue"
        items={socialMediaServices}
      />

      <EngagementPlans />

      <FaqSection
        eyebrow="Services FAQ"
        title="Answers Before You"
        highlight="Invest"
        subtitle="The practical details behind how we deliver, deploy, and protect your investment."
        items={servicesFaqs}
      />

      <CTASection
        title="Ready to Build the Business Case?"
        subtitle="Tell us the outcome you need. We'll show you the fastest, lowest-risk path to it."
        buttonLabel="Book a Strategy Call"
      />
    </PageTransition>
  );
}
