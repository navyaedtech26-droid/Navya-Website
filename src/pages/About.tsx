import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PageHero from "@/components/common/PageHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import Milestones from "@/components/about/Milestones";
import CoreValues from "@/components/about/CoreValues";
import EngineeringShowcase from "@/components/about/EngineeringShowcase";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import TeamSection from "@/components/about/TeamSection";
import TechStack from "@/components/about/TechStack";
import CTASection from "@/components/common/CTASection";

export default function About() {
  return (
    <PageTransition>
      <Seo
        title="About | Navya EdTech"
        description="Learn about Navya EdTech, a digital solutions company helping businesses grow through innovation."
        path="/about"
      />

      <PageHero
        eyebrow="About Us"
        title="Innovate. Build."
        highlight="Elevate."
        subtitle="We are Navya EdTech, a digital solutions company helping businesses grow through modern websites and smart systems."
      />

      <CompanyStory />
      <MissionVision />
      <Milestones />
      <CoreValues />
      <EngineeringShowcase />
      <WhyChooseUs />
      <TeamSection />
      <TechStack />

      <CTASection
        title="Let's Build the Future Together"
        subtitle="Partner with a team that treats your growth as the goal."
        buttonLabel="Get in Touch"
      />
    </PageTransition>
  );
}
