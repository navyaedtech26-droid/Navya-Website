
const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:5174/about", { waitUntil: "networkidle0" });
  const data = await page.evaluate(() => {
    const h1 = document.querySelector("h1");
    if (!h1) return "No h1 found";
    
    // Find all matching CSS rules for h1
    let matchedRules = [];
    for (let i = 0; i < document.styleSheets.length; i++) {
      let sheet = document.styleSheets[i];
      try {
        let rules = sheet.cssRules || sheet.rules;
        for (let j = 0; j < rules.length; j++) {
          if (rules[j].selectorText && h1.matches(rules[j].selectorText)) {
            matchedRules.push({
              selector: rules[j].selectorText,
              color: rules[j].style.color
            });
          }
        }
      } catch (e) {}
    }
    
    return {
      classes: h1.className,
      color: window.getComputedStyle(h1).color,
      matchedRules: matchedRules
    };
  });
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
})();
