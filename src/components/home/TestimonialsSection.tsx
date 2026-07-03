import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Quote, PenLine, ArrowRight } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
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
    <section className="relative bg-sky py-16 md:py-20">
      <Container>
        <SectionHeading
          tone="light"
          eyebrow="Client Stories"
          title="Trusted by Businesses"
          highlight="Like Yours"
          subtitle="We measure our success by the growth of the people we build for. Here's what partnering with Navya EdTech feels like."
        />

        {testimonials.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5 }}
            className="mx-auto mt-14 flex max-w-xl flex-col items-center gap-5 rounded-3xl card-light p-10 text-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
              <Quote className="text-primary" />
            </div>
            <p className="text-base leading-relaxed text-faint">
              We're collecting stories from the people we build for. Worked with
              Navya EdTech? Be the first to share your experience.
            </p>
            <Link
              to="/share-your-story"
              data-cursor="hover"
              className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark"
            >
              <PenLine size={16} />
              Share Your Experience
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        ) : (
          <>
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
              className="group relative overflow-hidden rounded-3xl card-light p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
            >
              <div className="relative flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-accent text-accent" />
                ))}
              </div>

              {/* SECURITY INVARIANT: testimonial quotes are visitor-authored
                  (submitted unpublished, then admin-moderated). Always render
                  them as plain text — React escapes this — and NEVER run a
                  testimonial through <Markdown> or dangerouslySetInnerHTML, or
                  it becomes a stored-XSS surface. */}
              <p className="relative mt-5 text-base leading-relaxed text-heading/90">
                “{t.quote}”
              </p>

              <div className="relative mt-7 flex items-center gap-4 border-t border-line pt-6">
                <IconBadge icon={t.icon} tone="light" color="#2563EB" />
                <div>
                  <p className="font-display text-sm font-semibold text-heading">{t.name}</p>
                  <p className="text-xs text-faint">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5 }}
          className="mt-14 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-sm text-faint">
            Worked with Navya EdTech? We'd love to feature your story.
          </p>
          <Link
            to="/share-your-story"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-primary-sm transition-colors duration-300 hover:bg-primary-dark"
          >
            <PenLine size={16} />
            Share Your Experience
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
          </>
        )}
      </Container>
    </section>
  );
}
