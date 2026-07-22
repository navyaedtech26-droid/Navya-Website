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

export default function Home() {
  // Same published-testimonials fetch TestimonialsSection makes — kept here
  // too so the Review/AggregateRating JSON-LD reflects real, admin-published
  // reviews rather than being tied to that component's internal state.
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);

  useEffect(() => {
    let active = true;
    // Dynamic import — see TestimonialsSection for why: it keeps the full
    // @supabase/supabase-js SDK out of Home's (eagerly-loaded) main chunk.
    import("@/services/testimonials").then(({ getTestimonials }) => {
      getTestimonials().then((rows) => {
        if (active) setTestimonials(rows);
      });
    });
    return () => {
      active = false;
    };
  }, []);

  const reviews = reviewsSchema(testimonials);

  return (
    <PageTransition>
      <Seo
        title="Navya EdTech | Enterprise IT Services & Software Development in Nepal"
        description="We engineer scalable, secure digital solutions for enterprises, custom software, cloud architecture, and AI systems that turn complexity into an edge."
        keywords={[
          "IT Services Nepal",
          "Enterprise Software Development Nepal",
          "Custom Software Development Company Nepal",
          "Web Development Company Nepal",
          "Cloud Solutions Nepal",
          "Digital Transformation Nepal",
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
      <TestimonialsSection testimonials={testimonials} />
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
