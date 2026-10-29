/**
 * True only for the very first paint of a page that booted from prerendered
 * markup (scripts/prerender.mjs bakes static HTML; main.tsx hydrates it — see
 * both for context). Components that play a mount-in entrance animation
 * (framer-motion `initial` → `animate`) must skip that transition on this
 * exact first commit: their `initial` style never matches what's already in
 * the DOM, since the prerendered snapshot captures the settled `animate`
 * state, not the pre-animation one. Replaying it anyway is a hydration
 * mismatch that, for chrome rendered outside the route `<Suspense>` boundary
 * (e.g. Navbar), discards the entire prerendered tree and forces a
 * full client re-render (React error #418/#423).
 *
 * Any later mount — a client-side route navigation, or a plain dev/CSR load
 * with no prerendered markup at all — gets the normal entrance animation.
 */
const wasPrerendered =
  typeof document !== "undefined" &&
  !!document.getElementById("root")?.hasChildNodes();

let firstPaintSettled = !wasPrerendered;

if (wasPrerendered && typeof requestAnimationFrame === "function") {
  requestAnimationFrame(() => {
    firstPaintSettled = true;
  });
}

/**
 * Read once per component instance, e.g. `const [skip] = useState(skipEnterAnimation)`.
 * The lazy `useState` initializer runs exactly once at mount, capturing whether
 * this instance is part of the initial hydration commit — the value it
 * returns is then fixed for that instance's lifetime.
 */
export function skipEnterAnimation(): boolean {
  return !firstPaintSettled;
}
