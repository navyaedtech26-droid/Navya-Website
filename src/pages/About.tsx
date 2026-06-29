import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import AboutHero from "@/components/heroes/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import MissionVision from "@/components/about/MissionVision";
import Milestones from "@/components/about/Milestones";
import CoreValues from "@/components/about/CoreValues";
import EngineeringShowcase from "@/components/about/EngineeringShowcase";
import WhyChooseUs from "@/components/about/WhyChooseUs";
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

      <AboutHero />

      <CompanyStory />
      <MissionVision />
      <Milestones />
      <CoreValues />
      <EngineeringShowcase />
      <WhyChooseUs />

      <CTASection
        title="Let's Build the Future Together"
        subtitle="Partner with a team that treats your growth as the goal."
        buttonLabel="Get in Touch"
      />
    </PageTransition>
  );
}
