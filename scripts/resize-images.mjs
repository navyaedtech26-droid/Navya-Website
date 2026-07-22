/**
 * One-off perf fix: the vector illustrations and industry photos in public/
 * were sourced at 1280-2992px (some up to 2816x1536) but are never displayed
 * larger than ~1152px CSS width anywhere in the app. Lighthouse flagged this
 * as ~1.1MB of wasted image bytes on the homepage alone, and some individual
 * files (travel.avif) were 1.4MB on their own.
 *
 * Pipeline:
 *   1. Chromium (via Playwright, already a devDependency) decodes the source
 *      AVIF and draws it to a canvas sized to fit within a 1600x1600 box —
 *      generous enough for the largest use in the app (ServiceHero's
 *      lg:h-[600px] object-contain box, IndustryPageTemplate's full-width
 *      object-cover banner) — using high-quality smoothing.
 *   2. The raw RGBA pixels come back to Node, which re-encodes them as AVIF
 *      via @jsquash/avif (a WASM build of libavif), manually instantiating
 *      the module from the local .wasm file because @jsquash's own loader
 *      does a `fetch()` that fails under plain Node. Chromium's own
 *      canvas.toDataURL has no AVIF encoder (silently falls back to PNG), so
 *      this is the only path to a real, non-fallback AVIF re-encode.
 *      @jsquash/avif is dev-only tooling installed for this script — not a
 *      runtime dependency of the site.
 *
 *   node scripts/resize-images.mjs
 *
 * Re-run whenever these source images change; output overwrites in place.
 * Quality was picked by eyeballing screenshots at actual render size: 50 for
 * the flat-color vector illustrations (no visible artifacts even at 40), 55
 * for the industries photos (more tonal detail, still ~90% smaller).
 */
import { chromium } from "@playwright/test";
import encodeAvif, { init as initAvifEncoder } from "@jsquash/avif/encode.js";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, extname } from "node:path";

const TARGETS = [
  { dir: "public/vector", maxW: 1600, maxH: 1600, quality: 50 },
  { dir: "public/industries section", maxW: 1600, maxH: 1600, quality: 55 },
];

async function main() {
  const wasmBytes = readFileSync(
    resolve("node_modules/@jsquash/avif/codec/enc/avif_enc.wasm")
  );
  const wasmModule = await WebAssembly.compile(wasmBytes);
  await initAvifEncoder(wasmModule);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent("<!doctype html><html><body></body></html>");

  let totalBefore = 0;
  let totalAfter = 0;

  for (const { dir, maxW, maxH, quality } of TARGETS) {
    const absDir = resolve(dir);
    const files = readdirSync(absDir).filter((f) => extname(f) === ".avif");

    for (const file of files) {
      const srcPath = resolve(absDir, file);
      const origBuf = readFileSync(srcPath);
      const uri = `data:image/avif;base64,${origBuf.toString("base64")}`;

      const { pixelsBase64, w, h, origW, origH } = await page.evaluate(
        async ({ uri, maxW, maxH }) => {
          const img = await new Promise((res, rej) => {
            const el = new Image();
            el.onload = () => res(el);
            el.onerror = rej;
            el.src = uri;
          });
          const origW = img.naturalWidth;
          const origH = img.naturalHeight;
          const scale = Math.min(maxW / origW, maxH / origH, 1);
          const w = Math.round(origW * scale);
          const h = Math.round(origH * scale);

          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, w, h);
          const { data: pixels } = ctx.getImageData(0, 0, w, h);

          // Chunked binary->base64 (String.fromCharCode.apply blows the
          // argument limit for multi-megabyte buffers).
          let binary = "";
          const CHUNK = 0x8000;
          for (let i = 0; i < pixels.length; i += CHUNK) {
            binary += String.fromCharCode.apply(null, pixels.subarray(i, i + CHUNK));
          }
          return { pixelsBase64: btoa(binary), w, h, origW, origH };
        },
        { uri, maxW, maxH }
      );

      const pixels = new Uint8ClampedArray(Buffer.from(pixelsBase64, "base64"));
      const avifBuffer = await encodeAvif({ data: pixels, width: w, height: h }, { quality });
      writeFileSync(srcPath, Buffer.from(avifBuffer));

      totalBefore += origBuf.length;
      totalAfter += avifBuffer.byteLength;

      console.log(
        `[resize] ${dir}/${file}: ${origW}x${origH} (${(origBuf.length / 1024).toFixed(1)} KiB) -> ` +
          `${w}x${h} (${(avifBuffer.byteLength / 1024).toFixed(1)} KiB)`
      );
    }
  }

  await browser.close();
  console.log(
    `\n[resize] total: ${(totalBefore / 1024).toFixed(1)} KiB -> ${(totalAfter / 1024).toFixed(1)} KiB ` +
      `(${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}% smaller)`
  );
}

main().catch((err) => {
  console.error("[resize] failed:", err);
  process.exit(1);
});
