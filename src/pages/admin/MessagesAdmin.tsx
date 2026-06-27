/**
 * Contact-message inbox: read submissions from the public contact form, filter
 * by status, mark them read/archived, and delete. Reads/writes are admin-only
 * (RLS `contact: admin can read` policy).
 */
import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Trash2,
  Archive,
  MailOpen,
  Inbox,
  Phone,
} from "lucide-react";
import {
  listContacts,
  setContactStatus,
  deleteContact,
  type ContactStatus,
} from "@/services/admin";
import type { ContactSubmissionRow } from "@/types/database";
import {
  PageHeader,
  Modal,
  Alert,
  Badge,
  IconButton,
  ConfirmDialog,
  EmptyState,
} from "@/components/admin/ui";
import { Skeleton, SkeletonGroup } from "@/components/common/Skeleton";
import { formatDate, cn } from "@/lib/utils";

type Filter = "all" | ContactStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "archived", label: "Archived" },
];

export default function MessagesAdmin() {
  const [items, setItems] = useState<ContactSubmissionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  const [open, setOpen] = useState<ContactSubmissionRow | null>(null);
  const [deleting, setDeleting] = useState<ContactSubmissionRow | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const res = await listContacts();
      if (res.error) setError(res.error);
      else setItems(res.data ?? []);
      setLoading(false);
    })();
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? items : items.filter((m) => m.status === filter)),
    [items, filter]
  );

  const counts = useMemo(() => {
    const c = { all: items.length, new: 0, read: 0, archived: 0 } as Record<Filter, number>;
    for (const m of items) c[m.status] += 1;
    return c;
  }, [items]);

  const patch = (saved: ContactSubmissionRow) =>
    setItems((prev) => prev.map((m) => (m.id === saved.id ? saved : m)));

  const changeStatus = async (m: ContactSubmissionRow, status: ContactStatus) => {
    setBusyId(m.id);
    const res = await setContactStatus(m.id, status);
    setBusyId(null);
    if (res.error) return setError(res.error);
    if (res.data) {
      patch(res.data);
      setOpen((cur) => (cur && cur.id === res.data!.id ? res.data! : cur));
    }
  };

  // Opening a message auto-marks an unread one as read.
  const openMessage = (m: ContactSubmissionRow) => {
    setOpen(m);
    if (m.status === "new") changeStatus(m, "read");
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusyId(deleting.id);
    const res = await deleteContact(deleting.id);
    setBusyId(null);
    if (res.error) return setError(res.error);
    setItems((prev) => prev.filter((m) => m.id !== deleting.id));
    setDeleting(null);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Messages"
        subtitle="Submissions from the public contact form."
      />

      {error && <Alert kind="error">{error}</Alert>}

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-xl px-3.5 py-2 text-sm font-medium transition-colors",
              filter === f.key
                ? "bg-brand/15 text-ink ring-1 ring-brand/40"
                : "text-ink-muted hover:bg-white/5 hover:text-ink"
            )}
          >
            {f.label}
            <span className="ml-2 text-xs text-ink-muted/70">{counts[f.key]}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <ListSkeleton />
      ) : visible.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No messages here"
          description="Submissions from the contact form will appear here."
        />
      ) : (
        <ul className="space-y-3">
          {visible.map((m) => (
            <li
              key={m.id}
              className={cn(
                "rounded-2xl border bg-bg-900/50 p-4 transition-colors hover:border-brand/30",
                m.status === "new" ? "border-brand/30" : "border-white/10"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <button
                  onClick={() => openMessage(m)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{m.name}</p>
                    <StatusBadge status={m.status} />
                  </div>
                  <p className="truncate text-xs text-ink-muted">
                    {m.email}
                    {m.service ? ` · ${m.service}` : ""}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-ink-muted">{m.message}</p>
                </button>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="text-xs text-ink-muted">{formatDate(m.created_at)}</span>
                  <div className="flex items-center gap-1">
                    {m.status !== "archived" ? (
                      <IconButton
                        label="Archive"
                        size="sm"
                        busy={busyId === m.id}
                        onClick={() => changeStatus(m, "archived")}
                      >
                        <Archive size={15} />
                      </IconButton>
                    ) : (
                      <IconButton
                        label="Move to read"
                        size="sm"
                        busy={busyId === m.id}
                        onClick={() => changeStatus(m, "read")}
                      >
                        <MailOpen size={15} />
                      </IconButton>
                    )}
                    <IconButton label="Delete" size="sm" danger onClick={() => setDeleting(m)}>
                      <Trash2 size={15} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Detail modal */}
      <Modal
        open={open !== null}
        onClose={() => setOpen(null)}
        title="Message"
        wide
      >
        {open && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-base font-semibold text-ink">{open.name}</p>
                <a
                  href={`mailto:${open.email}`}
                  className="text-sm text-brand-light hover:text-cyan-accent"
                >
                  {open.email}
                </a>
              </div>
              <StatusBadge status={open.status} />
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
              <Detail label="Phone" icon={<Phone size={13} />}>
                {open.phone || "—"}
              </Detail>
              <Detail label="Received">{formatDate(open.created_at)}</Detail>
              <Detail label="Service">{open.service || "—"}</Detail>
              <Detail label="Budget">{open.budget || "—"}</Detail>
            </dl>

            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-ink-muted">
                Message
              </p>
              <p className="whitespace-pre-wrap rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-ink/90">
                {open.message}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-3 pt-1">
              {open.status !== "archived" && (
                <button
                  onClick={() => changeStatus(open, "archived")}
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
                >
                  <Archive size={15} />
                  Archive
                </button>
              )}
              <a
                href={`mailto:${open.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-glow-sm transition-shadow hover:shadow-glow"
              >
                <Mail size={15} />
                Reply by email
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete message"
        busy={busyId === deleting?.id}
      >
        Delete the message from{" "}
        <span className="font-medium text-ink">{deleting?.name}</span>? This cannot be
        undone.
      </ConfirmDialog>
    </div>
  );
}

function StatusBadge({ status }: { status: ContactStatus }) {
  if (status === "new") return <Badge tone="green">New</Badge>;
  if (status === "archived") return <Badge tone="neutral">Archived</Badge>;
  return <Badge tone="amber">Read</Badge>;
}

function Detail({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1 text-xs text-ink-muted">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 text-ink">{children}</dd>
    </div>
  );
}

/** Skeleton message list shown while submissions load. */
function ListSkeleton() {
  return (
    <SkeletonGroup label="Loading messages…" className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-white/10 bg-bg-900/50 p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
              <Skeleton className="h-3.5 w-full" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-3 w-16" />
              <div className="flex gap-1">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </SkeletonGroup>
  );
}

