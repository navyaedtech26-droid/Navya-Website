import { motion } from "framer-motion";
import { ShieldCheck, Handshake, LifeBuoy, type LucideIcon } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

interface Pillar {
  icon: LucideIcon;
  color: string;
  title: string;
  points: string[];
}

const pillars: Pillar[] = [
  {
    icon: ShieldCheck,
    color: "#1D4ED8",
    title: "Security",
    points: [
      "SSL-secured hosting and deployment on every project — no exposed data, no guesswork.",
      "Role-based access control on custom systems, so sensitive data is only visible to the right people.",
      "Built on modern, actively maintained frameworks instead of outdated, vulnerable stacks.",
      "Dedicated security & scalability review included on Enterprise builds.",
    ],
  },
  {
    icon: Handshake,
    color: "#F59E0B",
    title: "Our Guarantees",
    points: [
      "Transparent, itemized quotes before any work begins — no hidden costs.",
      "Clear milestones and timelines from day one, not vague estimates.",
      "We reply within 24 hours of your first message.",
      "No pressure, no obligation after the discovery call.",
    ],
  },
  {
    icon: LifeBuoy,
    color: "#6366F1",
    title: "Support & Maintenance",
    points: [
      "Post-launch support is built into every plan — from 2 weeks on Launch to ongoing priority support on Growth and Enterprise.",
      "We monitor performance after launch, not just at handover.",
      "Ongoing maintenance and growth support keep your platform compounding returns long after launch.",
    ],
  },
];

export default function TrustAssuranceSection() {
  return (
    <section className="relative bg-haze py-16 md:py-20">
      <Container>
        <SectionHeading
          tone="light"
          title="Built With Your Risk in"
          highlight="Mind"
          subtitle="Investing in a digital partner is a leap of faith. Here's exactly how we make it a safe one."
        />

        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="rounded-2xl card-light p-7"
            >
              <IconBadge icon={pillar.icon} tone="light" color={pillar.color} />
              <h3 className="mt-5 font-display text-lg font-semibold text-heading">
                {pillar.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {pillar.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-faint">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: pillar.color }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
