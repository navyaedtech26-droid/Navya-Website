/**
 * Build-time generator for sitemap.xml, rss.xml, and llms.txt.
 *
 * Runs as a `prebuild` step. It pulls published blog posts from Supabase (when
 * configured) and writes all three files into `public/` so they ship with the
 * build. Without Supabase credentials it still emits the static routes, so the
 * build never breaks in environments that don't have the keys.
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
const SITE_EMAIL = "navyaedtech26@gmail.com";
const SITE_DESCRIPTION =
  "Insights on web development, performance, e-commerce, and business systems from the Navya EdTech team.";

// Static, always-present routes with sensible crawl hints.
const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/websites", changefreq: "monthly", priority: "0.7" },
  { path: "/services/custom-software-development", changefreq: "monthly", priority: "0.7" },
  { path: "/services/mobile-app-development", changefreq: "monthly", priority: "0.7" },
  { path: "/services/ai-solutions", changefreq: "monthly", priority: "0.7" },
  { path: "/services/cloud-services", changefreq: "monthly", priority: "0.7" },
  { path: "/services/ui-ux-design", changefreq: "monthly", priority: "0.7" },
  { path: "/services/devops", changefreq: "monthly", priority: "0.7" },
  { path: "/services/it-consulting", changefreq: "monthly", priority: "0.7" },
  { path: "/services/dedicated-developers", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/digital-transformation", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/erp-systems", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/crm-systems", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/billing-invoicing", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/learning-management-systems", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/inventory-management", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/business-intelligence-analytics", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/cloud-devops", changefreq: "monthly", priority: "0.7" },
  { path: "/solutions/social-media-growth", changefreq: "monthly", priority: "0.7" },
  { path: "/industries", changefreq: "monthly", priority: "0.9" },
  { path: "/industries/schools", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/colleges", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/hospitals", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/manufacturing", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/hotels", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/restaurants", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/retail", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/ngos", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/real-estate", changefreq: "monthly", priority: "0.8" },
  { path: "/industries/travel-agencies", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/privacy-policy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

// One-line descriptions for llms.txt. Kept separate from src/data/servicePages
// and src/data/industryPages (which are .ts and import lucide-react icon
// components) so this plain-JS build script doesn't need a TypeScript loader
// just to read a title + tagline. Update alongside those files when a page's
// title or core pitch changes.
const SERVICE_LINKS = [
  { path: "/services/websites", title: "Website Development", note: "Built to convert." },
  { path: "/services/custom-software-development", title: "Custom Software Development", note: "Built around your workflow." },
  { path: "/services/mobile-app-development", title: "Mobile App Development", note: "A permanent place on their screen." },
  { path: "/services/ai-solutions", title: "AI Solutions", note: "Automation with a measurable return." },
  { path: "/services/cloud-services", title: "Cloud Services", note: "Infrastructure that scales without drama." },
  { path: "/services/ui-ux-design", title: "UI/UX Design", note: "Interfaces built to convert." },
  { path: "/services/devops", title: "DevOps", note: "Deployments without the dread." },
  { path: "/services/it-consulting", title: "IT Consulting", note: "A technology plan tied to business outcomes." },
  { path: "/services/dedicated-developers", title: "Dedicated Developers", note: "Senior engineers, without the hiring cycle." },
];

const SOLUTION_LINKS = [
  { path: "/solutions/digital-transformation", title: "Digital Transformation", note: "Modernize without the disruption." },
  { path: "/solutions/erp-systems", title: "ERP Systems", note: "One platform for every department." },
  { path: "/solutions/crm-systems", title: "CRM Systems", note: "One source of truth for every lead." },
  { path: "/solutions/billing-invoicing", title: "Billing & Invoicing", note: "Payments that accelerate cash flow." },
  { path: "/solutions/learning-management-systems", title: "Learning Management Systems", note: "Training that scales and tracks itself." },
  { path: "/solutions/inventory-management", title: "Inventory Management", note: "Real-time stock visibility." },
  { path: "/solutions/business-intelligence-analytics", title: "Business Intelligence & Analytics", note: "Decisions backed by evidence." },
  { path: "/solutions/cloud-devops", title: "Cloud & DevOps", note: "Infrastructure and delivery, unified." },
  { path: "/solutions/social-media-growth", title: "Social Media & Growth", note: "Turn attention into pipeline." },
];

const INDUSTRY_LINKS = [
  { path: "/industries/schools", title: "Schools", note: "Run smoother, enroll faster." },
  { path: "/industries/colleges", title: "Colleges & Universities", note: "Scale without losing control." },
  { path: "/industries/hospitals", title: "Hospitals & Clinics", note: "Less admin, better care." },
  { path: "/industries/manufacturing", title: "Manufacturing", note: "Cut waste, see everything." },
  { path: "/industries/hotels", title: "Hotels & Resorts", note: "Book direct, keep more margin." },
  { path: "/industries/restaurants", title: "Restaurants & Cafes", note: "Fill tables, keep the margin." },
  { path: "/industries/retail", title: "Retail", note: "Sell everywhere, track everything." },
  { path: "/industries/ngos", title: "NGOs & Nonprofits", note: "More impact, less overhead." },
  { path: "/industries/real-estate", title: "Real Estate", note: "Turn listings into closings." },
  { path: "/industries/travel-agencies", title: "Travel Agencies", note: "Convert wanderlust into bookings." },
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
  // Static marketing pages don't carry their own timestamps, so stamp them with
  // the build date — every deploy refreshes <lastmod>, which is a legitimate
  // signal (the page genuinely shipped that day) and nudges re-crawls.
  const buildDate = new Date().toISOString().slice(0, 10);
  const urls = [
    ...STATIC_ROUTES.map(
      (r) =>
        `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n` +
        `    <lastmod>${buildDate}</lastmod>\n` +
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

/**
 * llms.txt (https://llmstxt.org) — a curated, human-readable map of the site
 * for LLMs and AI answer engines that can't (or won't) crawl and render the
 * full JS app the way Googlebot does. Markdown link list, not XML, so it's
 * built separately from the sitemap even though the input data overlaps.
 */
function buildLlmsTxt(posts) {
  const section = (heading, links) =>
    `## ${heading}\n\n` +
    links
      .map(
        (l) =>
          `- [${l.title}](${SITE_URL}${l.path})` + (l.note ? `: ${l.note}` : "")
      )
      .join("\n") +
    "\n";

  // Excerpts are written for blog cards, not a plain-text index — trim to the
  // first sentence so llms.txt stays a scannable one-liner per entry.
  const firstSentence = (text) => {
    if (!text) return "";
    const match = text.match(/^.*?[.!?](?=\s|$)/);
    return (match ? match[0] : text).trim();
  };

  const blogSection =
    posts.length > 0
      ? section(
          "Blog",
          posts.slice(0, 20).map((p) => ({
            path: `/blog/${p.slug}`,
            title: p.title,
            note: firstSentence(p.excerpt),
          }))
        )
      : "";

  return (
    `# ${SITE_NAME}\n\n` +
    `> ${SITE_NAME} is an IT services agency in Nepal engineering revenue-driving websites, ` +
    `custom software, and business systems (ERP, CRM, BI) for founders, schools, hospitals, ` +
    `and enterprises.\n\n` +
    `Remote-first, serving clients across Nepal. Contact: ${SITE_EMAIL}.\n\n` +
    section("Services", SERVICE_LINKS) +
    "\n" +
    section("Solutions", SOLUTION_LINKS) +
    "\n" +
    section("Industries", INDUSTRY_LINKS) +
    "\n" +
    section("Company", [
      { path: "/about", title: "About", note: "Who we are and how we work." },
      { path: "/contact", title: "Contact", note: "Get in touch or book a call." },
      { path: "/", title: "Home", note: "Overview of services and solutions." },
    ]) +
    "\n" +
    (blogSection ? blogSection + "\n" : "") +
    section("Optional", [
      { path: "/privacy-policy", title: "Privacy Policy", note: "" },
      { path: "/terms", title: "Terms", note: "" },
    ])
  );
}

async function main() {
  const env = loadEnv();
  const posts = await fetchPublishedPosts(env);

  writeFileSync(resolve(PUBLIC_DIR, "sitemap.xml"), buildSitemap(posts), "utf8");
  writeFileSync(resolve(PUBLIC_DIR, "rss.xml"), buildRss(posts), "utf8");
  writeFileSync(resolve(PUBLIC_DIR, "llms.txt"), buildLlmsTxt(posts), "utf8");

  console.log(
    `[feeds] Wrote sitemap.xml (${STATIC_ROUTES.length + posts.length} urls), ` +
      `rss.xml (${posts.length} posts), and llms.txt.`
  );
}

main().catch((err) => {
  console.error("[feeds] generation failed:", err);
  process.exit(0); // never block the build over feeds
});
