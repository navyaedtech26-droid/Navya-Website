import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PortfolioHero from "@/components/portfolio/PortfolioHero";
import PortfolioTrustedBy from "@/components/portfolio/PortfolioTrustedBy";
import SoftwareDeliveryProcess from "@/components/portfolio/SoftwareDeliveryProcess";
import PortfolioTestimonials from "@/components/portfolio/PortfolioTestimonials";

import CaseStudyGrid from "@/components/portfolio/CaseStudyGrid";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";
import { breadcrumbSchema } from "@/lib/structuredData";

export default function Portfolio() {
  return (
    <PageTransition>
      <Seo
        title="Enterprise Software Portfolio & Case Studies | Navya EdTech"
        description="Explore our portfolio of enterprise software, ERP systems, and cloud architectures, real projects that drive revenue and operational excellence."
        path="/portfolio"
        keywords={[
          "software development portfolio",
          "enterprise case studies",
          "ERP development examples",
          "digital transformation portfolio",
          "custom software projects",
          "SaaS case studies",
        ]}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
          ]),
        ]}
      />

      <PortfolioHero />
      <PortfolioTrustedBy />

      <CaseStudyGrid />
      <SoftwareDeliveryProcess />
      <PortfolioTestimonials />
      <PortfolioCTA />
    </PageTransition>
  );
}
