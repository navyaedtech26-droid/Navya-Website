const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/study\.overview/g, 'study.content?.overview');
      content = content.replace(/study\.challenges/g, 'study.content?.challenges');
      // For solution, we have to be careful not to replace study.solution_short
      content = content.replace(/study\.solution(?!\w)/g, 'study.content?.solution');
      content = content.replace(/study\.techStack/g, 'study.content?.techStack');
      content = content.replace(/study\.developmentProcess/g, 'study.content?.developmentProcess');
      content = content.replace(/study\.results/g, 'study.content?.results');
      content = content.replace(/study\.gallery/g, 'study.content?.gallery');
      content = content.replace(/study\.testimonial/g, 'study.content?.testimonial');
      content = content.replace(/study\.businessImpact/g, 'study.content?.results?.businessImpact');
      
      // Fix implicit any by adding types to lambdas
      // This is a bit tricky, let's just do it with generic typescript ignores or broad any
      // Since it's TS, it should infer from study.content.overview.goals.map if it's correct!
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir('src/components/case-study');
replaceInDir('src/components/home');
replaceInDir('src/components/portfolio');

// Specific fixes
// 1. src/components/home/CaseStudyCard.tsx
let homeCard = fs.readFileSync('src/components/home/CaseStudyCard.tsx', 'utf8');
homeCard = homeCard.replace(/const Icon = study\.icon;/g, 'const Icon = (LucideIcons as any)[study.icon] || LucideIcons.BriefcaseBusiness;');
homeCard = homeCard.replace(/import { ArrowUpRight } from "lucide-react";/g, 'import { ArrowUpRight } from "lucide-react";\nimport * as LucideIcons from "lucide-react";');
homeCard = homeCard.replace(/study\.href/g, '`/portfolio/${study.slug}`');
fs.writeFileSync('src/components/home/CaseStudyCard.tsx', homeCard);

// 2. src/components/home/CaseStudiesSection.tsx
let homeSection = fs.readFileSync('src/components/home/CaseStudiesSection.tsx', 'utf8');
homeSection = homeSection.replace(/import \{ CaseStudy \} from "@\/services\/caseStudies";/g, 'import { getPublishedCaseStudies, type CaseStudy } from "@/services/caseStudies";');
homeSection = homeSection.replace(/import \{ caseStudies \} from "@\/services\/caseStudies";/g, 'import { getPublishedCaseStudies, type CaseStudy } from "@/services/caseStudies";');
fs.writeFileSync('src/components/home/CaseStudiesSection.tsx', homeSection);

console.log("Replaced nested properties");
