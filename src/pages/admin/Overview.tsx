import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Newspaper,
  MessageSquareQuote,
  Mail,
  FileEdit,
  ArrowRight,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  getDashboardStats,
  getRecentContacts,
  getOverviewCharts,
  type DashboardStats,
  type OverviewCharts,
} from "@/services/admin";
import type { ContactSubmissionRow } from "@/types/database";
import { PageHeader, Alert, Badge, Card } from "@/components/admin/ui";
import { Skeleton, SkeletonGroup } from "@/components/common/Skeleton";
import {
  TrendChart,
  BreakdownChart,
  STATUS_COLORS,
  BLOG_COLORS,
} from "@/components/admin/charts";
import { cn, formatDate } from "@/lib/utils";

const REFRESH_MS = 30_000;

export default function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [contacts, setContacts] = useState<ContactSubmissionRow[]>([]);
  const [charts, setCharts] = useState<OverviewCharts | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const inFlight = useRef(false);
  const mounted = useRef(true);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    if (inFlight.current) return;
    inFlight.current = true;
    if (opts?.silent) setRefreshing(true);

    const [s, c, ch] = await Promise.all([
      getDashboardStats(),
      getRecentContacts(6),
      getOverviewCharts(30),
    ]);

    inFlight.current = false;
    if (!mounted.current) return;

    if (s.error && !opts?.silent) setError(s.error);
    else if (!s.error) setError(null);

    if (s.data) setStats(s.data);
    if (c.data) setContacts(c.data);
    if (ch.data) setCharts(ch.data);
    setUpdatedAt(new Date());
    setLoading(false);
    setRefreshing(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();

    const tick = () => {
      if (document.visibilityState === "visible") load({ silent: true });
    };
    const id = window.setInterval(tick, REFRESH_MS);

    const onVisible = () => {
      if (document.visibilityState === "visible") load({ silent: true });
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      mounted.current = false;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [load]);

  return (
    <div className="space-y-6 max-w-7xl">
      <PageHeader
        title="Executive Overview"
        subtitle="Real-time pulse of your website's inbound inquiries, content reach, and reviews."
        action={
          <RefreshControl
            refreshing={refreshing}
            updatedAt={updatedAt}
            onRefresh={() => load({ silent: true })}
          />
        }
      />

      {error && <Alert kind="error">{error}</Alert>}

      {loading ? (
        <OverviewSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={Newspaper}
              label="Published Articles"
              value={stats?.blogsPublished ?? 0}
              hint={`${stats?.blogsTotal ?? 0} total created`}
              to="/admin/blogs"
              colorClass="bg-blue-50 text-blue-600 border-blue-100"
            />
            <MetricCard
              icon={FileEdit}
              label="Draft Insights"
              value={stats?.blogsDraft ?? 0}
              hint="In progress / review"
              to="/admin/blogs"
              colorClass="bg-amber-50 text-amber-600 border-amber-100"
            />
            <MetricCard
              icon={MessageSquareQuote}
              label="Live Testimonials"
              value={stats?.testimonialsPublished ?? 0}
              hint={`${stats?.testimonialsTotal ?? 0} submitted`}
              to="/admin/testimonials"
              colorClass="bg-emerald-50 text-emerald-600 border-emerald-100"
            />
            <MetricCard
              icon={Mail}
              label="Inbound Inquiries"
              value={stats?.contactsNew ?? 0}
              hint={`${stats?.contactsTotal ?? 0} total received`}
              to="/admin/messages"
              colorClass="bg-indigo-50 text-indigo-600 border-indigo-100"
              badge={stats?.contactsNew ? `${stats.contactsNew} new` : undefined}
            />
          </div>

          {charts && <ChartsGrid charts={charts} />}

          <Card
            title="Recent Inbound Leads"
            subtitle="The latest direct consultation requests from your contact form."
            tools={
              <Link
                to="/admin/messages"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors"
              >
                View all messages
                <ArrowRight size={13} />
              </Link>
            }
          >
            {contacts.length === 0 ? (
              <p className="text-sm text-muted-foreground py-6 text-center">
                No inquiries received yet.
              </p>
            ) : (
              <div className="divide-y divide-border/50 -mx-2">
                {contacts.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-sm text-foreground truncate">
                          {c.name}
                        </span>
                        {c.status === "new" ? (
                          <Badge tone="green">New Lead</Badge>
                        ) : (
                          <Badge tone="neutral">Reviewed</Badge>
                        )}
                        {c.service && (
                          <span className="hidden sm:inline-block text-[11px] font-semibold text-muted-foreground bg-slate-100 rounded-md px-2 py-0.5">
                            {c.service}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {c.email} {c.phone ? `· ${c.phone}` : ""}
                      </p>
                      <p className="mt-1 line-clamp-1 text-xs text-slate-600 font-normal">
                        {c.message}
                      </p>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(c.created_at)}
                      </span>
                      <Link
                        to="/admin/messages"
                        className="inline-flex items-center justify-center rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-semibold text-foreground hover:bg-slate-50 shadow-sm"
                      >
                        Inspect
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  hint,
  to,
  colorClass,
  badge,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  hint?: string;
  to: string;
  colorClass: string;
  badge?: string;
}) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg dark:bg-card"
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl border transition-transform duration-200 group-hover:scale-105",
            colorClass
          )}
        >
          <Icon className="size-5" />
        </div>
        {badge ? (
          <span className="inline-flex items-center rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600 border border-rose-200/60">
            {badge}
          </span>
        ) : (
          <div className="rounded-full bg-slate-50 p-1 text-muted-foreground/60 transition-colors group-hover:bg-primary/5 group-hover:text-primary">
            <ArrowRight size={14} />
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-3xl font-extrabold tracking-tight text-foreground">
          {value}
        </p>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-1">
          {label}
        </p>
        {hint && (
          <div className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80">
            <TrendingUp size={13} className="text-emerald-500" />
            <span>{hint}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

function OverviewSkeleton() {
  return (
    <SkeletonGroup label="Loading dashboard…" className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="mt-4 h-8 w-20 rounded-lg" />
            <Skeleton className="mt-2 h-3.5 w-28 rounded-md" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/80 bg-white p-6 lg:col-span-2 shadow-sm">
          <Skeleton className="h-4 w-40 rounded" />
          <Skeleton className="mt-4 h-64 w-full rounded-xl" />
        </div>
      </div>
    </SkeletonGroup>
  );
}

function RefreshControl({
  refreshing,
  updatedAt,
  onRefresh,
}: {
  refreshing: boolean;
  updatedAt: Date | null;
  onRefresh: () => void;
}) {
  const [, force] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => force((n) => n + 1), 5_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <span
          className={cn(
            "inline-block h-2 w-2 rounded-full",
            refreshing ? "bg-amber-400 animate-ping" : "bg-emerald-500"
          )}
        />
        {refreshing ? "Updating…" : `Updated ${timeAgo(updatedAt)}`}
      </span>
      <button
        onClick={onRefresh}
        disabled={refreshing}
        title="Refresh data"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-muted-foreground hover:text-foreground hover:bg-slate-50 transition-all disabled:opacity-60 shadow-sm"
      >
        <RefreshCw size={14} className={cn(refreshing && "animate-spin")} />
      </button>
    </div>
  );
}

function timeAgo(date: Date | null): string {
  if (!date) return "just now";
  const secs = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (secs < 5) return "just now";
  if (secs < 60) return `${secs}s ago`;
  const mins = Math.floor(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

function ChartsGrid({ charts }: { charts: OverviewCharts }) {
  const totalContacts = charts.contactsByDay.reduce((sum, d) => sum + d.count, 0);

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <Card
        title="Inbound Inquiries Velocity"
        subtitle={`Daily message flow over the last 30 days (${totalContacts} total)`}
        className="lg:col-span-2"
      >
        <div className="h-64">
          <TrendChart
            labels={charts.contactsByDay.map((d) => d.label)}
            data={charts.contactsByDay.map((d) => d.count)}
            label="Inquiries"
          />
        </div>
      </Card>

      <Card
        title="Pipeline Distribution"
        subtitle="Current status breakdown of all recorded leads"
      >
        {hasData([
          charts.contactsByStatus.new,
          charts.contactsByStatus.read,
          charts.contactsByStatus.archived,
        ]) ? (
          <div className="h-64">
            <BreakdownChart
              labels={["New Leads", "Reviewed", "Archived"]}
              data={[
                charts.contactsByStatus.new,
                charts.contactsByStatus.read,
                charts.contactsByStatus.archived,
              ]}
              colors={STATUS_COLORS}
            />
          </div>
        ) : (
          <EmptyChart label="No message status data recorded yet." />
        )}
      </Card>

      <Card
        title="Content Publishing Ratio"
        subtitle="Active live articles compared against drafts"
      >
        {hasData([charts.blogsByStatus.published, charts.blogsByStatus.draft]) ? (
          <div className="h-64">
            <BreakdownChart
              labels={["Published", "Drafts"]}
              data={[charts.blogsByStatus.published, charts.blogsByStatus.draft]}
              colors={BLOG_COLORS}
            />
          </div>
        ) : (
          <EmptyChart label="No blog posts created yet." />
        )}
      </Card>
    </div>
  );
}

function hasData(values: number[]): boolean {
  return values.some((v) => v > 0);
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-64 items-center justify-center text-xs font-medium text-muted-foreground">
      {label}
    </div>
  );
}
