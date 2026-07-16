import { motion } from "framer-motion";

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
import ServiceHero from "@/components/services/ServiceHero";
import ServiceOverview from "@/components/services/ServiceOverview";
import { fadeUp, staggerContainer, viewportOnce, easeEntrance } from "@/lib/animations";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceListSchema,
} from "@/lib/structuredData";
import { servicePages, solutionPages } from "@/data/servicePages";
import { industryPages } from "@/data/industryPages";
import type { ServicePage } from "@/types";

interface ServicePageTemplateProps {
  data: ServicePage;
}

export default function ServicePageTemplate({ data }: ServicePageTemplateProps) {
  const isSolution = data.category === "solution";
  const basePath = isSolution ? "/solutions" : "/services";
  const sectionLabel = isSolution ? "Solutions" : "Services";
  const path = `${basePath}/${data.slug}`;

  const relatedServices = (data.relatedServices ?? [])
    .map((slug) => servicePages.find((s) => s.slug === slug))
    .filter((s): s is ServicePage => Boolean(s));
  const relatedSolutions = (data.relatedSolutions ?? [])
    .map((slug) => solutionPages.find((s) => s.slug === slug))
    .filter((s): s is ServicePage => Boolean(s));
  const relatedIndustries = (data.relatedIndustries ?? [])
    .map((slug) => industryPages.find((p) => p.slug === slug))
    .filter((p): p is (typeof industryPages)[number] => Boolean(p));

  return (
    <PageTransition>
      <Seo
        title={`${data.title} | Navya EdTech`}
        description={data.seoDescription}
        keywords={data.seoKeywords}
        path={path}
        pageType="CollectionPage"
        jsonLd={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: sectionLabel, path: basePath },
            { name: data.title, path },
          ]),
          serviceListSchema([{ title: data.title, description: data.seoDescription }]),
          faqPageSchema(data.faqs),
        ]}
      />

      <ServiceHero data={data} />
      
      {data.overview && <ServiceOverview data={data.overview} />}

      {/* Business Problem */}
      <section className="relative py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title={data.businessProblem.title}
            highlight={data.businessProblem.highlight}
            subtitle={data.businessProblem.intro}
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 flex flex-col border-t border-line"
          >
            {data.businessProblem.painPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                className="group flex flex-col md:flex-row gap-4 md:gap-12 py-8 md:py-10 border-b border-line transition-colors duration-300"
              >
                <div className="flex w-full md:w-5/12 items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                    <AlertTriangle size={24} strokeWidth={2} />
                  </div>
                  <h3 className="mt-2.5 font-display text-xl font-semibold text-heading">
                    {point.title}
                  </h3>
                </div>
                <div className="w-full md:w-7/12 md:pt-2.5">
                  <p className="text-base leading-relaxed text-faint sm:text-lg">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Business Impact */}
      <section className="relative bg-mist py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title={data.businessImpact.title}
            highlight={data.businessImpact.highlight}
            subtitle={data.businessImpact.intro}
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-5 sm:grid-cols-2"
          >
            {data.businessImpact.points.map((point) => (
              <motion.div key={point.title} variants={fadeUp} className="h-full">
                <TiltCard intensity={6} className="h-full">
                  <div className="flex h-full flex-col gap-4 rounded-2xl card-light p-7">
                    <IconBadge icon={point.icon} size="md" tone="light" />
                    <h3 className="font-display text-lg font-semibold text-heading">{point.title}</h3>
                    <p className="text-sm leading-relaxed text-faint">{point.description}</p>
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

      {/* Workflow */}
      <section className="relative bg-mist py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title="How Does the Engagement"
            highlight="Actually Run?"
            subtitle="The same disciplined process behind every project, applied to this one."
          />
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-7 hidden lg:block">
              <div className="relative h-px w-full bg-line">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary-light to-secondary"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 1.6, ease: easeEntrance }}
                />
              </div>
            </div>
            <motion.div
              variants={staggerContainer(0.15)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 gap-8 lg:grid-cols-5"
            >
              {data.workflow.map((step) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}
                  className="relative flex gap-5 lg:flex-col lg:gap-4 lg:text-center"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-primary/30 bg-white font-display text-lg font-bold text-primary shadow-sm">
                      {step.step}
                    </div>
                    <span className="mt-2 h-full w-px flex-1 bg-gradient-to-b from-primary/40 to-transparent lg:hidden" />
                  </div>
                  <div className="lg:mt-3">
                    <h3 className="font-display text-base font-semibold text-heading">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-faint">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Implementation */}
      <section className="relative py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title={data.implementation.title}
            highlight={data.implementation.highlight}
            subtitle={data.implementation.intro}
          />
          <motion.ul
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 grid gap-3 sm:grid-cols-2"
          >
            {data.implementation.deliverables.map((item) => (
              <motion.li
                key={item}
                variants={fadeUp}
                className="flex items-start gap-2.5 rounded-xl bg-mist px-5 py-4 text-sm leading-relaxed text-heading/90"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {/* Timeline */}
      <section className="relative bg-mist py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title="What's a Realistic"
            highlight="Timeline?"
            subtitle="Scoped ranges, not vague promises — the exact plan is confirmed after discovery."
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {data.timeline.map((phase, i) => (
              <motion.div key={phase.phase} variants={fadeUp} className="flex flex-col gap-3 rounded-2xl card-light p-6">
                <span className="font-display text-3xl font-bold text-heading/[0.08]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-base font-semibold text-heading">{phase.phase}</h3>
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {phase.duration}
                </span>
                <p className="text-sm leading-relaxed text-faint">{phase.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Technology */}
      <section className="relative py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title="What Technology Is"
            highlight="Behind It?"
            subtitle="We pick the right tool for the outcome — not the newest one for its own sake."
          />
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            {data.technology.map((group) => (
              <motion.div key={group.category} variants={fadeUp} className="rounded-2xl card-light p-6">
                <h3 className="font-display text-sm font-bold uppercase tracking-wide text-primary">
                  {group.category}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-mist px-3 py-1.5 text-sm font-medium text-heading/90 ring-1 ring-line"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Case Study */}
      <section className="relative bg-mist py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title="What Results Have We Delivered in"
            highlight={`${data.title}?`}
            subtitle={`Real outcomes from ${data.title.toLowerCase()} engagements, not manufactured claims.`}
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
                  <span className="text-xs font-bold uppercase tracking-wide text-faint">
                    {data.caseStudy.industry}
                  </span>
                  {data.caseStudy.illustrative && (
                    <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-secondary">
                      Representative engagement
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-heading">
                  {data.caseStudy.client}
                </h3>
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

      {/* Internal linking: sibling services/solutions + the industries this fits */}
      <RelatedLinksSection
        groups={[
          {
            title: isSolution ? "Paired" : "Related",
            highlight: "Services",
            subtitle: "Capabilities that pair naturally with this one.",
            items: relatedServices.map((service) => ({
              href: `/services/${service.slug}`,
              icon: service.icon,
              title: service.title,
              description: service.heroSubtitle,
            })),
          },
          {
            title: isSolution ? "Other" : "Related",
            highlight: "Solutions",
            subtitle: "Purpose-built systems that solve adjacent problems.",
            items: relatedSolutions.map((solution) => ({
              href: `/solutions/${solution.slug}`,
              icon: solution.icon,
              title: solution.title,
              description: solution.heroSubtitle,
            })),
          },
          {
            title: "Who This Is",
            highlight: "Built For",
            subtitle: "See how this looks in practice for a specific industry.",
            linkLabel: "See industry",
            items: relatedIndustries.map((industry) => ({
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
        subtitle="The practical details behind how we deliver this specific service."
        items={data.faqs}
      />

      <CTASection
        title={data.cta.title}
        subtitle={data.cta.subtitle}
        primaryButtonLabel={data.cta.buttonLabel}
      />
    </PageTransition>
  );
}
