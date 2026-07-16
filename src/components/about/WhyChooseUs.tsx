import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { whyChooseUs } from "@/data/about";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function WhyChooseUs() {
  return (
    <section className="relative bg-mist py-24 md:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <SectionHeading 
            align="center" 
            title="Why Choose" 
            highlight="Navya EdTech" 
            subtitle="We don't just write code. We engineer strategic advantages that help your business scale, operate efficiently, and dominate your market."
          />
        </div>
        
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {whyChooseUs.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group relative flex flex-col p-8 rounded-3xl bg-white border border-line/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
              >
                {/* Subtle Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Animated Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-brand scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />

                <div className="relative z-10 flex flex-col items-start">
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-paper border border-line/40 shadow-sm text-primary mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:shadow-md group-hover:bg-primary/5">
                    <Icon strokeWidth={1.5} size={28} />
                  </div>
                  
                  <h3 className="font-display text-xl font-bold text-heading mb-3 transition-colors group-hover:text-primary">
                    {item.title}
                  </h3>
                  
                  <p className="text-base leading-relaxed text-faint">
                    {item.description}
                  </p>
                </div>
                
                {/* Decorative index number */}
                <div className="absolute -bottom-4 -right-4 text-8xl font-display font-extrabold text-line/20 select-none pointer-events-none transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2">
                  0{index + 1}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
