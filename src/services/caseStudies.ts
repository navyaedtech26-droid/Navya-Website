import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import type { CaseStudyRow } from "@/types/database";

const log = logger.scope("caseStudies");

export interface CaseStudyContent {
  overview: { company: string; goals: string[]; background: string; };
  challenges: { description: string; painPoints: string[]; technicalLimitations: string[]; };
  solution: { architecture: string; features: string[]; approach: string; design: string; };
  techStack: { frontend: string[]; backend: string[]; cloud: string[]; database: string[]; devops: string[]; ai?: string[]; };
  developmentProcess: { timeline: string; methodology: string; milestones: { title: string; desc: string }[]; };
  results: { businessImpact: string; kpis: { label: string; value: string }[]; performance: string[]; outcomes: string[]; };
  gallery: string[];
  testimonial: { quote: string; author: string; position: string; company: string; image: string; };
}

export type CaseStudy = Omit<CaseStudyRow, "content"> & { content: CaseStudyContent };

export async function getPublishedCaseStudies(limit = 20): Promise<CaseStudy[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("status", "published")
    .is("deleted_at", null)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    log.error("list failed", error);
    return [];
  }
  return (data ?? []) as CaseStudy[];
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .is("deleted_at", null)
    .maybeSingle();

  if (error) {
    log.error("getBySlug failed", error);
    return null;
  }
  return data as CaseStudy;
}

export async function getRelatedCaseStudies(
  study: Pick<CaseStudy, "id" | "category" | "tags">,
  limit = 3
): Promise<CaseStudy[]> {
  if (!isSupabaseConfigured || !supabase) return [];

  const { data, error } = await supabase
    .from("case_studies")
    .select("*")
    .eq("status", "published")
    .is("deleted_at", null)
    .neq("id", study.id)
    .order("published_at", { ascending: false })
    .limit(30);

  if (error) {
    log.error("related failed", error);
    return [];
  }

  const tags = new Set((study.tags ?? []).map((t) => t.toLowerCase()));
  const scored = (data ?? []).map((candidate) => {
    let score = 0;
    if (study.category && candidate.category === study.category) score += 3;
    for (const tag of candidate.tags ?? []) {
      if (tags.has(tag.toLowerCase())) score += 1;
    }
    return { candidate, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.candidate) as CaseStudy[];
}
