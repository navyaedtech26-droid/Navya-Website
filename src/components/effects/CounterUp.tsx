import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterUpProps {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Skip the scroll-into-view gate and start counting on mount — for
   * counters placed in content that's already visible on load (e.g. a
   * hero), where a viewport-edge intersection can otherwise never fire. */
  immediate?: boolean;
}

export default function CounterUp({
  to,
  suffix = "",
  duration = 1.6,
  className,
  immediate = false,
}: CounterUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inViewResult = useInView(ref, { once: true, margin: "-60px" });
  const inView = immediate || inViewResult;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
