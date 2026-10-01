import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, Play, MapPin, Briefcase } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { testimonials as staticTestimonials, type Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export default function TestimonialsSection({
  testimonials: providedTestimonials,
}: {
  /** Pass down already-fetched rows (e.g. from Home) to avoid a second
   *  identical Supabase round trip. Falls back to fetching its own when
   *  used standalone. */
  testimonials?: Testimonial[];
}) {
  const [fetchedTestimonials, setFetchedTestimonials] = useState<Testimonial[]>(staticTestimonials);
  /* Touch devices have no `:hover`, so tap-to-pause is the only way to stop
     the marquee and read a card on mobile. */
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (providedTestimonials) return;
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
          if (active && rows && rows.length > 0) setFetchedTestimonials(rows);
        })
        .catch((err) => {
          // Ignore errors and keep static data on failure
          /* eslint-disable-next-line no-console */
          console.error("Failed to load testimonials:", err);
        });
    }).catch((err) => {
      /* eslint-disable-next-line no-console */
      console.error("Failed to import testimonials service:", err);
    });
    return () => {
      active = false;
    };
  }, [providedTestimonials]);

  const testimonials = providedTestimonials ?? fetchedTestimonials;

  const TestimonialCard = ({ t }: { t: Testimonial }) => (
    <div className="group relative mx-4 flex w-[85vw] max-w-[350px] flex-shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-card transition-all duration-300 hover:shadow-card-hover sm:w-[400px] md:w-[450px]">
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

        {/* Typographic quotes, not ASCII double-primes, and clamped to four
            lines. A landing-page testimonial is a snippet the eye takes in at
            a glance; the longest entries previously ran eight-plus justified
            lines and pushed the attribution out of view. Full text lives on
            the testimonials page. */}
        <p className="mb-8 line-clamp-4 text-lg font-medium leading-relaxed text-heading md:text-xl">
          &ldquo;{t.quote}&rdquo;
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
    <section className="relative bg-mist section-y overflow-hidden">
      {/* One brand wash. The cards are solid white now rather than
          translucent, so a second blue-400 blob underneath them was doing
          nothing except widening the palette. */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/4 rounded-full bg-brand/5 blur-[100px]" />

      <Container className="relative z-10 mb-16">
        <SectionHeading
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
          {/* Left/right fade so the track's edges dissolve into the section background. */}
          <div className="absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-mist to-transparent pointer-events-none sm:w-32" />
          <div className="absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-mist to-transparent pointer-events-none sm:w-32" />

          {/* Track 1 */}
          <div className={cn("flex w-max shrink-0 animate-marquee-full group-hover/marquee:pause", paused && "pause")}>
            {testimonials.map((t, idx) => (
              <TestimonialCard key={`track1-${t.name}-${idx}`} t={t} />
            ))}
          </div>
          {/* Track 2 (Duplicate for seamless loop) */}
          <div className={cn("flex w-max shrink-0 animate-marquee-full group-hover/marquee:pause", paused && "pause")} aria-hidden="true">
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
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-8 py-4 text-sm font-bold text-white shadow-primary-sm transition-all hover:-translate-y-0.5 hover:bg-brand-dark active:translate-y-0"
        >
          Share Your Testimonial
        </Link>
      </div>

    </section>
  );
}
