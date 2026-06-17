"use client";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Globe, LayoutDashboard, ShoppingCart, Share2, type LucideIcon } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SphereDot {
  lat: number;
  lng: number;
  type: "grid" | "city";
  name?: string;
}

interface Projected {
  x: number;
  y: number;
  z: number;
  visible: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────
const CITIES = [
  { lat: 35.68, lng: 139.69, name: "Tokyo" },
  { lat: 35.01, lng: 135.77, name: "Kyoto" },
  { lat: 1.35, lng: 103.82, name: "Singapore" },
  { lat: 37.56, lng: 126.97, name: "Seoul" },
  { lat: 51.51, lng: -0.13, name: "London" },
  { lat: 48.85, lng: 2.35, name: "Paris" },
  { lat: 40.71, lng: -74.0, name: "New York" },
  { lat: 37.77, lng: -122.42, name: "San Francisco" },
  { lat: -33.87, lng: 151.21, name: "Sydney" },
  { lat: 22.32, lng: 114.17, name: "Hong Kong" },
  { lat: 19.08, lng: 72.88, name: "Mumbai" },
  { lat: -23.55, lng: -46.63, name: "São Paulo" },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], [0, 3], [1, 3], [3, 9], [9, 6],
  [0, 5], [5, 6], [6, 7], [7, 11], [0, 8], [2, 3],
];

const ORBITAL_RINGS = [
  { tilt: 0.4, speed: 0.004, phase: 0, color: "rgba(30,107,255,0.35)", dash: [6, 8] },
  { tilt: -0.6, speed: -0.003, phase: Math.PI, color: "rgba(30,107,255,0.2)", dash: [3, 12] },
  { tilt: 0.9, speed: 0.005, phase: Math.PI / 2, color: "rgba(59,130,246,0.25)", dash: [8, 6] },
];

const HERO_STATS = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 40, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Technologies Used" },
];

interface ServiceCard {
  tag: string;
  title: string;
  sub: string;
  icon: LucideIcon;
  style: string;
  float: "A" | "B" | "C" | "D";
  dur: number;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    tag: "Web",
    title: "Web Development",
    sub: "Fast, modern & SEO-ready",
    icon: Globe,
    style: "top-[2%] left-0 sm:left-[-7%]",
    float: "A",
    dur: 5,
  },
  {
    tag: "Systems",
    title: "ERP · CRM · LMS",
    sub: "Platforms that run ops",
    icon: LayoutDashboard,
    style: "top-[20%] right-0 sm:right-[-8%]",
    float: "B",
    dur: 6.4,
  },
  {
    tag: "Commerce",
    title: "E-Commerce",
    sub: "Stores built to convert",
    icon: ShoppingCart,
    style: "bottom-[16%] right-0 sm:right-[-6%]",
    float: "C",
    dur: 7,
  },
  {
    tag: "Social",
    title: "Social & Content",
    sub: "Reels, posts & campaigns",
    icon: Share2,
    style: "bottom-[1%] left-0 sm:left-[-4%]",
    float: "D",
    dur: 6.2,
  },
];

const easeEntrance = [0.22, 1, 0.36, 1] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildGridDots(): SphereDot[] {
  const dots: SphereDot[] = [];
  for (let lat = -80; lat <= 80; lat += 14) {
    const r = Math.cos((lat * Math.PI) / 180);
    const count = Math.max(1, Math.round(r * 22));
    for (let i = 0; i < count; i++) {
      const lng = (i / count) * 360 - 180;
      dots.push({
        lat: (lat * Math.PI) / 180,
        lng: (lng * Math.PI) / 180,
        type: "grid",
      });
    }
  }
  return dots;
}

function project3D(
  lat: number,
  lng: number,
  rotY: number,
  rotX: number,
  R: number
): Projected {
  let x = Math.cos(lat) * Math.sin(lng);
  let y = Math.sin(lat);
  let z = Math.cos(lat) * Math.cos(lng);
  // rotate Y
  const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
  const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
  // rotate X
  const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  return { x: x1 * R, y: -y2 * R, z: z2, visible: z2 > -0.1 };
}

// ─── CounterUp ───────────────────────────────────────────────────────────────
function CounterUp({ to, suffix, delay = 0 }: { to: number; suffix: string; delay?: number }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => {
      const dur = 1800;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const ease = 1 - Math.pow(1 - t, 3);
        setVal(Math.round(ease * to));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timer);
  }, [to, delay]);
  return <>{val}{suffix}</>;
}

// ─── Globe Canvas ────────────────────────────────────────────────────────────
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotState = useRef({ rotY: 0, rotX: 0.3, targetRotY: 0, targetRotX: 0.3 });
  const arcProgress = useRef(0);
  const pingPhase = useRef(0);
  const ringAngles = useRef(ORBITAL_RINGS.map((r) => r.phase));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GRID_DOTS = buildGridDots();
    const CITY_DOTS: SphereDot[] = CITIES.map((c) => ({
      lat: (c.lat * Math.PI) / 180,
      lng: (c.lng * Math.PI) / 180,
      type: "city",
      name: c.name,
    }));

    let animId: number;
    let CX = 0, CY = 0, R = 0;

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;
      CX = canvas!.width / 2;
      CY = canvas!.height / 2;
      R = Math.min(canvas!.width, canvas!.height) * 0.36;
    }
    resize();
    window.addEventListener("resize", resize);

    // Drag to rotate
    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseUp = () => { isDragging.current = false; };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      rotState.current.targetRotY += dx * 0.008;
      rotState.current.targetRotX = Math.max(
        -0.8,
        Math.min(0.8, rotState.current.targetRotX + dy * 0.005)
      );
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);

    function drawArcBetween(p1: SphereDot, p2: SphereDot, progress: number, alpha: number) {
      const steps = 40;
      const pts: { sx: number; sy: number; z: number }[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const lat = p1.lat + (p2.lat - p1.lat) * t;
        const lng = p1.lng + (p2.lng - p1.lng) * t;
        const lift = Math.sin(t * Math.PI) * 0.18;
        const pr = project3D(lat, lng, rotState.current.rotY, rotState.current.rotX, R);
        if (pr.visible) pts.push({ sx: CX + pr.x, sy: CY + pr.y - lift * R * 0.3, z: pr.z });
      }
      if (pts.length < 2) return;
      const drawTo = Math.floor(pts.length * progress);
      ctx!.beginPath();
      let started = false;
      for (let i = 0; i < drawTo; i++) {
        const p = pts[i];
        if (!started) { ctx!.moveTo(p.sx, p.sy); started = true; }
        else ctx!.lineTo(p.sx, p.sy);
      }
      ctx!.strokeStyle = `rgba(30,107,255,${alpha})`;
      ctx!.lineWidth = 1;
      ctx!.stroke();
    }

    function frame() {
      const { rotY, rotX, targetRotY, targetRotX } = rotState.current;
      rotState.current.rotY = rotY + (targetRotY - rotY) * 0.05;
      rotState.current.rotX = rotX + (targetRotX - rotX) * 0.05;
      if (!isDragging.current) rotState.current.targetRotY += 0.004;

      arcProgress.current = Math.min(1, arcProgress.current + 0.005);
      pingPhase.current += 0.04;
      ringAngles.current = ringAngles.current.map((a, i) => a + ORBITAL_RINGS[i].speed);

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Globe glow
      const grd = ctx!.createRadialGradient(CX, CY, 0, CX, CY, R * 1.3);
      grd.addColorStop(0, "rgba(30,107,255,0.08)");
      grd.addColorStop(1, "transparent");
      ctx!.fillStyle = grd;
      ctx!.beginPath();
      ctx!.arc(CX, CY, R * 1.3, 0, Math.PI * 2);
      ctx!.fill();

      // Globe body
      ctx!.beginPath();
      ctx!.arc(CX, CY, R, 0, Math.PI * 2);
      ctx!.fillStyle = "rgba(18,18,20,0.6)";
      ctx!.fill();
      ctx!.strokeStyle = "rgba(30,107,255,0.2)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      // Orbital rings
      ORBITAL_RINGS.forEach((ring, ri) => {
        const angle = ringAngles.current[ri];
        const orbitR = R * 1.22;
        ctx!.save();
        ctx!.translate(CX, CY);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, orbitR, orbitR * Math.abs(Math.sin(ring.tilt + Math.PI / 2)), ring.tilt, 0, Math.PI * 2);
        ctx!.setLineDash(ring.dash);
        ctx!.strokeStyle = ring.color;
        ctx!.lineWidth = 1;
        ctx!.stroke();
        ctx!.setLineDash([]);
        // Moving dot
        const ex = orbitR * Math.cos(angle);
        const ey = orbitR * Math.abs(Math.sin(ring.tilt + Math.PI / 2)) * Math.sin(angle);
        const dotAlpha = (Math.cos(angle - ring.tilt) + 1) / 2;
        if (dotAlpha > 0.3) {
          ctx!.beginPath();
          ctx!.arc(ex, ey, 6, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(30,107,255,${0.15 * dotAlpha})`;
          ctx!.fill();
        }
        ctx!.beginPath();
        ctx!.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(30,107,255,${0.9 * dotAlpha})`;
        ctx!.fill();
        ctx!.restore();
      });

      // Grid dots
      GRID_DOTS.forEach((d) => {
        const p = project3D(d.lat, d.lng, rotState.current.rotY, rotState.current.rotX, R);
        if (!p.visible) return;
        const alpha = ((p.z + 1) / 2) * 0.4;
        ctx!.beginPath();
        ctx!.arc(CX + p.x, CY + p.y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(30,107,255,${alpha})`;
        ctx!.fill();
      });

      // Connection arcs
      CONNECTIONS.forEach(([i, j], ci) => {
        const delay = ci * 0.08;
        const prog = Math.max(0, Math.min(1, (arcProgress.current - delay) / 0.8));
        if (prog > 0) drawArcBetween(CITY_DOTS[i], CITY_DOTS[j], prog, 0.35);
      });

      // City dots + pings
      CITY_DOTS.forEach((d, di) => {
        const p = project3D(d.lat, d.lng, rotState.current.rotY, rotState.current.rotX, R);
        if (!p.visible) return;
        const sz = p.z > 0.3 ? 4 : 2.5;
        const alpha = (p.z + 1) / 2;
        const pingT = (pingPhase.current - di * 0.4) % (Math.PI * 2);
        if (pingT > 0 && pingT < Math.PI && p.z > 0.2) {
          const pr = sz + pingT * 10;
          const pa = (1 - pingT / Math.PI) * 0.4;
          ctx!.beginPath();
          ctx!.arc(CX + p.x, CY + p.y, pr, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(30,107,255,${pa})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
        // Halo
        ctx!.beginPath();
        ctx!.arc(CX + p.x, CY + p.y, sz + 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(30,107,255,${alpha * 0.15})`;
        ctx!.fill();
        // Core
        ctx!.beginPath();
        ctx!.arc(CX + p.x, CY + p.y, sz, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(30,107,255,${alpha})`;
        ctx!.fill();
      });

      // Equator glow
      const eqPts: { x: number; y: number }[] = [];
      for (let i = 0; i <= 60; i++) {
        const lng = (i / 60) * Math.PI * 2 - Math.PI;
        const p = project3D(0, lng, rotState.current.rotY, rotState.current.rotX, R);
        if (p.visible) eqPts.push({ x: CX + p.x, y: CY + p.y });
      }
      if (eqPts.length > 1) {
        ctx!.beginPath();
        ctx!.moveTo(eqPts[0].x, eqPts[0].y);
        eqPts.forEach((pt) => ctx!.lineTo(pt.x, pt.y));
        ctx!.strokeStyle = "rgba(30,107,255,0.12)";
        ctx!.lineWidth = 1.5;
        ctx!.stroke();
      }

      animId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
    />
  );
}

// ─── Particle Background ──────────────────────────────────────────────────────
function ParticleBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.5 + 0.1,
    }));

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
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(30,107,255,${p.alpha})`;
        ctx!.fill();
      });
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

// ─── Main HeroSection ─────────────────────────────────────────────────────────
export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A1628] flex items-center px-5 sm:px-8 lg:px-12 py-28 lg:py-32">

      {/* Backgrounds */}
      <ParticleBg />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(30,107,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(30,107,255,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Spotlight */}
      <div
        className="absolute top-[-20%] right-[5%] w-[700px] h-[700px] rounded-full pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse, rgba(30,107,255,0.12) 0%, transparent 70%)",
          animation: "breathe 6s ease-in-out infinite",
        }}
      />

      {/* Main grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center max-w-[1200px] mx-auto w-full">

        {/* ── LEFT ── */}
        <div>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEntrance, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(30,107,255,0.3)] bg-[rgba(30,107,255,0.06)] px-4 py-1.5"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#93c5fd" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E6BFF] animate-pulse" />
            Web Development · Systems · Social Media
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeEntrance, delay: 0.5 }}
            className="mt-6 text-white leading-[1.04] tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            We don&apos;t just build.<br />
            <span className="relative inline-block text-[#1E6BFF]">
              We transform.
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, #1E6BFF, #3B82F6)" }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, ease: easeEntrance, delay: 1.5 }}
              />
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEntrance, delay: 0.8 }}
            className="mt-6 text-lg font-semibold text-white"
          >
            Digital solutions designed after understanding your business.
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEntrance, delay: 1.0 }}
            className="mt-3 text-sm leading-relaxed text-[#A1A1AA] max-w-[440px]"
          >
            We study your business, market, competitors, and growth possibilities — then build
            high-performance websites, business systems, and social media that scale your brand.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeEntrance, delay: 1.2 }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <button
              onClick={() => navigate("/contact")}
              className="relative overflow-hidden px-7 py-3.5 rounded-lg bg-[#1E6BFF] text-[#0A1628] text-sm font-bold tracking-wide transition-transform hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(30,107,255,0.35)]"
            >
              Let&apos;s Build Together →
            </button>
            <button
              onClick={() => navigate("/services")}
              className="px-7 py-3.5 rounded-lg border border-[#1E293B] bg-transparent text-white text-sm font-semibold transition-colors hover:border-[rgba(30,107,255,0.5)] hover:bg-[rgba(30,107,255,0.06)]"
            >
              View Our Services
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12, delayChildren: 1.6 }}
            className="mt-12 flex flex-wrap gap-6 sm:gap-9"
          >
            {HERO_STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              >
                <div
                  className="text-[1.8rem] font-bold text-[#1E6BFF]"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <CounterUp to={stat.value} suffix={stat.suffix} delay={1800} />
                </div>
                <p
                  className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#A1A1AA]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Globe ── */}
        <div className="relative h-[340px] sm:h-[440px] lg:h-[520px]">
          <GlobeCanvas />

          {/* Floating service cards */}
          {SERVICE_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.85, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: easeEntrance, delay: 2.1 + i * 0.25 }}
                whileHover={{ scale: 1.06, transition: { duration: 0.25 } }}
                data-cursor="hover"
                className={`group absolute ${card.style} z-30 w-[150px] sm:w-[172px] origin-center cursor-pointer`}
                style={{ animation: `svcFloat${card.float} ${card.dur}s ease-in-out infinite ${2.6 + i * 0.25}s` }}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[rgba(30,107,255,0.22)] bg-[rgba(13,22,40,0.82)] px-3.5 py-3 backdrop-blur-md transition-colors duration-300 group-hover:border-[rgba(30,107,255,0.55)]">
                  {/* sweep glow on hover */}
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(30,107,255,0.14)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  {/* top accent line */}
                  <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#1E6BFF]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-2.5">
                    <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E6BFF]/30 to-[#0EA5E9]/10 text-[#7db1ff] ring-1 ring-[rgba(30,107,255,0.35)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6">
                      <span className="absolute inset-0 rounded-xl bg-[#1E6BFF]/25 blur-md opacity-60" />
                      <Icon size={17} strokeWidth={1.75} className="relative z-10" />
                    </span>
                    <p
                      className="text-[9px] uppercase tracking-[0.16em] text-[#7db1ff]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {card.tag}
                    </p>
                  </div>

                  <p className="relative mt-2.5 text-[0.95rem] font-bold leading-tight text-white">
                    {card.title}
                  </p>
                  <p className="relative mt-0.5 text-[10px] leading-snug text-[#A1A1AA]">
                    {card.sub}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden lg:block opacity-50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 rounded-full bg-[#1E6BFF]" />
        </div>
      </motion.div>

      {/* Keyframes for float animations & breathe — add to your global CSS */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
        @keyframes svcFloatA {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1.2deg); }
          50% { transform: translate3d(4px, -12px, 0) rotate(1deg); }
        }
        @keyframes svcFloatB {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1.2deg); }
          50% { transform: translate3d(-5px, 11px, 0) rotate(-1deg); }
        }
        @keyframes svcFloatC {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg); }
          50% { transform: translate3d(-4px, -10px, 0) rotate(-1.4deg); }
        }
        @keyframes svcFloatD {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
          50% { transform: translate3d(5px, 12px, 0) rotate(1.4deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="svcFloat"], [style*="svcFloat"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}