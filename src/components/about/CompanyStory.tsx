import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { milestones } from "@/data/milestones";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function CompanyStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  
  // Map scroll progress to the height of the timeline line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-24 md:py-32 bg-paper overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* LEFT: Story Timeline (Sticky) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32">
              <SectionHeading
                align="left"
                title="Our"
                highlight="Evolution"
                subtitle="From a singular vision to a full-stack digital transformation partner."
              />
              
              {/* Premium Vertical Progress Indicator */}
              <div className="mt-12 hidden lg:flex items-stretch gap-8 h-[300px]">
                <div className="relative w-[3px] bg-line/60 rounded-full overflow-hidden ml-2">
                  <motion.div 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-brand rounded-full shadow-[0_0_10px_rgba(30,107,255,0.8)]"
                    style={{ height: lineHeight }}
                  />
                </div>
                <div className="flex flex-col justify-between py-6 text-sm font-semibold text-faint font-display uppercase tracking-[0.2em]">
                  <span className="text-primary transition-colors">Inception</span>
                  <span className="transition-colors">Expansion</span>
                  <span className="transition-colors">Present Day</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Journey, Milestones, Imagery */}
          <div className="lg:col-span-8 flex flex-col gap-24">
            
            {/* Journey Block 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-display text-3xl font-bold text-heading">The Foundation</h3>
              <p className="mt-6 text-lg md:text-xl leading-relaxed text-faint">
                Navya EdTech began with one conviction: enterprise-grade technology — and the returns it creates — shouldn't be reserved for the giants. We set out to pair editorial design with serious engineering to ship platforms that look premium and move real business metrics.
              </p>
              
              {/* Supporting Imagery */}
              <div className="mt-12 rounded-[2rem] overflow-hidden border border-line/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] bg-white/60 backdrop-blur-md relative h-[350px] flex items-center justify-center transition-transform duration-500 hover:scale-[1.02]">
                 <div className="absolute inset-0 bg-brand/10 blur-[60px] rounded-full scale-75 pointer-events-none" />
                 <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />
                 <img src="/vectors1/about%20us.avif" alt="Our Foundation" className="relative z-10 w-2/3 max-w-sm object-contain drop-shadow-2xl" />
              </div>
            </motion.div>

            {/* Growth Milestones Grid */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8"
            >
              <div className="sm:col-span-2">
                <h3 className="font-display text-3xl font-bold text-heading mb-4">Growth Milestones</h3>
              </div>
              
              {milestones.map((m) => (
                <motion.div 
                  key={m.year} 
                  variants={fadeUp} 
                  className="relative p-8 rounded-3xl bg-white border border-line/40 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="absolute -top-4 left-8 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-white bg-primary rounded-full shadow-lg shadow-primary/30">
                    {m.year}
                  </span>
                  <h4 className="mt-4 font-display text-xl font-bold text-heading">{m.title}</h4>
                  <p className="mt-3 text-base text-faint leading-relaxed">{m.description}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Journey Block 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-display text-3xl font-bold text-heading">Looking Ahead</h3>
              <p className="mt-6 text-lg md:text-xl leading-relaxed text-faint">
                From a flagship web presence to complex internal systems, we obsess over the details that drive results. We are not just vendors; we are technical partners invested in your long-term market dominance. We build systems today that will scale seamlessly into your future.
              </p>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  );
}
