import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Split the heaviest libraries into their own chunks so they are
        // cached independently and don't bloat the initial download. chart.js
        // only ships with the (already lazy) admin area; framer-motion loads
        // alongside whichever route first needs it.
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-charts": ["chart.js", "react-chartjs-2"],
        },
      },
    },
  },
});
