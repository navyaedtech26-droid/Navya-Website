/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Navya EdTech — PRD "Dark Navy / Brand Blue" design system
        bg: {
          DEFAULT: "#0A1628", // Primary Navy — page backgrounds
          deep: "#060E1B", // deeper navy for contrast pockets
          900: "#0F172A", // Secondary Dark — cards, navbars, overlays
        },
        surface: "#1E293B", // Surface Dark — section backgrounds, containers
        brand: {
          DEFAULT: "#1E6BFF", // Brand Blue — primary CTAs, headings, links
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
        ink: {
          DEFAULT: "#F8FAFC", // Text Primary
          muted: "#94A3B8", // Text Secondary
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
        glow: "0 0 60px rgba(30,107,255,0.35)", // Glow Blue
        "glow-sm": "0 0 24px rgba(30,107,255,0.25)",
        "glow-cyan": "0 0 50px rgba(14,165,233,0.3)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1E6BFF 0%, #3B82F6 100%)",
        "grid-pattern":
          "linear-gradient(rgba(30,107,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,107,255,0.05) 1px, transparent 1px)",
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
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        breathe: "breathe 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
