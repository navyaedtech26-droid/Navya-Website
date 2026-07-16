import { motion } from "framer-motion";
import { Hexagon, Triangle, Circle, Square, Diamond, Octagon, Star, Cloud } from "lucide-react";
import Container from "@/components/common/Container";

const CLIENTS = [
  { name: "Acme Corp", icon: Hexagon, color: "text-blue-500" },
  { name: "Nexus Systems", icon: Triangle, color: "text-emerald-500" },
  { name: "Quantum Data", icon: Circle, color: "text-indigo-500" },
  { name: "Stark Industries", icon: Square, color: "text-rose-500" },
  { name: "GlobalTech", icon: Diamond, color: "text-amber-500" },
  { name: "Cyberdyne", icon: Octagon, color: "text-cyan-500" },
  { name: "Starlight Media", icon: Star, color: "text-violet-500" },
  { name: "AeroCloud", icon: Cloud, color: "text-sky-500" },
];

export default function PortfolioTrustedBy() {
  // Duplicate the array to ensure seamless infinite scrolling
  const duplicatedClients = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-line/50">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold tracking-widest text-faint uppercase"
          >
            Trusted by innovative companies worldwide
          </motion.p>
        </div>
      </Container>



      {/* Infinite Scroll Container with Faded Edges */}
      <div className="relative w-full max-w-7xl mx-auto overflow-hidden">

        {/* Left Fade */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Right Fade */}
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="animate-marquee hover:pause py-4">
          {duplicatedClients.map((client, idx) => {
            const Icon = client.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 px-12 lg:px-20 group cursor-default"
              >
                {/* 
                  Applying grayscale and opacity by default. 
                  On hover: remove grayscale and restore full opacity.
                */}
                <div className="flex items-center gap-3 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Icon className={`w-8 h-8 ${client.color}`} strokeWidth={2.5} />
                  <span className="font-display font-bold text-2xl text-heading tracking-tight">
                    {client.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
