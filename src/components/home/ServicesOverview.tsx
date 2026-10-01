import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { serviceGridItems } from "@/data/services";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const getVectorImage = (title: string) => {
  const map: Record<string, string> = {
    "Custom Software Development": "/vector/custom-software-development.avif",
    "Web Development": "/vector/web-dev.avif",
    "Mobile App Development": "/vector/mobile-dev.avif",
    "AI Solutions": "/vector/ai-solutions.avif",
    "Cloud Services": "/vector/cloud-infrastructure.avif",
    "UI/UX Design": "/vector/uiux.avif",
    "DevOps": "/vector/devopps.avif",
    "IT Consulting": "/vector/it-consulting.avif",
    "Dedicated Developers": "/vector/custom-software-development.avif",
  };
  return map[title] || "/vector/it-consulting.avif";
};

export default function ServicesOverview() {
  return (
    <section className="relative bg-white section-y">
      <Container>
        <SectionHeading
          title="End-to-End IT Services for"
          highlight="Modern Enterprises"
          subtitle="From custom software architecture to cloud infrastructure and digital transformation. We provide the technical foundation for scalable growth."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-20 flex flex-col"
        >
          {serviceGridItems.map((service, index) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group relative border-t border-line last:border-b"
            >
              <Link
                to={service.href}
                data-cursor="hover"
                className="flex flex-col gap-8 py-10 transition-colors duration-500 hover:bg-white/40 md:flex-row md:items-center md:gap-16 px-4 md:px-8 -mx-4 md:-mx-8 rounded-2xl md:rounded-none"
              >
                {/* Number */}
                <div className="font-display text-2xl font-bold text-brand pt-1 md:pt-0 w-12 shrink-0 md:group-hover:text-cyan-accent transition-colors duration-500">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-heading transition-colors duration-300 group-hover:text-brand">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-faint max-w-2xl">
                      {service.description}
                    </p>
                  </div>

                  {service.features && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.features.map((feature, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center rounded-full bg-brand/5 px-3.5 py-1.5 text-xs font-semibold text-brand transition-colors duration-300 group-hover:bg-brand/10"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vector Image */}
                <div className="w-full md:w-[320px] lg:w-[400px] shrink-0">
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white to-sky/20 p-6 flex items-center justify-center transition-all duration-500 group-hover:shadow-card-hover group-hover:from-white group-hover:to-sky/40">
                    <img
                      src={getVectorImage(service.title)}
                      alt={service.title}
                      className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
