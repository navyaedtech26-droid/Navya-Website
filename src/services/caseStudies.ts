import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { logger } from "@/lib/logger";
import type { CaseStudyRow } from "@/types/database";

const log = logger.scope("caseStudies");

/**
 * Canonical, deliberately lean shape of the `content` JSON column.
 *
 * A few earlier fields were folded into these to cut client-facing form
 * complexity (see `normalizeCaseStudyContent` below, which migrates any
 * older-shaped rows on read so nothing already saved is lost):
 * - `challenges.painPoints` + `challenges.technicalLimitations` -> `challenges.points`
 * - `solution.architecture` + `solution.approach` + `solution.design` -> `solution.approach`
 * - `results.performance` + `results.outcomes` -> `results.outcomes`
 * - `developmentProcess.timeline` -> dropped; the page uses the top-level `duration` instead
 * - `techStack.*` (6 categorized arrays) -> dropped; the page uses the top-level `tags` instead
 */
export interface CaseStudyContent {
  overview: { company: string; goals: string[]; background: string };
  challenges: { description: string; points: string[] };
  solution: { approach: string; features: string[] };
  developmentProcess: { methodology: string; milestones: { title: string; desc: string }[] };
  results: { businessImpact: string; kpis: { label: string; value: string }[]; outcomes: string[] };
  gallery: string[];
  testimonial: { quote: string; author: string; position: string; company: string; image: string };
}

export const EMPTY_CASE_STUDY_CONTENT: CaseStudyContent = {
  overview: { company: "", goals: [], background: "" },
  challenges: { description: "", points: [] },
  solution: { approach: "", features: [] },
  developmentProcess: { methodology: "", milestones: [] },
  results: { businessImpact: "", kpis: [], outcomes: [] },
  gallery: [],
  testimonial: { quote: "", author: "", position: "", company: "", image: "" },
};

const asStringArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

/**
 * Normalizes raw `content` JSON (from the DB, in any shape it happens to be
 * in) into the current canonical {@link CaseStudyContent}, folding legacy
 * fields into their replacements so older rows keep displaying in full. Used
 * by both the public case study page and the admin editor, so they always
 * agree on what a case study's content looks like.
 */
export function normalizeCaseStudyContent(raw: unknown): CaseStudyContent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw DB JSON, shape not guaranteed
  const c = (raw && typeof raw === "object" ? raw : {}) as Record<string, any>;
  const overview = c.overview ?? {};
  const challenges = c.challenges ?? {};
  const solution = c.solution ?? {};
  const developmentProcess = c.developmentProcess ?? {};
  const results = c.results ?? {};
  const testimonial = c.testimonial ?? {};

  const approachParts = [solution.architecture, solution.approach, solution.design].filter(
    (v): v is string => typeof v === "string" && v.trim().length > 0
  );

  return {
    overview: {
      company: overview.company ?? "",
      goals: asStringArray(overview.goals),
      background: overview.background ?? "",
    },
    challenges: {
      description: challenges.description ?? "",
      points: challenges.points
        ? asStringArray(challenges.points)
        : [...asStringArray(challenges.painPoints), ...asStringArray(challenges.technicalLimitations)],
    },
    solution: {
      approach: approachParts.join("\n\n"),
      features: asStringArray(solution.features),
    },
    developmentProcess: {
      methodology: developmentProcess.methodology ?? "",
      milestones: Array.isArray(developmentProcess.milestones) ? developmentProcess.milestones : [],
    },
    results: {
      businessImpact: results.businessImpact ?? "",
      kpis: Array.isArray(results.kpis) ? results.kpis : [],
      outcomes: [...asStringArray(results.outcomes), ...asStringArray(results.performance)],
    },
    gallery: asStringArray(c.gallery),
    testimonial: {
      quote: testimonial.quote ?? "",
      author: testimonial.author ?? "",
      position: testimonial.position ?? "",
      company: testimonial.company ?? "",
      image: testimonial.image ?? "",
    },
  };
}

export type CaseStudy = Omit<CaseStudyRow, "content"> & { content: CaseStudyContent };

function withNormalizedContent(row: CaseStudyRow): CaseStudy {
  return { ...row, content: normalizeCaseStudyContent(row.content) } as CaseStudy;
}

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
  return ((data ?? []) as CaseStudyRow[]).map(withNormalizedContent);
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
  return data ? withNormalizedContent(data as CaseStudyRow) : null;
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
  const scored = ((data ?? []) as CaseStudyRow[]).map(withNormalizedContent).map((candidate) => {
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
