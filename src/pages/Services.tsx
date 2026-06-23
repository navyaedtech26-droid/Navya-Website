import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PageHero from "@/components/common/PageHero";
import ServiceGrid from "@/components/services/ServiceGrid";
import EngagementPlans from "@/components/services/EngagementPlans";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import { websiteServices, systemServices, socialMediaServices } from "@/data/services";
import { servicesFaqs } from "@/data/faqs";
import { faqPageSchema } from "@/lib/structuredData";

export default function Services() {
  return (
    <PageTransition>
      <Seo
        title="Services | Navya EdTech"
        description="Explore Navya EdTech website development, e-commerce, ERP, CRM, billing, LMS, BI, system development, and social media services."
        path="/services"
        jsonLd={faqPageSchema(servicesFaqs)}
      />

      <PageHero
        eyebrow="Our Services"
        title="Websites, Systems & Social Built for"
        highlight="Business Growth"
        subtitle="From professional websites and complete business systems to result-driven social media, Navya EdTech builds solutions that are fast, secure, scalable, and easy to manage."
      />

      <ServiceGrid
        eyebrow="Website Development"
        title="Websites That"
        highlight="Convert"
        items={websiteServices}
      />

      <ServiceGrid
        eyebrow="System Development"
        title="Systems That"
        highlight="Scale"
        items={systemServices}
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
