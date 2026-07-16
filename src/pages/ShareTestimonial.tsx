import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import ShareTestimonialHero from "@/components/heroes/ShareTestimonialHero";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import TestimonialInfo from "@/components/testimonials/TestimonialInfo";
import CTASection from "@/components/common/CTASection";

export default function ShareTestimonial() {
  return (
    <PageTransition>
      <Seo
        title="Share Your Story | Navya EdTech"
        description="Worked with Navya EdTech? Share your experience. We'd love to feature your story."
        path="/share-your-story"
        index={false}
      />

      <ShareTestimonialHero />

      <section id="testimonial-form" className="relative scroll-mt-24 py-24 lg:py-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-line/50"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
        
        <Container className="relative z-10">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] xl:gap-24 items-center">
            <Reveal>
              <TestimonialInfo />
            </Reveal>
            <Reveal delay={0.2}>
              <TestimonialForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to Build Something New?"
        subtitle="Let's engineer your next digital transformation."
        primaryButtonLabel="Book a Strategy Call"
        primaryButtonHref="/contact"
        secondaryButtonLabel="View Our Portfolio"
        secondaryButtonHref="/portfolio"
      />
    </PageTransition>
  );
}
