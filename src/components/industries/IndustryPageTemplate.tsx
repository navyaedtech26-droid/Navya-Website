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
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { breadcrumbSchema, faqPageSchema, serviceListSchema } from "@/lib/structuredData";
import { industryPages } from "@/data/industryPages";
import { serviceCategories } from "@/data/services";
import type { IndustryPage } from "@/types";

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
              <IconBadge icon={data.icon} size="lg" color={data.color} tone="light" />
            </motion.div>
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="mt-5 text-sm font-medium text-faint"
            >
              <ol className="inline-flex items-center justify-center gap-2">
                <li>
                  <Link to="/industries" className="hover:text-primary">Industries</Link>
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
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {data.challenges.items.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="flex h-full flex-col gap-3 rounded-2xl card-light p-6"
              >
                <AlertTriangle size={18} className="text-secondary" strokeWidth={2} />
                <h3 className="font-display text-base font-semibold text-heading">{item.title}</h3>
                <p className="text-sm leading-relaxed text-faint">{item.description}</p>
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
            title="Proof From"
            highlight={data.title}
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
                    <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-[11px] font-semibold text-secondary">
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

      {/* Internal linking: related services + related industries */}
      {(relatedServiceCategories.length > 0 || related.length > 0) && (
        <section className="relative bg-mist py-16 md:py-20">
          <Container>
            {relatedServiceCategories.length > 0 && (
              <div>
                <SectionHeading
                  align="left"
                  title="The Services Behind"
                  highlight="This Solution"
                  subtitle="Explore the underlying capability in more depth."
                />
                <motion.div
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {relatedServiceCategories.map((service) => (
                    <motion.div key={service.id} variants={fadeUp}>
                      <Link
                        to={service.id === "websites" ? "/services/websites" : "/services"}
                        className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition-colors duration-200 hover:border-primary/40"
                      >
                        <IconBadge icon={service.icon} size="sm" tone="light" />
                        <h3 className="font-display text-base font-semibold text-heading">{service.title}</h3>
                        <p className="text-sm leading-relaxed text-faint">{service.subtitle}</p>
                        <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary">
                          See services
                          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {related.length > 0 && (
              <div className={relatedServiceCategories.length > 0 ? "mt-16" : undefined}>
                <SectionHeading
                  align="left"
                  title="Related"
                  highlight="Industries"
                  subtitle="See how the same approach applies to adjacent sectors."
                />
                <motion.div
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {related.map((industry) => (
                    <motion.div key={industry.slug} variants={fadeUp}>
                      <Link
                        to={`/industries/${industry.slug}`}
                        className="group flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 transition-colors duration-200 hover:border-primary/40"
                      >
                        <IconBadge icon={industry.icon} size="sm" color={industry.color} tone="light" />
                        <h3 className="font-display text-base font-semibold text-heading">{industry.title}</h3>
                        <p className="text-sm leading-relaxed text-faint">{industry.heroSubtitle}</p>
                        <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-primary">
                          Explore
                          <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </Container>
        </section>
      )}

      <FaqSection
        title="Questions About"
        highlight={data.title}
        subtitle={`The practical details behind how we deliver this for ${data.title.toLowerCase()}.`}
        items={data.faqs}
      />

      <CTASection title={data.cta.title} subtitle={data.cta.subtitle} buttonLabel={data.cta.buttonLabel} />
    </PageTransition>
  );
}
