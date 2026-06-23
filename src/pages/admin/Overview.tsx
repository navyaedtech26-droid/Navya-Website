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
  Loader2,
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
import { PageHeader, Alert, Badge } from "@/components/admin/ui";
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
    <div className="space-y-8">
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
        <div className="flex min-h-[16rem] items-center justify-center text-ink-muted">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={Newspaper}
              label="Published blogs"
              value={stats?.blogsPublished ?? 0}
              hint={`${stats?.blogsTotal ?? 0} total`}
              to="/admin/blogs"
            />
            <StatCard
              icon={FileEdit}
              label="Draft blogs"
              value={stats?.blogsDraft ?? 0}
              hint="awaiting publish"
              to="/admin/blogs"
            />
            <StatCard
              icon={MessageSquareQuote}
              label="Testimonials"
              value={stats?.testimonialsPublished ?? 0}
              hint={`${stats?.testimonialsTotal ?? 0} total`}
              to="/admin/testimonials"
            />
            <StatCard
              icon={Mail}
              label="New messages"
              value={stats?.contactsNew ?? 0}
              hint={`${stats?.contactsTotal ?? 0} total`}
              to="/admin/messages"
            />
          </div>

          {charts && <ChartsGrid charts={charts} />}

          <section className="rounded-2xl border border-white/10 bg-bg-900/60 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">
                Recent messages
              </h2>
              <Link
                to="/admin/messages"
                className="inline-flex items-center gap-1 text-sm text-brand-light transition-colors hover:text-cyan-accent"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            {contacts.length === 0 ? (
              <p className="mt-4 text-sm text-ink-muted">No contact messages yet.</p>
            ) : (
              <ul className="mt-4 divide-y divide-white/5">
                {contacts.map((c) => (
                  <li key={c.id} className="flex items-start justify-between gap-4 py-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                        {c.status === "new" && <Badge tone="green">new</Badge>}
                      </div>
                      <p className="truncate text-xs text-ink-muted">{c.email}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
                        {c.message}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-ink-muted">
                      {formatDate(c.created_at)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
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
      <span className="hidden items-center gap-1.5 text-xs text-ink-muted sm:inline-flex">
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            refreshing ? "bg-amber-400" : "bg-emerald-400"
          )}
        />
        {refreshing ? "Updating…" : `Updated ${timeAgo(updatedAt)}`}
      </span>
      <button
        onClick={onRefresh}
        disabled={refreshing}
        title="Refresh now"
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl glass text-ink-muted transition-colors hover:text-ink disabled:opacity-60"
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
      <ChartCard
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
      </ChartCard>

      {/* Messages by status */}
      <ChartCard title="Messages by status">
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
      </ChartCard>

      {/* Blog posts by status */}
      <ChartCard title="Blog posts">
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
      </ChartCard>

      {/* Top requested services */}
      <ChartCard title="Top requested services">
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
      </ChartCard>

      {/* Testimonial ratings */}
      <ChartCard title="Testimonial ratings" subtitle={`${ratingTotal} total`}>
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
      </ChartCard>
    </div>
  );
}

function hasData(values: number[]): boolean {
  return values.some((v) => v > 0);
}

function ChartCard({
  title,
  subtitle,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        "rounded-2xl border border-white/10 bg-bg-900/60 p-6 " + (className ?? "")
      }
    >
      <div className="mb-4">
        <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
        {subtitle && <p className="text-xs text-ink-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function EmptyChart({ label }: { label: string }) {
  return (
    <div className="flex h-64 items-center justify-center text-sm text-ink-muted">
      {label}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  to,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  hint?: string;
  to?: string;
}) {
  const body = (
    <div className="group h-full rounded-2xl border border-white/10 bg-bg-900/60 p-5 transition-colors hover:border-brand/40">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 ring-1 ring-brand/30">
          <Icon size={18} className="text-brand-light" />
        </div>
        {to && (
          <ArrowRight
            size={16}
            className="text-ink-muted transition-transform group-hover:translate-x-0.5"
          />
        )}
      </div>
      <p className="mt-4 font-display text-3xl font-semibold text-ink">{value}</p>
      <p className="text-sm text-ink-muted">{label}</p>
      {hint && <p className="mt-0.5 text-xs text-ink-muted/70">{hint}</p>}
    </div>
  );

  return to ? <Link to={to}>{body}</Link> : body;
}
