/**
 * Build-time generator for the default social-share card, `public/og-image.png`
 * (1200×630, the size Facebook, LinkedIn, Slack and X expect for
 * `summary_large_image`). Individual blog posts override this with their own
 * cover image; this card is the fallback for every other page.
 *
 * It renders a branded HTML template with the Chromium that ships with
 * Playwright (already a devDependency for the test suite) and screenshots it,
 * so the card is reproducible from source instead of a hand-exported asset.
 *
 *   npm run generate:og
 *
 * Re-run whenever the brand mark or tagline changes, then commit the PNG.
 */
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "..", "public");

const WIDTH = 1200;
const HEIGHT = 630;

const SITE_NAME = "Navya EdTech";
const TAGLINE = "Innovate. Build. Elevate.";
const SUBTITLE =
  "High-performance websites, e-commerce platforms & business systems.";
const DOMAIN = "navyaedtech.com";

// Inline the logo as a data URI so the template is fully self-contained and
// renders identically offline (no dependency on a running dev server).
const logoData = readFileSync(resolve(PUBLIC_DIR, "logo.png")).toString("base64");
const logoUri = `data:image/png;base64,${logoData}`;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500&display=swap"
    />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: ${WIDTH}px;
        height: ${HEIGHT}px;
        font-family: "Inter", system-ui, sans-serif;
        color: #f8fafc;
        background:
          radial-gradient(900px 500px at 78% -10%, rgba(30, 107, 255, 0.45), transparent 60%),
          radial-gradient(700px 500px at 8% 120%, rgba(14, 165, 233, 0.28), transparent 55%),
          linear-gradient(135deg, #0a1628 0%, #0f172a 100%);
        position: relative;
        overflow: hidden;
      }
      /* Subtle grid texture, matching the site's grid-pattern background. */
      .grid {
        position: absolute;
        inset: 0;
        background-image:
          linear-gradient(rgba(30, 107, 255, 0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(30, 107, 255, 0.06) 1px, transparent 1px);
        background-size: 48px 48px;
        mask-image: radial-gradient(1000px 600px at 70% 0%, #000 30%, transparent 80%);
      }
      .frame {
        position: relative;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 88px 96px;
      }
      .brand { display: flex; align-items: center; gap: 28px; }
      .brand img {
        width: 104px;
        height: 104px;
        border-radius: 24px;
        object-fit: contain;
        background: rgba(255, 255, 255, 0.04);
        box-shadow: 0 0 60px rgba(30, 107, 255, 0.35);
      }
      .brand .name {
        font-family: "Space Grotesk", sans-serif;
        font-weight: 700;
        font-size: 56px;
        letter-spacing: -0.02em;
      }
      h1 {
        margin-top: 56px;
        font-family: "Space Grotesk", sans-serif;
        font-weight: 700;
        font-size: 80px;
        line-height: 1.05;
        letter-spacing: -0.03em;
        max-width: 940px;
        background: linear-gradient(135deg, #ffffff 0%, #93c5fd 100%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
      }
      p.sub {
        margin-top: 28px;
        font-size: 30px;
        line-height: 1.4;
        color: #e2e8f0;
        max-width: 820px;
      }
      .footer {
        position: absolute;
        left: 96px;
        bottom: 64px;
        display: flex;
        align-items: center;
        gap: 16px;
        font-size: 26px;
        font-weight: 500;
        color: #93c5fd;
      }
      .dot { width: 12px; height: 12px; border-radius: 999px; background: #0ea5e9; box-shadow: 0 0 18px #0ea5e9; }
      .accent {
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 8px;
        background: linear-gradient(90deg, #1e6bff 0%, #3b82f6 50%, #0ea5e9 100%);
      }
    </style>
  </head>
  <body>
    <div class="accent"></div>
    <div class="grid"></div>
    <div class="frame">
      <div class="brand">
        <img src="${logoUri}" alt="" />
        <span class="name">${SITE_NAME}</span>
      </div>
      <h1>${TAGLINE}</h1>
      <p class="sub">${SUBTITLE}</p>
      <div class="footer"><span class="dot"></span>${DOMAIN}</div>
    </div>
  </body>
</html>`;

async function main() {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: WIDTH, height: HEIGHT },
    });
    await page.setContent(html, { waitUntil: "networkidle" });
    // Wait for the webfonts so the headline isn't captured in a fallback face.
    await page.evaluate(() => document.fonts.ready).catch(() => {});
    const buffer = await page.screenshot({ type: "png" });
    writeFileSync(resolve(PUBLIC_DIR, "og-image.png"), buffer);
    console.log(`[og] Wrote public/og-image.png (${WIDTH}×${HEIGHT}).`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error("[og] generation failed:", err);
  process.exit(1);
});
