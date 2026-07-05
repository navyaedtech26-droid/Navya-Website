import {
  useEffect,
  useRef,
  type MutableRefObject,
  type RefObject,
} from "react";
import {
  ACCENT,
  CARD_ACCENT,
  CARD_NODE,
  GROWTH_RINGS,
  ORBITAL_RINGS,
  type HoverRef,
} from "@/components/home/hero/data";
import {
  clamp,
  easeInCubic,
  easeOutCubic,
  qbez,
} from "@/components/home/hero/globeMath";

// Grow → hold → retract → rest, in seconds — one full "renewal" cycle.
const CYCLE = { grow: 3.2, hold: 2.2, retract: 2.4, rest: 1.2 };
const CYCLE_TOTAL = CYCLE.grow + CYCLE.hold + CYCLE.retract + CYCLE.rest;

/** Maps elapsed time within a cycle to a 0→1→0 "bloom" amount (grows, holds, retracts, rests). */
function bloomAt(t: number): number {
  if (t < CYCLE.grow) return easeOutCubic(t / CYCLE.grow);
  if (t < CYCLE.grow + CYCLE.hold) return 1;
  if (t < CYCLE.grow + CYCLE.hold + CYCLE.retract) {
    const p = (t - CYCLE.grow - CYCLE.hold) / CYCLE.retract;
    return 1 - easeInCubic(p);
  }
  return 0;
}

/**
 * Drives the hero's growth-pulse canvas: a seed (the Navya mark, rendered as
 * an HTML element on top) that continuously blooms into concentric rings of
 * connected nodes, then dissolves back to the seed and renews — plus a
 * twinkling starfield, energy shockwaves, and a slow decorative outer halo.
 * Click near the center to fire an extra pulse; the structure leans gently
 * toward the cursor.
 */
export function useGlobeCanvas(hoverRef: HoverRef) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cycleT = useRef(0);
  const prevCycleT = useRef(0);
  const ringAngle = useRef(GROWTH_RINGS.map(() => 0));
  const pingPhase = useRef(0);
  const packetPhase = useRef(0);
  const haloAngles = useRef(ORBITAL_RINGS.map((r) => r.phase));
  const parallax = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const shockwaves = useRef<{ r: number; max: number; color: string; life: number }[]>([]);
  const stars = useRef<{ x: number; y: number; r: number; tw: number; sp: number; c: string }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let CX = 0, CY = 0, R = 0;
    let lastTime = performance.now();

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

    // Click near the seed to fire an extra energy pulse
    const onPulse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      const dx = e.clientX - (rect.left + CX);
      const dy = e.clientY - (rect.top + CY);
      if (Math.hypot(dx, dy) > R * 1.6) return;
      shockwaves.current.push({ r: R * 0.28, max: R * 2.3, color: ACCENT.blue, life: 1 });
      shockwaves.current.push({ r: R * 0.18, max: R * 1.9, color: ACCENT.gold, life: 1 });
    };
    canvas.addEventListener("click", onPulse);

    // Parallax: the structure leans gently toward the cursor anywhere over the hero
    const onParallax = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      parallax.current.tx = clamp((e.clientX - (rect.left + rect.width / 2)) / rect.width, -1, 1);
      parallax.current.ty = clamp((e.clientY - (rect.top + rect.height / 2)) / rect.height, -1, 1);
    };
    window.addEventListener("mousemove", onParallax);

    function nodePos(ringIdx: number, i: number, offX: number, offY: number) {
      const ring = GROWTH_RINGS[ringIdx];
      const angle = (i / ring.count) * Math.PI * 2 + ringAngle.current[ringIdx];
      const rad = R * ring.radiusFactor;
      return { x: CX + offX + Math.cos(angle) * rad, y: CY + offY + Math.sin(angle) * rad };
    }

    function nodeColor(ringIdx: number, i: number): string {
      if (ringIdx === GROWTH_RINGS.length - 1) {
        const ci = CARD_NODE.indexOf(i);
        if (ci >= 0) return CARD_ACCENT[ci];
      }
      const key = ringIdx * 7 + i;
      if (key % 5 === 0) return ACCENT.gold;
      if (key % 4 === 0) return ACCENT.green;
      return ACCENT.blue;
    }

    function frame(now: number) {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      prevCycleT.current = cycleT.current;
      cycleT.current = (cycleT.current + dt) % CYCLE_TOTAL;
      // Auto-emit a pulse each time a new growth cycle begins
      if (cycleT.current < prevCycleT.current) {
        shockwaves.current.push({ r: R * 0.22, max: R * 2.2, color: ACCENT.blue, life: 1 });
      }
      const bloom = bloomAt(cycleT.current);
      const seedPulse = 0.5 + 0.5 * Math.sin(cycleT.current * 2.4);

      ringAngle.current = ringAngle.current.map((a, i) => a + GROWTH_RINGS[i].speed);
      pingPhase.current += 0.04;
      packetPhase.current = (packetPhase.current + 0.006) % 1;
      haloAngles.current = haloAngles.current.map((a, i) => a + ORBITAL_RINGS[i].speed);

      parallax.current.x += (parallax.current.tx - parallax.current.x) * 0.06;
      parallax.current.y += (parallax.current.ty - parallax.current.y) * 0.06;
      const offX = parallax.current.x * R * 0.06;
      const offY = parallax.current.y * R * 0.05;

      shockwaves.current.forEach((s) => {
        s.r += (s.max - s.r) * 0.03 + 0.7;
        s.life = clamp(1 - (s.r - R * 0.2) / (s.max - R * 0.2), 0, 1);
      });
      shockwaves.current = shockwaves.current.filter((s) => s.life > 0.01);

      const hovered = hoverRef.current;
      const hoverNode = hovered != null ? CARD_NODE[hovered] : -1;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Deep twinkling starfield
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

      // Ambient bloom glow
      const grd = ctx!.createRadialGradient(CX + offX, CY + offY, 0, CX + offX, CY + offY, R * 1.6);
      grd.addColorStop(0, "rgba(8,30,77,0.08)");
      grd.addColorStop(1, "transparent");
      ctx!.fillStyle = grd;
      ctx!.beginPath();
      ctx!.arc(CX + offX, CY + offY, R * 1.6, 0, Math.PI * 2);
      ctx!.fill();

      // Seed halo — sits behind the Navya mark (rendered as an HTML element above)
      const rg = ctx!.createRadialGradient(CX + offX, CY + offY, 0, CX + offX, CY + offY, R * 0.55);
      rg.addColorStop(0, `rgba(30,107,255,${0.2 + 0.1 * seedPulse})`);
      rg.addColorStop(0.7, "rgba(30,107,255,0.07)");
      rg.addColorStop(1, "transparent");
      ctx!.fillStyle = rg;
      ctx!.beginPath();
      ctx!.arc(CX + offX, CY + offY, R * 0.55, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.beginPath();
      ctx!.arc(CX + offX, CY + offY, R * 0.44, 0, Math.PI * 2);
      ctx!.strokeStyle = `rgba(8,30,77,${0.25 + 0.1 * seedPulse})`;
      ctx!.lineWidth = 1.5;
      ctx!.stroke();

      // Energy shockwaves rippling outward from the seed
      shockwaves.current.forEach((s) => {
        ctx!.beginPath();
        ctx!.arc(CX + offX, CY + offY, s.r, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(${s.color},${s.life * 0.5})`;
        ctx!.lineWidth = 1 + s.life * 2;
        ctx!.stroke();
      });

      // Decorative outer halo rings, always slowly turning
      ORBITAL_RINGS.forEach((ring, ri) => {
        const angle = haloAngles.current[ri];
        const orbitR = R * 1.72;
        ctx!.save();
        ctx!.translate(CX + offX, CY + offY);
        ctx!.beginPath();
        ctx!.ellipse(0, 0, orbitR, orbitR * Math.abs(Math.sin(ring.tilt + Math.PI / 2)), ring.tilt, 0, Math.PI * 2);
        ctx!.setLineDash(ring.dash);
        ctx!.strokeStyle = ring.color;
        ctx!.lineWidth = 1;
        ctx!.stroke();
        ctx!.setLineDash([]);
        const ex = orbitR * Math.cos(angle);
        const ey = orbitR * Math.abs(Math.sin(ring.tilt + Math.PI / 2)) * Math.sin(angle);
        ctx!.beginPath();
        ctx!.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${ring.dot},0.85)`;
        ctx!.fill();
        ctx!.restore();
      });

      // Growth structure: rings of nodes fading in/out in sequence
      const ringPts: { x: number; y: number }[][] = [];
      GROWTH_RINGS.forEach((ring, ri) => {
        const reveal = clamp((bloom - ring.revealFrom) / ring.revealWindow, 0, 1);
        if (reveal <= 0.001) {
          ringPts.push([]);
          return;
        }
        const pts = Array.from({ length: ring.count }, (_, i) => nodePos(ri, i, offX, offY));
        ringPts.push(pts);

        // radial spokes from the seed
        pts.forEach((p) => {
          ctx!.beginPath();
          ctx!.moveTo(CX + offX, CY + offY);
          ctx!.lineTo(p.x, p.y);
          ctx!.strokeStyle = `rgba(30,107,255,${0.1 * reveal})`;
          ctx!.lineWidth = 1;
          ctx!.stroke();
        });

        // ring polygon connecting adjacent nodes
        ctx!.beginPath();
        pts.forEach((p, i) => (i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y)));
        ctx!.closePath();
        ctx!.strokeStyle = `rgba(30,107,255,${0.18 * reveal})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();

        // nodes
        pts.forEach((p, i) => {
          const isCardNode = ri === GROWTH_RINGS.length - 1 && CARD_NODE.includes(i);
          const isHover = ri === GROWTH_RINGS.length - 1 && i === hoverNode;
          const color = nodeColor(ri, i);
          const baseSize = ring.dotSize * (isHover ? 1.8 : isCardNode ? 1.3 : 1);
          const pingT = (pingPhase.current - i * 0.3 - ri * 0.5) % (Math.PI * 2);

          if (isHover) {
            const burst = (Math.sin(pingPhase.current * 1.6) + 1) / 2;
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, baseSize + 6 + burst * 8, 0, Math.PI * 2);
            ctx!.strokeStyle = `rgba(${color},${0.6 * (1 - burst) * reveal})`;
            ctx!.lineWidth = 1.5;
            ctx!.stroke();
          } else if (pingT > 0 && pingT < Math.PI) {
            const pr = baseSize + pingT * 7;
            const pa = (1 - pingT / Math.PI) * 0.35 * reveal;
            ctx!.beginPath();
            ctx!.arc(p.x, p.y, pr, 0, Math.PI * 2);
            ctx!.strokeStyle = `rgba(${color},${pa})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }

          ctx!.beginPath();
          ctx!.arc(p.x, p.y, baseSize + 2.4, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(${color},${(isHover ? 0.4 : 0.16) * reveal})`;
          ctx!.fill();

          ctx!.beginPath();
          ctx!.arc(p.x, p.y, baseSize, 0, Math.PI * 2);
          ctx!.fillStyle = isHover ? `rgba(255,255,255,${reveal})` : `rgba(${color},${reveal})`;
          ctx!.fill();
        });
      });

      // Traveling light packets along fully-bloomed rings
      GROWTH_RINGS.forEach((ring, ri) => {
        const reveal = clamp((bloom - ring.revealFrom) / ring.revealWindow, 0, 1);
        const pts = ringPts[ri];
        if (reveal < 0.9 || !pts.length) return;
        const segF = ((packetPhase.current * 0.6 + ri * 0.23) % 1) * pts.length;
        const segI = Math.floor(segF) % pts.length;
        const localT = segF - Math.floor(segF);
        const a = pts[segI];
        const b = pts[(segI + 1) % pts.length];
        const bx = a.x + (b.x - a.x) * localT;
        const by = a.y + (b.y - a.y) * localT;
        const pg = ctx!.createRadialGradient(bx, by, 0, bx, by, 6);
        pg.addColorStop(0, "rgba(199,222,255,0.9)");
        pg.addColorStop(1, "transparent");
        ctx!.fillStyle = pg;
        ctx!.beginPath();
        ctx!.arc(bx, by, 6, 0, Math.PI * 2);
        ctx!.fill();
      });

      animId = requestAnimationFrame(frame);
    }
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("click", onPulse);
      window.removeEventListener("mousemove", onParallax);
    };
  }, [hoverRef]);

  return canvasRef;
}

/**
 * Tethers each floating service card to the growth structure with a flowing
 * dashed beam, a light pulse travelling card → center, and anchor nodes at
 * each end. Returns the canvas ref to attach (it sits above the growth
 * canvas, pointer-events off).
 */
export function useConnectorCanvas(
  containerRef: RefObject<HTMLDivElement>,
  cardRefs: MutableRefObject<(HTMLDivElement | null)[]>,
  hoverRef: HoverRef
) {
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
        // endpoint resting on the structure's edge, facing the card
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

        // node where the beam meets the structure
        ctx!.beginPath();
        ctx!.arc(ex, ey, hovered ? 3.6 : 2.4, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${accent},${hovered ? 0.95 : 0.7})`;
        ctx!.fill();

        // light pulse traveling card → center
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

  return canvasRef;
}
