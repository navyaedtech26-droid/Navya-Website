import { Suspense, lazy } from "react";

// three.js (~600 KB) is the single heaviest dependency in the app and it is
// only ever used by the hero backdrop on secondary pages. Pulling LightPillar
// in with React.lazy moves the WebGL renderer + shader into its own async
// chunk, so it is fetched *after* first paint (and only on pages that mount a
// hero) instead of riding along in the eager public bundle.
const LightPillar = lazy(() => import("@/components/LightPillar"));

/**
 * Static brand glow that echoes the pillar's shape without any WebGL context
 * or rAF loop. Used both as the Suspense fallback (while the three.js chunk
 * streams in) and as the standalone backdrop for reduced-motion visitors, so
 * the two render identically and there is no jarring swap.
 */
export function HeroGlow() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(55% 45% at 50% 0%, rgba(245, 166, 35,0.30), transparent 70%), radial-gradient(45% 60% at 50% 100%, rgba(255, 122, 89,0.18), transparent 72%)",
      }}
    />
  );
}

interface HeroPillarProps {
  /** Render budget for the shader; gated by device capability upstream. */
  quality: "high" | "medium" | "low";
}

/**
 * The animated WebGL hero backdrop, lazy-loaded. The CSS gradient fallback
 * keeps the hero looking complete during the chunk fetch and on devices that
 * never resolve it (e.g. flaky networks), and the canvas fades in over it.
 */
export default function HeroPillar({ quality }: HeroPillarProps) {
  return (
    <Suspense fallback={<HeroGlow />}>
      <LightPillar
        topColor="#F5A623"
        bottomColor="#FF7A59"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality={quality}
      />
    </Suspense>
  );
}
