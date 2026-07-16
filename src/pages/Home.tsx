import { useEffect, useState } from "react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import HeroSection from "@/components/home/HeroSection";
import TechStack from "@/components/home/TechStack";
import ServicesOverview from "@/components/home/ServicesOverview";
import FeaturesSection from "@/components/home/FeaturesSection";
import IndustriesSection from "@/components/home/IndustriesSection";
import CaseStudiesSection from "@/components/home/CaseStudiesSection";
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
        title="Navya EdTech | Enterprise IT Services & Software Development"
        description="We engineer scalable, secure, and modern digital solutions for enterprises. From custom software to cloud architecture, we turn complex challenges into competitive advantages."
        keywords={[
          "Enterprise Software Development",
          "IT Services",
          "Cloud Solutions",
          "Digital Transformation",
          "Custom App Development",
        ]}
        path="/"
        jsonLd={[faqPageSchema(generalFaqs), ...(reviews ? [reviews] : [])]}
      />

      <HeroSection />
      <TechStack />
      <ServicesOverview />
      <FeaturesSection />
      <IndustriesSection />
      <CaseStudiesSection />
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
        title="Ready to Upgrade Your Technical Foundation?"
        subtitle="Let's discuss your operational bottlenecks and build a strategic roadmap for your next software investment."
        primaryButtonLabel="Book a Strategy Call"
      />
    </PageTransition>
  );
}
