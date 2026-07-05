/**
 * Build-time generator for a proper multi-size favicon set from the master
 * brand mark, replacing the single 959KB `favicon.png` that was previously
 * reused verbatim (with no `sizes` attribute) for every icon slot.
 *
 * Downscales `scripts/assets/favicon-master.png` via a Chromium canvas
 * (Playwright is already a devDependency for tests/OG generation, so this
 * needs no new dependency) and writes the small PNGs browsers/OSes actually
 * request. The master lives outside `public/` on purpose — anything in
 * `public/` deploys as-is and is reachable by direct URL, and a second
 * 959KB copy sitting there unlinked would just recreate the orphaned-asset
 * problem this script exists to fix.
 *
 *   npm run generate:favicons
 *
 * Re-run whenever the brand mark changes, then commit the generated PNGs.
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "..", "public");

const SOURCE = resolve(__dirname, "assets", "favicon-master.png");
const SIZES = [
  { size: 16, file: "favicon-16x16.png" },
  { size: 32, file: "favicon-32x32.png" },
  { size: 180, file: "apple-touch-icon.png" },
  { size: 512, file: "icon-512.png" },
];

async function main() {
  const sourceData = readFileSync(SOURCE).toString("base64");
  const sourceUri = `data:image/png;base64,${sourceData}`;

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    await page.setContent(`<!doctype html><html><body></body></html>`);

    for (const { size, file } of SIZES) {
      const base64Png = await page.evaluate(
        async ({ uri, size }) => {
          const img = await new Promise((resolve, reject) => {
            const el = new Image();
            el.onload = () => resolve(el);
            el.onerror = reject;
            el.src = uri;
          });
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, size, size);
          return canvas.toDataURL("image/png").split(",")[1];
        },
        { uri: sourceUri, size }
      );
      writeFileSync(resolve(PUBLIC_DIR, file), Buffer.from(base64Png, "base64"));
      console.log(`[favicons] Wrote public/${file} (${size}×${size}).`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("[favicons] generation failed:", err);
  process.exit(1);
});
