/**
 * AdminLTE-style top navbar: sidebar toggle, notifications bell (live count of
 * new contact messages) and a user dropdown (profile + sign out).
 */
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Bell, ExternalLink, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getRecentContacts } from "@/services/admin";
import type { ContactSubmissionRow } from "@/types/database";
import { authorInitials, cn, formatDate } from "@/lib/utils";

const POLL_MS = 30_000;

export default function AdminNavbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [newContacts, setNewContacts] = useState<ContactSubmissionRow[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const res = await getRecentContacts(5);
      if (mounted && res.data) setNewContacts(res.data.filter((c) => c.status === "new"));
    };
    load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, []);

  // Close dropdowns on outside click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const name = profile?.full_name || "Administrator";

  return (
    <header className="sticky top-0 z-30 flex h-[3.5rem] items-center justify-between border-b border-[#dee2e6] bg-white px-3">
      <button
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        className="flex h-9 w-9 items-center justify-center rounded-[3px] text-[#495057] transition-colors hover:bg-[#f4f6f9]"
      >
        <Menu size={18} />
      </button>

      <div className="flex items-center gap-1">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-[3px] text-[#495057] transition-colors hover:bg-[#f4f6f9]"
          >
            <Bell size={17} />
            {newContacts.length > 0 && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#dc3545] px-1 text-[0.625rem] font-bold leading-none text-white">
                {newContacts.length}
              </span>
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 z-40 mt-1 w-80 rounded-[3px] border border-[#dee2e6] bg-white shadow-lg">
              <div className="border-b border-[#dee2e6] px-3.5 py-2.5 text-sm font-semibold text-[#212529]">
                {newContacts.length} New Message{newContacts.length === 1 ? "" : "s"}
              </div>
              {newContacts.length === 0 ? (
                <p className="px-3.5 py-4 text-sm text-[#6c757d]">No new messages.</p>
              ) : (
                <ul className="max-h-72 divide-y divide-[#dee2e6] overflow-y-auto">
                  {newContacts.map((c) => (
                    <li key={c.id}>
                      <Link
                        to="/admin/messages"
                        onClick={() => setNotifOpen(false)}
                        className="block px-3.5 py-2.5 text-sm transition-colors hover:bg-[#f4f6f9]"
                      >
                        <p className="truncate font-medium text-[#212529]">{c.name}</p>
                        <p className="truncate text-xs text-[#6c757d]">{c.message}</p>
                        <p className="mt-0.5 text-[0.6875rem] text-[#6c757d]/80">
                          {formatDate(c.created_at)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                to="/admin/messages"
                onClick={() => setNotifOpen(false)}
                className="block border-t border-[#dee2e6] px-3.5 py-2 text-center text-xs font-medium text-[#007bff] transition-colors hover:bg-[#f4f6f9]"
              >
                See all messages
              </Link>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserOpen((v) => !v)}
            aria-label="Account menu"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-[#007bff] text-xs font-semibold text-white transition-opacity hover:opacity-90"
            )}
          >
            {authorInitials(name)}
          </button>

          {userOpen && (
            <div className="absolute right-0 z-40 mt-1 w-64 rounded-[3px] border border-[#dee2e6] bg-white shadow-lg">
              <div className="flex items-center gap-3 border-b border-[#dee2e6] px-3.5 py-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#007bff] text-xs font-semibold text-white">
                  {authorInitials(name)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[#212529]">{name}</p>
                  <p className="truncate text-xs text-[#6c757d]">{user?.email}</p>
                </div>
              </div>
              <Link
                to="/admin/settings"
                onClick={() => setUserOpen(false)}
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-[#495057] transition-colors hover:bg-[#f4f6f9]"
              >
                <Settings size={15} />
                Account settings
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-[#495057] transition-colors hover:bg-[#f4f6f9]"
              >
                <ExternalLink size={15} />
                View website
              </a>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-2.5 border-t border-[#dee2e6] px-3.5 py-2.5 text-left text-sm text-[#dc3545] transition-colors hover:bg-[#f4f6f9]"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
