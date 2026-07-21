import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudyTestimonial({ study }: { study: CaseStudy }) {
  const testimonial = study.content?.testimonial;
  if (!testimonial?.quote) return null;

  return (
    <section className="py-24 lg:py-32 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-gradient opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-accent/5 blur-[120px] pointer-events-none rounded-full" />
      
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-10 border border-white/20 backdrop-blur-md"
          >
            <Quote className="w-8 h-8 text-cyan-accent" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium leading-relaxed mb-12"
          >
            "{testimonial.quote}"
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6"
          >
            {testimonial.image && (
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 shadow-xl shrink-0">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="text-left">
              <div className="font-bold text-lg">{testimonial.author}</div>
              <div className="text-white/70">{testimonial.position}, {testimonial.company}</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
