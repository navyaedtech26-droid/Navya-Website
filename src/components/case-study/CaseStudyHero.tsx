import { motion } from "framer-motion";
import { ArrowLeft, Clock, MonitorSmartphone, Target } from "lucide-react";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
import Container from "@/components/common/Container";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudyHero({ study }: { study: CaseStudy }) {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[study.icon] || LucideIcons.BriefcaseBusiness;
  
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-paper">
      <Container className="relative z-10">
        <Link 
          to="/portfolio" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-faint hover:text-brand transition-colors mb-8 lg:mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 rounded-xl bg-${study.accent}-500/10 border border-${study.accent}-500/20 px-3 py-1.5 text-xs font-bold text-${study.accent}-500 mb-6 uppercase tracking-widest`}
            >
              <Icon className="w-4 h-4" />
              {study.category}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-heading tracking-tight mb-6 leading-tight"
            >
              {study.client}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-faint leading-relaxed mb-10 max-w-xl"
            >
              {study.summary}
            </motion.p>
            
            {/* Meta Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-y-8 gap-x-12 border-t border-line/50 pt-8"
            >
              <div>
                <div className="text-xs font-bold text-faint uppercase tracking-wider mb-2">Industry</div>
                <div className="font-semibold text-heading">{study.industry}</div>
              </div>
              <div>
                <div className="text-xs font-bold text-faint uppercase tracking-wider mb-2">Platform</div>
                <div className="flex items-center gap-2 font-semibold text-heading">
                  <MonitorSmartphone className="w-4 h-4 text-brand" />
                  {study.platform}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-faint uppercase tracking-wider mb-2">Duration</div>
                <div className="flex items-center gap-2 font-semibold text-heading">
                  <Clock className="w-4 h-4 text-brand" />
                  {study.duration}
                </div>
              </div>
              <div>
                <div className="text-xs font-bold text-faint uppercase tracking-wider mb-2">Business Impact</div>
                <div className="flex items-center gap-2 font-semibold text-heading">
                  <Target className="w-4 h-4 text-brand" />
                  {study.content?.results.kpis[0]?.value} {study.content?.results.kpis[0]?.label}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative perspective-1000"
          >
            <div className={`absolute inset-0 bg-gradient-to-tr from-${study.accent}-500/20 to-transparent blur-[80px] rounded-full pointer-events-none`} />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-line bg-haze">
              <img 
                src={study.image} 
                alt={`${study.client} Interface`}
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-[2000ms] ease-out"
              />
            </div>
            
            {/* Tech Stack Floating Pills */}
            <div className="absolute -bottom-6 -left-6 flex flex-wrap gap-2 max-w-[80%] z-20">
              {study.tags.map((tag, idx) => (
                <motion.div
                  key={tag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + (idx * 0.1) }}
                  className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md border border-white/20 shadow-lg text-sm font-bold text-heading"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
