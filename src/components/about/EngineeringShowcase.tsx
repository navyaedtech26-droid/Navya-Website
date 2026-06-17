import { motion } from "framer-motion";
import { Cpu, GitBranch, ShieldCheck, Gauge } from "lucide-react";
import Container from "@/components/common/Container";
import Reveal from "@/components/effects/Reveal";
import RotatingCube3D from "@/components/effects/RotatingCube3D";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

const highlights = [
  { icon: Gauge, title: "Performance-First", text: "Optimized to the millisecond — fast loads, smooth motion." },
  { icon: ShieldCheck, title: "Secure by Design", text: "Hardened, monitored, and built on modern best practices." },
  { icon: GitBranch, title: "Clean Architecture", text: "Modular, version-controlled code that scales without breaking." },
  { icon: Cpu, title: "Future-Ready", text: "Built to evolve as your product and traffic grow." },
];

export default function EngineeringShowcase() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* 3D cube */}
          <Reveal className="order-2 flex justify-center lg:order-1">
            <RotatingCube3D size={240} />
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-brand-light">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-accent animate-pulse-glow" />
                Engineering Excellence
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                Beautiful on the surface.{" "}
                <span className="text-gradient">Serious underneath.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-base leading-relaxed text-ink-muted">
                We pair editorial design with real engineering discipline. Every project is
                built on a foundation that's fast, secure, and ready to scale — so what looks
                great today still performs under pressure tomorrow.
              </p>
            </Reveal>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              {highlights.map((h) => (
                <motion.div
                  key={h.title}
                  variants={fadeUp}
                  className="flex items-start gap-3 rounded-2xl glass p-4 ring-1 ring-white/10"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-cyan-accent ring-1 ring-brand/30">
                    <h.icon size={17} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-semibold text-ink">{h.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-ink-muted">{h.text}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
