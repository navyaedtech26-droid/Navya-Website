/** @type {import('tailwindcss').Config} */

// Deep-neutral ramp — cool, navy-tinted grays (hue matched to brand navy
// #081E4D) instead of generic Tailwind slate. Anchors the "premium" feel:
// neutrals carry a faint brand tint at every step rather than reading as
// off-the-shelf gray. `line`, `faint`, and `heading` below pull from this
// ramp so borders/muted text/headings stay cohesive with one source of truth.
const neutral = {
  50: "#F6F8FB",
  100: "#ECF0F6",
  200: "#DEE3EC",
  300: "#C6CEDC",
  400: "#99A4B8",
  500: "#6E7A90",
  600: "#4A5568",
  700: "#333C52",
  800: "#1E2438",
  900: "#10152A",
  950: "#080B16",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        enterprise: "1320px",
      },
      colors: {
        neutral,
        // Navya EdTech — Navy + Blue base (matches the logo) with a gold accent
        // layer kept for highlight words (text-gradient) and IconBadge icons.
        bg: {
          DEFAULT: "#081E4D", // Primary Navy — matches the logo background exactly
          deep: "#061637", // deeper navy for contrast pockets
          900: "#0B2968", // Secondary Dark — cards, navbars, overlays
        },
        surface: "#1E293B", // Surface Dark — section backgrounds, containers
        brand: {
          DEFAULT: "#1E6BFF", // Brand Blue — primary CTAs, links, logo
          light: "#3B82F6", // Light Blue — hover states, secondary accents
        },
        cyan: {
          // Accent Cyan — icons, highlights, borders
          accent: "#0EA5E9",
        },
        depth: {
          DEFAULT: "#1E3A8A",
          light: "#3B82F6",
        },
        gold: {
          // Gold accent — highlight words + feature icons
          DEFAULT: "#F5A623",
          light: "#FFB84D",
        },
        ink: {
          DEFAULT: "#F8FAFC", // Text Primary
          muted: "#E2E8F0", // Text Secondary
        },

        // ── Professional light system (70-30-10 distribution) ───────────────
        // New semantic palette for the light redesign. Added alongside the
        // legacy dark tokens above so pages not yet migrated keep rendering.
        // Distribution intent: neutrals 70-80%, primary 10-15%, secondary
        // 5-8%, accent 2-5%.
        primary: {
          DEFAULT: "#081E4D", // Logo Navy — exact match to the logo/navbar/footer surface
          light: "#123A6E", // hover / lighter fills
          dark: "#051433", // active / pressed — deeper than the logo navy
        },
        secondary: {
          DEFAULT: "#6366F1", // Indigo — icons, small labels, borders
          dark: "#4F46E5",
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber — highlights, badges, key numbers only
          dark: "#D97706",
        },
        // Neutrals — the 70-80% foundation.
        paper: "#FFFFFF", // page / card background
        mist: "#F8FAFC", // very light gray section background
        haze: "#F1F5F9", // alt light section / subtle fills
        sky: "#EFF6FF", // very light blue (testimonials band)
        line: neutral[200], // borders & dividers
        faint: neutral[600], // secondary / muted text
        heading: neutral[900], // headings & primary body text
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Syne"', "system-ui", "sans-serif"],
        body: ['"Inter"', '"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      transitionDuration: {
        // Named motion-timing tiers — see the "Hover effects & animation
        // timing" section of the design system. Additive alongside the
        // numeric Tailwind scale (duration-200, duration-300, etc.).
        fast: "150ms",
        base: "200ms",
        slow: "300ms",
        // Modals/drawers only — never use on buttons, dropdowns, or tooltips.
        slower: "400ms",
      },
      transitionTimingFunction: {
        // Overrides Tailwind's built-in `ease-out` / `ease-in-out` classes
        // with stronger, punchier curves. Every existing `ease-out` /
        // `ease-in-out` usage site-wide upgrades automatically — the default
        // CSS easings are too weak to feel "snappy" (see easing.dev).
        out: "cubic-bezier(0.23, 1, 0.32, 1)", // entrances: dropdowns, popovers, modals
        "in-out": "cubic-bezier(0.77, 0, 0.175, 1)", // on-screen movement / repositioning
        // New: sheets and drawers sliding in from an edge (iOS-style).
        drawer: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      boxShadow: {
        glow: "0 0 60px rgba(30, 107, 255,0.35)", // Blue glow
        "glow-sm": "0 0 24px rgba(30, 107, 255,0.25)",
        "glow-cyan": "0 0 50px rgba(14, 165, 233,0.3)",
        "glow-gold": "0 0 50px rgba(245, 166, 35,0.3)", // Gold accent glow
        // Light-theme elevation — soft, neutral, professional (no colored glow).
        card: "0 1px 2px rgba(16,24,40,0.06), 0 6px 20px rgba(16,24,40,0.10)",
        "card-hover": "0 12px 34px rgba(16,24,40,0.14)",
        "primary-sm": "0 6px 16px -6px rgba(8,30,77,0.45)", // subtle navy CTA lift
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1E6BFF 0%, #3B82F6 100%)",
        // Very subtle light hero wash — a single restrained tint, not a
        // multi-stop gradient. Reads as calm white with a hint of brand.
        "hero-wash":
          "radial-gradient(60% 55% at 78% 12%, rgba(8,30,77,0.08) 0%, transparent 60%), radial-gradient(50% 40% at 8% 90%, rgba(99,102,241,0.06) 0%, transparent 55%)",
        "light-grid":
          "linear-gradient(rgba(17,24,39,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.035) 1px, transparent 1px)",
        "gold-gradient": "linear-gradient(120deg, #FFB84D 0%, #F5A623 50%, #FF8A3D 100%)",
        "grid-pattern":
          "linear-gradient(rgba(30, 107, 255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30, 107, 255,0.05) 1px, transparent 1px)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.15)", opacity: "0.7" },
        },
        skeleton: {
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        breathe: "breathe 6s ease-in-out infinite",
        skeleton: "skeleton 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
