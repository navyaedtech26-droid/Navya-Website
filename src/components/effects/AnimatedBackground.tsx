// Light-theme ambient backdrop. The professional redesign favours a calm white
// canvas, so this is deliberately restrained: a paper base, a single soft brand
// wash and a faint blueprint grid that fades out. No dark orbs, beams or noise.
// Most sections paint their own opaque light background on top of this; it only
// shows through where a surface is intentionally transparent.
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-paper">
      {/* Faint blueprint grid, masked so it dissolves toward the edges */}
      <div className="absolute inset-0 light-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]" />

      {/* Single restrained brand wash */}
      <div className="absolute inset-0 bg-hero-wash" />
    </div>
  );
}
