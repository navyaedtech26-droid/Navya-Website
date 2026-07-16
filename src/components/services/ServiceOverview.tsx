import { motion } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { CheckCircle2, Target, Briefcase, Zap, Search } from "lucide-react";
import Container from "@/components/common/Container";

interface ServiceOverviewProps {
  data: {
    whatIsIt: string;
    whoNeedsIt: string;
    businessValue: string;
    benefits: string[];
  };
}

export default function ServiceOverview({ data }: ServiceOverviewProps) {
  return (
    <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-mist rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* ── LEFT: Illustration ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-square w-full max-w-md mx-auto lg:max-w-none">
              {/* Main Abstract Shape */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl border border-line shadow-sm" />
              
              {/* Premium Graphics Overlaid */}
              <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-white rounded-2xl shadow-xl border border-line p-8 flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-line pb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-mist rounded mb-2" />
                    <div className="h-3 w-48 bg-mist rounded" />
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 gap-4">
                   <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                     <div className="w-8 h-8 rounded-full bg-blue-100 mb-3" />
                     <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                     <div className="h-2 w-2/3 bg-slate-200 rounded" />
                   </div>
                   <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                     <div className="w-8 h-8 rounded-full bg-indigo-100 mb-3" />
                     <div className="h-2 w-full bg-slate-200 rounded mb-2" />
                     <div className="h-2 w-2/3 bg-slate-200 rounded" />
                   </div>
                   <div className="col-span-2 rounded-xl bg-gradient-to-r from-primary to-secondary p-5 text-white flex items-center justify-between shadow-lg">
                      <div>
                        <div className="text-xs font-medium text-white/80 uppercase tracking-wider mb-1">Performance</div>
                        <div className="font-display font-semibold text-lg">+300% Growth</div>
                      </div>
                      <Zap className="w-6 h-6 text-white/50" />
                   </div>
                </div>
              </div>
              
              {/* Decorative floating elements */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-white rounded-2xl shadow-card border border-line flex items-center justify-center z-10"
              >
                <Target className="w-10 h-10 text-primary" />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 w-28 h-28 bg-white rounded-full shadow-card border border-line flex items-center justify-center z-10"
              >
                <Briefcase className="w-10 h-10 text-secondary" />
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT: Content ── */}
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="order-1 lg:order-2"
          >
            <motion.div variants={fadeUp}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-heading mb-4">
                Service Overview
              </h2>
              <p className="text-lg text-faint leading-relaxed mb-12">
                Everything you need to know about how this engagement creates value for your organization.
              </p>
            </motion.div>

            <div className="space-y-10">
              {/* What is it */}
              <motion.div variants={fadeUp} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-full before:bg-line">
                <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-white" />
                <h3 className="font-display text-lg font-semibold text-heading mb-2">What is it?</h3>
                <p className="text-base text-faint leading-relaxed">
                  {data.whatIsIt}
                </p>
              </motion.div>

              {/* Who needs it */}
              <motion.div variants={fadeUp} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-full before:bg-line">
                <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-white" />
                <h3 className="font-display text-lg font-semibold text-heading mb-2">Who needs it?</h3>
                <p className="text-base text-faint leading-relaxed">
                  {data.whoNeedsIt}
                </p>
              </motion.div>

              {/* Business value */}
              <motion.div variants={fadeUp} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-1 before:h-full before:bg-line">
                <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-brand ring-4 ring-white" />
                <h3 className="font-display text-lg font-semibold text-heading mb-2">Business Value</h3>
                <p className="text-base text-faint leading-relaxed">
                  {data.businessValue}
                </p>
              </motion.div>

              {/* Key Benefits */}
              <motion.div variants={fadeUp} className="relative pl-6">
                <div className="absolute left-[-5px] top-1 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white" />
                <h3 className="font-display text-lg font-semibold text-heading mb-4">Key Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {data.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-heading/90 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </Container>
    </section>
  );
}
