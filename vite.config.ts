import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

// `ANALYZE=true npm run build` emits dist/stats.html (a treemap of the bundle)
// so chunk sizes can be tracked over time and regressions caught early.
const analyze = process.env.ANALYZE === "true";

export default defineConfig({
  plugins: [
    react(),
    analyze &&
      visualizer({
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split the heaviest libraries into their own chunks so they are
        // cached independently and don't bloat the initial download. three.js
        // is lazy-loaded by the hero (HeroPillar), chart.js ships only with the
        // (already lazy) admin area, and framer-motion loads alongside whichever
        // route first needs it.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-charts": ["chart.js", "react-chartjs-2"],
          "vendor-three": ["three"],
        },
      },
    },
  },
});
