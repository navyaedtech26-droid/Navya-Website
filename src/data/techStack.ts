interface TechItem {
  name: string;
  logo: string;
  color: string;
  invert?: boolean;
}

export interface TechGroup {
  label: string;
  items: TechItem[];
}

const icon = (name: string) => `/images/tech/${name}.svg`;

export const techGroups: TechGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "React", logo: icon("react"), color: "#61DAFB" },
      { name: "Next.js", logo: icon("nextjs"), color: "#000000" },
      { name: "Angular", logo: icon("angularjs"), color: "#DD0031" },
      { name: "Vue", logo: icon("vuejs"), color: "#4FC08D" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", logo: icon("nodejs"), color: "#5FA04E" },
      { name: "Laravel", logo: icon("laravel"), color: "#FF2D20" },
      { name: "Python", logo: icon("python"), color: "#3776AB" },
      { name: "Java", logo: icon("java"), color: "#F89820" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "Flutter", logo: icon("flutter"), color: "#02569B" },
      { name: "React Native", logo: icon("react"), color: "#61DAFB" },
    ],
  },
  {
    label: "Cloud",
    items: [
      { name: "AWS", logo: icon("aws"), color: "#FF9900" },
      { name: "Azure", logo: icon("azure"), color: "#0089D6" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "OpenAI", logo: icon("openai"), color: "#10A37F" },
      { name: "TensorFlow", logo: icon("tensorflow"), color: "#FF6F00" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MongoDB", logo: icon("mongodb"), color: "#47A248" },
      { name: "PostgreSQL", logo: icon("postgresql"), color: "#336791" },
      { name: "Redis", logo: icon("redis"), color: "#DC382D" },
    ],
  },
  {
    label: "DevOps",
    items: [
      { name: "Docker", logo: icon("docker"), color: "#2496ED" },
      { name: "Kubernetes", logo: icon("kubernetes"), color: "#326CE5" },
    ],
  },
  {
    label: "CMS",
    items: [
      { name: "WordPress", logo: icon("wordpress"), color: "#21759B" },
    ],
  },
];
