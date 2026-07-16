const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/ASUS/Desktop/navya123/src/data/industryPages';
const map = {
  'hospitals.ts': 'healthcare.avif',
  'schools.ts': 'education.avif',
  'colleges.ts': 'colleges-and-universities.avif',
  'retail.ts': 'retail.avif',
  'real-estate.ts': 'real estate.avif',
  'manufacturing.ts': 'manufacturing.avif',
  'hotels.ts': 'hotela and resorts.avif',
  'travel-agencies.ts': 'travel.avif',
  'restaurants.ts': 'cafe and restaurants.avif',
  'ngos.ts': 'ngo.avif'
};

for (const [file, img] of Object.entries(map)) {
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf8');
  if (!content.includes('heroImage:')) {
    content = content.replace(/(heroSubtitle:\s*[\s\S]*?",\n)/, `$1\n  heroImage: "/industries section/${img}",\n`);
    fs.writeFileSync(p, content);
    console.log('Updated', file);
  } else {
    console.log('Skipped (already has heroImage)', file);
  }
}
