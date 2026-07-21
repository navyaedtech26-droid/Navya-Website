import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import IconBadge from "@/components/common/IconBadge";
import TiltCard from "@/components/effects/TiltCard";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

interface RelatedLinkItem {
  href: string;
  icon: LucideIcon;
  color?: string;
  title: string;
  description: string;
}

export interface RelatedLinkGroup {
  title: string;
  highlight: string;
  subtitle: string;
  /** CTA text on each card, e.g. "Explore" or "See services". Defaults to "Explore". */
  linkLabel?: string;
  items: RelatedLinkItem[];
}

/**
 * Shared "keep exploring" cross-link section used at the bottom of every
 * service, solution, and industry landing page. Each page passes a curated
 * set of genuinely related pages (not every page site-wide) — the strategic
 * choice is topical relevance for SEO link equity and user navigation, not
 * exhaustive linking, since the nav mega-menu and footer already give every
 * page a path to every other page.
 */
export default function RelatedLinksSection({ groups }: { groups: RelatedLinkGroup[] }) {
  const visibleGroups = groups.filter((group) => group.items.length > 0);
  if (visibleGroups.length === 0) return null;

  return (
    <section className="relative bg-mist py-16 md:py-20">
      <Container>
        {visibleGroups.map((group, groupIndex) => (
          <div key={group.title + group.highlight} className={groupIndex > 0 ? "mt-16 md:mt-24" : undefined}>
            <SectionHeading align="left" title={group.title} highlight={group.highlight} subtitle={group.subtitle} />
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {group.items.map((item) => (
                <motion.div key={item.href} variants={fadeUp} className="h-full">
                  <TiltCard intensity={15} className="h-full">
                    <Link
                      to={item.href}
                      className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/[0.03]"
                    >
                      {/* Subtle hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      
                      <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                          <IconBadge icon={item.icon} size="md" color={item.color} tone="light" />
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-faint transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                            <ArrowRight size={18} className="-rotate-45 transition-transform duration-500 group-hover:rotate-0" />
                          </div>
                        </div>

                        <div>
                          <h3 className="font-display text-xl font-semibold text-heading transition-colors duration-300 group-hover:text-primary">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-sm leading-relaxed text-faint line-clamp-3">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Interactive line at the bottom */}
                      <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />
                    </Link>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </Container>
    </section>
  );
}
