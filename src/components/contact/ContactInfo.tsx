import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, Briefcase, Headset } from "lucide-react";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { contactInfo } from "@/data/navigation";

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Global Headquarters",
    content: "Gwarko, Lalitpur\nAvailable worldwide",
    delay: 0,
  },
  {
    icon: Mail,
    title: "General Email",
    content: contactInfo.email,
    link: `mailto:${contactInfo.email}`,
    delay: 0.1,
  },
  {
    icon: Phone,
    title: "Direct Phone",
    content: "+977 980-000-0000\nMon-Fri, 9am-6pm",
    link: "tel:+9779800000000",
    delay: 0.2,
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Monday - Friday\n9:00 AM - 6:00 PM (NPT)",
    delay: 0.3,
  },
  {
    icon: Briefcase,
    title: "Sales Inquiries",
    content: "Coming soon\nPriority enterprise response",
    delay: 0.4,
  },
  {
    icon: Headset,
    title: "Client Support",
    content: "Coming soon\n24/7 SLA monitoring",
    delay: 0.5,
  },
];

export default function ContactInfo() {
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
          Get in <span className="text-brand">Touch</span>
        </h2>
        <p className="mt-4 text-lg text-faint leading-relaxed max-w-lg">
          Reach out to the right department. Our enterprise team is available worldwide to support your digital transformation.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
              {card.link ? (
                <a 
                  href={card.link} 
                  className="whitespace-pre-line text-sm text-faint leading-relaxed transition-colors hover:text-brand"
                >
                  {card.content}
                </a>
              ) : (
                <p className="whitespace-pre-line text-sm text-faint leading-relaxed">
                  {card.content}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
