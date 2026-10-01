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
      "SSL-secured hosting and deployment on every project, no exposed data, no guesswork.",
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
      "Transparent, itemized quotes before any work begins, no hidden costs.",
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
      "Post-launch support is built into every plan, from 2 weeks on Launch to ongoing priority support on Growth and Enterprise.",
      "We monitor performance after launch, not just at handover.",
      "Ongoing maintenance and growth support keep your platform compounding returns long after launch.",
    ],
  },
];

export default function TrustAssuranceSection() {
  return (
    // bg-white keeps the page on a strict white / mist alternation. It was
    // bg-haze sitting between two near-identical light greys, which read as an
    // accidental third tone rather than a deliberate band.
    <section className="relative bg-white section-y-sm">
      <Container>
        <SectionHeading
          title="Built With Your Risk in"
          highlight="Mind"
          subtitle="Investing in a digital partner is a leap of faith. Here's exactly how we make it a safe one."
        />

        {/* Divided rows, not cards. FeaturesSection above already carries the
            page's tiled-grid moment; repeating a three-card grid here made the
            two sections read as the same block twice. A row per pillar - label
            on the left, points on the right - keeps the same content in a
            different layout family and gives the long point lists room to
            breathe instead of cramming them into equal-height boxes. */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mt-14 max-w-4xl"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="grid gap-6 border-t border-line py-8 last:border-b md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12 md:py-10"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-5">
                <IconBadge icon={pillar.icon} tone="light" color={pillar.color} />
                <h3 className="font-display text-lg font-semibold text-heading md:text-xl">
                  {pillar.title}
                </h3>
              </div>
              <ul className="space-y-3.5">
                {pillar.points.map((point) => (
                  <li
                    key={point}
                    className="text-sm leading-relaxed text-faint md:text-base"
                  >
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
