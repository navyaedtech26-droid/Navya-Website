/**
 * Post-build prerenderer.
 *
 * The app is a client-rendered Vite SPA: the HTML a crawler first receives is
 * an empty <div id="root">, and all content + per-page meta tags are injected
 * by JS afterwards. Googlebot can render JS, but slowly and unreliably, and
 * social/link scrapers don't run JS at all — so every route would otherwise
 * share the homepage shell's tags.
 *
 * This script serves the freshly built `dist/`, drives a headless Chromium over
 * each public route, lets React + react-helmet-async render (and scrolls the
 * full page so `whileInView` reveal animations settle to opacity:1), then
 * snapshots the resulting HTML to dist/<route>/index.html. main.tsx detects the
 * baked markup and hydrates it instead of discarding it.
 *
 * Runs as a `postbuild` step. It NEVER fails the build: if Chromium is missing
 * or a route errors, it logs and moves on, leaving the plain SPA shell — the
 * site still works, it just isn't prerendered for that route.
 *
 *   node scripts/prerender.mjs
 */
import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, extname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DIST = resolve(ROOT, "dist");
const SITE_URL = "https://navyaedtech.com";

// Public, indexable routes. Admin/legal-form routes are intentionally excluded
// (they're noindex or behind auth). Blog post routes are discovered from
// Supabase below when credentials are available.
const STATIC_ROUTES = [
  "/",
  "/services",
  "/services/websites",
  "/industries",
  "/industries/schools",
  "/industries/colleges",
  "/industries/hospitals",
  "/industries/manufacturing",
  "/industries/hotels",
  "/industries/restaurants",
  "/industries/retail",
  "/industries/ngos",
  "/industries/real-estate",
  "/industries/travel-agencies",
  "/about",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/terms",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

/** Read .env (if present) so blog-post prerendering works locally too. */
function loadEnv() {
  const env = { ...process.env };
  const file = resolve(ROOT, ".env");
  if (existsSync(file)) {
    for (const line of readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
  return env;
}

/** Pull published blog-post slugs so each post page is prerendered too. */
async function fetchPostRoutes(env) {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());
    if (error) throw error;
    return (data ?? []).map((p) => `/blog/${p.slug}`);
  } catch (err) {
    console.warn("[prerender] Could not load post slugs:", err.message ?? err);
    return [];
  }
}

/** Minimal static file server for dist/, with SPA fallback to index.html. */
function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = resolve(DIST, "." + urlPath);
      // Directory or extensionless path → try index.html / SPA fallback.
      if (!extname(filePath)) filePath = resolve(DIST, "index.html");
      if (!existsSync(filePath)) filePath = resolve(DIST, "index.html");
      const body = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath)] || "application/octet-stream",
      });
      res.end(body);
    } catch {
      res.writeHead(500);
      res.end("error");
    }
  });
  return new Promise((res) => {
    server.listen(0, "127.0.0.1", () => res({ server, port: server.address().port }));
  });
}

async function main() {
  if (!existsSync(resolve(DIST, "index.html"))) {
    console.warn("[prerender] dist/index.html missing — run the build first. Skipping.");
    return;
  }

  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    console.warn("[prerender] puppeteer not installed — skipping prerender.");
    return;
  }

  const env = loadEnv();
  const routes = [...STATIC_ROUTES, ...(await fetchPostRoutes(env))];

  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;

  let browser;
  let ok = 0;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--use-gl=angle",
        "--use-angle=swiftshader",
      ],
    });

    for (const route of routes) {
      // Retry once: headless Chromium occasionally drops a frame mid-navigation
      // ("frame detached"), which is transient and succeeds on a second pass.
      let lastErr;
      for (let attempt = 0; attempt < 2; attempt++) {
        const page = await browser.newPage();
        try {
          await renderRoute(page, base, route);
          ok++;
          console.log(`[prerender] ✓ ${route}`);
          lastErr = null;
          break;
        } catch (err) {
          lastErr = err;
        } finally {
          await page.close().catch(() => {});
        }
      }
      if (lastErr) {
        console.warn(`[prerender] ✗ ${route}: ${lastErr.message ?? lastErr}`);
      }
    }
  } finally {
    // On Windows, Chromium can still hold its temp profile when we tear down,
    // making the cleanup unlink fail with EBUSY — never let that fail the build.
    if (browser) await browser.close().catch(() => {});
    server.close();
  }

  console.log(`[prerender] Prerendered ${ok}/${routes.length} routes.`);
}

/** Render a single route in `page` and write its snapshot into dist/. */
async function renderRoute(page, base, route) {
  await page.setViewport({ width: 1366, height: 1200 });
  await page.goto(base + route, {
    waitUntil: "networkidle0",
    timeout: 45000,
  });
  // Footer is the last thing on every public page — its presence means the
  // route finished rendering rather than still showing the route spinner.
  await page.waitForSelector("footer", { timeout: 15000 }).catch(() => {});

  // Scroll top→bottom→top so every whileInView reveal block fires its
  // (once-only) entrance animation and settles at opacity:1 before we snapshot;
  // otherwise below-the-fold content bakes in hidden.
  await autoScroll(page);
  await new Promise((r) => setTimeout(r, 600));

  // Neutralise framer-motion's pre-animation state. Reveal/entrance components
  // start at opacity:0 + a transform and animate in on view; any block the
  // scroll didn't settle would otherwise bake in HIDDEN, which a crawler may
  // treat as cloaked/hidden text. We only touch elements explicitly hidden via
  // inline opacity:0 (exactly framer's initial state) so decorative styling is
  // left alone. JS visitors still get the animations — framer re-applies its
  // styles on hydration.
  await page.evaluate(() => {
    document.querySelectorAll("[style]").forEach((el) => {
      const op = el.style.opacity;
      if (op !== "" && parseFloat(op) === 0) {
        el.style.opacity = "1";
        if (el.style.transform && el.style.transform !== "none") {
          el.style.transform = "none";
        }
      }
    });
  });

  // Canonical/og:url must point at the real site, not localhost. Helmet already
  // emits absolute SITE_URL links, so nothing to rewrite — but strip any
  // localhost that slipped into asset prefetch hints.
  let html = await page.content();
  html = html.replaceAll(base, SITE_URL);

  const outDir = route === "/" ? DIST : resolve(DIST, "." + route);
  await mkdir(outDir, { recursive: true });
  await writeFile(resolve(outDir, "index.html"), html, "utf8");
}

/** Smoothly scroll to the bottom of the page in steps, then back to the top. */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        y += step;
        if (y >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 80);
    });
  });
  // Give the last batch of reveals time to finish their 0.4s transition.
  await new Promise((r) => setTimeout(r, 500));
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(0); // never block the build over prerendering
});
