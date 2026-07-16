import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { industries } from "@/data/industries";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function IndustriesSection() {
  return (
    <section className="relative bg-white py-[120px]">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Industries We Transform"
          title="Measurable Impact, Every"
          highlight="Sector"
          subtitle="From healthcare and finance to retail and manufacturing, we build specialized software solutions that solve industry-specific challenges."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-1 rounded-[24px] overflow-hidden bg-white"
        >
          {industries.map((industry) => (
            <motion.div key={industry.slug} variants={fadeUp} className="group relative aspect-square md:aspect-[4/3] w-full overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: industry.image ? `url('${industry.image}')` : 'none' }}
              />
              <div className="absolute inset-0 bg-black/25 transition-opacity duration-500 group-hover:bg-black/40" />
              
              <Link
                to={`/industries/${industry.slug}`}
                className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10 text-white"
              >
                <div>
                  <h3 className="font-display text-3xl font-bold mb-3 drop-shadow-md">
                    {industry.title}
                  </h3>
                  <p className="text-base text-white/95 leading-relaxed max-w-[95%] drop-shadow-sm">
                    {industry.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <span className="inline-flex items-center justify-center bg-white text-heading px-6 py-2.5 rounded-md text-xs font-bold tracking-widest hover:bg-gray-100 transition-colors uppercase shadow-sm">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
