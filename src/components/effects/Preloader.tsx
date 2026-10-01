import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PreloaderProps {
  onComplete?: () => void;
  forceShow?: boolean;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [shouldRender, setShouldRender] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion accessibility preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldRender(false);
      ScrollTrigger.refresh();
      if (onComplete) onComplete();
      return;
    }

    // Lock body scroll during preloader & curtain opening sequence
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setShouldRender(false);
          ScrollTrigger.refresh();
          if (onComplete) onComplete();
        },
      });

      // ── 1. Snappy Logo In (0.5s) ──
      tl.fromTo(
        ".preloader-logo",
        { scale: 0.88, opacity: 0, force3D: true },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power3.out", force3D: true }
      )
        // ── 2. Crisp Micro-Beat (0.18s) ──
        .to({}, { duration: 0.18 })
        // ── 3. Silky Fast Expansion Towards Entire Screen & Curtain Opening (0.75s) ──
        .to(
          ".preloader-logo",
          {
            scale: 4.5,
            opacity: 0,
            duration: 0.75,
            ease: "power3.inOut",
            force3D: true,
          }
        )
        .to(
          ".preloader-glow",
          {
            scale: 2.2,
            opacity: 0,
            duration: 0.65,
            ease: "power2.in",
            force3D: true,
          },
          "<"
        )
        .to(
          ".preloader-curtain-left",
          {
            xPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            force3D: true,
          },
          "-=0.6"
        )
        .to(
          ".preloader-curtain-right",
          {
            xPercent: 100,
            duration: 0.8,
            ease: "power4.inOut",
            force3D: true,
          },
          "<"
        )
        // ── 4. Smooth Underlying Website Scale-In ──
        .fromTo(
          "#smooth-content",
          { scale: 0.96, opacity: 0.75, force3D: true },
          { scale: 1, opacity: 1, duration: 0.75, ease: "power3.out", force3D: true },
          "-=0.75"
        )
        // ── 5. Hero Reveal ──
        .from(
          ".hero-headline .char",
          {
            yPercent: 100,
            opacity: 0,
            stagger: 0.012,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .from(
          ".hero-animate-item",
          {
            y: 20,
            opacity: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .call(() => {
          ScrollTrigger.refresh();
        });
    }, containerRef);

    return () => {
      document.body.style.overflow = originalOverflow;
      ctx.revert();
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden">
      {/* ── Left Curtain Panel ── */}
      <div className="preloader-curtain-left fixed inset-y-0 left-0 w-1/2 bg-[#05060A] border-r border-white/5 z-[99999] pointer-events-auto transform-gpu will-change-transform" />

      {/* ── Right Curtain Panel ── */}
      <div className="preloader-curtain-right fixed inset-y-0 right-0 w-1/2 bg-[#05060A] border-l border-white/5 z-[99999] pointer-events-auto transform-gpu will-change-transform" />

      {/* ── Foreground Main Focus: Navya Logo ── */}
      <div className="preloader-content fixed inset-0 z-[100000] flex flex-col items-center justify-center p-6 text-white pointer-events-auto">
        {/* Soft Ambient Radial Glow behind Navya Logo */}
        <div className="preloader-glow absolute w-80 h-80 sm:w-[32rem] sm:h-[32rem] rounded-full bg-brand/25 blur-[140px] animate-pulse pointer-events-none transform-gpu will-change-transform" />

        {/* Primary Focus: Navya Logo */}
        <div className="preloader-logo relative z-10 flex flex-col items-center justify-center transform-gpu will-change-transform">
          <img
            src="/logo-navy.webp"
            alt="Navya"
            width={614}
            height={719}
            className="h-20 sm:h-32 md:h-40 w-auto object-contain filter drop-shadow-[0_15px_60px_rgba(30,107,255,0.6)] brightness-125"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/logo.webp";
            }}
          />
        </div>
      </div>
    </div>
  );
}
