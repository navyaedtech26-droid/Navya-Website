import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import TiltCard from "@/components/effects/TiltCard";
import { team } from "@/data/team";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function TeamSection() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="The People Behind It"
          title="One Team,"
          highlight="Every Discipline"
          subtitle="Designers, engineers, architects, and growth specialists — working together so you only need one partner."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member) => (
            <motion.div key={member.name} variants={fadeUp}>
              <TiltCard intensity={8} className="h-full">
                <div className="group flex h-full flex-col items-center glass rounded-2xl p-7 text-center">
                  {/* Avatar with floating ring */}
                  <div className="relative">
                    <span className="absolute -inset-2 rounded-full bg-brand/20 blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand/30 to-cyan-accent/10 ring-1 ring-brand/40">
                      <span className="font-display text-xl font-bold text-cyan-accent">
                        {member.initials}
                      </span>
                    </div>
                    <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-bg-900 text-brand-light ring-1 ring-brand/30">
                      <member.icon size={15} strokeWidth={1.75} />
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-base font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-brand-light">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{member.focus}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
