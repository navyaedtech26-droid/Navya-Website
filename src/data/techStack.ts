// Technologies we build with — trimmed to the most widely used picks per category.
// `logo` is a Devicon SVG (served from jsDelivr), `color` is the brand hue used for
// the soft halo behind the logo on hover, and `invert` renders the logo white for
// brands whose mark is black (so it stays visible on the dark theme).

export interface TechItem {
  name: string;
  logo: string;
  color: string;
  invert?: boolean;
}

export interface TechGroup {
  label: string;
  items: TechItem[];
}

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";
const icon = (path: string) => `${DEVICON}/${path}`;

export const techGroups: TechGroup[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", logo: icon("typescript/typescript-original.svg"), color: "#3178C6" },
      { name: "JavaScript", logo: icon("javascript/javascript-original.svg"), color: "#F7DF1E" },
      { name: "Python", logo: icon("python/python-original.svg"), color: "#3776AB" },
      { name: "Java", logo: icon("java/java-original.svg"), color: "#F89820" },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", logo: icon("react/react-original.svg"), color: "#61DAFB" },
      { name: "Next.js", logo: icon("nextjs/nextjs-original.svg"), color: "#FFFFFF", invert: true },
      { name: "Tailwind CSS", logo: icon("tailwindcss/tailwindcss-original.svg"), color: "#38BDF8" },
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      { name: "Node.js", logo: icon("nodejs/nodejs-original.svg"), color: "#5FA04E" },
      { name: "Express", logo: icon("express/express-original.svg"), color: "#FFFFFF", invert: true },
      { name: "Django", logo: icon("django/django-plain.svg"), color: "#44B78B", invert: true },
      { name: "Laravel", logo: icon("laravel/laravel-original.svg"), color: "#FF2D20" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "React Native", logo: icon("react/react-original.svg"), color: "#61DAFB" },
      { name: "Flutter", logo: icon("flutter/flutter-original.svg"), color: "#54C5F8" },
    ],
  },
  {
    label: "Databases",
    items: [
      { name: "PostgreSQL", logo: icon("postgresql/postgresql-original.svg"), color: "#4169E1" },
      { name: "MySQL", logo: icon("mysql/mysql-original.svg"), color: "#00A1D6" },
      { name: "MongoDB", logo: icon("mongodb/mongodb-original.svg"), color: "#47A248" },
      { name: "Firebase", logo: icon("firebase/firebase-plain.svg"), color: "#FFCA28" },
      { name: "Supabase", logo: icon("supabase/supabase-original.svg"), color: "#3ECF8E" },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Docker", logo: icon("docker/docker-original.svg"), color: "#2496ED" },
      { name: "GitHub", logo: icon("github/github-original.svg"), color: "#FFFFFF", invert: true },
      { name: "Vercel", logo: icon("vercel/vercel-original.svg"), color: "#FFFFFF", invert: true },
    ],
  },
];
