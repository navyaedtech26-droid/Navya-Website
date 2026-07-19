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
import { useToast } from "@/components/common/Toast";
import { formatDate, cn } from "@/lib/utils";

type Filter = "all" | ContactStatus;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "read", label: "Read" },
  { key: "archived", label: "Archived" },
];

export default function MessagesAdmin() {
  const toast = useToast();
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

  const changeStatus = async (
    m: ContactSubmissionRow,
    status: ContactStatus,
    opts?: { silent?: boolean }
  ) => {
    setBusyId(m.id);
    const res = await setContactStatus(m.id, status);
    setBusyId(null);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    const saved = res.data;
    if (saved) {
      patch(saved);
      setOpen((cur) => (cur && cur.id === saved.id ? saved : cur));
      if (!opts?.silent) {
        toast.success(
          status === "archived" ? "Message archived." : "Message marked as read."
        );
      }
    }
  };

  // Opening a message auto-marks an unread one as read — silently, so it doesn't
  // toast on every open.
  const openMessage = (m: ContactSubmissionRow) => {
    setOpen(m);
    if (m.status === "new") changeStatus(m, "read", { silent: true });
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setBusyId(deleting.id);
    const res = await deleteContact(deleting.id);
    setBusyId(null);
    if (res.error) {
      toast.error(res.error);
      return;
    }
    setItems((prev) => prev.filter((m) => m.id !== deleting.id));
    setDeleting(null);
    toast.success("Message deleted.");
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
              "rounded-[3px] border px-3.5 py-2 text-sm font-medium transition-colors",
              filter === f.key
                ? "border-[#007bff] bg-[#e7f1ff] text-[#007bff]"
                : "border-[#ced4da] text-[#495057] hover:bg-[#f4f6f9]"
            )}
          >
            {f.label}
            <span className="ml-2 text-xs text-[#6c757d]">{counts[f.key]}</span>
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
                "rounded-[3px] border bg-white p-4 shadow-[0_0_1px_rgba(0,0,0,.125),0_1px_3px_rgba(0,0,0,.1)] transition-colors",
                m.status === "new" ? "border-[#007bff]/40" : "border-[#dee2e6]"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <button
                  onClick={() => openMessage(m)}
                  className="min-w-0 flex-1 text-left"
                >
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-[#212529]">{m.name}</p>
                    <StatusBadge status={m.status} />
                  </div>
                  <p className="truncate text-xs text-[#6c757d]">
                    {m.email}
                    {m.service ? ` · ${m.service}` : ""}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm text-[#495057]">{m.message}</p>
                </button>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="text-xs text-[#6c757d]">{formatDate(m.created_at)}</span>
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
                <p className="text-base font-semibold text-[#212529]">{open.name}</p>
                <a
                  href={`mailto:${open.email}`}
                  className="text-sm text-[#007bff] hover:text-[#0056b3]"
                >
                  {open.email}
                </a>
              </div>
              <StatusBadge status={open.status} />
            </div>

            <dl className="grid grid-cols-2 gap-3 rounded-[3px] border border-[#dee2e6] bg-[#f4f6f9] p-4 text-sm">
              <Detail label="Phone" icon={<Phone size={13} />}>
                {open.phone || "N/A"}
              </Detail>
              <Detail label="Received">{formatDate(open.created_at)}</Detail>
              <Detail label="Service">{open.service || "N/A"}</Detail>
              <Detail label="Budget">{open.budget || "N/A"}</Detail>
            </dl>

            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-[#6c757d]">
                Message
              </p>
              <p className="whitespace-pre-wrap rounded-[3px] border border-[#dee2e6] bg-[#f4f6f9] p-4 text-sm text-[#212529]">
                {open.message}
              </p>
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t border-[#dee2e6] pt-4">
              {open.status !== "archived" && (
                <button
                  onClick={() => changeStatus(open, "archived")}
                  className="inline-flex items-center gap-2 rounded-[3px] border border-[#ced4da] px-4 py-2 text-sm font-medium text-[#495057] transition-colors hover:bg-[#f4f6f9]"
                >
                  <Archive size={15} />
                  Archive
                </button>
              )}
              <a
                href={`mailto:${open.email}`}
                className="inline-flex items-center gap-2 rounded-[3px] bg-[#007bff] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0069d9]"
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
        <span className="font-medium text-[#212529]">{deleting?.name}</span>? This cannot be
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
      <dt className="flex items-center gap-1 text-xs text-[#6c757d]">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 text-[#212529]">{children}</dd>
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
          className="rounded-[3px] border border-[#dee2e6] bg-white p-4"
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
                <Skeleton className="h-8 w-8 rounded-[3px]" />
                <Skeleton className="h-8 w-8 rounded-[3px]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </SkeletonGroup>
  );
}

