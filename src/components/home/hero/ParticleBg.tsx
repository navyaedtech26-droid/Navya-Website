import { useEffect, useRef } from "react";
import { ACCENT } from "./data";

// ─── Particle Background ──────────────────────────────────────────────────────
// Drifting twinkling particles plus occasional shooting stars across the hero.
export function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = Array.from({ length: 80 }, () => {
      // ~85% blue, a few neon-green / gold sparks
      const roll = Math.random();
      const color = roll > 0.92 ? ACCENT.green : roll > 0.84 ? ACCENT.gold : ACCENT.blue;
      const accent = color !== ACCENT.blue;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: (accent ? Math.random() * 1.2 + 0.6 : Math.random() * 1.5 + 0.3),
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: (accent ? Math.random() * 0.4 + 0.25 : Math.random() * 0.5 + 0.1),
        tw: Math.random() * Math.PI * 2,      // twinkle phase
        tws: Math.random() * 0.03 + 0.008,    // twinkle speed
        color,
      };
    });

    // Shooting stars streaking diagonally across the whole hero
    type Meteor = { x: number; y: number; vx: number; vy: number; len: number; life: number; decay: number; color: string };
    let meteors: Meteor[] = [];
    let meteorTimer = 20 + Math.random() * 40;
    function spawnMeteor(): Meteor {
      // launch from anywhere along the top / sides so streaks cover the full section
      const speed = Math.random() * 6 + 8;
      const ang = (Math.random() * 0.45 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
      return {
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * window.innerHeight * 0.25,
        vx: Math.sin(ang) * speed,
        vy: Math.cos(ang) * speed,
        len: Math.random() * 120 + 90,
        life: 1,
        decay: Math.random() * 0.006 + 0.008,
        color: Math.random() > 0.78 ? ACCENT.green : Math.random() > 0.6 ? ACCENT.gold : "199,222,255",
      };
    }

    let animId: number;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const W = canvas!.width, H = canvas!.height;
      ctx!.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;
        p.tw += p.tws;
        const flicker = 0.55 + ((Math.sin(p.tw) + 1) / 2) * 0.45;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${p.alpha * flicker})`;
        ctx!.fill();
      });

      // Shooting stars — fire often so the whole hero stays lively
      meteorTimer -= 1;
      if (meteorTimer <= 0) {
        meteors.push(spawnMeteor());
        if (Math.random() > 0.6) meteors.push(spawnMeteor()); // occasional pair
        meteorTimer = 35 + Math.random() * 90;
      }
      meteors.forEach((m) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;
        const inv = 1 / Math.hypot(m.vx, m.vy);
        const tailX = m.x - m.vx * inv * m.len;
        const tailY = m.y - m.vy * inv * m.len;
        const grad = ctx!.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, `rgba(${m.color},${0.95 * m.life})`);
        grad.addColorStop(0.4, `rgba(${m.color},${0.35 * m.life})`);
        grad.addColorStop(1, "transparent");
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.8;
        ctx!.lineCap = "round";
        ctx!.beginPath();
        ctx!.moveTo(m.x, m.y);
        ctx!.lineTo(tailX, tailY);
        ctx!.stroke();
        // glowing head
        const hg = ctx!.createRadialGradient(m.x, m.y, 0, m.x, m.y, 6);
        hg.addColorStop(0, `rgba(255,255,255,${m.life})`);
        hg.addColorStop(1, "transparent");
        ctx!.fillStyle = hg;
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, 6, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(m.x, m.y, 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${m.life})`;
        ctx!.fill();
      });
      meteors = meteors.filter((m) => m.life > 0 && m.y < H + 80 && m.x > -80 && m.x < W + 80);

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}
