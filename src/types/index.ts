import type { LucideIcon } from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
}

export interface ServiceCategory {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
}

export interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ProcessStep {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}
