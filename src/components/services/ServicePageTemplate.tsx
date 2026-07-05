import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, AlertTriangle, Sparkles } from "lucide-react";
import Seo from "@/components/common/Seo";
import PageTransition from "@/components/effects/PageTransition";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import TiltCard from "@/components/effects/TiltCard";
import FaqSection from "@/components/common/FaqSection";
import CTASection from "@/components/common/CTASection";
import { fadeUp, staggerContainer, viewportOnce, easeEntrance } from "@/lib/animations";
import {
  breadcrumbSchema,
  faqPageSchema,
  serviceListSchema,
} from "@/lib/structuredData";
import type { ServicePage } from "@/types";

interface ServicePageTemplateProps {
  data: ServicePage;
}

export default function ServicePageTemplate({ data }: ServicePageTemplateProps) {
  const path = `/services/${data.slug}`;

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
            { name: "Services", path: "/services" },
            { name: data.title, path },
          ]),
          serviceListSchema([{ title: data.title, description: data.seoDescription }]),
          faqPageSchema(data.faqs),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-paper pb-16 pt-28 sm:pt-36">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 light-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-hero-wash" />
        <Container className="relative">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeUp} className="flex justify-center">
              <IconBadge icon={data.icon} size="lg" tone="light" />
            </motion.div>
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="mt-5 text-sm font-medium text-faint"
            >
              <ol className="inline-flex items-center justify-center gap-2">
                <li>
                  <Link to="/services" className="hover:text-primary">Services</Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page">{data.title}</li>
              </ol>
            </motion.nav>
            <motion.h1 variants={fadeUp} className="mt-3 type-display text-heading">
              {data.title}: <span className="text-primary">{data.highlight}</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-faint sm:text-lg"
            >
              {data.heroSubtitle}
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-200 hover:bg-primary-dark"
              >
                Book a Strategy Call
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </motion.div>
        </Container>
      </section>

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
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.businessProblem.painPoints.map((point) => (
              <motion.div
                key={point.title}
                variants={fadeUp}
                className="flex h-full flex-col gap-3 rounded-2xl card-light p-6"
              >
                <AlertTriangle size={18} className="text-secondary" strokeWidth={2} />
                <h3 className="font-display text-base font-semibold text-heading">{point.title}</h3>
                <p className="text-sm leading-relaxed text-faint">{point.description}</p>
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
          <motion.ul
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-3"
          >
            {data.roi.points.map((point) => (
              <motion.li
                key={point}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl border border-line bg-white px-5 py-4 text-sm leading-relaxed text-heading/90 sm:text-base"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Check size={12} strokeWidth={3} />
                </span>
                {point}
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {/* Workflow */}
      <section className="relative bg-mist py-16 md:py-20">
        <Container>
          <SectionHeading
            align="left"
            title="How the Engagement"
            highlight="Runs"
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
              className="grid gap-8 lg:grid-cols-5"
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
            title="A Realistic"
            highlight="Timeline"
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
            title="The Technology"
            highlight="Behind It"
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
            title="Proof From"
            highlight={data.title}
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
                    <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
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

      <FaqSection
        title="Questions About"
        highlight={data.title}
        subtitle="The practical details behind how we deliver this specific service."
        items={data.faqs}
      />

      <CTASection
        title={data.cta.title}
        subtitle={data.cta.subtitle}
        buttonLabel={data.cta.buttonLabel}
      />
    </PageTransition>
  );
}
