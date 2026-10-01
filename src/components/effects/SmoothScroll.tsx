import { useEffect, useRef, createContext } from "react";
import { useLocation } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import type Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScrollContext = createContext<{ lenis: Lenis | undefined }>({ lenis: undefined });

/**
 * Custom hook to access Lenis instance with convenience methods
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useSmoothScroll() {
  const lenis = useLenis();

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      onComplete?: () => void;
    }
  ) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: options?.immediate ? "instant" : "smooth" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: options?.immediate ? "instant" : "smooth" });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: options?.immediate ? "instant" : "smooth" });
    }
  };

  return { lenis, scrollTo };
}

function SmoothScrollHandler({ children }: SmoothScrollProps) {
  const location = useLocation();
  const lenis = useLenis();
  const prevPathRef = useRef<string | null>(null);

  // Synchronize GSAP Ticker and ScrollTrigger perfectly with Lenis smooth scroll
  useEffect(() => {
    if (!lenis) return;

    const handleScroll = () => {
      ScrollTrigger.update();
    };

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", handleScroll);
    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateTicker);
    };
  }, [lenis]);

  // Support elements with data-speed / data-lag attributes for parallax scroll effects
  useEffect(() => {
    if (!lenis) return;

    const elements = document.querySelectorAll<HTMLElement>("[data-speed]");
    const triggers: ScrollTrigger[] = [];

    elements.forEach((el) => {
      const speedVal = parseFloat(el.getAttribute("data-speed") || "1");
      if (isNaN(speedVal) || speedVal === 1) return;

      const yShift = (1 - speedVal) * 120;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(el, { y: (self.progress - 0.5) * yShift });
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [lenis, location.pathname]);

  // Synchronize route navigation and fragment scrolling with Lenis
  useEffect(() => {
    if (!lenis) return;

    // Fragment / hash navigation (e.g. /#our-services or /services#faq)
    if (location.hash) {
      const targetId = location.hash.slice(1);
      let attempts = 0;

      const tryScroll = () => {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          lenis.scrollTo(targetEl, {
            offset: -80, // Accounts for sticky navbar header height
            duration: 1.2,
          });
        } else if (attempts++ < 30) {
          timer = window.setTimeout(tryScroll, 50);
        }
      };

      let timer = window.setTimeout(tryScroll, 50);
      prevPathRef.current = location.pathname;
      return () => window.clearTimeout(timer);
    }

    // Page route change: instant reset to top
    if (prevPathRef.current !== null && prevPathRef.current !== location.pathname) {
      lenis.scrollTo(0, { immediate: true });
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname, location.hash, lenis]);

  // Global anchor link smooth scroll handler
  useEffect(() => {
    if (!lenis) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href^='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, {
          offset: -80,
          duration: 1.2,
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [lenis]);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      <div id="smooth-wrapper" className="w-full min-h-screen relative overflow-x-hidden">
        <div id="smooth-content" className="w-full relative">
          {children}
        </div>
      </div>
    </SmoothScrollContext.Provider>
  );
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);
  const location = useLocation();

  // Check if reduced motion is requested
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Disable Lenis for admin section or if user prefers reduced motion
  if (location.pathname.startsWith("/admin") || prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.8,
        infinite: false,
      }}
    >
      <SmoothScrollHandler>{children}</SmoothScrollHandler>
    </ReactLenis>
  );
}
