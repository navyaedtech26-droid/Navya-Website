/**
 * Build-time generator for sitemap.xml and rss.xml.
 *
 * Runs as a `prebuild` step. It pulls published blog posts from Supabase (when
 * configured) and writes both feeds into `public/` so they ship with the build.
 * Without Supabase credentials it still emits the static routes, so the build
 * never breaks in environments that don't have the keys.
 *
 *   node scripts/generate-feeds.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const PUBLIC_DIR = resolve(ROOT, "public");

const SITE_URL = "https://navyaedtech.com";
const SITE_NAME = "Navya EdTech";
const SITE_DESCRIPTION =
  "Insights on web development, performance, e-commerce, and business systems from the Navya EdTech team.";

// Static, always-present routes with sensible crawl hints.
const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

/** Read .env (if present) without adding a dotenv dependency. */
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

function xmlEscape(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function fetchPublishedPosts(env) {
  const url = env.VITE_SUPABASE_URL;
  const key = env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("[feeds] Supabase not configured — emitting static routes only.");
    return [];
  }
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("blog_posts")
      .select("slug, title, excerpt, author, published_at, updated_at")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.warn("[feeds] Could not load posts:", err.message ?? err);
    return [];
  }
}

function buildSitemap(posts) {
  const urls = [
    ...STATIC_ROUTES.map(
      (r) =>
        `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n` +
        `    <changefreq>${r.changefreq}</changefreq>\n` +
        `    <priority>${r.priority}</priority>\n  </url>`
    ),
    ...posts.map((p) => {
      const lastmod = (p.updated_at ?? p.published_at ?? "").slice(0, 10);
      return (
        `  <url>\n    <loc>${SITE_URL}/blog/${xmlEscape(p.slug)}</loc>\n` +
        (lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : "") +
        `    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`
      );
    }),
  ];
  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.join("\n") +
    `\n</urlset>\n`
  );
}

function buildRss(posts) {
  const items = posts
    .map((p) => {
      const link = `${SITE_URL}/blog/${xmlEscape(p.slug)}`;
      const date = p.published_at ? new Date(p.published_at).toUTCString() : "";
      return (
        `    <item>\n` +
        `      <title>${xmlEscape(p.title)}</title>\n` +
        `      <link>${link}</link>\n` +
        `      <guid isPermaLink="true">${link}</guid>\n` +
        (p.author ? `      <author>${xmlEscape(p.author)}</author>\n` : "") +
        (date ? `      <pubDate>${date}</pubDate>\n` : "") +
        (p.excerpt ? `      <description>${xmlEscape(p.excerpt)}</description>\n` : "") +
        `    </item>`
      );
    })
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n` +
    `  <channel>\n` +
    `    <title>${xmlEscape(SITE_NAME)} — Blog</title>\n` +
    `    <link>${SITE_URL}/blog</link>\n` +
    `    <description>${xmlEscape(SITE_DESCRIPTION)}</description>\n` +
    `    <language>en</language>\n` +
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />\n` +
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n` +
    (items ? `${items}\n` : "") +
    `  </channel>\n</rss>\n`
  );
}

async function main() {
  const env = loadEnv();
  const posts = await fetchPublishedPosts(env);

  writeFileSync(resolve(PUBLIC_DIR, "sitemap.xml"), buildSitemap(posts), "utf8");
  writeFileSync(resolve(PUBLIC_DIR, "rss.xml"), buildRss(posts), "utf8");

  console.log(
    `[feeds] Wrote sitemap.xml (${STATIC_ROUTES.length + posts.length} urls) ` +
      `and rss.xml (${posts.length} posts).`
  );
}

main().catch((err) => {
  console.error("[feeds] generation failed:", err);
  process.exit(0); // never block the build over feeds
});
