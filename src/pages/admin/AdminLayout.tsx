/**
 * AdminLTE 3-style shell for the admin dashboard: dark fixed sidebar
 * (icon-collapsible on desktop, off-canvas drawer on mobile), a light top
 * navbar, a light content wrapper for the active section (`<Outlet/>`), and a
 * footer. Rendered only behind `RequireAdmin`, so by the time it mounts the
 * user is a confirmed admin.
 */
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminNavbar from "@/components/admin/layout/AdminNavbar";
import AdminFooter from "@/components/admin/layout/AdminFooter";
import { cn } from "@/lib/utils";

/** Tailwind's `lg` breakpoint (1024px) — matches the sidebar's `lg:` classes. */
const DESKTOP_BREAKPOINT = 1024;

export default function AdminLayout() {
  const { profile, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth < DESKTOP_BREAKPOINT) setMobileOpen((v) => !v);
    else setCollapsed((v) => !v);
  };

  return (
    <div className="min-h-[100svh] bg-[#f4f6f9] text-[#212529]">
      {/* Skip past the sidebar/top bar straight to the section content. */}
      <a
        href="#admin-main"
        className="sr-only z-[60] rounded bg-[#007bff] px-4 py-2 text-sm font-semibold text-white outline-none ring-2 ring-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {/* Backdrop for the mobile off-canvas drawer */}
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
        />
      )}

      <AdminSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
        userName={profile?.full_name || "Administrator"}
        userEmail={user?.email}
      />

      <div
        className={cn(
          "flex min-h-[100svh] flex-col transition-[margin] duration-300",
          collapsed ? "lg:ml-[4.6rem]" : "lg:ml-64"
        )}
      >
        <AdminNavbar onToggleSidebar={toggleSidebar} />

        <main id="admin-main" tabIndex={-1} className="flex-1 p-4 outline-none sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <AdminFooter />
      </div>
    </div>
  );
}
