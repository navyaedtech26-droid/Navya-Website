import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import TiltCard from "@/components/effects/TiltCard";
import { founders, type Founder } from "@/data/team";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

function FounderAvatar({ member }: { member: Founder }) {
  const Icon = member.icon;
  return (
    <div className="relative">
      {/* Soft glow behind the portrait */}
      <span className="absolute -inset-2 rounded-full bg-brand/20 blur-lg opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Portrait frame — image space (≈ square photo). Falls back to initials. */}
      <div className="relative h-28 w-28 overflow-hidden rounded-full bg-gradient-to-br from-brand/30 to-cyan-accent/10 ring-1 ring-brand/40">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-2xl font-bold text-cyan-accent">
              {member.initials}
            </span>
          </div>
        )}
      </div>

      {/* Discipline badge */}
      <span className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-bg-900 text-brand-light ring-1 ring-brand/30">
        <Icon size={16} strokeWidth={1.75} />
      </span>
    </div>
  );
}

function SocialLinks({ socials, name }: { socials: Founder["socials"]; name: string }) {
  const links = [
    { href: socials.linkedin, icon: Linkedin, label: `${name} on LinkedIn` },
    { href: socials.github, icon: Github, label: `${name} on GitHub` },
    {
      href: socials.email ? `mailto:${socials.email}` : "",
      icon: Mail,
      label: `Email ${name}`,
    },
  ].filter((l): l is { href: string; icon: typeof Linkedin; label: string } =>
    Boolean(l.href)
  );

  if (links.length === 0) return null;

  return (
    <div className="mt-5 flex items-center gap-2.5">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full glass text-ink-muted ring-1 ring-white/10 transition-colors duration-200 hover:text-cyan-accent hover:ring-brand/40"
        >
          <Icon size={15} strokeWidth={1.75} />
        </a>
      ))}
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="relative py-24">
      <Container>
        <SectionHeading
          eyebrow="The People Behind It"
          title="Meet the"
          highlight="Founders"
          subtitle="Four founders, four disciplines: engineering, design, systems, and growth under one roof, so you only ever need one partner."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {founders.map((member) => (
            <motion.div key={member.name} variants={fadeUp}>
              <TiltCard intensity={8} className="h-full">
                <div className="group flex h-full flex-col items-center glass rounded-2xl p-8 text-center">
                  <FounderAvatar member={member} />

                  <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-brand-light">
                    {member.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                    {member.bio}
                  </p>

                  <SocialLinks socials={member.socials} name={member.name} />
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
