import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { features } from "@/data/features";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function FeaturesSection() {
  const [lead, ...rest] = features;

  return (
    <section id="why-choose-us" className="relative bg-mist section-y overflow-hidden">
      {/* One restrained brand-tinted wash. Was two blurred circles in #404E3B,
          an olive green that appears nowhere in the palette. */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[480px] w-[480px] rounded-full bg-brand/5 blur-[120px]" />

      <Container className="relative z-10">
        <SectionHeading
          align="left"
          title="Engineered for"
          highlight="Enterprise"
          subtitle="We build scalable, secure, and robust digital foundations that empower your business to grow without technical debt."
          className="max-w-3xl"
        />

        {/* Asymmetric bento. The previous layout was three equal cards per
            row - the most templated feature-section shape there is, and
            identical to TrustAssuranceSection further down the page.
            Cell budget: 6 features, 3 columns, 3 rows = 9 cells. The lead
            feature takes a 2x2 block (4 cells) and the other 5 take one each,
            so the grid fills exactly with no blank tile. */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl bg-line md:grid-cols-3"
        >
          {/* Lead feature - 2x2 block on desktop, ordinary first card on mobile. */}
          <motion.div
            variants={fadeUp}
            className="group relative flex flex-col justify-between bg-white p-8 transition-colors duration-slow ease-out hover:bg-sky md:col-span-2 md:row-span-2 md:p-12"
          >
            <div>
              <lead.icon className="h-10 w-10 text-brand" strokeWidth={1.5} />
              <h3 className="mt-8 font-display text-2xl font-bold tracking-tight text-heading md:text-4xl">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-faint md:text-lg">
                {lead.description}
              </p>
            </div>
            {/* Accent rule anchored to the cell, not a hover-only gradient
                bar floating at the top edge. */}
            <div className="mt-10 h-1 w-12 rounded-full bg-brand transition-all duration-slow ease-out group-hover:w-20" />
          </motion.div>

          {rest.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group bg-white p-8 transition-colors duration-slow ease-out hover:bg-sky"
            >
              <feature.icon className="h-7 w-7 text-brand" strokeWidth={1.5} />
              <h3 className="mt-6 font-display text-lg font-bold tracking-tight text-heading">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-faint">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
