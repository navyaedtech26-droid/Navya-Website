/**
 * Newsletter subscribers: list everyone who signed up, delete entries, and
 * export the list to CSV for use in an email tool.
 */
import { useEffect, useState } from "react";
import { Loader2, Trash2, Download, Users } from "lucide-react";
import { listSubscribers, deleteSubscriber } from "@/services/admin";
import type { NewsletterSubscriberRow } from "@/types/database";
import { PageHeader, Modal, Alert } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

export default function SubscribersAdmin() {
  const [rows, setRows] = useState<NewsletterSubscriberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<NewsletterSubscriberRow | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    listSubscribers().then((res) => {
      if (res.error) setError(res.error);
      else setRows(res.data ?? []);
      setLoading(false);
    });
  }, []);

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    const res = await deleteSubscriber(deleting.id);
    setDeleteBusy(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== deleting.id));
    setDeleting(null);
  };

  const exportCsv = () => {
    const header = "email,source,subscribed_at\n";
    const body = rows
      .map((r) => `${r.email},${r.source ?? ""},${r.created_at}`)
      .join("\n");
    const blob = new Blob([header + body], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Subscribers"
        subtitle={`${rows.length} newsletter subscriber${rows.length === 1 ? "" : "s"}.`}
        action={
          rows.length > 0 && (
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              <Download size={16} />
              Export CSV
            </button>
          )
        }
      />

      {error && <Alert kind="error">{error}</Alert>}

      {loading ? (
        <div className="flex min-h-[16rem] items-center justify-center text-ink-muted">
          <Loader2 className="animate-spin" />
        </div>
      ) : rows.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-bg-900/80 text-xs uppercase tracking-wide text-ink-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Source</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Subscribed</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r) => (
                <tr key={r.id} className="bg-bg-900/40 hover:bg-white/[0.03]">
                  <td className="px-4 py-3 font-medium text-ink">{r.email}</td>
                  <td className="hidden px-4 py-3 text-ink-muted sm:table-cell">
                    {r.source ?? "—"}
                  </td>
                  <td className="hidden px-4 py-3 text-ink-muted md:table-cell">
                    {formatDate(r.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => setDeleting(r)}
                        title="Delete"
                        aria-label="Delete subscriber"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        open={deleting !== null}
        onClose={() => setDeleting(null)}
        title="Remove subscriber"
      >
        <p className="text-sm text-ink-muted">
          Remove <span className="font-medium text-ink">{deleting?.email}</span> from
          the newsletter list?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setDeleting(null)}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteBusy}
            className="inline-flex items-center gap-2 rounded-xl bg-red-500/90 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-500 disabled:opacity-70"
          >
            {deleteBusy && <Loader2 size={16} className="animate-spin" />}
            Remove
          </button>
        </div>
      </Modal>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-white/10 bg-bg-900/40 p-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 ring-1 ring-brand/30">
        <Users className="text-brand-light" />
      </div>
      <h3 className="mt-5 font-display text-lg font-semibold text-ink">
        No subscribers yet
      </h3>
      <p className="mt-1 max-w-sm text-sm text-ink-muted">
        Sign-ups from the footer newsletter form will appear here.
      </p>
    </div>
  );
}
