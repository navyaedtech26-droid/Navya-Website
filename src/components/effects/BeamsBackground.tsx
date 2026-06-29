import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useMediaQuery";

interface BeamsBackgroundProps {
  className?: string;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

const MINIMUM_BEAMS = 20;

const opacityMap = {
  subtle: 0.7,
  medium: 0.85,
  strong: 1,
} as const;

/**
 * Static stand-ins for the animated beams, shown to reduced-motion visitors.
 * Same diagonal angle and coral→amber hue ramp as the canvas, just frozen.
 */
const STATIC_BEAMS = [
  { left: "8%", hue: 16, width: 90, opacity: 0.22 },
  { left: "27%", hue: 24, width: 130, opacity: 0.18 },
  { left: "47%", hue: 32, width: 110, opacity: 0.26 },
  { left: "66%", hue: 40, width: 150, opacity: 0.16 },
  { left: "85%", hue: 46, width: 100, opacity: 0.2 },
] as const;

function createBeam(width: number, height: number): Beam {
  const angle = -35 + Math.random() * 10;
  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    // Brand-tuned hue range: warm coral → amber, matching the site palette.
    hue: 14 + Math.random() * 34,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

/**
 * Animated light-beam canvas backdrop. Renders as an absolute fill, so drop it
 * behind hero/section content (it sets its own dark base). Sizes itself to its
 * parent box — not the window — so it can live inside a contained section.
 * Reduced-motion visitors get a static brand glow with no canvas or rAF loop.
 */
export default function BeamsBackground({
  className,
  intensity = "medium",
}: BeamsBackgroundProps) {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Logical (CSS-pixel) canvas dimensions, kept in sync via updateCanvasSize.
    let cssWidth = 0;
    let cssHeight = 0;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      cssWidth = rect.width || window.innerWidth;
      cssHeight = rect.height || window.innerHeight;

      canvas.width = cssWidth * dpr;
      canvas.height = cssHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const totalBeams = Math.floor(MINIMUM_BEAMS * 1.5);
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(cssWidth, cssHeight)
      );
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      const column = index % 3;
      const spacing = cssWidth / 3;

      beam.y = cssHeight + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 14 + (index * 34) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function drawBeam(context: CanvasRenderingContext2D, beam: Beam) {
      context.save();
      context.translate(beam.x, beam.y);
      context.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const gradient = context.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
      gradient.addColorStop(0.1, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.4, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`);
      gradient.addColorStop(0.9, `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

      context.fillStyle = gradient;
      context.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      context.restore();
    }

    function animate() {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.filter = "blur(35px)";

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [intensity, reduced]);

  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden bg-bg-deep", className)}
    >
      {reduced ? (
        // Static beam streaks — no canvas/rAF, battery- and a11y-friendly,
        // but still echoes the animated design instead of a plain glow.
        <div className="absolute inset-0" style={{ filter: "blur(38px)" }}>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(55% 45% at 50% 0%, rgba(245, 166, 35,0.22), transparent 70%)",
            }}
          />
          {STATIC_BEAMS.map((beam) => (
            <div
              key={beam.left}
              className="absolute"
              style={{
                top: "-30%",
                left: beam.left,
                width: `${beam.width}px`,
                height: "160%",
                transform: "rotate(-30deg)",
                transformOrigin: "center",
                background: `linear-gradient(to bottom, hsla(${beam.hue}, 85%, 65%, 0) 0%, hsla(${beam.hue}, 85%, 65%, ${
                  beam.opacity * 0.6
                }) 20%, hsla(${beam.hue}, 85%, 65%, ${beam.opacity}) 50%, hsla(${
                  beam.hue
                }, 85%, 65%, ${beam.opacity * 0.6}) 80%, hsla(${beam.hue}, 85%, 65%, 0) 100%)`,
              }}
            />
          ))}
        </div>
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ filter: "blur(15px)" }}
          />
          <motion.div
            className="absolute inset-0 bg-bg-deep/5"
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
            }}
            style={{ backdropFilter: "blur(50px)" }}
          />
        </>
      )}
    </div>
  );
}
