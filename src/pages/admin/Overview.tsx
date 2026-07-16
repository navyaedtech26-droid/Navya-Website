/**
 * Dashboard landing: at-a-glance counts for blogs, testimonials and contact
 * messages, plus the most recent contact submissions.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Newspaper,
  MessageSquareQuote,
  Mail,
  FileEdit,
  ArrowRight,
  RefreshCw,
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
  RankBarChart,
  STATUS_COLORS,
  BLOG_COLORS,
  RATING_COLORS,
} from "@/components/admin/charts";
import { cn, formatDate } from "@/lib/utils";

/** Auto-refresh cadence for the live dashboard. */
const REFRESH_MS = 30_000;

export default function Overview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [contacts, setContacts] = useState<ContactSubmissionRow[]>([]);
  const [charts, setCharts] = useState<OverviewCharts | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Guard against overlapping fetches and state updates after unmount.
  const inFlight = useRef(false);
  const mounted = useRef(true);

  const load = useCallback(async (opts?: { silent?: boolean }) => {
    if (inFlight.current) return;
    inFlight.current = true;
    if (opts?.silent) setRefreshing(true);

    const [s, c, ch] = await Promise.all([
      getDashboardStats(),
      getRecentContacts(),
      getOverviewCharts(30),
    ]);

    inFlight.current = false;
    if (!mounted.current) return;

    // Only surface an error on the first load; transient refresh blips are
    // swallowed so the dashboard doesn't flash errors in the background.
    if (s.error && !opts?.silent) setError(s.error);
    else if (!s.error) setError(null);

    if (s.data) setStats(s.data);
    if (c.data) setContacts(c.data);
    if (ch.data) setCharts(ch.data);
    setUpdatedAt(new Date());
    setLoading(false);
    setRefreshing(false);
  }, []);

  // Initial load + auto-refresh on an interval. Refreshing pauses while the
  // tab is hidden and fires immediately when the user returns.
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
    <div className="space-y-4">
      <PageHeader
        title="Overview"
        subtitle="A snapshot of your site's content and recent activity."
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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SmallBox
              icon={Newspaper}
              label="Published blogs"
              value={stats?.blogsPublished ?? 0}
              hint={`${stats?.blogsTotal ?? 0} total`}
              to="/admin/blogs"
              tone="primary"
            />
            <SmallBox
              icon={FileEdit}
              label="Draft blogs"
              value={stats?.blogsDraft ?? 0}
              hint="awaiting publish"
              to="/admin/blogs"
              tone="warning"
            />
            <SmallBox
              icon={MessageSquareQuote}
              label="Testimonials"
              value={stats?.testimonialsPublished ?? 0}
              hint={`${stats?.testimonialsTotal ?? 0} total`}
              to="/admin/testimonials"
              tone="success"
            />
            <SmallBox
              icon={Mail}
              label="New messages"
              value={stats?.contactsNew ?? 0}
              hint={`${stats?.contactsTotal ?? 0} total`}
              to="/admin/messages"
              tone="danger"
            />
          </div>

          {charts && <ChartsGrid charts={charts} />}

          <Card title="Recent messages" tools={
            <Link
              to="/admin/messages"
              className="inline-flex items-center gap-1 text-sm text-[#007bff] transition-colors hover:text-[#0056b3]"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          }>
            {contacts.length === 0 ? (
              <p className="text-sm text-[#6c757d]">No contact messages yet.</p>
            ) : (
              <ul className="divide-y divide-[#dee2e6]">
                {contacts.map((c) => (
                  <li key={c.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-[#212529]">{c.name}</p>
                        {c.status === "new" && <Badge tone="green">new</Badge>}
                      </div>
                      <p className="truncate text-xs text-[#6c757d]">{c.email}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-[#495057]">
                        {c.message}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-[#6c757d]">
                      {formatDate(c.created_at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </>
      )}
    </div>
  );
}

/** Dashboard skeleton: stat cards + chart cards while the first load runs. */
function OverviewSkeleton() {
  return (
    <SkeletonGroup label="Loading dashboard…" className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[3px] border border-[#dee2e6] bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="h-10 w-10 rounded-[3px]" />
              <Skeleton className="h-4 w-4" />
            </div>
            <Skeleton className="mt-4 h-8 w-16" />
            <Skeleton className="mt-2 h-3.5 w-24" />
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[3px] border border-[#dee2e6] bg-white p-4 lg:col-span-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="mt-4 h-64 w-full rounded-[3px]" />
        </div>
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[3px] border border-[#dee2e6] bg-white p-4"
          >
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-64 w-full rounded-[3px]" />
          </div>
        ))}
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
  // Re-render a relative "updated Ns ago" label every few seconds.
  const [, force] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => force((n) => n + 1), 5_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3">
      <span className="hidden items-center gap-1.5 text-xs text-[#6c757d] sm:inline-flex">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            refreshing ? "bg-[#ffc107]" : "bg-[#28a745]"
          )}
        />
        {refreshing ? "Updating…" : `Updated ${timeAgo(updatedAt)}`}
      </span>
      <button
        onClick={onRefresh}
        disabled={refreshing}
        title="Refresh now"
        className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] border border-[#ced4da] text-[#495057] transition-colors hover:bg-[#f4f6f9] disabled:opacity-60"
      >
        <RefreshCw size={15} className={cn(refreshing && "animate-spin")} />
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
  const totalContacts =
    charts.contactsByDay.reduce((sum, d) => sum + d.count, 0);
  const ratingTotal = charts.testimonialsByRating.reduce((a, b) => a + b, 0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Contact submissions trend — full width */}
      <Card
        title="Contact submissions"
        subtitle={`Last 30 days · ${totalContacts} total`}
        className="lg:col-span-2"
      >
        <div className="h-64">
          <TrendChart
            labels={charts.contactsByDay.map((d) => d.label)}
            data={charts.contactsByDay.map((d) => d.count)}
            label="Submissions"
          />
        </div>
      </Card>

      {/* Messages by status */}
      <Card title="Messages by status">
        {hasData([
          charts.contactsByStatus.new,
          charts.contactsByStatus.read,
          charts.contactsByStatus.archived,
        ]) ? (
          <div className="h-64">
            <BreakdownChart
              labels={["New", "Read", "Archived"]}
              data={[
                charts.contactsByStatus.new,
                charts.contactsByStatus.read,
                charts.contactsByStatus.archived,
              ]}
              colors={STATUS_COLORS}
            />
          </div>
        ) : (
          <EmptyChart label="No messages yet" />
        )}
      </Card>

      {/* Blog posts by status */}
      <Card title="Blog posts">
        {hasData([charts.blogsByStatus.published, charts.blogsByStatus.draft]) ? (
          <div className="h-64">
            <BreakdownChart
              labels={["Published", "Draft"]}
              data={[charts.blogsByStatus.published, charts.blogsByStatus.draft]}
              colors={BLOG_COLORS}
            />
          </div>
        ) : (
          <EmptyChart label="No posts yet" />
        )}
      </Card>

      {/* Top requested services */}
      <Card title="Top requested services">
        {charts.contactsByService.length > 0 ? (
          <div className="h-64">
            <RankBarChart
              labels={charts.contactsByService.map((s) => s.service)}
              data={charts.contactsByService.map((s) => s.count)}
            />
          </div>
        ) : (
          <EmptyChart label="No service data yet" />
        )}
      </Card>

      {/* Testimonial ratings */}
      <Card title="Testimonial ratings" subtitle={`${ratingTotal} total`}>
        {ratingTotal > 0 ? (
          <div className="h-64">
            <RankBarChart
              labels={["5 ★", "4 ★", "3 ★", "2 ★", "1 ★"]}
              data={[...charts.testimonialsByRating].reverse()}
              colors={RATING_COLORS}
            />
          </div>
        ) : (
          <EmptyChart label="No testimonials yet" />
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
    <div className="flex h-64 items-center justify-center text-sm text-[#6c757d]">
      {label}
    </div>
  );
}

const TONE_STYLES = {
  primary: "bg-[#007bff]",
  warning: "bg-[#ffc107] text-[#212529]",
  success: "bg-[#28a745]",
  danger: "bg-[#dc3545]",
} as const;

/** AdminLTE "small-box" stat widget: colored surface, big number, icon, footer link. */
function SmallBox({
  icon: Icon,
  label,
  value,
  hint,
  to,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  hint?: string;
  to: string;
  tone: keyof typeof TONE_STYLES;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[3px] text-white shadow-[0_0_1px_rgba(0,0,0,.125),0_1px_3px_rgba(0,0,0,.2)]",
        TONE_STYLES[tone]
      )}
    >
      <div className="relative z-10 p-4">
        <p className="text-3xl font-semibold">{value}</p>
        <p className="text-sm">{label}</p>
        {hint && <p className="mt-0.5 text-xs opacity-80">{hint}</p>}
      </div>
      <Icon size={70} className="absolute -bottom-3 -right-2 opacity-20" />
      <Link
        to={to}
        className="relative z-10 flex items-center justify-between border-t border-white/20 px-4 py-2 text-xs font-medium transition-colors hover:bg-black/10"
      >
        More info
        <ArrowRight size={13} />
      </Link>
    </div>
  );
}
