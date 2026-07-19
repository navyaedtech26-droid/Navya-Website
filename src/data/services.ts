import {
  Globe,
  LayoutDashboard,
  ShoppingCart,
  Smartphone,
  Search,
  Boxes,
  Users,
  Receipt,
  GraduationCap,
  Server,
  BarChart3,
  Store,
  Share2,
  Camera,
  PenLine,
  Clapperboard,
  Megaphone,
  Film,
  Newspaper,
  Rocket,
  PieChart,
  TabletSmartphone,
  MonitorSmartphone,
  AppWindow,
  Palette,
  Wrench,
  LineChart,
  TrendingUp,
  Database,
  Brain,
  Code2,
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategory, ServiceItem } from "@/types";

// Home "Services" grid — 8 flat cards (icon, title, description) matching the
// simple capability-grid layout, with the flagship service highlighted.
export interface ServiceGridEntry {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
  highlight?: boolean;
}

export const serviceGridItems: ServiceGridEntry[] = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description: "Scalable, enterprise-grade software tailored to your specific business requirements and workflows.",
    features: ["Enterprise Architecture", "Legacy Modernization", "API Integration", "Automated Workflows"],
    href: "/services/custom-software-development",
    highlight: true,
  },
  {
    icon: Globe,
    title: "Web Development",
    description: "High-performance web applications built for speed, security, and seamless user experiences.",
    features: ["Progressive Web Apps", "Enterprise Portals", "E-commerce Platforms", "CMS Development"],
    href: "/services/websites",
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description: "Native and cross-platform mobile experiences that drive engagement and business value.",
    features: ["iOS & Android Native", "React Native & Flutter", "Mobile App UI/UX", "App Store Optimization"],
    href: "/services/mobile-app-development",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent systems and predictive models to automate tasks and unlock new capabilities.",
    features: ["Machine Learning Models", "Generative AI Integration", "Predictive Analytics", "NLP & Chatbots"],
    href: "/services/ai-solutions",
  },
  {
    icon: Server,
    title: "Cloud Services",
    description: "Secure and scalable cloud infrastructure to modernize your operations and reduce costs.",
    features: ["Cloud Migration", "AWS/Azure/GCP Management", "Serverless Architecture", "Cloud Security"],
    href: "/services/cloud-services",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Data-driven interface design focused on usability, conversions, and premium aesthetics.",
    features: ["User Research & Testing", "Wireframing & Prototyping", "Design Systems", "Conversion Optimization"],
    href: "/services/ui-ux-design",
  },
  {
    icon: Wrench,
    title: "DevOps",
    description: "Streamlined CI/CD pipelines and automated deployments for faster, reliable software delivery.",
    features: ["CI/CD Automation", "Infrastructure as Code", "Containerization & K8s", "Monitoring & Logging"],
    href: "/services/devops",
  },
  {
    icon: Users,
    title: "IT Consulting",
    description: "Strategic technology guidance to align your IT investments with your business goals.",
    features: ["Digital Transformation", "IT Strategy & Planning", "Technology Audits", "Risk Management"],
    href: "/services/it-consulting",
  },
  {
    icon: Database,
    title: "Dedicated Developers",
    description: "Augment your workforce with our expert engineers and accelerate your project timelines.",
    features: ["Vetted Senior Engineers", "Flexible Engagement Models", "Seamless Integration", "Agile Methodologies"],
    href: "/services/dedicated-developers",
  },
];

// Home overview — two large category cards.
export const serviceCategories: ServiceCategory[] = [
  {
    id: "websites",
    icon: Globe,
    title: "Website Development",
    subtitle: "Your highest-performing sales asset",
    description:
      "Conversion-engineered websites that turn traffic into qualified leads and revenue, fast, credible, and built to rank.",
    items: [
      "Static Websites",
      "Dynamic Websites",
      "E-Commerce",
      "Responsive Business Sites",
      "SEO-Friendly Builds",
    ],
  },
  {
    id: "apps",
    icon: Smartphone,
    title: "App Development",
    subtitle: "Own a place on every customer's screen",
    description:
      "Mobile and web apps that deepen engagement, unlock new revenue streams, and keep customers coming back.",
    items: [
      "iOS Apps",
      "Android Apps",
      "Cross-Platform Apps",
      "Progressive Web Apps",
      "App UI/UX Design",
      "App Maintenance",
    ],
  },
  {
    id: "systems",
    icon: LayoutDashboard,
    title: "System Development",
    subtitle: "Automate the work that drains your margin",
    description:
      "Custom ERP, CRM, and LMS platforms that eliminate manual work, centralize data, and cut operating cost as you scale.",
    items: [
      "Inventory Management",
      "CRM Systems",
      "Billing Systems",
      "Learning Management",
      "ERP Platforms",
      "BI Dashboards",
      "E-Commerce Systems",
    ],
  },
  {
    id: "business-intelligence",
    icon: LineChart,
    title: "Business Intelligence",
    subtitle: "Decisions backed by evidence, not instinct",
    description:
      "Dashboards and analytics that turn scattered data into the clear, real-time insight leaders act on.",
    items: [
      "BI Dashboards",
      "Data Visualization",
      "Reporting & Analytics",
      "KPI Tracking",
      "Data Warehousing",
      "Predictive Insights",
    ],
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Media Services",
    subtitle: "Turn attention into pipeline",
    description:
      "Strategy-led content and campaigns that build authority, grow reach, and convert audiences into paying customers.",
    items: [
      "Content Creation",
      "Script Writing",
      "Video Production",
      "Social Media Handling",
      "Reels & Graphic Posts",
      "Blog Content",
      "Paid Boosting",
      "Analytics & Strategy",
    ],
  },
];

export const websiteServices: ServiceItem[] = [
  {
    icon: Globe,
    title: "Static Website",
    description: "Instant-loading sites that build instant credibility and capture every visitor's attention.",
  },
  {
    icon: LayoutDashboard,
    title: "Dynamic Website",
    description: "Content you control in minutes, so marketing moves at the speed of your business, no developer required.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    description: "Storefronts engineered to convert browsers into buyers and sell around the clock.",
  },
  {
    icon: Smartphone,
    title: "Responsive Business Website",
    description: "A flawless experience on every device, so you never lose a customer to a broken layout.",
  },
  {
    icon: Search,
    title: "SEO-Friendly Website",
    description: "Built to rank, so your best customers find you first, and you spend less on ads to reach them.",
  },
];

export const appServices: ServiceItem[] = [
  {
    icon: Smartphone,
    title: "iOS App Development",
    description: "Premium iPhone and iPad experiences that keep high-value customers engaged and loyal.",
  },
  {
    icon: TabletSmartphone,
    title: "Android App Development",
    description: "Reach the widest possible market with fast, reliable apps that scale to millions of users.",
  },
  {
    icon: MonitorSmartphone,
    title: "Cross-Platform Apps",
    description: "One investment, every device, reach your entire audience faster and at lower cost.",
  },
  {
    icon: AppWindow,
    title: "Progressive Web Apps",
    description: "App-grade experiences without the app store, driving engagement at a fraction of the cost.",
  },
  {
    icon: Palette,
    title: "App UI/UX Design",
    description: "Intuitive design that lifts adoption, retention, and the lifetime value of every user.",
  },
  {
    icon: Wrench,
    title: "App Maintenance & Support",
    description: "Proactive monitoring and updates that protect uptime, reputation, and revenue.",
  },
];

export const systemServices: ServiceItem[] = [
  {
    icon: Boxes,
    title: "Inventory Management System",
    description: "Real-time stock visibility that eliminates waste, stockouts, and the cost of guesswork.",
  },
  {
    icon: Users,
    title: "CRM System",
    description: "One source of truth for every lead and customer, so no revenue slips through the cracks.",
  },
  {
    icon: Receipt,
    title: "Billing System",
    description: "Automated invoicing and payments that accelerate cash flow and end manual errors.",
  },
  {
    icon: GraduationCap,
    title: "Learning Management System",
    description: "Deliver training at scale, track outcomes, and turn learning into a revenue channel.",
  },
  {
    icon: Server,
    title: "ERP System",
    description: "Unify finance, HR, inventory, and operations to cut cost and run leaner as you grow.",
  },
  {
    icon: BarChart3,
    title: "BI Implementation",
    description: "Turn raw data into the dashboards and decisions that drive measurable growth.",
  },
  {
    icon: Store,
    title: "E-Commerce System",
    description: "A scalable backend for catalogs, orders, and multi-channel selling that grows with demand.",
  },
];

export const biServices: ServiceItem[] = [
  {
    icon: LayoutDashboard,
    title: "BI Dashboards",
    description: "Real-time visibility into the metrics that move the business, on a single screen.",
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    description: "Complex data made instantly clear, so teams align and act faster.",
  },
  {
    icon: PieChart,
    title: "Reporting & Analytics",
    description: "Automated reporting that reveals exactly what's driving revenue, and what's driving cost.",
  },
  {
    icon: TrendingUp,
    title: "KPI & Performance Tracking",
    description: "Live scorecards that keep every team accountable to the numbers that matter.",
  },
  {
    icon: Database,
    title: "Data Warehousing",
    description: "One clean, unified data foundation that turns fragmented systems into a strategic asset.",
  },
  {
    icon: Brain,
    title: "Predictive Insights",
    description: "Forecasting that helps you act before the market (and the competition) does.",
  },
];

export const socialMediaServices: ServiceItem[] = [
  {
    icon: Camera,
    title: "Content Creation",
    description: "Scroll-stopping content that builds authority and keeps your brand top of mind.",
  },
  {
    icon: PenLine,
    title: "Script Writing",
    description: "On-brand storytelling that turns passive views into engagement and action.",
  },
  {
    icon: Film,
    title: "Video Production",
    description: "High-impact video that earns attention and drives measurable reach.",
  },
  {
    icon: Megaphone,
    title: "Social Media Handling",
    description: "End-to-end management that keeps your brand consistent, active, and growing.",
  },
  {
    icon: Clapperboard,
    title: "Reels & Graphic Posts",
    description: "Trend-ready creative engineered to expand reach and grow your audience.",
  },
  {
    icon: Newspaper,
    title: "Blog Content",
    description: "SEO-driven articles that build authority and compound organic traffic over time.",
  },
  {
    icon: Rocket,
    title: "Paid Boosting",
    description: "Targeted campaigns that maximize reach and return on every ad dollar.",
  },
  {
    icon: PieChart,
    title: "Analytics & Strategy",
    description: "Data-driven strategy that keeps your growth measurable and on track.",
  },
];

export type { LucideIcon };
