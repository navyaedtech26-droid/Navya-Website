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
      // Next.js mark is a black circle with a white "N"; inverting it would flatten
      // both into a solid white blob, so render it as-is (the white N reads on dark).
      { name: "Next.js", logo: icon("nextjs/nextjs-original.svg"), color: "#FFFFFF" },
    ],
  },
  {
    label: "Backend & APIs",
    items: [
      { name: "Node.js", logo: icon("nodejs/nodejs-original.svg"), color: "#5FA04E" },
    ],
  },
];
