import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

// Unit / integration tests run under Vitest (jsdom), kept separate from the
// Playwright E2E suite in tests/. Vitest only picks up *.test.* files under src/;
// Playwright only runs tests/ — so the two never collide.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    // Don't let Vitest wander into the Playwright E2E specs.
    exclude: ["tests/**", "node_modules/**", "dist/**"],
    css: false,
    clearMocks: true,
    restoreMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
      // Gate coverage on the high-risk pure logic this suite targets, rather
      // than the whole app (pages/effects are exercised by the E2E suite). This
      // keeps the threshold meaningful and the gate honest.
      include: [
        "src/lib/utils.ts",
        "src/lib/rateLimit.ts",
        "src/lib/structuredData.ts",
        "src/components/blog/Markdown.tsx",
        "src/services/blogs.ts",
        "src/services/admin.ts",
        "src/services/contact.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 70,
      },
    },
  },
});
