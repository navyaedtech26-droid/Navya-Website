import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Quote, ChevronLeft, ChevronRight, MonitorSmartphone } from "lucide-react";
import Container from "@/components/common/Container";
import { getTestimonials } from "@/services/testimonials";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";

export default function PortfolioTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let active = true;
    getTestimonials().then((rows) => {
      if (active && rows && rows.length > 0) setTestimonials(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (isHovered || testimonials.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, [isHovered, testimonials.length]);

  const nextSlide = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  const prevSlide = () => {
    if (testimonials.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 lg:py-32 bg-paper relative overflow-hidden border-t border-line/50">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-4 py-2 text-sm font-semibold text-brand mb-6 shadow-sm backdrop-blur-md"
          >
            Client Success
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-extrabold text-heading tracking-tight mb-6"
          >
            Trusted by Global Leaders
          </motion.h2>
        </div>

        {testimonials.length === 0 ? (
          <div className="max-w-3xl mx-auto text-center py-12 px-4 relative z-10">
            <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Star size={32} className="text-brand fill-brand/20" />
            </div>
            <h3 className="text-2xl font-bold text-heading mb-3">Client Success Stories</h3>
            <p className="text-faint max-w-md mx-auto mb-8">We are gathering real stories from our amazing clients. Be the first to share your experience!</p>
            <Link
              to="/share-your-story"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_25px_-8px_rgba(37,99,235,0.6)]"
            >
              Share Your Testimonial
            </Link>
          </div>
        ) : (
          <div
            className="max-w-5xl mx-auto relative perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current?.name}-${currentIndex}`}
                initial={{ opacity: 0, scale: 0.95, rotateX: 5 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateX: -5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative p-1" // subtle padding for shadow
              >
                <div className="relative rounded-[2.5rem] bg-white/70 backdrop-blur-xl border border-white shadow-card p-8 md:p-12 lg:p-16 overflow-hidden group">

                  {/* Decorative Quote Icon Background */}
                  <Quote className="absolute -top-10 -left-10 w-48 h-48 text-mist opacity-50 rotate-12 pointer-events-none select-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10">

                    {/* Left Column: Author Info */}
                    <div className="lg:col-span-4 flex flex-col border-b lg:border-b-0 lg:border-r border-line/50 pb-8 lg:pb-0 lg:pr-8">
                      <div className="flex items-center gap-4 mb-6">
                        {current?.photoUrl ? (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                            <img src={current.photoUrl} alt={current.name} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0 bg-brand/10 flex items-center justify-center font-bold text-brand text-2xl">
                            {current?.name?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-heading text-lg leading-tight">{current?.name}</h4>
                          <p className="text-sm text-faint">{current?.role}</p>
                        </div>
                      </div>

                      <div className="space-y-4 text-sm font-medium text-heading">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-faint">
                            <MapPin size={14} />
                          </div>
                          <span className="flex-1">{current?.company} {current?.country && <span className="text-faint font-normal">— {current.country}</span>}</span>
                        </div>

                        {current?.projectDelivered && (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                              <MonitorSmartphone size={14} />
                            </div>
                            <span className="flex-1 text-brand font-semibold">{current.projectDelivered}</span>
                          </div>
                        )}
                      </div>

                      {/* Star Rating */}
                      <div className="flex gap-1 mt-auto pt-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-5 h-5 ${i < (current?.rating || 5) ? "fill-amber-400 text-amber-400" : "text-line"}`} />
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Review & Tech */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                      <p className="font-display text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed text-heading mb-10 tracking-tight">
                        "{current?.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={prevSlide}
                className="w-12 h-12 rounded-full bg-white border border-line shadow-sm flex items-center justify-center text-heading hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} strokeWidth={2.5} />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "w-8 bg-brand" : "w-2 bg-line hover:bg-faint"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white border border-line shadow-sm flex items-center justify-center text-heading hover:bg-brand hover:text-white hover:border-brand transition-all active:scale-95"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="relative z-10 mt-12 flex justify-center">
              <Link
                to="/share-your-story"
                className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_25px_-8px_rgba(37,99,235,0.6)]"
              >
                Share Your Testimonial
              </Link>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
