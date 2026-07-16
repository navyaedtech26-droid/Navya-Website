import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import { coreValues } from "@/data/about";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function CoreValues() {
  return (
    <section className="relative py-24 md:py-32 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <SectionHeading 
              align="left" 
              title="Our Core" 
              highlight="Values" 
              subtitle="The principles that guide every line of code we write and every strategy we deliver. We don't compromise on quality, and we build for the long term."
            />
          </div>
          
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7 flex flex-col"
          >
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className={`group py-8 md:py-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start border-b border-line/60 ${index === 0 ? 'border-t' : ''}`}
              >
                <div className="shrink-0 mt-1 transition-transform duration-300 group-hover:scale-110">
                  <IconBadge icon={value.icon} size="lg" className="bg-primary/5 text-primary border-primary/20" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-heading group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-base md:text-lg leading-relaxed text-faint max-w-xl">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
