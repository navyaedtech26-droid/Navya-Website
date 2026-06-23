import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { getTestimonials } from "@/services/testimonials";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function TestimonialsSection() {
  // Seed with the bundled list for an instant first paint, then swap in the
  // published rows from Supabase once they load.
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);

  useEffect(() => {
    let active = true;
    getTestimonials().then((rows) => {
      if (active) setTestimonials(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by Businesses"
          highlight="Like Yours"
          subtitle="We measure our success by the growth of the people we build for. Here's what partnering with Navya EdTech feels like."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl glass p-8 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <FloatingOrbs count={5} />
              <Quote
                size={56}
                strokeWidth={1}
                className="absolute right-5 top-4 text-brand/10 transition-colors duration-300 group-hover:text-brand/20"
              />

              <div className="relative flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-cyan-accent text-cyan-accent" />
                ))}
              </div>

              <p className="relative mt-5 text-base leading-relaxed text-ink/90">
                “{t.quote}”
              </p>

              <div className="relative mt-7 flex items-center gap-4 border-t border-white/10 pt-6">
                <IconBadge icon={t.icon} />
                <div>
                  <p className="font-display text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
