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
  CITIES,
  CONNECTIONS,
  ORBITAL_RINGS,
  type HoverRef,
  type SphereDot,
} from "@/components/home/hero/data";
import {
  arcPoint,
  buildGridDots,
  cityBaseColor,
  clamp,
  project3D,
  qbez,
} from "@/components/home/hero/globeMath";

/**
 * Drives the hand-rolled canvas globe: lat/long dot grid, orbital rings, city
 * nodes, connection arcs + data packets, a starfield, shockwaves, a comet and
 * the orbiting brand ribbon. Returns the canvas ref to attach. Drag to rotate,
 * click to pulse; the globe leans toward the cursor via parallax.
 */
export function useGlobeCanvas(hoverRef: HoverRef) {
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

  return canvasRef;
}

/**
 * Tethers each floating service card to the globe surface with a flowing dashed
 * beam, a light pulse travelling card → globe, and anchor nodes at each end.
 * Returns the canvas ref to attach (it sits above the globe, pointer-events off).
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

  return canvasRef;
}
