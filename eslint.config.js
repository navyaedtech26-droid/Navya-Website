import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      "playwright-report",
      "test-results",
      "coverage",
      "scripts/**", // Node build scripts: their own (console-heavy) world.
      "supabase/functions/**", // Deno Edge Functions: Deno globals + console.
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // All diagnostics must go through src/lib/logger.ts, which is the single
      // file allowed to touch the console (via an inline disable).
      "no-console": "error",
    },
  },
  // Disable any stylistic rules that would fight Prettier. Keep last.
  prettier
);
