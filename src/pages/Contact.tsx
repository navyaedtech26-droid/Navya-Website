import { Clock, MessageSquare, FileText, ShieldCheck } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PageHero from "@/components/common/PageHero";
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

      <PageHero
        eyebrow="Get in Touch"
        title="Let's Build Something"
        highlight="Great Together"
        subtitle="Have an idea or project? Let's turn it into a powerful digital solution."
        highlights={[
          { icon: Clock, label: "Reply within 24 hours" },
          { icon: MessageSquare, label: "Free consultation" },
          { icon: FileText, label: "No-obligation quote" },
          { icon: ShieldCheck, label: "Your details stay private" },
        ]}
      />

      <section className="relative py-12">
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
