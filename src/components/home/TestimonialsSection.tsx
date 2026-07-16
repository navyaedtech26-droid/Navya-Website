import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Play, MapPin, Briefcase } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  /* Touch devices have no `:hover`, so tap-to-pause is the only way to stop
     the marquee and read a card on mobile. */
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let active = true;
    // Dynamic import: @/services/testimonials pulls in the full
    // @supabase/supabase-js SDK (auth + realtime + storage, not just the
    // read-only query it needs), which is heavy enough to meaningfully delay
    // Time to Interactive if bundled into the main chunk. Home is rendered
    // eagerly (no route-level code splitting), so this is the only lever to
    // keep that weight out of the critical path — it still only runs once,
    // right after mount, same as before.
    import("@/services/testimonials").then(({ getTestimonials }) => {
      getTestimonials()
        .then((rows) => {
          // If we got rows from the DB, use them. Otherwise, keep our premium static mock data.
          if (active && rows && rows.length > 0) setTestimonials(rows);
        })
        .catch((err) => {
          // Ignore errors and keep static data on failure
          console.error("Failed to load testimonials:", err);
        });
    }).catch((err) => {
      console.error("Failed to import testimonials service:", err);
    });
    return () => {
      active = false;
    };
  }, []);

  const TestimonialCard = ({ t }: { t: Testimonial }) => (
    <div className="w-[85vw] max-w-[350px] sm:w-[400px] md:w-[450px] flex-shrink-0 mx-4 relative overflow-hidden rounded-[32px] bg-white/60 backdrop-blur-xl border border-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:bg-white/80 group flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-6">
          <div className="flex gap-1">
            {Array.from({ length: t.rating || 5 }).map((_, i) => (
              <Star key={i} size={18} className="fill-[#F59E0B] text-[#F59E0B]" />
            ))}
          </div>
          {t.hasVideoBadge && (
            <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-600 ring-1 ring-red-500/20">
              <Play size={12} className="fill-red-600" />
              Video Case
            </div>
          )}
        </div>

        <p className="text-lg md:text-xl font-medium leading-relaxed text-heading mb-8">
          "{t.quote}"
        </p>
      </div>

      <div>
        {t.projectDelivered && (
          <div className="mb-6 flex items-center gap-2 text-sm font-semibold text-brand">
            <Briefcase size={16} />
            Project: {t.projectDelivered}
          </div>
        )}
        
        <div className="flex items-center gap-4 border-t border-line/60 pt-6">
          {t.photoUrl ? (
            <img 
              src={t.photoUrl} 
              alt={t.name}
              className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center font-bold text-brand text-xl">
              {t.name.charAt(0)}
            </div>
          )}
          
          <div>
            <h4 className="font-display text-base font-bold text-heading">{t.name}</h4>
            <p className="text-sm text-faint mb-0.5">{t.role} @ <span className="font-semibold text-heading">{t.company}</span></p>
            {t.country && (
              <div className="flex items-center gap-1 text-xs text-faint">
                <MapPin size={12} />
                {t.country}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="relative bg-slate-50 py-24 md:py-32 overflow-hidden">
      {/* Background blobs for glassmorphism */}
      <div className="absolute top-0 right-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-brand/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] translate-y-1/4 -translate-x-1/4 rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />

      <Container className="relative z-10 mb-16">
        <SectionHeading
          tone="light"
          eyebrow="Client Impact"
          title="Trusted by Global"
          highlight="Enterprises"
          subtitle="We measure our success in one currency: the growth and efficiency of the businesses we build for. Here is what that partnership delivers."
        />
      </Container>

      {/* Infinite Marquee Slider or Empty State */}
      {testimonials.length > 0 ? (
        <div
          role="button"
          tabIndex={0}
          aria-pressed={paused}
          aria-label={paused ? "Resume testimonial scroll" : "Pause testimonial scroll"}
          onClick={() => setPaused((v) => !v)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setPaused((v) => !v);
            }
          }}
          className="relative z-10 flex overflow-hidden group/marquee cursor-pointer"
        >
          {/* Track 1 */}
          <div className={cn("flex w-max min-w-full shrink-0 animate-marquee-full group-hover/marquee:pause", paused && "pause")}>
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`track1-${t.name}-${idx}`} t={t} />
            ))}
          </div>
          {/* Track 2 (Duplicate for seamless loop) */}
          <div className={cn("flex w-max min-w-full shrink-0 animate-marquee-full group-hover/marquee:pause", paused && "pause")} aria-hidden="true">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`track2-${t.name}-${idx}`} t={t} />
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center py-12 px-4 text-center">
          <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-6">
            <Star size={32} className="text-brand fill-brand/20" />
          </div>
          <h3 className="text-2xl font-bold text-heading mb-3">Client Success Stories</h3>
          <p className="text-faint max-w-md mx-auto mb-8">We are gathering real stories from our amazing clients. Be the first to share your experience!</p>
        </div>
      )}

      <div className="relative z-10 mt-12 flex justify-center">
        <Link 
          to="/share-your-story" 
          className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_12px_25px_-8px_rgba(37,99,235,0.6)]"
        >
          Share Your Testimonial
        </Link>
      </div>

    </section>
  );
}
