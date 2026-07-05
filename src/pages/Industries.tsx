import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import PageHero from "@/components/common/PageHero";
import Container from "@/components/common/Container";
import IconBadge from "@/components/common/IconBadge";
import TiltCard from "@/components/effects/TiltCard";
import CTASection from "@/components/common/CTASection";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { breadcrumbSchema, serviceListSchema } from "@/lib/structuredData";
import { industryPages } from "@/data/industryPages";

export default function Industries() {
  return (
    <PageTransition>
      <Seo
        title="Industries We Serve | Navya EdTech"
        description="Dedicated digital transformation solutions for schools, colleges, hospitals, manufacturing, hotels, restaurants, retail, NGOs, real estate, and travel agencies — challenges, technology, ROI, and case studies for each sector."
        path="/industries"
        pageType="CollectionPage"
        keywords={[
          "digital transformation by industry",
          "industry-specific software solutions",
          "sector software Nepal",
        ]}
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
          ]),
          serviceListSchema(
            industryPages.map((p) => ({ title: p.title, description: p.seoDescription }))
          ),
        ]}
      />

      <PageHero
        title="Solutions Built for Your"
        highlight="Industry"
        subtitle="Every sector runs on different pressures — enrollment, occupancy, margin, compliance. Explore the specific challenges, technology, and ROI for your industry."
      />

      <section className="relative py-16 md:py-20">
        <Container>
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {industryPages.map((industry) => (
              <motion.div key={industry.slug} variants={fadeUp}>
                <TiltCard intensity={7} className="h-full">
                  <Link
                    to={`/industries/${industry.slug}`}
                    className="group flex h-full flex-col card-light rounded-2xl p-6 transition-shadow duration-300 hover:shadow-card-hover"
                  >
                    <div className="w-fit transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105">
                      <IconBadge icon={industry.icon} size="lg" color={industry.color} tone="light" />
                    </div>
                    <h2 className="mt-5 font-display text-base font-semibold text-heading">
                      {industry.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-faint">
                      {industry.heroSubtitle}
                    </p>
                    <span className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-primary">
                      Explore {industry.title.toLowerCase()}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <CTASection
        title="Don't See Your Exact Industry?"
        subtitle="The sectors above are our deepest experience, not the limit of it. Tell us about your business and we'll show you where the same approach applies."
        buttonLabel="Book a Strategy Call"
      />
    </PageTransition>
  );
}
