import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import ContactHero from "@/components/heroes/ContactHero";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import WhatHappensNext from "@/components/contact/WhatHappensNext";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import { contactFaqs } from "@/data/faqs";
import { faqPageSchema, breadcrumbSchema } from "@/lib/structuredData";

export default function Contact() {
  return (
    <PageTransition>
      <Seo
        title="Contact | Navya EdTech"
        description="Contact Navya EdTech to build your website, e-commerce platform, or business management system."
        path="/contact"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          faqPageSchema(contactFaqs),
        ]}
      />

      <ContactHero />

      <section id="contact-form" className="relative scroll-mt-24 py-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <ContactForm />
            </Reveal>
            <div className="flex flex-col gap-6">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>

      <WhatHappensNext />

      <FaqSection
        eyebrow="Before You Reach Out"
        title="Common"
        highlight="Questions"
        subtitle="A few answers to help you feel ready for that first conversation."
        items={contactFaqs}
      />

      <CTASection
        title="Have a Project in Mind?"
        subtitle="Tell us what you're building and we'll make it real."
        buttonLabel="Start the Conversation"
      />
    </PageTransition>
  );
}
