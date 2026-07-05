import { useEffect, useState } from "react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import TechStack from "@/components/home/TechStack";
import StatsSection from "@/components/home/StatsSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import FeaturesSection from "@/components/home/FeaturesSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
import ProcessSection from "@/components/home/ProcessSection";
import TrustAssuranceSection from "@/components/home/TrustAssuranceSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import { generalFaqs } from "@/data/faqs";
import { faqPageSchema, reviewsSchema } from "@/lib/structuredData";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { getTestimonials } from "@/services/testimonials";

export default function Home() {
  // Same published-testimonials fetch TestimonialsSection makes — kept here
  // too so the Review/AggregateRating JSON-LD reflects real, admin-published
  // reviews rather than being tied to that component's internal state.
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);

  useEffect(() => {
    let active = true;
    getTestimonials().then((rows) => {
      if (active) setTestimonials(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  const reviews = reviewsSchema(testimonials);

  return (
    <PageTransition>
      <Seo
        // Every other page follows "{Page} | Navya EdTech" (brand-last). The
        // homepage is the one deliberate exception: it's the page branded
        // searches ("navya edtech") land on, so leading with the brand name
        // here is the correct call, not an inconsistency to "fix" later.
        title="Navya EdTech | Digital Transformation That Drives Growth"
        description="Navya EdTech turns digital investment into measurable growth — revenue-driving websites, cost-cutting business systems, and BI for founders, schools, hospitals, and enterprises."
        keywords={[
          "digital transformation Nepal",
          "revenue-driving website development",
          "business intelligence dashboards",
          "CRM and ERP systems",
          "digital transformation partner",
        ]}
        path="/"
        jsonLd={[faqPageSchema(generalFaqs), ...(reviews ? [reviews] : [])]}
      />

      <HeroSection />
      <TechStack />
      <StatsSection />
      <ServicesOverview />
      <FeaturesSection />
      <IndustriesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TrustAssuranceSection />
      <TestimonialsSection />
      <FaqSection
        tone="light"
        title="Frequently Asked"
        highlight="Questions"
        subtitle="What leaders ask before committing to a digital transformation partner."
        items={generalFaqs}
      />
      <CTASection
        tone="light"
        title="Ready to Turn Digital Into Growth?"
        subtitle="Let's build the business case for your next revenue channel, efficiency gain, or platform investment."
        buttonLabel="Book a Strategy Call"
      />
    </PageTransition>
  );
}
