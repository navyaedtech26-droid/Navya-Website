import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { industries } from "@/data/industries";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function IndustriesSection() {
  return (
    <section className="relative bg-white section-y">
      <Container>
        <SectionHeading
          title="Measurable Impact, Every"
          highlight="Sector"
          subtitle="From healthcare and finance to retail and manufacturing, we build specialized software solutions that solve industry-specific challenges."
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-1 rounded-3xl overflow-hidden bg-white"
        >
          {industries.map((industry) => (
            <motion.div key={industry.slug} variants={fadeUp} className="group relative aspect-square md:aspect-[4/3] w-full overflow-hidden">
              {industry.image && (
                // A plain <img loading="lazy"> (rather than a CSS background-image)
                // so the browser defers the fetch until this below-the-fold grid is
                // near the viewport — background-images have no native lazy-loading
                // and were previously downloading all ~10 photos up front.
                <img
                  src={industry.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
              {/* Bottom-weighted scrim rather than a flat black/25 wash. A
                  uniform 25% tint left white text riding on whatever the photo
                  happened to be doing behind it, so contrast was luck; a
                  gradient anchored under the copy keeps the text block dark
                  enough for AA on any image while the top of the photo stays
                  legible. */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15 transition-opacity duration-500 group-hover:from-black/85 group-hover:via-black/55" />
              
              <Link
                to={`/industries/${industry.slug}`}
                className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10 text-white"
              >
                <div>
                  <h3 className="font-display text-3xl font-bold mb-3 drop-shadow-md">
                    {industry.title}
                  </h3>
                  <p className="text-base text-white/95 leading-relaxed max-w-[95%] drop-shadow-sm">
                    {industry.description}
                  </p>
                </div>
                
                <div className="mt-auto">
                  <span className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-heading shadow-sm transition-colors group-hover:bg-haze">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
