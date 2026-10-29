import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  BriefcaseBusiness,
  Upload,
} from "lucide-react";
import {
  listCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  deleteCaseStudy,
  type CaseStudyInput,
} from "@/services/admin";
import { uploadPortfolioImage } from "@/services/storage";
import {
  normalizeCaseStudyContent,
  EMPTY_CASE_STUDY_CONTENT,
  type CaseStudyContent,
} from "@/services/caseStudies";
import type { CaseStudyRow } from "@/types/database";
import {
  PageHeader,
  Modal,
  Alert,
  Field,
  Badge,
  inputCls,
  IconButton,
  ConfirmDialog,
  EmptyState,
  FormActions,
  AdminTable,
  type Column,
} from "@/components/admin/ui";
import { Skeleton } from "@/components/common/Skeleton";
import { useToast } from "@/components/common/Toast";
import { cn, formatDate } from "@/lib/utils";

const PAGE_SIZE = 10;
const STATUS_FILTERS = ["all", "published", "draft"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const splitCsv = (v: string): string[] => v.split(",").map((s) => s.trim()).filter(Boolean);

const EMPTY: CaseStudyInput = {
  slug: "",
  client: "",
  category: "",
  industry: "",
  summary: "",
  platform: "",
  duration: "",
  image: "",
  accent: "blue",
  icon: "BriefcaseBusiness",
  challenge: "",
  solution_short: "",
  tags: [],
  content: EMPTY_CASE_STUDY_CONTENT,
  status: "draft",
  published_at: null,
};

export default function CaseStudiesAdmin() {
  const toast = useToast();
  const [studies, setStudies] = useState<CaseStudyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState<CaseStudyRow | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<CaseStudyRow | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studies.filter((p) => {
      if (status !== "all" && p.status !== status) return false;
      if (!q) return true;
      const haystack = [p.client, p.slug, p.category, p.industry, ...(p.tags ?? [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [studies, query, status]);

  useEffect(() => {
    setPage(1);
  }, [query, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const load = async () => {
    const res = await listCaseStudies();
    if (res.error) setError(res.error);
    else setStudies(res.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSaved = (saved: CaseStudyRow, isNew: boolean) => {
    setStudies((prev) => {
      const next = isNew
        ? [saved, ...prev]
        : prev.map((p) => (p.id === saved.id ? saved : p));
      return [...next].sort((a, b) => b.updated_at.localeCompare(a.updated_at));
    });
    setCreating(false);
    setEditing(null);
    toast.success(isNew ? "Case study created." : "Changes saved.");
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    const res = await deleteCaseStudy(deleting.id);
    setDeleteBusy(false);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    setStudies((prev) => prev.filter((p) => p.id !== deleting.id));
    setDeleting(null);
    toast.success("Case study deleted.");
  };

  const columns: Column<CaseStudyRow>[] = [
    {
      key: "client",
      header: "Client",
      cell: (study) => (
        <>
          <p className="font-medium text-[#212529]">{study.client}</p>
          <p className="text-xs text-[#6c757d]">/{study.slug}</p>
          <div className="mt-1 sm:hidden">
            <StatusBadge status={study.status} />
          </div>
        </>
      ),
    },
    {
      key: "status",
      header: "Status",
      className: "hidden sm:table-cell",
      cell: (study) => <StatusBadge status={study.status} />,
    },
    {
      key: "updated",
      header: "Updated",
      className: "hidden text-[#6c757d] md:table-cell",
      cell: (study) => formatDate(study.updated_at),
    },
    {
      key: "actions",
      header: "Actions",
      headerClassName: "text-right",
      cell: (study) => (
        <div className="flex justify-end gap-1">
          <IconButton label="Edit" onClick={() => setEditing(study)}>
            <Pencil size={16} />
          </IconButton>
          <IconButton label="Delete" danger onClick={() => setDeleting(study)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Case Studies"
        subtitle="Manage portfolio case studies shown on the website."
        action={
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-2 rounded-[3px] bg-[#007bff] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0069d9]"
          >
            <Plus size={16} />
            New case study
          </button>
        }
      />

      {error && <Alert kind="error">{error}</Alert>}

      {loading ? (
        <ListSkeleton />
      ) : studies.length === 0 ? (
        <EmptyState
          icon={BriefcaseBusiness}
          title="No case studies yet"
          description="Add your first case study to showcase your portfolio."
          action={
            <button
              onClick={() => setCreating(true)}
              className="inline-flex items-center gap-2 rounded-[3px] bg-[#007bff] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0069d9]"
            >
              <Plus size={16} />
              New case study
            </button>
          }
        />
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex rounded-[3px] border border-[#ced4da] bg-white p-1">
              {STATUS_FILTERS.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={cn(
                    "rounded-[2px] px-3 py-1.5 text-sm font-medium capitalize transition-colors",
                    status === s
                      ? "bg-[#e2e8f0] text-[#212529]"
                      : "text-[#6c757d] hover:bg-[#f8f9fa] hover:text-[#212529]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="relative max-w-sm flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6c757d]"
              />
              <input
                type="text"
                placeholder="Search case studies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={cn(inputCls, "pl-9")}
              />
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-[3px] border border-[#dee2e6] bg-white p-8 text-center text-sm text-[#6c757d]">
              No case studies match your search.
            </div>
          ) : (
            <AdminTable columns={columns} rows={visible} rowKey={(r) => r.id} />
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-[#6c757d]">
                Showing {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
                {Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <IconButton
                  label="Previous"
                  onClick={() => setPage(Math.max(1, page - 1))}
                  busy={page === 1}
                >
                  <ChevronLeft size={16} />
                </IconButton>
                <IconButton
                  label="Next"
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  busy={page === totalPages}
                >
                  <ChevronRight size={16} />
                </IconButton>
              </div>
            </div>
          )}
        </div>
      )}

      {(creating || editing) && (
        <CaseStudyForm
          initial={editing || EMPTY}
          onCancel={() => {
            setCreating(false);
            setEditing(null);
          }}
          onSaved={(saved) => handleSaved(saved, creating)}
        />
      )}

      <ConfirmDialog
        open={deleting !== null}
        onClose={() => !deleteBusy && setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete case study?"
        busy={deleteBusy}
      >
        Are you sure you want to delete <strong>{deleting?.client}</strong>? This cannot be undone.
      </ConfirmDialog>
    </div>
  );
}

function StatusBadge({ status }: { status: CaseStudyRow["status"] }) {
  if (status === "published") {
    return <Badge tone="green">Published</Badge>;
  }
  return <Badge tone="neutral">Draft</Badge>;
}

function ListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-10 w-[250px]" />
      </div>
      <div className="rounded-[3px] border border-[#dee2e6] bg-white">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-[#dee2e6] p-4 last:border-0">
            <Skeleton className="h-5 w-[120px] mb-2" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function CaseStudyForm({
  initial,
  onCancel,
  onSaved,
}: {
  initial: Partial<CaseStudyRow> & Pick<CaseStudyRow, "status">;
  onCancel: () => void;
  onSaved: (saved: CaseStudyRow) => void;
}) {
  const [data, setData] = useState<CaseStudyInput>({
    slug: initial.slug || "",
    client: initial.client || "",
    category: initial.category || "",
    industry: initial.industry || "",
    summary: initial.summary || "",
    platform: initial.platform || "",
    duration: initial.duration || "",
    image: initial.image || "",
    accent: initial.accent || "blue",
    icon: initial.icon || "BriefcaseBusiness",
    challenge: initial.challenge || "",
    solution_short: initial.solution_short || "",
    tags: initial.tags || [],
    content: normalizeCaseStudyContent(initial.content),
    status: initial.status || "draft",
    published_at: initial.published_at || null,
  });
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<"general" | "content">("general");
  const [busy, setBusy] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tagsText, setTagsText] = useState((initial.tags || []).join(", "));

  const content = data.content as CaseStudyContent;
  const setContent = <K extends keyof CaseStudyContent>(key: K, value: CaseStudyContent[K]) => {
    setData((prev) => ({ ...prev, content: { ...(prev.content as CaseStudyContent), [key]: value } }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const { url, error } = await uploadPortfolioImage(file);
    setUploadingImage(false);

    if (error) {
      toast.error(error);
      return;
    }

    if (url) {
      setData((prev) => ({ ...prev, image: url }));
      toast.success("Image uploaded successfully.");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    // Flush the tags text directly rather than trusting `data.tags` — an
    // Enter-key submit can fire before the field's onBlur commits the value.
    const payload = { ...data, tags: splitCsv(tagsText) };

    const isNew = !("id" in initial);
    const res = isNew
      ? await createCaseStudy(payload)
      : await updateCaseStudy(initial.id as string, payload, initial.status!);

    setBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    if (res.data) onSaved(res.data);
  };

  return (
    <Modal
      open
      onClose={() => !busy && onCancel()}
      title={"id" in initial ? "Edit Case Study" : "New Case Study"}
      wide
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <Alert kind="error">{error}</Alert>}

        <div className="flex gap-2 border-b border-[#dee2e6] mb-4">
          {(["general", "content"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium border-b-2 -mb-[1px] transition-colors",
                activeTab === tab
                  ? "border-[#007bff] text-[#007bff]"
                  : "border-transparent text-[#6c757d] hover:text-[#212529]"
              )}
            >
              {tab === "general" ? "General Information" : "Detailed Content"}
            </button>
          ))}
        </div>

        {activeTab === "general" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Client Name" htmlFor="client">
                <input
                  id="client"
                  type="text"
                  required
                  value={data.client}
                  onChange={(e) => {
                    const client = e.target.value;
                    setData((prev) => ({
                      ...prev,
                      client,
                      slug: !("id" in initial) ? slugify(client) : prev.slug,
                    }));
                  }}
                  className={inputCls}
                />
              </Field>
              <Field label="Slug (URL path)" htmlFor="slug">
                <input
                  id="slug"
                  type="text"
                  required
                  value={data.slug}
                  onChange={(e) =>
                    setData({ ...data, slug: slugify(e.target.value) })
                  }
                  className={inputCls}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Category" htmlFor="category">
                <input
                  id="category"
                  type="text"
                  required
                  value={data.category}
                  onChange={(e) => setData({ ...data, category: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. ERP System"
                />
              </Field>
              <Field label="Industry" htmlFor="industry">
                <input
                  id="industry"
                  type="text"
                  required
                  value={data.industry}
                  onChange={(e) => setData({ ...data, industry: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. Manufacturing"
                />
              </Field>
            </div>

            <Field label="Summary" htmlFor="summary">
              <textarea
                id="summary"
                rows={2}
                required
                value={data.summary}
                onChange={(e) => setData({ ...data, summary: e.target.value })}
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Platform" htmlFor="platform">
                <input
                  id="platform"
                  type="text"
                  required
                  value={data.platform}
                  onChange={(e) => setData({ ...data, platform: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. Web & Mobile"
                />
              </Field>
              <Field label="Duration" htmlFor="duration">
                <input
                  id="duration"
                  type="text"
                  required
                  value={data.duration}
                  onChange={(e) => setData({ ...data, duration: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. 6 Months"
                />
              </Field>
            </div>

            <Field label="Cover Image URL" htmlFor="image">
              <div className="flex gap-2">
                <input
                  id="image"
                  type="text"
                  required
                  value={data.image}
                  onChange={(e) => setData({ ...data, image: e.target.value })}
                  className={cn(inputCls, "flex-1")}
                  placeholder="/images/portfolio/..."
                />
                <label
                  className={cn(
                    "flex cursor-pointer items-center justify-center gap-2 rounded-[3px] border border-[#ced4da] bg-white px-3 py-2 text-sm font-medium text-[#495057] transition-colors hover:bg-[#f8f9fa]",
                    uploadingImage && "opacity-50 pointer-events-none"
                  )}
                >
                  <Upload size={16} />
                  {uploadingImage ? "Uploading..." : "Upload"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Accent Color" htmlFor="accent">
                <select
                  id="accent"
                  value={data.accent}
                  onChange={(e) => setData({ ...data, accent: e.target.value })}
                  className={cn(inputCls, "bg-white")}
                >
                  <option value="blue">Blue</option>
                  <option value="cyan">Cyan</option>
                  <option value="violet">Violet</option>
                  <option value="rose">Rose</option>
                  <option value="amber">Amber</option>
                </select>
              </Field>
              <Field label="Icon" htmlFor="icon">
                <input
                  id="icon"
                  type="text"
                  required
                  value={data.icon}
                  onChange={(e) => setData({ ...data, icon: e.target.value })}
                  className={inputCls}
                  placeholder="e.g. ShoppingBag"
                />
              </Field>
            </div>

            <Field label="Tags (comma-separated)" htmlFor="tags">
              <input
                id="tags"
                type="text"
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                onBlur={() => setData((prev) => ({ ...prev, tags: splitCsv(tagsText) }))}
                className={inputCls}
                placeholder="React, Node.js, AWS"
              />
            </Field>

            <Field label="Challenge (Short)" htmlFor="challenge">
              <textarea
                id="challenge"
                rows={2}
                required
                value={data.challenge}
                onChange={(e) => setData({ ...data, challenge: e.target.value })}
                className={inputCls}
              />
            </Field>

            <Field label="Solution (Short)" htmlFor="solution_short">
              <textarea
                id="solution_short"
                rows={2}
                required
                value={data.solution_short}
                onChange={(e) => setData({ ...data, solution_short: e.target.value })}
                className={inputCls}
              />
            </Field>
            
            <div className="border-t border-[#dee2e6] my-4 pt-4">
              <Field label="Status" htmlFor="status">
                <select
                  id="status"
                  value={data.status}
                  onChange={(e) =>
                    setData({ ...data, status: e.target.value as "draft" | "published" })
                  }
                  className={cn(inputCls, "bg-white max-w-[200px]")}
                >
                  <option value="draft">Draft (Hidden)</option>
                  <option value="published">Published (Live)</option>
                </select>
              </Field>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-sm text-[#6c757d]">
              These sections power the rest of the case study page — leave a section blank and
              it's simply hidden on the page.
            </p>

            <ContentSection title="Client Overview">
              <Field label="Company description" hint="Who they are, in a sentence or two.">
                <textarea
                  rows={2}
                  className={inputCls}
                  value={content.overview.company}
                  onChange={(e) =>
                    setContent("overview", { ...content.overview, company: e.target.value })
                  }
                />
              </Field>
              <Field label="Background" hint="The situation before this project.">
                <textarea
                  rows={3}
                  className={inputCls}
                  value={content.overview.background}
                  onChange={(e) =>
                    setContent("overview", { ...content.overview, background: e.target.value })
                  }
                />
              </Field>
              <StringListField
                label="Primary objectives"
                values={content.overview.goals}
                onChange={(v) => setContent("overview", { ...content.overview, goals: v })}
              />
            </ContentSection>

            <ContentSection title="Business Challenges">
              <Field label="Description">
                <textarea
                  rows={2}
                  className={inputCls}
                  value={content.challenges.description}
                  onChange={(e) =>
                    setContent("challenges", { ...content.challenges, description: e.target.value })
                  }
                />
              </Field>
              <StringListField
                label="Key challenges"
                values={content.challenges.points}
                onChange={(v) => setContent("challenges", { ...content.challenges, points: v })}
              />
            </ContentSection>

            <ContentSection title="The Solution">
              <Field label="Our approach" hint="How the problem was solved.">
                <textarea
                  rows={3}
                  className={inputCls}
                  value={content.solution.approach}
                  onChange={(e) =>
                    setContent("solution", { ...content.solution, approach: e.target.value })
                  }
                />
              </Field>
              <StringListField
                label="Key features"
                values={content.solution.features}
                onChange={(v) => setContent("solution", { ...content.solution, features: v })}
              />
            </ContentSection>

            <ContentSection title="Development Process">
              <Field label="Methodology">
                <input
                  className={inputCls}
                  placeholder="e.g. Agile Scrum"
                  value={content.developmentProcess.methodology}
                  onChange={(e) =>
                    setContent("developmentProcess", {
                      ...content.developmentProcess,
                      methodology: e.target.value,
                    })
                  }
                />
              </Field>
              <MilestoneListField
                values={content.developmentProcess.milestones}
                onChange={(v) =>
                  setContent("developmentProcess", { ...content.developmentProcess, milestones: v })
                }
              />
            </ContentSection>

            <ContentSection title="Measurable Results">
              <Field label="Business impact summary">
                <textarea
                  rows={2}
                  className={inputCls}
                  value={content.results.businessImpact}
                  onChange={(e) =>
                    setContent("results", { ...content.results, businessImpact: e.target.value })
                  }
                />
              </Field>
              <KpiListField
                values={content.results.kpis}
                onChange={(v) => setContent("results", { ...content.results, kpis: v })}
              />
              <StringListField
                label="Key outcomes"
                values={content.results.outcomes}
                onChange={(v) => setContent("results", { ...content.results, outcomes: v })}
              />
            </ContentSection>

            <ContentSection title="Project Gallery">
              <GalleryField values={content.gallery} onChange={(v) => setContent("gallery", v)} />
            </ContentSection>

            <ContentSection title="Client Testimonial">
              <p className="text-sm text-[#6c757d]">
                Optional. Only add a real quote the client has approved for publishing. Leave the quote
                empty and no testimonial is shown on the case study.
              </p>
              <Field label="Quote">
                <textarea
                  rows={3}
                  className={inputCls}
                  value={content.testimonial.quote}
                  onChange={(e) =>
                    setContent("testimonial", { ...content.testimonial, quote: e.target.value })
                  }
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Author name">
                  <input
                    className={inputCls}
                    value={content.testimonial.author}
                    onChange={(e) =>
                      setContent("testimonial", { ...content.testimonial, author: e.target.value })
                    }
                  />
                </Field>
                <Field label="Position">
                  <input
                    className={inputCls}
                    placeholder="e.g. Founder & CEO"
                    value={content.testimonial.position}
                    onChange={(e) =>
                      setContent("testimonial", { ...content.testimonial, position: e.target.value })
                    }
                  />
                </Field>
                <Field label="Company">
                  <input
                    className={inputCls}
                    value={content.testimonial.company}
                    onChange={(e) =>
                      setContent("testimonial", { ...content.testimonial, company: e.target.value })
                    }
                  />
                </Field>
                <Field label="Photo">
                  <ImageUrlField
                    value={content.testimonial.image}
                    onChange={(url) =>
                      setContent("testimonial", { ...content.testimonial, image: url })
                    }
                  />
                </Field>
              </div>
            </ContentSection>
          </div>
        )}

        <FormActions onCancel={onCancel} busy={busy} submitLabel="Save Case Study" />
      </form>
    </Modal>
  );
}

/** Bordered block that groups one part of the Detailed Content tab. */
function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-[3px] border border-[#dee2e6] bg-[#f9fafb] p-4 space-y-4">
      <h4 className="text-sm font-semibold text-[#212529]">{title}</h4>
      {children}
    </div>
  );
}

/** Editable string array as one-item-per-line text, so full sentences with commas stay intact. */
function StringListField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <Field label={label} hint="One item per line.">
      <textarea
        rows={Math.max(2, Math.min(6, values.length + 1))}
        className={inputCls}
        value={values.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n"))}
        onBlur={(e) =>
          onChange(
            e.target.value
              .split("\n")
              .map((v) => v.trim())
              .filter(Boolean)
          )
        }
      />
    </Field>
  );
}

/** Repeatable label/value rows for the Results KPI grid. */
function KpiListField({
  values,
  onChange,
}: {
  values: { label: string; value: string }[];
  onChange: (next: { label: string; value: string }[]) => void;
}) {
  const update = (idx: number, key: "label" | "value", v: string) =>
    onChange(values.map((k, i) => (i === idx ? { ...k, [key]: v } : k)));
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const add = () => onChange([...values, { label: "", value: "" }]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#212529]">Key metrics (KPIs)</label>
      {values.map((kpi, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            className={cn(inputCls, "flex-1")}
            placeholder="Label, e.g. Fulfillment Speed"
            value={kpi.label}
            onChange={(e) => update(idx, "label", e.target.value)}
          />
          <input
            className={cn(inputCls, "max-w-[140px]")}
            placeholder="Value, e.g. +40%"
            value={kpi.value}
            onChange={(e) => update(idx, "value", e.target.value)}
          />
          <IconButton label="Remove metric" danger onClick={() => remove(idx)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm font-medium text-[#007bff] hover:underline"
      >
        + Add metric
      </button>
    </div>
  );
}

/** Repeatable title/description rows for the Development Process timeline. */
function MilestoneListField({
  values,
  onChange,
}: {
  values: { title: string; desc: string }[];
  onChange: (next: { title: string; desc: string }[]) => void;
}) {
  const update = (idx: number, key: "title" | "desc", v: string) =>
    onChange(values.map((m, i) => (i === idx ? { ...m, [key]: v } : m)));
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const add = () => onChange([...values, { title: "", desc: "" }]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[#212529]">Milestones</label>
      {values.map((m, idx) => (
        <div key={idx} className="flex gap-2 items-start rounded-[3px] border border-[#ced4da] bg-white p-3">
          <div className="flex-1 space-y-2">
            <input
              className={inputCls}
              placeholder="Milestone title, e.g. Discovery & Architecture"
              value={m.title}
              onChange={(e) => update(idx, "title", e.target.value)}
            />
            <textarea
              rows={2}
              className={inputCls}
              placeholder="What happened in this phase"
              value={m.desc}
              onChange={(e) => update(idx, "desc", e.target.value)}
            />
          </div>
          <IconButton label="Remove milestone" danger onClick={() => remove(idx)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm font-medium text-[#007bff] hover:underline"
      >
        + Add milestone
      </button>
    </div>
  );
}

/** A single image URL field with an upload-to-storage shortcut. Shared by gallery rows and the testimonial photo. */
function ImageUrlField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}) {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    const { url, error } = await uploadPortfolioImage(file);
    setUploading(false);
    if (error) {
      toast.error(error);
      return;
    }
    if (url) onChange(url);
  };

  return (
    <div className="flex gap-2">
      <input
        className={cn(inputCls, "flex-1")}
        placeholder={placeholder || "https://..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <label
        className={cn(
          "flex cursor-pointer items-center justify-center gap-2 rounded-[3px] border border-[#ced4da] bg-white px-3 py-2 text-sm font-medium text-[#495057] transition-colors hover:bg-[#f8f9fa]",
          uploading && "opacity-50 pointer-events-none"
        )}
      >
        <Upload size={16} />
        {uploading ? "Uploading..." : "Upload"}
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
      </label>
    </div>
  );
}

/** Gallery images: a list of {@link ImageUrlField} rows plus add/remove. */
function GalleryField({
  values,
  onChange,
}: {
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const update = (idx: number, v: string) => onChange(values.map((u, i) => (i === idx ? v : u)));
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const add = () => onChange([...values, ""]);

  return (
    <div className="space-y-2">
      {values.map((url, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <div className="flex-1">
            <ImageUrlField value={url} onChange={(v) => update(idx, v)} placeholder="Gallery image URL" />
          </div>
          <IconButton label="Remove image" danger onClick={() => remove(idx)}>
            <Trash2 size={16} />
          </IconButton>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm font-medium text-[#007bff] hover:underline"
      >
        + Add gallery image
      </button>
    </div>
  );
}
