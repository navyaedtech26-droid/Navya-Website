import {
  ScanSearch,
  Users,
  ClipboardList,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    icon: ScanSearch,
    title: "Business Review",
    description: "We start with your model and goals to pinpoint where digital will create the most value.",
  },
  {
    step: "02",
    icon: Users,
    title: "Market & Competitor Analysis",
    description: "We study your market and competitors to find the advantage worth investing in.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Requirement Analysis",
    description: "We scope the solution around measurable outcomes, not a feature wishlist.",
  },
  {
    step: "04",
    icon: Lightbulb,
    title: "Smart Solutions",
    description: "We deliver the strategy and platform that solves the problem and pays for itself.",
  },
  {
    step: "05",
    icon: TrendingUp,
    title: "Growth Support",
    description: "We stay on to optimize, measure, and compound your results long after launch.",
  },
];
