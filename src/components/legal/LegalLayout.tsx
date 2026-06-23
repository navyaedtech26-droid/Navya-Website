import { motion } from "framer-motion";
import Container from "@/components/common/Container";
import PageHero from "@/components/common/PageHero";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";
import type { LegalDoc } from "@/data/legal";

/**
 * Shared presentation for long-form legal documents (Privacy Policy, Terms).
 * Renders a standard page hero plus a readable, glass-styled content column.
 */
export default function LegalLayout({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        highlight={doc.highlight}
        subtitle={doc.intro}
      />

      <section className="relative pb-24">
        <Container className="relative max-w-3xl">
          <p className="mb-10 text-sm text-ink-muted">
            Last updated: <span className="text-ink">{doc.updated}</span>
          </p>

          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-8"
          >
            {doc.sections.map((section) => (
              <motion.div
                key={section.heading}
                variants={fadeUp}
                className="rounded-2xl glass p-6 ring-1 ring-white/10 sm:p-7"
              >
                <h2 className="font-display text-lg font-semibold text-ink sm:text-xl">
                  {section.heading}
                </h2>

                {section.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base"
                  >
                    {p}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {section.list.map((item, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-sm leading-relaxed text-ink-muted sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
