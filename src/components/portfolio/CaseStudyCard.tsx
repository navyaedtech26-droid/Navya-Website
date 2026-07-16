import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, MonitorSmartphone } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { CaseStudy } from "@/services/caseStudies";

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

export default function CaseStudyCard({ study }: CaseStudyCardProps) {
  const Icon = (LucideIcons as any)[study.icon] || LucideIcons.BriefcaseBusiness;

  return (
    <Link to={`/portfolio/${study.slug}`} className="block h-full group/card focus:outline-none">
      <motion.div
        className="group relative flex flex-col h-full rounded-3xl bg-navya-surface border border-navya-divider shadow-sm hover:shadow-card-hover transition-all duration-slow hover:-translate-y-2 overflow-hidden cursor-pointer"
      >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-haze">
        <img
          src={study.image}
          alt={study.client}
          className="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-105 ease-in-out"
        />

        {/* Glassmorphism Overlay on Hover */}
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <span className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-full shadow-lg">
              View Details <ArrowRight size={18} />
            </span>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4 rounded-xl bg-white/90 backdrop-blur-md px-3 py-1.5 flex items-center gap-2 shadow-sm border border-white/20">
          <Icon className={`w-4 h-4 text-${study.accent}-500`} />
          <span className="text-xs font-bold text-heading">{study.category}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-grow p-6 sm:p-8">
        <div className="text-xs font-bold tracking-widest text-brand uppercase mb-3">
          {study.industry}
        </div>

        <h3 className="font-display text-2xl font-extrabold text-heading mb-4 leading-tight group-hover:text-primary transition-colors">
          {study.client}
        </h3>

        {/* Short Description */}
        <p className="text-faint text-sm leading-relaxed mb-6 flex-grow">
          {study.summary}
        </p>

        {/* Metadata: Platform & Duration */}
        <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y border-line/50">
          <div className="flex items-center gap-2 text-xs font-semibold text-heading">
            <MonitorSmartphone className="w-4 h-4 text-faint" />
            <span className="truncate" title={study.platform}>{study.platform}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-heading">
            <Clock className="w-4 h-4 text-faint" />
            <span className="truncate">{study.duration}</span>
          </div>
        </div>

        {/* Technologies Used */}
        {study.tags && study.tags.length > 0 && (
          <div className="mb-8">
            <div className="text-[10px] font-bold text-faint uppercase tracking-wider mb-3">Technologies Used</div>
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-navya-paper text-navya-ink-soft border border-navya-divider transition-colors group-hover:bg-navya-green-50 group-hover:text-navya-green-800 group-hover:border-navya-green-600/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* View Details Button (Footer) */}
        <div
          className="mt-auto inline-flex items-center justify-between w-full rounded-xl bg-navya-paper border border-navya-divider px-5 py-3.5 font-semibold text-navya-ink shadow-sm transition-all group-hover:border-navya-green-600 group-hover:text-navya-green-800 group-hover:bg-navya-green-50 group/link"
        >
          <span>View Case Study</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
        </div>
      </div>
    </motion.div>
    </Link>
  );
}
