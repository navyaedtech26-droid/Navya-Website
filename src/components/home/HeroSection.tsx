"use client";

import { useEffect, useRef } from "react";
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

// Card index → city node it "hooks" into on the globe
const CARD_NODE = [6, 0, 2, 4]; // New York, Tokyo, Singapore, London

// ─── Accent palette (sprinkled in small places) ───────────────────────────────
const ACCENT = {
  blue: "30,107,255",
  green: "57,255,150",
  gold: "245,200,70",
};
// Per-card tether / linked-node accent
const CARD_ACCENT = [ACCENT.blue, ACCENT.green, ACCENT.gold, ACCENT.blue];
// A handful of city nodes that glow off-blue (rest stay blue)
const CITY_COLOR: Record<number, string> = {
  1: ACCENT.green, // Kyoto
  5: ACCENT.gold,  // Paris
  8: ACCENT.gold,  // Sydney
  10: ACCENT.green, // Mumbai
};

const ORBITAL_RINGS = [
  { tilt: 0.4, speed: 0.004, phase: 0, color: "rgba(30,107,255,0.35)", dash: [6, 8], dot: ACCENT.blue },
  { tilt: -0.6, speed: -0.003, phase: Math.PI, color: "rgba(57,255,150,0.18)", dash: [3, 12], dot: ACCENT.green },
  { tilt: 0.9, speed: 0.005, phase: Math.PI / 2, color: "rgba(245,200,70,0.2)", dash: [8, 6], dot: ACCENT.gold },
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
    style: "top-0 left-0 sm:top-[2%] sm:left-[-7%]",
    float: "A",
    dur: 5,
  },
  {
    tag: "Systems",
    title: "ERP · CRM · LMS",
    sub: "Platforms that run ops",
    icon: LayoutDashboard,
    style: "top-[16%] right-0 sm:top-[20%] sm:right-[-8%]",
    float: "B",
    dur: 6.4,
  },
  {
    tag: "Commerce",
    title: "E-Commerce",
    sub: "Stores built to convert",
    icon: ShoppingCart,
    style: "bottom-[14%] right-0 sm:bottom-[16%] sm:right-[-6%]",
    float: "C",
    dur: 7,
  },
  {
    tag: "Social",
    title: "Social & Content",
    sub: "Reels, posts & campaigns",
    icon: Share2,
    style: "bottom-0 left-0 sm:bottom-[1%] sm:left-[-4%]",
    float: "D",
    dur: 6.2,
  },
];

const easeEntrance = [0.22, 1, 0.36, 1] as const;

// Word-by-word headline reveal (blur + rise), staggered after the badge
const headlineContainer = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.12, staggerChildren: 0.04 },
  },
};
const headlineWord = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: easeEntrance },
  },
};
const LINE_ONE = ["We", "don’t", "just", "build."];
const LINE_TWO = ["We", "transform."];

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
  const x = Math.cos(lat) * Math.sin(lng);
  const y = Math.sin(lat);
  const z = Math.cos(lat) * Math.cos(lng);
  // rotate Y
  const x1 = x * Math.cos(rotY) + z * Math.sin(rotY);
  const z1 = -x * Math.sin(rotY) + z * Math.cos(rotY);
  // rotate X
  const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
  const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
  return { x: x1 * R, y: -y2 * R, z: z2, visible: z2 > -0.1 };
}

// Point along a lifted great-circle-ish arc between two sphere dots
function arcPoint(
  p1: SphereDot,
  p2: SphereDot,
  t: number,
  rotY: number,
  rotX: number,
  R: number,
  CX: number,
  CY: number
) {
  const lat = p1.lat + (p2.lat - p1.lat) * t;
  const lng = p1.lng + (p2.lng - p1.lng) * t;
  const lift = Math.sin(t * Math.PI) * 0.18;
  const pr = project3D(lat, lng, rotY, rotX, R);
  return {
    sx: CX + pr.x,
    sy: CY + pr.y - lift * R * 0.3,
    z: pr.z,
    visible: pr.visible,
  };
}

// Resolve a city node's base accent: card-linked nodes match their tether,
// a few others are sprinkled green/gold, the rest stay blue.
function cityBaseColor(di: number): string {
  const ci = CARD_NODE.indexOf(di);
  if (ci >= 0) return CARD_ACCENT[ci];
  return CITY_COLOR[di] ?? ACCENT.blue;
}

const qbez = (a: number, b: number, c: number, t: number) =>
  (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c;

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

type HoverRef = React.MutableRefObject<number | null>;

// ─── Globe Canvas ────────────────────────────────────────────────────────────
function GlobeCanvas({ hoverRef }: { hoverRef: HoverRef }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rotState = useRef({ rotY: 0, rotX: 0.3, targetRotY: 0, targetRotX: 0.3 });
  const arcProgress = useRef(0);
  const pingPhase = useRef(0);
  const packetPhase = useRef(0);
  const textPhase = useRef(0);
  const ringAngles = useRef(ORBITAL_RINGS.map((r) => r.phase));
  // smooth mouse-parallax tilt
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  // expanding energy shockwaves emitted from the planet (auto + on click)
  const shockwaves = useRef<{ r: number; max: number; color: string; life: number }[]>([]);
  const autoPulse = useRef(0);
  // comet riding an outer orbit, leaving a glowing trail
  const comet = useRef({ angle: Math.PI * 0.3, trail: [] as { x: number; y: number }[] });
  // deep twinkling starfield behind the globe
  const stars = useRef<{ x: number; y: number; r: number; tw: number; sp: number; c: string }[]>([]);

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

    const STAR_COLORS = [ACCENT.blue, ACCENT.blue, ACCENT.blue, ACCENT.green, ACCENT.gold, "199,222,255"];
    function buildStars() {
      const count = Math.round((canvas!.width * canvas!.height) / 14000);
      stars.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.1 + 0.3,
        tw: Math.random() * Math.PI * 2,
        sp: Math.random() * 0.04 + 0.01,
        c: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
      }));
    }

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      canvas!.width = rect.width;
      canvas!.height = rect.height;
      CX = canvas!.width / 2;
      CY = canvas!.height / 2;
      R = Math.min(canvas!.width, canvas!.height) * 0.36;
      buildStars();
    }
    resize();
    window.addEventListener("resize", resize);

    // Click anywhere on the globe to emit an energy shockwave
    const onPulse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const dx = e.clientX - (rect.left + CX);
      const dy = e.clientY - (rect.top + CY);
      // only fire when the click lands on/near the planet
      if (Math.hypot(dx, dy) > R * 1.25) return;
      shockwaves.current.push({ r: R * 0.6, max: R * 2.6, color: ACCENT.blue, life: 1 });
      shockwaves.current.push({ r: R * 0.4, max: R * 2.1, color: ACCENT.green, life: 1 });
    };
    canvas.addEventListener("click", onPulse);

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
      rotState.current.targetRotX = clamp(
        rotState.current.targetRotX + dy * 0.005,
        -0.8,
        0.8
      );
      lastMouse.current = { x: e.clientX, y: e.clientY };
    };

    // Parallax: globe leans toward cursor anywhere over the hero
    const onParallax = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      parallax.current.tx = clamp(
        (e.clientX - (rect.left + rect.width / 2)) / rect.width,
        -1.4,
        1.4
      );
      parallax.current.ty = clamp(
        (e.clientY - (rect.top + rect.height / 2)) / rect.height,
        -1.4,
        1.4
      );
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousemove", onParallax);

    function drawArcBetween(
      p1: SphereDot,
      p2: SphereDot,
      progress: number,
      alpha: number,
      rotY: number,
      rotX: number,
      bright: boolean
    ) {
      const steps = 40;
      const pts: { sx: number; sy: number }[] = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const ap = arcPoint(p1, p2, t, rotY, rotX, R, CX, CY);
        if (ap.visible) pts.push({ sx: ap.sx, sy: ap.sy });
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
      ctx!.strokeStyle = bright
        ? `rgba(147,197,253,${Math.min(0.9, alpha + 0.4)})`
        : `rgba(30,107,255,${alpha})`;
      ctx!.lineWidth = bright ? 1.8 : 1;
      ctx!.stroke();
    }

    // Ribbon of brand text wrapping the globe, scrolling right → left
    function drawOrbitingText(rotX: number) {
      const text = "NAVYA  ED  TECH   ✦   ";
      const anglePerChar = 0.155;
      const total = Math.round((Math.PI * 2) / anglePerChar);
      const Rt = R * 1.09;
      const lat = -0.14; // band sits just below the equator
      ctx!.font = `700 ${Math.max(14, R * 0.11)}px 'JetBrains Mono', monospace`;
      ctx!.textAlign = "center";
      ctx!.textBaseline = "middle";
      for (let i = 0; i < total; i++) {
        const ch = text[i % text.length];
        if (ch === " ") continue;
        const lng = i * anglePerChar - textPhase.current;
        const p = project3D(lat, lng, 0, rotX, Rt);
        if (!p.visible) continue;
        // tangent (so glyphs follow the curve of the ring)
        const p2 = project3D(lat, lng + 0.012, 0, rotX, Rt);
        const ang = Math.atan2(p2.y - p.y, p2.x - p.x);
        const depth = (p.z + 1) / 2;
        const alpha = 0.12 + depth * 0.72;
        const accent = ch === "✦";
        ctx!.save();
        ctx!.translate(CX + p.x, CY + p.y);
        ctx!.rotate(ang);
        if (depth > 0.55) {
          ctx!.shadowColor = accent ? "rgba(245,200,70,0.7)" : "rgba(30,107,255,0.7)";
          ctx!.shadowBlur = 8;
        }
        ctx!.fillStyle = accent
          ? `rgba(245,200,70,${alpha})`
          : `rgba(${depth > 0.7 ? "199,222,255" : "120,160,230"},${alpha})`;
        ctx!.fillText(ch, 0, 0);
        ctx!.restore();
      }
      ctx!.shadowBlur = 0;
    }

    function frame() {
      const { rotY, rotX, targetRotY, targetRotX } = rotState.current;
      rotState.current.rotY = rotY + (targetRotY - rotY) * 0.05;
      rotState.current.rotX = rotX + (targetRotX - rotX) * 0.05;
      if (!isDragging.current) rotState.current.targetRotY += 0.004;

      // ease parallax
      parallax.current.x += (parallax.current.tx - parallax.current.x) * 0.06;
      parallax.current.y += (parallax.current.ty - parallax.current.y) * 0.06;
      const drawRotY = rotState.current.rotY + parallax.current.x * 0.5;
      const drawRotX = clamp(rotState.current.rotX - parallax.current.y * 0.4, -0.95, 0.95);

      arcProgress.current = Math.min(1, arcProgress.current + 0.005);
      pingPhase.current += 0.04;
      packetPhase.current = (packetPhase.current + 0.0045) % 1;
      textPhase.current += 0.004; // matches the globe's auto-rotation speed
      ringAngles.current = ringAngles.current.map((a, i) => a + ORBITAL_RINGS[i].speed);

      // Auto-emit a gentle energy pulse every ~5s so the planet always feels alive
      autoPulse.current += 1;
      if (autoPulse.current > 300) {
        autoPulse.current = 0;
        shockwaves.current.push({ r: R * 0.55, max: R * 2.4, color: ACCENT.blue, life: 1 });
      }
      // Advance shockwaves & drop dead ones
      shockwaves.current.forEach((s) => {
        s.r += (s.max - s.r) * 0.022 + 0.6;
        s.life = clamp(1 - (s.r - R * 0.4) / (s.max - R * 0.4), 0, 1);
      });
      shockwaves.current = shockwaves.current.filter((s) => s.life > 0.01);

      // Advance the comet around an outer, tilted orbit + record its trail
      comet.current.angle += 0.011;

      const hovered = hoverRef.current;
      const hoverCity = hovered != null ? CARD_NODE[hovered] : -1;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Deep twinkling starfield (drawn first, sits behind the planet)
      stars.current.forEach((s) => {
        s.tw += s.sp;
        const tw = (Math.sin(s.tw) + 1) / 2;
        const a = 0.15 + tw * 0.55;
        if (tw > 0.85) {
          ctx!.fillStyle = `rgba(${s.c},${a * 0.4})`;
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 2.4, 0, Math.PI * 2);
          ctx!.fill();
        }
        ctx!.fillStyle = `rgba(${s.c},${a})`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fill();
      });

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

      // Atmospheric Fresnel rim — a luminous halo hugging the planet's edge
      const atmo = ctx!.createRadialGradient(CX, CY, R * 0.82, CX, CY, R * 1.16);
      atmo.addColorStop(0, "transparent");
      atmo.addColorStop(0.72, "rgba(56,189,248,0.05)");
      atmo.addColorStop(0.9, "rgba(56,189,248,0.28)");
      atmo.addColorStop(1, "transparent");
      ctx!.fillStyle = atmo;
      ctx!.beginPath();
      ctx!.arc(CX, CY, R * 1.16, 0, Math.PI * 2);
      ctx!.fill();

      // Energy shockwaves rippling outward from the planet
      shockwaves.current.forEach((s) => {
        ctx!.beginPath();
        ctx!.arc(CX, CY, s.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${s.color},${s.life * 0.5})`;
        ctx!.lineWidth = 1 + s.life * 2;
        ctx!.stroke();
        // soft inner echo
        ctx!.beginPath();
        ctx!.arc(CX, CY, s.r * 0.92, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${s.color},${s.life * 0.18})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      });

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
          ctx!.fillStyle = `rgba(${ring.dot},${0.15 * dotAlpha})`;
          ctx!.fill();
        }
        ctx!.beginPath();
        ctx!.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ring.dot},${0.9 * dotAlpha})`;
        ctx!.fill();
        ctx!.restore();
      });

      // Grid dots
      GRID_DOTS.forEach((d) => {
        const p = project3D(d.lat, d.lng, drawRotY, drawRotX, R);
        if (!p.visible) return;
        const alpha = ((p.z + 1) / 2) * 0.4;
        ctx!.beginPath();
        ctx!.arc(CX + p.x, CY + p.y, 1, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(30,107,255,${alpha})`;
        ctx!.fill();
      });

      // Connection arcs + traveling data packets
      CONNECTIONS.forEach(([i, j], ci) => {
        const delay = ci * 0.08;
        const prog = clamp((arcProgress.current - delay) / 0.8, 0, 1);
        if (prog <= 0) return;
        const bright = hoverCity === i || hoverCity === j;
        drawArcBetween(CITY_DOTS[i], CITY_DOTS[j], prog, 0.35, drawRotY, drawRotX, bright);

        if (prog > 0.95) {
          const pt = (packetPhase.current + ci * 0.17) % 1;
          const ap = arcPoint(CITY_DOTS[i], CITY_DOTS[j], pt, drawRotY, drawRotX, R, CX, CY);
          if (ap.visible && ap.z > -0.05) {
            // packet takes on the colour of the node it's heading toward
            const pkt = cityBaseColor(j);
            const pg = ctx!.createRadialGradient(ap.sx, ap.sy, 0, ap.sx, ap.sy, 6);
            pg.addColorStop(0, `rgba(${pkt},${bright ? 0.95 : 0.85})`);
            pg.addColorStop(1, "transparent");
            ctx!.fillStyle = pg;
            ctx!.beginPath();
            ctx!.arc(ap.sx, ap.sy, 6, 0, Math.PI * 2);
            ctx!.fill();
            ctx!.beginPath();
            ctx!.arc(ap.sx, ap.sy, 1.6, 0, Math.PI * 2);
            ctx!.fillStyle = "#ffffff";
            ctx!.fill();
          }
        }
      });

      // City dots + pings
      CITY_DOTS.forEach((d, di) => {
        const p = project3D(d.lat, d.lng, drawRotY, drawRotX, R);
        if (!p.visible) return;
        const isHover = di === hoverCity;
        const accent = cityBaseColor(di);
        const sz = (p.z > 0.3 ? 4 : 2.5) * (isHover ? 1.6 : 1);
        const alpha = (p.z + 1) / 2;
        const pingT = (pingPhase.current - di * 0.4) % (Math.PI * 2);
        if (pingT > 0 && pingT < Math.PI && p.z > 0.2) {
          const pr = sz + pingT * 10;
          const pa = (1 - pingT / Math.PI) * 0.4;
          ctx!.beginPath();
          ctx!.arc(CX + p.x, CY + p.y, pr, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${accent},${pa})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
        // Hover burst ring
        if (isHover && p.z > -0.05) {
          const burst = (Math.sin(pingPhase.current * 1.6) + 1) / 2;
          ctx!.beginPath();
          ctx!.arc(CX + p.x, CY + p.y, sz + 6 + burst * 9, 0, Math.PI * 2);
          ctx!.strokeStyle = `rgba(${accent},${0.6 * (1 - burst)})`;
          ctx!.lineWidth = 1.5;
          ctx!.stroke();
        }
        // Halo
        ctx!.beginPath();
        ctx!.arc(CX + p.x, CY + p.y, sz + 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${accent},${alpha * (isHover ? 0.4 : 0.15)})`;
        ctx!.fill();
        // Core
        ctx!.beginPath();
        ctx!.arc(CX + p.x, CY + p.y, sz, 0, Math.PI * 2);
        ctx!.fillStyle = isHover ? `rgba(255,255,255,${alpha})` : `rgba(${accent},${alpha})`;
        ctx!.fill();
      });

      // Equator glow
      const eqPts: { x: number; y: number }[] = [];
      for (let i = 0; i <= 60; i++) {
        const lng = (i / 60) * Math.PI * 2 - Math.PI;
        const p = project3D(0, lng, drawRotY, drawRotX, R);
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

      // Comet sweeping a wide tilted orbit, dragging a glowing tail
      {
        const cr = R * 1.55;
        const tilt = 0.55;
        const a = comet.current.angle;
        const cxp = CX + cr * Math.cos(a);
        const cyp = CY + cr * Math.sin(a) * Math.abs(Math.sin(tilt + Math.PI / 2));
        comet.current.trail.unshift({ x: cxp, y: cyp });
        if (comet.current.trail.length > 22) comet.current.trail.pop();
        // tail
        comet.current.trail.forEach((p, idx) => {
          const f = 1 - idx / comet.current.trail.length;
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 2.4 * f, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(245,200,70,${f * 0.5})`;
          ctx!.fill();
        });
        // head glow + core
        const hg = ctx!.createRadialGradient(cxp, cyp, 0, cxp, cyp, 9);
        hg.addColorStop(0, "rgba(255,236,170,0.95)");
        hg.addColorStop(1, "transparent");
        ctx!.fillStyle = hg;
        ctx!.beginPath();
        ctx!.arc(cxp, cyp, 9, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.fillStyle = "#fff";
        ctx!.beginPath();
        ctx!.arc(cxp, cyp, 2, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Brand ribbon orbiting the globe (drawn last so front glyphs sit on top)
      drawOrbitingText(drawRotX);

      animId = requestAnimationFrame(frame);
    }
    frame();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("click", onPulse);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", onParallax);
    };
  }, [hoverRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] w-full h-full cursor-grab active:cursor-grabbing"
    />
  );
}

// ─── Connector Canvas ─────────────────────────────────────────────────────────
// Tethers each floating card to the globe surface with a flowing beam + light pulse
function ConnectorCanvas({
  containerRef,
  cardRefs,
  hoverRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  hoverRef: HoverRef;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    function resize() {
      const r = container!.getBoundingClientRect();
      canvas!.width = r.width;
      canvas!.height = r.height;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      const w = canvas!.width, h = canvas!.height;
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.36;
      const cr = container!.getBoundingClientRect();
      t += 0.014;
      ctx!.clearRect(0, 0, w, h);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = r.left - cr.left + r.width / 2;
        const y = r.top - cr.top + r.height / 2;
        const dx = x - cx, dy = y - cy;
        const d = Math.hypot(dx, dy) || 1;
        // endpoint resting on the globe surface, facing the card
        const ex = cx + (dx / d) * R * 0.94;
        const ey = cy + (dy / d) * R * 0.94;
        // perpendicular bow for a gentle curve
        const mx = (x + ex) / 2, my = (y + ey) / 2;
        const nx = -dy / d, ny = dx / d;
        const bow = Math.min(38, d * 0.16);
        const ctrlx = mx + nx * bow, ctrly = my + ny * bow;

        const hovered = hoverRef.current === i;
        const accent = CARD_ACCENT[i] ?? ACCENT.blue;

        // flowing dashed beam
        ctx!.beginPath();
        ctx!.moveTo(x, y);
        ctx!.quadraticCurveTo(ctrlx, ctrly, ex, ey);
        ctx!.strokeStyle = `rgba(${accent},${hovered ? 0.7 : 0.24})`;
        ctx!.lineWidth = hovered ? 1.8 : 1;
        ctx!.setLineDash([4, 7]);
        ctx!.lineDashOffset = -t * 26;
        ctx!.stroke();
        ctx!.setLineDash([]);

        // node where the beam meets the globe
        ctx!.beginPath();
        ctx!.arc(ex, ey, hovered ? 3.6 : 2.4, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${accent},${hovered ? 0.95 : 0.7})`;
        ctx!.fill();

        // light pulse traveling card → globe
        const speed = hovered ? 0.9 : 0.45;
        const pt = (t * speed + i * 0.25) % 1;
        const bx = qbez(x, ctrlx, ex, pt);
        const by = qbez(y, ctrly, ey, pt);
        const glow = ctx!.createRadialGradient(bx, by, 0, bx, by, 7);
        glow.addColorStop(0, `rgba(${accent},${hovered ? 0.95 : 0.75})`);
        glow.addColorStop(1, "transparent");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(bx, by, 7, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.beginPath();
        ctx!.arc(bx, by, 1.8, 0, Math.PI * 2);
        ctx!.fillStyle = "#ffffff";
        ctx!.fill();

        // anchor dot on the card
        ctx!.beginPath();
        ctx!.arc(x, y, hovered ? 3 : 2, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${accent},${hovered ? 0.9 : 0.5})`;
        ctx!.fill();
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [containerRef, cardRefs, hoverRef]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-20 w-full h-full pointer-events-none" />;
}

// ─── Service Card (3D cursor tilt + spotlight) ────────────────────────────────
function ServiceCardItem({
  card,
  index,
  hoverRef,
  registerRef,
}: {
  card: ServiceCard;
  index: number;
  hoverRef: HoverRef;
  registerRef: (el: HTMLDivElement | null) => void;
}) {
  const Icon = card.icon;
  const accent = CARD_ACCENT[index] ?? ACCENT.blue;
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const inner = innerRef.current;
    if (!inner) return;
    const r = inner.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * 14;
    const ry = (px - 0.5) * 16;
    inner.style.transform = `perspective(620px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(120px circle at ${px * 100}% ${py * 100}%, rgba(96,165,250,0.22), transparent 70%)`;
      glowRef.current.style.opacity = "1";
    }
  };

  const handleEnter = () => { hoverRef.current = index; };
  const handleLeave = () => {
    hoverRef.current = null;
    const inner = innerRef.current;
    if (inner) inner.style.transform = "perspective(620px) rotateX(0deg) rotateY(0deg) scale(1)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div
      ref={registerRef}
      initial={{ opacity: 0, scale: 0.85, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easeEntrance, delay: 2.1 + index * 0.25 }}
      data-cursor="hover"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`group absolute ${card.style} z-30 w-[116px] sm:w-[172px] origin-center cursor-pointer`}
      style={{ animation: `svcFloat${card.float} ${card.dur}s ease-in-out infinite ${2.6 + index * 0.25}s` }}
    >
      <div
        ref={innerRef}
        className="relative overflow-hidden rounded-2xl border border-[rgba(30,107,255,0.22)] bg-[rgba(13,22,40,0.82)] px-2.5 py-2 sm:px-3.5 sm:py-3 backdrop-blur-md transition-[transform,border-color,box-shadow] duration-200 ease-out group-hover:border-[rgba(30,107,255,0.55)] group-hover:shadow-[0_12px_40px_-12px_rgba(30,107,255,0.5)]"
        style={{ transform: "perspective(620px)", transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* cursor-tracking spotlight */}
        <span ref={glowRef} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200" />
        {/* sweep glow on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(30,107,255,0.14)] to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        {/* top accent line */}
        <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-[#1E6BFF]/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative flex items-center gap-2 sm:gap-2.5">
          <span
            className="relative flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1E6BFF]/30 to-[#0EA5E9]/10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6"
            style={{ color: `rgb(${accent})`, boxShadow: `inset 0 0 0 1px rgba(${accent},0.4)` }}
          >
            <span className="absolute inset-0 rounded-lg sm:rounded-xl blur-md opacity-60" style={{ background: `rgba(${accent},0.25)` }} />
            <Icon size={14} strokeWidth={1.75} className="relative z-10 sm:hidden" />
            <Icon size={17} strokeWidth={1.75} className="relative z-10 hidden sm:block" />
          </span>
          <p
            className="text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.16em]"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: `rgb(${accent})` }}
          >
            {card.tag}
          </p>
        </div>

        <p className="relative mt-2 sm:mt-2.5 text-[0.78rem] sm:text-[0.95rem] font-bold leading-tight text-white">
          {card.title}
        </p>
        <p className="relative mt-0.5 text-[9px] sm:text-[10px] leading-snug text-[#A1A1AA]">
          {card.sub}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Globe Stage (globe + connectors + cards share refs) ──────────────────────
function GlobeStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverRef = useRef<number | null>(null);

  return (
    <div ref={containerRef} className="relative h-[380px] sm:h-[440px] lg:h-[520px]">
      <GlobeCanvas hoverRef={hoverRef} />
      <ConnectorCanvas containerRef={containerRef} cardRefs={cardRefs} hoverRef={hoverRef} />

      {SERVICE_CARDS.map((card, i) => (
        <ServiceCardItem
          key={card.title}
          card={card}
          index={i}
          hoverRef={hoverRef}
          registerRef={(el) => (cardRefs.current[i] = el)}
        />
      ))}
    </div>
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
            transition={{ duration: 0.4, ease: easeEntrance, delay: 0.1 }}
            className="relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[rgba(30,107,255,0.3)] bg-[rgba(30,107,255,0.06)] px-4 py-1.5"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "#93c5fd" }}
          >
            {/* periodic light sweep across the badge */}
            <span
              className="pointer-events-none absolute inset-y-0 -left-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-[rgba(147,197,253,0.25)] to-transparent"
              style={{ animation: "badgeSweep 4.5s ease-in-out 1.4s infinite" }}
            />
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1E6BFF] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1E6BFF]" />
            </span>
            Web Development · Systems · Social Media
          </motion.div>

          {/* Headline — word-by-word blur reveal + animated gradient accent */}
          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="show"
            className="mt-6 text-white leading-[1.04] tracking-tight"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(2.4rem, 4.5vw, 4.2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}
          >
            <span className="block">
              {LINE_ONE.map((w, i) => (
                <motion.span key={i} variants={headlineWord} className="inline-block" style={{ willChange: "transform, filter" }}>
                  {w}
                  {i < LINE_ONE.length - 1 && " "}
                </motion.span>
              ))}
            </span>
            <span className="relative inline-block">
              {LINE_TWO.map((w, i) => (
                <motion.span
                  key={i}
                  variants={headlineWord}
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    willChange: "transform, filter",
                    backgroundImage: "linear-gradient(100deg,#1E6BFF 0%,#60A5FA 30%,#93C5FD 50%,#60A5FA 70%,#1E6BFF 100%)",
                    backgroundSize: "220% 100%",
                    animation: "heroGradient 6s ease-in-out infinite",
                  }}
                >
                  {w}
                  {i < LINE_TWO.length - 1 && " "}
                </motion.span>
              ))}
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                style={{ background: "linear-gradient(90deg, #1E6BFF, #60A5FA, #93C5FD)" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.5, ease: easeEntrance, delay: 0.7 }}
              />
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeEntrance, delay: 0.35 }}
            className="mt-6 text-lg font-semibold text-white"
          >
            Digital solutions designed after understanding your business.
          </motion.p>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeEntrance, delay: 0.45 }}
            className="mt-3 text-sm leading-relaxed text-[#A1A1AA] max-w-[440px]"
          >
            We study your business, market, competitors, and growth possibilities — then build
            high-performance websites, business systems, and social media that scale your brand.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeEntrance, delay: 0.55 }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              onClick={() => navigate("/contact")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="group relative overflow-hidden px-7 py-3.5 rounded-lg bg-[#1E6BFF] text-[#0A1628] text-sm font-bold tracking-wide hover:shadow-[0_8px_30px_rgba(30,107,255,0.4)]"
            >
              {/* shine sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative inline-flex items-center gap-1.5">
                Let&apos;s Build Together
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </motion.button>
            <motion.button
              onClick={() => navigate("/services")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="px-7 py-3.5 rounded-lg border border-[#1E293B] bg-transparent text-white text-sm font-semibold transition-colors hover:border-[rgba(30,107,255,0.5)] hover:bg-[rgba(30,107,255,0.06)]"
            >
              View Our Services
            </motion.button>
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Globe + tethered service cards ── */}
        <GlobeStage />
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
        @keyframes heroGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes badgeSweep {
          0% { transform: translateX(0) skewX(-12deg); }
          45%, 100% { transform: translateX(420%) skewX(-12deg); }
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
          [class*="svcFloat"], [style*="svcFloat"],
          [style*="heroGradient"], [style*="badgeSweep"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
