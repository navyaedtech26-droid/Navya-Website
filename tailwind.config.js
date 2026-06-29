/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Navya EdTech — "Aubergine & Amber" design system
        bg: {
          DEFAULT: "#1A0F26", // Deep Aubergine — page backgrounds
          deep: "#120A1B", // deeper aubergine for contrast pockets
          900: "#221634", // Lifted Aubergine — cards, navbars, overlays
        },
        surface: "#2E1D40", // Plum Surface — section backgrounds, containers
        brand: {
          DEFAULT: "#F5A623", // Amber Gold — primary CTAs, headings, links
          light: "#FFB84D", // Light Amber — hover states, secondary accents
        },
        cyan: {
          // Warm Coral accent — icons, highlights, borders
          accent: "#FF7A59",
        },
        depth: {
          DEFAULT: "#5B2A6B", // Orchid plum — depth/gradient pockets
          light: "#FFB84D",
        },
        ink: {
          DEFAULT: "#FBF7F4", // Text Primary — warm white
          muted: "#E9DCEB", // Text Secondary — warm muted lilac-white
        },
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
      boxShadow: {
        glow: "0 0 60px rgba(245, 166, 35,0.35)", // Amber glow
        "glow-sm": "0 0 24px rgba(245, 166, 35,0.25)",
        "glow-cyan": "0 0 50px rgba(255, 122, 89,0.3)", // Coral glow
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F5A623 0%, #FF7A59 100%)",
        "grid-pattern":
          "linear-gradient(rgba(245, 166, 35,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 166, 35,0.05) 1px, transparent 1px)",
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
