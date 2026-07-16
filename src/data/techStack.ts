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
    label: "Frontend",
    items: [
      { name: "React", logo: icon("react/react-original.svg"), color: "#61DAFB" },
      { name: "Next.js", logo: icon("nextjs/nextjs-original.svg"), color: "#000000", invert: true },
      { name: "Angular", logo: icon("angularjs/angularjs-original.svg"), color: "#DD0031" },
      { name: "Vue", logo: icon("vuejs/vuejs-original.svg"), color: "#4FC08D" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js", logo: icon("nodejs/nodejs-original.svg"), color: "#5FA04E" },
      { name: "Laravel", logo: icon("laravel/laravel-plain.svg"), color: "#FF2D20" },
      { name: "Python", logo: icon("python/python-original.svg"), color: "#3776AB" },
      { name: "Java", logo: icon("java/java-original.svg"), color: "#F89820" },
    ],
  },
  {
    label: "Mobile",
    items: [
      { name: "Flutter", logo: icon("flutter/flutter-original.svg"), color: "#02569B" },
      { name: "React Native", logo: icon("react/react-original.svg"), color: "#61DAFB" },
    ],
  },
  {
    label: "Cloud",
    items: [
      { name: "AWS", logo: icon("amazonwebservices/amazonwebservices-original-wordmark.svg"), color: "#FF9900" },
      { name: "Azure", logo: icon("azure/azure-original.svg"), color: "#0089D6" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", color: "#10A37F" },
      { name: "TensorFlow", logo: icon("tensorflow/tensorflow-original.svg"), color: "#FF6F00" },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MongoDB", logo: icon("mongodb/mongodb-original.svg"), color: "#47A248" },
      { name: "PostgreSQL", logo: icon("postgresql/postgresql-original.svg"), color: "#336791" },
      { name: "Redis", logo: icon("redis/redis-original.svg"), color: "#DC382D" },
    ],
  },
  {
    label: "DevOps",
    items: [
      { name: "Docker", logo: icon("docker/docker-original.svg"), color: "#2496ED" },
      { name: "Kubernetes", logo: icon("kubernetes/kubernetes-plain.svg"), color: "#326CE5" },
    ],
  },
  {
    label: "CMS",
    items: [
      { name: "WordPress", logo: icon("wordpress/wordpress-plain.svg"), color: "#21759B" },
    ],
  },
];
