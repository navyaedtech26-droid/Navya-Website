import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });

await page.goto('http://localhost:5173/services', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.click('button:has-text("Decline")').catch(() => {});
await page.locator('#our-services').scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
await page.screenshot({ path: 'scripts/_tmp_services-page.png', fullPage: false });
await page.screenshot({ path: 'scripts/_tmp_services-grid-full.png', fullPage: true });

await page.goto('http://localhost:5173/services/custom-software-development', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: 'scripts/_tmp_service-hero-custom-sw.png', fullPage: false });

await page.goto('http://localhost:5173/services/mobile-app-development', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);
await page.screenshot({ path: 'scripts/_tmp_service-hero-mobile.png', fullPage: false });

await browser.close();
console.log('done');
