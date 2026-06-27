import { Rocket, Users, Code2, HeartHandshake } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PageHero from "@/components/common/PageHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import Milestones from "@/components/about/Milestones";
import CoreValues from "@/components/about/CoreValues";
import EngineeringShowcase from "@/components/about/EngineeringShowcase";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import TechStack from "@/components/about/TechStack";
import CTASection from "@/components/common/CTASection";
import { breadcrumbSchema } from "@/lib/structuredData";

export default function About() {
  return (
    <PageTransition>
      <Seo
        title="About | Navya EdTech"
        description="Learn about Navya EdTech, a digital solutions company helping businesses grow through innovation."
        path="/about"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        eyebrow="About Us"
        title="Innovate. Build."
        highlight="Elevate."
        subtitle="We are Navya EdTech, a digital solutions company helping businesses grow through modern websites and smart systems."
        highlights={[
          { icon: Rocket, label: "Built for growth" },
          { icon: Users, label: "Senior, hands-on team" },
          { icon: Code2, label: "Modern tech stack" },
          { icon: HeartHandshake, label: "Long-term partnership" },
        ]}
        primaryCta={{ label: "Work With Us", to: "/contact" }}
        secondaryCta={{ label: "Our Services", to: "/services" }}
      />

      <CompanyStory />
      <MissionVision />
      <Milestones />
      <CoreValues />
      <EngineeringShowcase />
      <WhyChooseUs />
      <TechStack />

      <CTASection
        title="Let's Build the Future Together"
        subtitle="Partner with a team that treats your growth as the goal."
        buttonLabel="Get in Touch"
      />
    </PageTransition>
  );
}
