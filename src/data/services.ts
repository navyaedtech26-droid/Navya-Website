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
  type LucideIcon,
} from "lucide-react";
import type { ServiceCategory, ServiceItem } from "@/types";

// Home overview — two large category cards.
export const serviceCategories: ServiceCategory[] = [
  {
    id: "websites",
    icon: Globe,
    title: "Website Development",
    subtitle: "From landing pages to full e-commerce",
    description:
      "Beautiful, fast, conversion-focused websites engineered to grow your brand and your revenue.",
    items: [
      "Static Websites",
      "Dynamic Websites",
      "E-Commerce",
      "Responsive Business Sites",
      "SEO-Friendly Builds",
    ],
  },
  {
    id: "systems",
    icon: LayoutDashboard,
    title: "System Development",
    subtitle: "Software that runs your operations",
    description:
      "Custom business platforms that automate workflows, centralize data, and scale with your team.",
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
    id: "social",
    icon: Share2,
    title: "Social Media Services",
    subtitle: "Grow your brand online",
    description:
      "Creative, strategic, and result-driven social media solutions that boost reach, engagement, and brand growth.",
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
    description: "Lightning-fast brochure sites with pixel-perfect, hand-crafted design.",
  },
  {
    icon: LayoutDashboard,
    title: "Dynamic Website",
    description: "Content-driven sites with CMS, dashboards, and live, manageable data.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce Website",
    description: "Full storefronts with carts, payments, and inventory built to convert.",
  },
  {
    icon: Smartphone,
    title: "Responsive Business Website",
    description: "Flawless layouts that adapt to every device, from phones to widescreens.",
  },
  {
    icon: Search,
    title: "SEO-Friendly Website",
    description: "Optimized structure, speed, and metadata so customers actually find you.",
  },
];

export const systemServices: ServiceItem[] = [
  {
    icon: Boxes,
    title: "Inventory Management System",
    description: "Track stock, suppliers, and movements in real time with smart alerts.",
  },
  {
    icon: Users,
    title: "CRM System",
    description: "Manage leads, customers, and pipelines from one intelligent hub.",
  },
  {
    icon: Receipt,
    title: "Billing System",
    description: "Automated invoicing, payments, and financial reporting made simple.",
  },
  {
    icon: GraduationCap,
    title: "Learning Management System",
    description: "Deliver courses, track progress, and engage learners at scale.",
  },
  {
    icon: Server,
    title: "ERP System",
    description: "Unify finance, HR, inventory, and operations in one platform.",
  },
  {
    icon: BarChart3,
    title: "BI Implementation",
    description: "Turn raw data into dashboards and decisions that drive growth.",
  },
  {
    icon: Store,
    title: "E-Commerce System",
    description: "Scalable backend for catalogs, orders, and multi-channel selling.",
  },
];

export const socialMediaServices: ServiceItem[] = [
  {
    icon: Camera,
    title: "Content Creation",
    description: "Scroll-stopping visuals and photography that capture your brand's story.",
  },
  {
    icon: PenLine,
    title: "Script Writing",
    description: "Sharp, on-brand scripts that turn views into engagement and action.",
  },
  {
    icon: Film,
    title: "Video Production",
    description: "Polished, high-impact videos crafted to perform across every platform.",
  },
  {
    icon: Megaphone,
    title: "Social Media Handling",
    description: "End-to-end account management, posting, and community engagement.",
  },
  {
    icon: Clapperboard,
    title: "Reels & Graphic Posts",
    description: "Trend-ready reels and striking graphics designed to grow your reach.",
  },
  {
    icon: Newspaper,
    title: "Blog Content",
    description: "SEO-aware articles that build authority and drive organic traffic.",
  },
  {
    icon: Rocket,
    title: "Paid Boosting",
    description: "Targeted ad campaigns that maximize reach with measurable ROI.",
  },
  {
    icon: PieChart,
    title: "Analytics & Strategy",
    description: "Data-driven insights and roadmaps that keep your growth on track.",
  },
];

export type { LucideIcon };
