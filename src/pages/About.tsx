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
        description="Navya EdTech is a digital transformation partner helping founders and enterprises turn technology investment into revenue, efficiency, and lasting competitive advantage."
        keywords={[
          "about Navya EdTech",
          "digital transformation partner Nepal",
          "web development company Nepal",
          "business systems consultancy",
        ]}
        path="/about"
        pageType="AboutPage"
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
        title="Let's Build Your Competitive Advantage"
        subtitle="Partner with a team measured by one thing: the growth we create for you."
        buttonLabel="Book a Strategy Call"
      />
    </PageTransition>
  );
}
