import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, AlertTriangle, Sparkles } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import TiltCard from "@/components/effects/TiltCard";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import RelatedLinksSection from "@/components/common/RelatedLinksSection";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { breadcrumbSchema, faqPageSchema, serviceListSchema } from "@/lib/structuredData";
import { industryPages } from "@/data/industryPages";
import { solutionPages } from "@/data/servicePages";
import { serviceCategories } from "@/data/services";
import type { IndustryPage } from "@/types";

/** serviceCategories (used for the "Services Behind This Solution" cards) are
 * capability groupings, not routes — this maps each id to the single real
 * service or solution page that best represents it. */
const SERVICE_CATEGORY_HREF: Record<string, string> = {
  websites: "/services/websites",
  apps: "/services/mobile-app-development",
  systems: "/services/custom-software-development",
  "business-intelligence": "/solutions/business-intelligence-analytics",
  social: "/solutions/social-media-growth",
};

interface IndustryPageTemplateProps {
  data: IndustryPage;
}

export default function IndustryPageTemplate({ data }: IndustryPageTemplateProps) {
  const path = `/industries/${data.slug}`;
  const related = data.relatedIndustries
    .map((slug) => industryPages.find((p) => p.slug === slug))
    .filter((p): p is IndustryPage => Boolean(p));
  const relatedServiceCategories = data.relatedServices
    .map((id) => serviceCategories.find((s) => s.id === id))
    .filter((s): s is (typeof serviceCategories)[number] => Boolean(s));
  const relatedSolutions = (data.relatedSolutions ?? [])
    .map((slug) => solutionPages.find((s) => s.slug === slug))
    .filter((s): s is (typeof solutionPages)[number] => Boolean(s));

  return (
    <PageTransition>
      <Seo
        title={data.seoTitle}
        description={data.seoDescription}
        keywords={data.seoKeywords}
        path={path}
        pageType="CollectionPage"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Industries", path: "/industries" },
            { name: data.title, path },
          ]),
          serviceListSchema([{ title: `${data.title} Solutions`, description: data.seoDescription }]),
          faqPageSchema(data.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[50vh] flex-col justify-center overflow-hidden bg-[#0a0a0a] pb-16 pt-32 sm:pt-40">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />
        <Container className="relative">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="mb-8 flex items-center gap-2 text-sm font-medium text-white/50"
            >
              <Link to="/" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Home
              </Link>
              <span aria-hidden="true" className="text-white/30">›</span>
              <Link to="/industries" className="hover:text-white transition-colors">Industries</Link>
              <span aria-hidden="true" className="text-white/30">›</span>
              <span aria-current="page" className="text-white/90">{data.title}</span>
            </motion.nav>

            <motion.h1 variants={fadeUp} className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl">
              {data.title}
            </motion.h1>
            
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70"
            >
              {data.seoDescription || data.heroSubtitle}
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Overview / Image Section */}
      <section className="relative bg-white py-20 md:py-28">
        <Container>
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-16 max-w-4xl"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-faint">
                {data.title} Software Solutions
              </span>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-6">
              <div className="w-1.5 shrink-0 bg-heading" />
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-heading sm:text-4xl">
                  What Does {data.title} Software Development Actually Involve?
                </h2>
                <p className="text-lg leading-relaxed text-faint">
                  {data.heroSubtitle}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {data.heroImage && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="overflow-hidden rounded-2xl shadow-xl ring-1 ring-line/50"
            >
              <img 
                src={data.heroImage} 
                alt={`${data.title} Interface`}
                className="w-full object-cover aspect-[21/9] sm:aspect-video md:aspect-[2.35/1]"
              />
            </motion.div>
          )}
        </Container>
      </section>


      {/* Challenges */}
      <section className="relative py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title={data.challenges.title}
            highlight={data.challenges.highlight}
            subtitle={data.challenges.intro}
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 flex flex-col border-t border-line"
          >
            {data.challenges.items.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group flex flex-col md:flex-row gap-4 md:gap-12 py-8 md:py-10 border-b border-line transition-colors duration-300"
              >
                <div className="flex w-full md:w-5/12 items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                    <AlertTriangle size={24} strokeWidth={2} />
                  </div>
                  <h3 className="mt-2.5 font-display text-xl font-semibold text-heading">
                    {item.title}
                  </h3>
                </div>
                <div className="w-full md:w-7/12 md:pt-2.5">
                  <p className="text-base leading-relaxed text-faint sm:text-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Solutions */}
      <section className="relative bg-mist py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title={data.solutions.title}
            highlight={data.solutions.highlight}
            subtitle={data.solutions.intro}
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-5 sm:grid-cols-2"
          >
            {data.solutions.items.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="h-full">
                <TiltCard intensity={6} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl card-light p-7">
                    <IconBadge icon={item.icon} size="md" color={data.color} tone="light" />
                    <h3 className="font-display text-lg font-semibold text-heading">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-faint">{item.description}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ROI */}
      <section className="relative py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title={data.roi.title}
            highlight={data.roi.highlight}
            subtitle={data.roi.intro}
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {data.roi.points.map((point, index) => {
              const match = point.match(/^(.*?)\s+[—-]\s+(.*)$/);
              const title = match ? match[1] : point;
              const description = match ? match[2] : "";

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="group flex flex-col gap-4 rounded-3xl bg-mist/50 p-8 ring-1 ring-line/50 transition-all duration-300 hover:bg-white hover:shadow-xl hover:ring-primary/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                      <Check size={24} strokeWidth={2.5} />
                    </div>
                    <h3 className="font-display text-xl font-bold text-heading leading-tight transition-colors group-hover:text-primary">
                      {title}
                    </h3>
                  </div>
                  {description && (
                    <p className="mt-2 text-base leading-relaxed text-faint sm:text-lg">
                      {description}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section className="relative bg-mist py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title={data.features.title}
            highlight={data.features.highlight}
            subtitle={data.features.intro}
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.features.items.map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="rounded-2xl card-light p-6">
                <IconBadge icon={item.icon} size="sm" color={data.color} tone="light" />
                <h3 className="mt-4 font-display text-base font-semibold text-heading">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-faint">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Case Study */}
      <section className="relative py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title="What Results Have We Delivered for"
            highlight={`${data.title}?`}
            subtitle={`Real ${data.title.toLowerCase()} outcomes, not manufactured claims.`}
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={fadeUp}
            className="mt-10"
          >
            <TiltCard intensity={4}>
              <div className="rounded-3xl card-light p-8 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <Sparkles size={16} className="text-primary" />
                  <span className="text-xs font-bold uppercase tracking-wide text-faint">{data.title}</span>
                  {data.caseStudy.illustrative && (
                    <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-secondary">
                      Representative engagement
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-heading">{data.caseStudy.client}</h3>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wide text-faint">Challenge</span>
                    <p className="mt-2 text-sm leading-relaxed text-heading/90">{data.caseStudy.challenge}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wide text-faint">Approach</span>
                    <p className="mt-2 text-sm leading-relaxed text-heading/90">{data.caseStudy.approach}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wide text-faint">Outcome</span>
                    <p className="mt-2 text-sm leading-relaxed text-heading/90">{data.caseStudy.outcome}</p>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </Container>
      </section>

      {/* Internal linking: related services, solutions & industries */}
      <RelatedLinksSection
        groups={[
          {
            title: "The Services Behind",
            highlight: "This Solution",
            subtitle: "Explore the underlying capability in more depth.",
            linkLabel: "See service",
            items: relatedServiceCategories.map((service) => ({
              href: SERVICE_CATEGORY_HREF[service.id] ?? "/services",
              icon: service.icon,
              title: service.title,
              description: service.subtitle,
            })),
          },
          {
            title: "Ready-Built",
            highlight: "Solutions",
            subtitle: "Purpose-built systems we've engineered for this exact sector.",
            linkLabel: "See solution",
            items: relatedSolutions.map((solution) => ({
              href: `/solutions/${solution.slug}`,
              icon: solution.icon,
              title: solution.title,
              description: solution.heroSubtitle,
            })),
          },
          {
            title: "Related",
            highlight: "Industries",
            subtitle: "See how the same approach applies to adjacent sectors.",
            items: related.map((industry) => ({
              href: `/industries/${industry.slug}`,
              icon: industry.icon,
              color: industry.color,
              title: industry.title,
              description: industry.heroSubtitle,
            })),
          },
        ]}
      />

      <FaqSection
        title="Questions About"
        highlight={data.title}
        subtitle={`The practical details behind how we deliver this for ${data.title.toLowerCase()}.`}
        items={data.faqs}
      />

      <CTASection title={data.cta.title} subtitle={data.cta.subtitle} primaryButtonLabel={data.cta.buttonLabel} />
    </PageTransition>
  );
}
