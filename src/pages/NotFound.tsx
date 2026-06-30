import Seo from "@/components/common/Seo";
import { motion } from "framer-motion";
import PageTransition from "@/components/effects/PageTransition";
import Container from "@/components/common/Container";
import MagneticButton from "@/components/effects/MagneticButton";
import FloatingOrbs from "@/components/effects/FloatingOrbs";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useReducedMotion } from "@/hooks/useMediaQuery";

export default function NotFound() {
  const reduced = useReducedMotion();
  return (
    <PageTransition>
      <Seo
        title="404 — Page Not Found | Navya EdTech"
        description="The page you are looking for could not be found. Return to Navya EdTech's homepage."
        path="/404"
        index={false}
      />

      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-32">
        <FloatingOrbs count={6} />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/20 blur-[120px]" />

        <Container className="relative">
          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-xl text-center"
          >
            <motion.div variants={fadeUp} className="relative inline-block">
              <h1 className="font-display text-[7rem] font-bold leading-none tracking-tighter text-ink sm:text-[11rem]">
                404
              </h1>
              {!reduced && (
                <>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 font-display text-[7rem] font-bold leading-none tracking-tighter text-cyan-accent/40 sm:text-[11rem]"
                    animate={{ x: [0, -3, 2, 0], opacity: [0.4, 0.2, 0.5, 0.4] }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.5 }}
                  >
                    404
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 font-display text-[7rem] font-bold leading-none tracking-tighter text-brand/40 sm:text-[11rem]"
                    animate={{ x: [0, 3, -2, 0], opacity: [0.4, 0.5, 0.2, 0.4] }}
                    transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 2.5, delay: 0.1 }}
                  >
                    404
                  </motion.span>
                </>
              )}
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mt-4 font-display text-xl font-medium text-ink"
            >
              This page drifted off the grid.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-3 text-ink-muted">
              The page you're looking for doesn't exist or has been moved.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex justify-center">
              <MagneticButton to="/">Back to Home</MagneticButton>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </PageTransition>
  );
}
