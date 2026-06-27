/**
 * Shell for the admin dashboard: a fixed sidebar (collapsible on mobile) with
 * navigation, plus an `<Outlet/>` for the active section. Rendered only behind
 * `RequireAdmin`, so by the time it mounts the user is a confirmed admin.
 */
import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  MessageSquareQuote,
  Mail,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper, end: false },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote, end: false },
  { to: "/admin/messages", label: "Messages", icon: Mail, end: false },
];

export default function AdminLayout() {
  const { profile, user, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-[100svh] bg-bg text-ink">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-bg-900/80 px-5 py-4 backdrop-blur lg:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Navya EdTech"
            width={420}
            height={162}
            className="h-8 w-auto object-contain"
          />
          <span className="rounded-md bg-brand/15 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-light ring-1 ring-brand/30">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl glass"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {/* Backdrop for mobile drawer */}
      {open && (
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <div className="lg:flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/10 bg-bg-900 px-5 py-6 transition-transform duration-300 lg:static lg:translate-x-0",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="hidden items-center gap-2 px-2 lg:flex"
          >
            <img
              src="/logo.png"
              alt="Navya EdTech"
              width={420}
              height={162}
              className="h-9 w-auto object-contain"
            />
            <span className="rounded-md bg-brand/15 px-1.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-light ring-1 ring-brand/30">
              Admin
            </span>
          </Link>

          <nav className="mt-6 flex flex-1 flex-col gap-1 lg:mt-10">
            {NAV.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-brand/15 text-ink ring-1 ring-brand/40"
                      : "text-ink-muted hover:bg-white/5 hover:text-ink"
                  )
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}

            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              <ExternalLink size={18} />
              View website
            </a>
          </nav>

          {/* Account footer */}
          <div className="mt-4 border-t border-white/10 pt-4">
            <div className="px-2">
              <p className="truncate text-sm font-medium text-ink">
                {profile?.full_name || "Administrator"}
              </p>
              <p className="truncate text-xs text-ink-muted">{user?.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-ink-muted transition-colors hover:bg-red-500/10 hover:text-red-300"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto max-w-5xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
