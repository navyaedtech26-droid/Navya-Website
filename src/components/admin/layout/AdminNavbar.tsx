import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ExternalLink,
  Settings,
  LogOut,
  Mail,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { getRecentContacts } from "@/services/admin";
import type { ContactSubmissionRow } from "@/types/database";
import { authorInitials, formatDate } from "@/lib/utils";

const ROUTE_LABELS: Record<string, { title: string; category: string }> = {
  "/admin": { title: "Overview", category: "Analytics" },
  "/admin/blogs": { title: "Blog Management", category: "Content" },
  "/admin/case-studies": { title: "Case Studies", category: "Portfolio" },
  "/admin/testimonials": { title: "Client Testimonials", category: "Social Proof" },
  "/admin/messages": { title: "Inbound Messages", category: "Leads & Contacts" },
  "/admin/settings": { title: "Account & Settings", category: "System" },
};

export default function AdminNavbar() {
  const { profile, user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [newContacts, setNewContacts] = useState<ContactSubmissionRow[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const currentRouteInfo = ROUTE_LABELS[location.pathname] || {
    title: "Admin Console",
    category: "Management",
  };

  useEffect(() => {
    let mounted = true;
    const fetchContacts = async () => {
      const res = await getRecentContacts(6);
      if (mounted && res.data) {
        setNewContacts(res.data.filter((c) => c.status === "new"));
      }
    };
    fetchContacts();
    const interval = window.setInterval(fetchContacts, 30_000);
    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  const userName = profile?.full_name || "Administrator";
  const userEmail = user?.email || "admin@navyaedtech.com";

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border/80 bg-white/95 backdrop-blur-md px-4 md:px-8">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="font-medium text-muted-foreground">Admin</span>
          <ChevronRight className="size-3.5 text-muted-foreground/60" />
          <span className="font-bold text-foreground tracking-tight">
            {currentRouteInfo.title}
          </span>
        </div>
      </div>

      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search inquiries, blogs, case studies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-border/80 bg-slate-50/70 pl-10 pr-12 py-2 text-xs font-medium text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all shadow-sm"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-white px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          title="Open public website in new tab"
          className="hidden sm:flex items-center gap-1.5 rounded-xl border border-border/80 bg-white px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground hover:border-border transition-all shadow-sm"
        >
          <span>Live Site</span>
          <ExternalLink className="size-3.5" />
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="View notifications"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-white text-muted-foreground hover:text-foreground hover:bg-slate-50 transition-all shadow-sm"
            >
              <Bell className="size-4" />
              {newContacts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {newContacts.length}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bionis-dashboard w-84 sm:w-96 rounded-2xl border border-border shadow-2xl p-2"
          >
            <DropdownMenuLabel className="px-3 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="size-4 text-primary" />
                <span className="font-bold text-sm text-foreground">
                  Inbound Inquiries
                </span>
              </div>
              {newContacts.length > 0 ? (
                <span className="rounded-full bg-rose-50 px-2 py-0.5 text-xs font-bold text-rose-600 border border-rose-200/60">
                  {newContacts.length} new
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle2 className="size-3.5 text-emerald-500" />
                  All caught up
                </span>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />

            {newContacts.length === 0 ? (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No unread messages. All inquiries have been handled.
              </div>
            ) : (
              <div className="max-h-72 overflow-y-auto divide-y divide-border/50 py-1">
                {newContacts.map((c) => (
                  <Link
                    key={c.id}
                    to="/admin/messages"
                    className="flex flex-col gap-1 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-foreground truncate max-w-[180px]">
                        {c.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatDate(c.created_at)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate line-clamp-1">
                      {c.message}
                    </p>
                  </Link>
                ))}
              </div>
            )}

            <DropdownMenuSeparator className="my-1" />
            <Link
              to="/admin/messages"
              className="flex items-center justify-center p-2 text-xs font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors"
            >
              Open Messages Dashboard &rarr;
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-primary/10 text-xs font-bold text-primary hover:ring-2 hover:ring-primary/20 transition-all shadow-sm">
              {authorInitials(userName)}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bionis-dashboard w-56 rounded-2xl border border-border shadow-xl p-1.5"
          >
            <DropdownMenuLabel className="px-3 py-2 font-normal">
              <p className="text-sm font-bold text-foreground leading-tight">{userName}</p>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{userEmail}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
              <Link to="/admin/settings" className="flex items-center gap-2 px-2.5 py-2 text-sm">
                <Settings className="size-4 text-muted-foreground" />
                <span>Account Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={handleSignOut}
              className="rounded-lg cursor-pointer text-rose-600 focus:bg-rose-50 focus:text-rose-700 px-2.5 py-2 text-sm flex items-center gap-2"
            >
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
