import puppeteer from "puppeteer";
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve, extname } from "node:path";

const DIST = resolve(process.cwd(), "dist");
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".webp": "image/webp", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
  ".xml": "application/xml", ".txt": "text/plain", ".webmanifest": "application/manifest+json",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = resolve(DIST, "." + urlPath);
      if (!extname(filePath)) filePath = resolve(filePath, "index.html");
      if (!existsSync(filePath)) filePath = resolve(DIST, "." + urlPath + "/index.html");
      if (!existsSync(filePath)) filePath = resolve(DIST, "index.html");
      const body = await readFile(filePath);
      res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
      res.end(body);
    } catch (e) {
      res.writeHead(500); res.end(String(e));
    }
  });
  return new Promise((res) => server.listen(0, "127.0.0.1", () => res({ server, port: server.address().port })));
}

const { server, port } = await startServer();
const base = `http://127.0.0.1:${port}`;
const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });

for (const route of ["/about", "/", "/blog", "/services/websites"]) {
  const page = await browser.newPage();
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push("PAGEERROR: " + err.message));
  await page.goto(base + route, { waitUntil: "networkidle0", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1500));
  console.log(`\n=== ${route} ===`);
  if (errors.length === 0) console.log("(no console errors)");
  errors.forEach((e) => console.log(e.slice(0, 600)));
  await page.close();
}

await browser.close();
server.close();
