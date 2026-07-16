import { motion } from "framer-motion";
import { Star, MessageSquareQuote, Target, Users } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const INFO_CARDS = [
  {
    icon: MessageSquareQuote,
    title: "Feature on our Front Page",
    content: "Selected stories will be highlighted across our website, showcasing your success to our global audience.",
    delay: 0,
  },
  {
    icon: Users,
    title: "Help Other Leaders",
    content: "Your transparent feedback helps other enterprise leaders make informed decisions about their technical partnerships.",
    delay: 0.1,
  },
  {
    icon: Target,
    title: "Direct Impact",
    content: "We read every submission. Your feedback directly shapes how we engineer solutions and improve our engagement model.",
    delay: 0.2,
  },
  {
    icon: Star,
    title: "Partner Showcase",
    content: "Build authority by sharing the technical challenges we solved together and the business outcomes you achieved.",
    delay: 0.3,
  },
];

export default function TestimonialInfo() {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={fadeUp} className="mb-10">
        <h2 className="font-display text-3xl font-bold tracking-tight text-heading lg:text-4xl">
          Share Your <span className="text-brand">Experience</span>
        </h2>
        <p className="mt-4 text-lg text-faint leading-relaxed max-w-lg">
          If we've built something transformative for your organization, we'd love to hear how it went. Tell us about the challenges you faced and the growth we created together.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-2">
        {INFO_CARDS.map((card, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="group relative flex flex-col items-start gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-brand/30 overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-brand/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-2xl"></div>
            
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-line/60 text-brand transition-colors duration-300 group-hover:bg-brand/10 group-hover:border-brand/20">
              <card.icon size={22} strokeWidth={2} />
            </div>
            
            <div>
              <div className="text-sm font-bold text-heading mb-1.5">{card.title}</div>
              <p className="text-sm text-faint leading-relaxed">
                {card.content}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
