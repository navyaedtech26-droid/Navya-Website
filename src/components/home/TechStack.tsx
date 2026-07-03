import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { techGroups } from "@/data/techStack";

// One flat list — the categories organise the data, but the strip reads as a
// single, continuous row of tools rather than labelled rows.
const techs = techGroups.flatMap((group) => group.items);

// Duplicate the list so the track can loop seamlessly: as the first copy scrolls
// out to the left, the second copy is already filling in behind it. Animating the
// track by exactly -50% lands the second copy where the first began, so the reset
// is invisible.
const marqueeTechs = [...techs, ...techs];

export default function TechStack() {
  return (
    <section className="relative overflow-hidden bg-mist py-16 md:py-20">
      <Container>
        <SectionHeading
          tone="light"
          title="Technologies We"
          highlight="Build With"
          subtitle="A modern, battle-tested stack across languages, frameworks, databases, and cloud — chosen to fit each project, not the other way around."
        />
      </Container>

      {/* Full-bleed marquee track — sits outside the Container so the cards run
          edge to edge as they scroll. `group` lets us pause the loop on hover. */}
      <div className="group relative mt-14 overflow-hidden">
        {/* Soft fade masks so cards ease in/out at the edges instead of clipping. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-mist to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-mist to-transparent md:w-28" />

        <div className="animate-marquee flex w-max gap-5 px-2.5 group-hover:[animation-play-state:paused]">
          {marqueeTechs.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              // Duplicated cards are decorative repeats — hide them from the a11y tree.
              aria-hidden={index >= techs.length}
              className="tech-card group/card flex w-44 shrink-0 cursor-default flex-col items-center justify-center gap-3.5 rounded-2xl border border-line bg-white px-4 py-7 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
            >
              {/* original brand logo with a soft colored halo on hover */}
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
                <span
                  className="absolute inset-0 rounded-full opacity-0 blur-[12px] transition-opacity duration-300 group-hover/card:opacity-70"
                  style={{ backgroundColor: tech.color }}
                />
                <img
                  src={tech.logo}
                  alt={`${tech.name} logo`}
                  loading="lazy"
                  width={42}
                  height={42}
                  className="relative h-[42px] w-[42px] object-contain transition-transform duration-300 group-hover/card:scale-110"
                  /* On the white surface, logos flagged `invert` (originally dark
                     glyphs that were forced white for the navy theme) render as
                     their original dark artwork — no filter — so they stay
                     visible. */
                  style={tech.invert ? { filter: "brightness(0)" } : undefined}
                />
              </span>
              <span className="text-[15px] font-medium leading-tight text-heading">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
