import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import { getCaseStudyBySlug, type CaseStudy } from "@/services/caseStudies";
import { breadcrumbSchema } from "@/lib/structuredData";
import PortfolioCTA from "@/components/portfolio/PortfolioCTA";

// Sub-components to be built
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyContext from "@/components/case-study/CaseStudyContext";
import CaseStudySolution from "@/components/case-study/CaseStudySolution";
import CaseStudyProcess from "@/components/case-study/CaseStudyProcess";
import CaseStudyResults from "@/components/case-study/CaseStudyResults";
import CaseStudyGallery from "@/components/case-study/CaseStudyGallery";
import CaseStudyTestimonial from "@/components/case-study/CaseStudyTestimonial";
import RelatedProjects from "@/components/case-study/RelatedProjects";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [study, setStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getCaseStudyBySlug(slug || "");
      setStudy(data);
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-paper">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-brand border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-faint font-medium">Loading case study...</p>
        </div>
      </div>
    );
  }

  if (!study) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <PageTransition>
      <Seo
        title={`${study.client} - Enterprise Software Case Study | Navya EdTech`}
        description={study.summary}
        path={`/portfolio/${study.slug}`}
        keywords={[`${study.industry} software`, ...study.tags]}
        image={study.image}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/portfolio" },
            { name: study.client, path: `/portfolio/${study.slug}` },
          ]),
        ]}
      />

      <article className="bg-paper pb-20">
        <CaseStudyHero study={study} />
        <CaseStudyContext study={study} />
        <CaseStudySolution study={study} />
        <CaseStudyProcess study={study} />
        <CaseStudyResults study={study} />
        <CaseStudyGallery study={study} />
        <CaseStudyTestimonial study={study} />
      </article>
      
      <RelatedProjects currentStudy={study} />
      <PortfolioCTA />
    </PageTransition>
  );
}
