import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import FeaturesSection from "@/components/home/FeaturesSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import { generalFaqs } from "@/data/faqs";
import { faqPageSchema } from "@/lib/structuredData";

export default function Home() {
  return (
    <PageTransition>
      <Seo
        title="Navya EdTech | High-Performance Websites & Digital Systems"
        description="Navya EdTech builds modern websites, e-commerce platforms, and business management systems for growing businesses."
        path="/"
        jsonLd={faqPageSchema(generalFaqs)}
      />

      <HeroSection />
      <ServicesOverview />
      <FeaturesSection />
      <IndustriesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection
        title="Frequently Asked"
        highlight="Questions"
        subtitle="Everything you need to know before we start building together."
        items={generalFaqs}
      />
      <CTASection
        title="Ready to Build Something Great?"
        subtitle="Let's turn your ideas into powerful digital solutions."
        buttonLabel="Let's Work Together"
      />
    </PageTransition>
  );
}
