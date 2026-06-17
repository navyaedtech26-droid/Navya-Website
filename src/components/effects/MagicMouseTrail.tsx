import { useEffect, useRef } from "react";
import { useRichMotion } from "@/hooks/useMediaQuery";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
}

const MAX = 60;

export default function MagicMouseTrail() {
  const enabled = useRichMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let raf = 0;
    const mouse = { x: -100, y: -100 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        if (particles.length >= MAX) particles.shift();
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          life: 1,
          size: Math.random() * 3 + 1.5,
          hue: 140 + Math.random() * 25,
        });
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter((p) => p.life > 0);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.022;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.life * 0.6})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, ${p.life})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9990]"
      aria-hidden
    />
  );
}
