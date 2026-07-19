import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import ContactHero from "@/components/heroes/ContactHero";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import WhatHappensNext from "@/components/contact/WhatHappensNext";
import TrustSection from "@/components/contact/TrustSection";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import { contactFaqs } from "@/data/faqs";
import { faqPageSchema, breadcrumbSchema } from "@/lib/structuredData";

export default function Contact() {
  return (
    <PageTransition>
      <Seo
        title="Enterprise Consultation | Navya EdTech"
        description="Partner with Navya EdTech to engineer scalable solutions. Schedule an enterprise consultation to map out your digital transformation strategy."
        keywords={[
          "enterprise consultation Nepal",
          "digital transformation strategy",
          "custom software architecture",
          "IT services agency Nepal contact",
          "dedicated development team",
        ]}
        path="/contact"
        pageType="ContactPage"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Enterprise Consultation", path: "/contact" },
          ]),
          faqPageSchema(contactFaqs),
        ]}
      />

      <ContactHero />

      <section id="contact-form" className="relative scroll-mt-24 py-24 lg:py-32 bg-slate-50 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-line/50"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand/5 rounded-full blur-3xl"></div>
        <Container className="relative z-10">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.4fr] xl:gap-24 items-center">
            <Reveal>
              <ContactInfo />
            </Reveal>
            <Reveal delay={0.2}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <TrustSection />

      <WhatHappensNext />

      <FaqSection
        eyebrow="Consultation FAQ"
        title="Common"
        highlight="Questions"
        subtitle="Answers to common questions about our enterprise engagement model and consulting process."
        items={contactFaqs}
      />

      <CTASection
        title="Ready for Digital Excellence?"
        subtitle="Tell us the outcome you need and our strategy team will map the fastest, most reliable path to it."
        primaryButtonLabel="Book a Free Consultation"
        primaryButtonHref="#contact-form"
        secondaryButtonLabel="View Portfolio"
        secondaryButtonHref="/#case-studies"
      />
    </PageTransition>
  );
}
