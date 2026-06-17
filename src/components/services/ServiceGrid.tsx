import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import TiltCard from "@/components/effects/TiltCard";
import GlowGrid from "@/components/effects/GlowGrid";
import IconBadge from "@/components/common/IconBadge";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { ServiceItem } from "@/types";

interface ServiceGridProps {
  eyebrow: string;
  title: string;
  highlight: string;
  items: ServiceItem[];
}

/** Two soft, slowly drifting gradient blobs that sit behind the grid. */
function DriftingOrbs() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-brand/15 blur-3xl"
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, -24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-accent/10 blur-3xl"
        animate={reduced ? undefined : { x: [0, -36, 0], y: [0, 28, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  );
}

function ServiceCard({ item, index }: { item: ServiceItem; index: number }) {
  return (
    <motion.div variants={fadeUp}>
      <TiltCard intensity={8} className="h-full">
        <div className="relative flex h-full flex-col overflow-hidden glass rounded-2xl p-7">
          {/* Oversized index numeral, brightens on hover */}
          <span className="pointer-events-none absolute right-5 top-3 select-none font-display text-5xl font-bold leading-none text-ink/[0.06] transition-colors duration-300 group-hover:text-brand/20">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Icon lifts and tilts on hover */}
          <div className="relative w-fit transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:rotate-6 group-hover:scale-105">
            <IconBadge icon={item.icon} size="lg" />
          </div>

          <h3 className="mt-5 font-display text-lg font-semibold text-ink">
            {item.title}
          </h3>

          {/* Accent underline grows on hover */}
          <span className="mt-2.5 h-0.5 w-8 rounded-full bg-gradient-to-r from-brand to-cyan-accent transition-all duration-300 ease-out group-hover:w-16" />

          <p className="mt-3 text-sm leading-relaxed text-ink-muted">
            {item.description}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] font-medium text-ink-muted ring-1 ring-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* "Learn more" reveals and slides in on hover */}
          <div className="mt-auto pt-5">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-light opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100">
              Learn more
              <ArrowUpRight size={16} strokeWidth={2} />
            </span>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

export default function ServiceGrid({
  eyebrow,
  title,
  highlight,
  items,
}: ServiceGridProps) {
  return (
    <section className="relative py-16">
      <GlowGrid className="opacity-20" />
      <DriftingOrbs />
      <Container>
        <SectionHeading
          align="left"
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, index) => (
            <ServiceCard key={item.title} item={item} index={index} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
