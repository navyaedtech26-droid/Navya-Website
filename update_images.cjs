const fs = require('fs');
const path = require('path');

const dir = 'c:/Users/ASUS/Desktop/navya123/src/data/servicePages';
const map = {
  'business-intelligence-analytics.ts': '/vectors1/bi-clean.avif',
  'billing-invoicing.ts': '/vectors1/billing-clean.avif',
  'cloud-devops.ts': '/vectors1/cloudsoln-clean.avif',
  'crm-systems.ts': '/vectors1/crm-clean.avif',
  'digital-transformation.ts': '/vectors1/digital transformation-clean.avif',
  'erp-systems.ts': '/vectors1/erpsolutions-clean.avif',
  'inventory-management.ts': '/vectors1/inventory-clean.avif',
  'learning-management-systems.ts': '/vectors1/lms-clean.avif',
  'social-media-growth.ts': '/vectors1/socialmedia-clean.avif'
};

for (const [file, imagePath] of Object.entries(map)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (content.includes('heroImage:')) {
    // Replace existing
    content = content.replace(/heroImage:\s*["'].*?["'],?/g, 'heroImage: "' + imagePath + '",');
  } else {
    // Insert after heroSubtitle string
    content = content.replace(/(heroSubtitle:\s*[\s\S]*?",)/, '$1\n\n  heroImage: "' + imagePath + '",');
  }
  
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
}
