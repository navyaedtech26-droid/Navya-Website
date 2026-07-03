import { motion } from "framer-motion";
import { Mail, Instagram, Music2, Linkedin, Star, Clock } from "lucide-react";
import IconBadge from "@/components/common/IconBadge";
import { contactInfo } from "@/data/navigation";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const cards = [
  {
    icon: Mail,
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: contactInfo.instagram,
    href: contactInfo.instagramUrl,
  },
  {
    icon: Music2,
    label: "TikTok",
    value: contactInfo.tiktok,
    href: contactInfo.tiktokUrl,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: contactInfo.linkedin,
    href: contactInfo.linkedinUrl,
  },
  {
    icon: Star,
    label: "Review Us On Google",
    value: "Leave us a review",
    href: contactInfo.googleReviewUrl,
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "We respond within 24 hours",
  },
];

export default function ContactInfo() {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="flex flex-col gap-4"
    >
      {cards.map((card) => {
        const inner = (
          <div className="group flex items-center gap-4 rounded-2xl card-light p-5 transition-all duration-300 hover:shadow-card-hover">
            <IconBadge icon={card.icon} />
            <div>
              <p className="text-xs uppercase tracking-wide text-faint">
                {card.label}
              </p>
              <p className="mt-0.5 text-sm font-medium text-heading transition-colors group-hover:text-primary">
                {card.value}
              </p>
            </div>
          </div>
        );
        return (
          <motion.div key={card.label} variants={fadeUp}>
            {card.href ? (
              <a
                href={card.href}
                target={card.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-cursor="hover"
              >
                {inner}
              </a>
            ) : (
              inner
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
