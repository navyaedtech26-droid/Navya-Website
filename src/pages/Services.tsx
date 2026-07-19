import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import ServicesHeroRedesign from "@/components/services/ServicesHeroRedesign";
import ServicesTrust from "@/components/services/ServicesTrust";
import ServicesGridRedesign from "@/components/services/ServicesGridRedesign";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesWhyChoose from "@/components/services/ServicesWhyChoose";
import ServicesTechStack from "@/components/services/ServicesTechStack";
import ServicesIndustries from "@/components/services/ServicesIndustries";
import ServicesCTA from "@/components/services/ServicesCTA";
import FaqSection from "@/components/common/FaqSection";

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
        title="Custom Software & Enterprise Solutions in Nepal | Navya EdTech"
        description="Custom software development, mobile app engineering, AI solutions, cloud infrastructure, and ERP integrations, built by Navya EdTech for growing enterprises."
        path="/services"
        keywords={[
          "custom software development Nepal",
          "enterprise solutions Nepal",
          "IT services company Nepal",
          "ERP systems",
          "AI workflows",
          "cloud infrastructure",
          "mobile app development",
          "UI UX design",
          "digital transformation",
        ]}
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

      {/* Redesigned Hero Section */}
      <ServicesHeroRedesign />

      {/* Trust Section */}
      <ServicesTrust />

      {/* Alternating Capabilities Grid */}
      <ServicesGridRedesign />

      {/* Horizontal to Vertical Timeline */}
      <ServicesProcess />

      {/* Advantages Grid */}
      <ServicesWhyChoose />

      {/* Categorized Tech Stack */}
      <ServicesTechStack />

      {/* Target Industries Grid */}
      <ServicesIndustries />

      {/* FAQ Accordion list */}
      <FaqSection
        eyebrow="Services FAQ"
        title="Answers Before You Invest"
        subtitle="The practical details behind how we deliver, deploy, and protect your investment."
        items={servicesFaqs}
        tone="light"
      />

      {/* Conversions CTA */}
      <ServicesCTA />
    </PageTransition>
  );
}
