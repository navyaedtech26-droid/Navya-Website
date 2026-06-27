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
    description: "We understand your business deeply: your goals, model, and what makes you different.",
  },
  {
    step: "02",
    icon: Users,
    title: "Market & Competitor Analysis",
    description: "We study your market, audience, and competitors to find your real edge.",
  },
  {
    step: "03",
    icon: ClipboardList,
    title: "Requirement Analysis",
    description: "We identify the right requirements and the opportunities worth pursuing.",
  },
  {
    step: "04",
    icon: Lightbulb,
    title: "Smart Solutions",
    description: "We provide the best strategies and digital solutions tailored to your needs.",
  },
  {
    step: "05",
    icon: TrendingUp,
    title: "Growth Support",
    description: "We support and help your business grow continuously, long after launch.",
  },
];
