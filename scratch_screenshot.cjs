const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 } });
  const routes = [
    ['ai-solutions', '/services/ai-solutions'],
    ['custom-software-development', '/services/custom-software-development'],
    ['devops', '/services/devops'],
    ['it-consulting', '/services/it-consulting'],
    ['billing-invoicing', '/services/billing-invoicing'],
  ];
  for (const [name, route] of routes) {
    await page.goto(`http://localhost:5174${route}`, { waitUntil: 'networkidle' });
    const el = await page.$('section:has-text("Service Overview")');
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await el.screenshot({ path: `C:/Users/ASUS/Desktop/navya123/scratch-overview-${name}.png` });
    } else {
      await page.screenshot({ path: `C:/Users/ASUS/Desktop/navya123/scratch-overview-${name}-FULL.png` });
    }
  }
  await browser.close();
})();
