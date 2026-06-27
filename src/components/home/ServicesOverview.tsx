import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import TiltCard from "@/components/effects/TiltCard";
import IconBadge from "@/components/common/IconBadge";
import { serviceCategories } from "@/data/services";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function ServicesOverview() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="What We Do"
          title="We Don't Just Build."
          highlight="We Transform."
          subtitle="From websites and business systems to social media growth: digital solutions designed after understanding your business."
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {serviceCategories.map((cat) => (
            <motion.div key={cat.id} variants={fadeUp}>
              <TiltCard>
                <div className="flex h-full flex-col glass rounded-2xl p-8">
                  <div className="flex items-center gap-4">
                    <IconBadge icon={cat.icon} size="lg" />
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-ink-muted">{cat.subtitle}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                    {cat.description}
                  </p>

                  <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-ink/90"
                      >
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-brand/20 text-cyan-accent">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/services"
                    data-cursor="hover"
                    className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-light transition-colors hover:text-cyan-accent"
                  >
                    Explore {cat.title}
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
