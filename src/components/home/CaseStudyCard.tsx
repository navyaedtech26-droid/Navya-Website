import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, type LucideProps } from "lucide-react";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import IconBadge from "@/components/common/IconBadge";
import DynamicIcon from "@/components/common/DynamicIcon";
import type { CaseStudy } from "@/services/caseStudies";

export default function CaseStudyCard({ study, index = 0 }: { study: CaseStudy, index?: number }) {
  const isEven = index % 2 === 0;
  const Icon = (props: LucideProps) => <DynamicIcon name={study.icon} {...props} />;

  const content = (
    <div className="flex flex-col h-full justify-center lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <IconBadge icon={Icon} color="#081E4D" tone="light" />
        <span className="text-sm font-bold uppercase tracking-wider text-brand">
          {study.industry}
        </span>
      </div>

      <h3 className="font-display text-3xl font-bold text-heading mb-4">
        {study.client}
      </h3>

      <p className="text-lg leading-relaxed text-faint mb-8">
        {study.summary}
      </p>

      {/* Tech Stack */}
      {study.tags && study.tags.length > 0 && (
        <div className="mb-8">
          <h4 className="text-sm font-semibold text-heading uppercase tracking-widest mb-3">Technology Stack</h4>
          <div className="flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-mist px-4 py-1.5 text-sm font-medium text-heading ring-1 ring-line/50 transition-colors duration-300 hover:bg-white hover:shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Business Impact (Conditionally Rendered) */}
      {study.content?.results?.businessImpact ? (
        <div className="mb-10 rounded-2xl bg-brand/5 p-6 border border-brand/10 transition-colors duration-300 group-hover:bg-brand/10">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 text-brand shrink-0" size={20} />
            <div>
              <h4 className="text-sm font-bold text-heading uppercase tracking-widest mb-1">Business Impact</h4>
              <p className="text-base text-faint font-medium">{study.content.results.businessImpact}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-10" />
      )}

      {/* Button. `brand-dark` is now a real token in tailwind.config.js — it
          was referenced here before but never defined, so both hover rules
          silently compiled away and the button had no hover state at all. */}
      <div className="inline-flex items-center gap-3 rounded-full bg-brand px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/20 group-hover:bg-brand-dark w-fit mt-auto">
        <span>Read Case Study</span>
        <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  );

  const imageContainer = (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] w-full overflow-hidden rounded-[24px] bg-gradient-to-br from-line/80 to-transparent p-[1px] group-hover:shadow-card-hover group-hover:from-brand/40 group-hover:to-brand/10 transition-all duration-500">
      <div className="absolute inset-[1px] rounded-[23px] overflow-hidden bg-white">
        <img
          src={study.image}
          alt={`${study.client} project`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        {/* Glass overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
      </div>
      <div className="absolute left-6 top-6 rounded-full bg-white/90 backdrop-blur-md px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-heading shadow-sm ring-1 ring-line/50">
        {study.category}
      </div>
    </div>
  );

  const inner = (
    <div className={cn(
      "group relative flex flex-col gap-8 lg:gap-16",
      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
    )}>
      <div className="lg:w-1/2">
        {imageContainer}
      </div>
      <div className="lg:w-1/2">
        {content}
      </div>
    </div>
  );

  return (
    <motion.div variants={fadeUp} className="w-full">
      <Link to={`/portfolio/${study.slug}`} aria-label={`${study.client} case study`} className="block w-full">
        {inner}
      </Link>
    </motion.div>
  );
}
