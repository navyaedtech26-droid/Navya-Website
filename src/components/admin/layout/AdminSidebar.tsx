/**
 * AdminLTE-style main sidebar: dark, fixed, collapsible to icon-only on
 * desktop and an off-canvas drawer on mobile.
 */
import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  MessageSquareQuote,
  Mail,
  BriefcaseBusiness,
  ExternalLink,
} from "lucide-react";
import { authorInitials, cn } from "@/lib/utils";

const ADMIN_NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper, end: false },
  { to: "/admin/case-studies", label: "Case Studies", icon: BriefcaseBusiness, end: false },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote, end: false },
  { to: "/admin/messages", label: "Messages", icon: Mail, end: false },
];

export default function AdminSidebar({
  collapsed,
  mobileOpen,
  onNavigate,
  userName,
  userEmail,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onNavigate: () => void;
  userName: string;
  userEmail?: string | null;
}) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-[#343a40] text-white shadow-[0_0_10px_rgba(0,0,0,.2)] transition-all duration-300",
        collapsed ? "lg:w-[4.6rem]" : "lg:w-64",
        "w-72 lg:translate-x-0",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Brand */}
      <Link
        to="/admin"
        onClick={onNavigate}
        className="flex h-[3.5rem] shrink-0 items-center justify-center gap-2 overflow-hidden border-b border-white/10 px-3.5 bg-white"
      >
        <img
          src="/logo-navy.webp"
          alt="Navya EdTech"
          width={614}
          height={719}
          className="h-8 w-auto shrink-0 object-contain"
        />
      </Link>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* User panel */}
        <div
          className={cn(
            "flex items-center gap-3 border-b border-white/10 px-3.5 py-3.5",
            collapsed && "lg:justify-center lg:px-0"
          )}
        >
          <div className="relative shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007bff] text-xs font-semibold text-white">
              {authorInitials(userName)}
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#343a40] bg-[#28a745]" />
          </div>
          {!collapsed && (
            <div className="min-w-0 lg:block">
              <p className="truncate text-sm font-medium text-white">{userName}</p>
              <p className="truncate text-xs text-white/50">{userEmail}</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="mt-1 flex flex-col gap-0.5 px-2 pb-3">
          {ADMIN_NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onNavigate}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-[3px] px-3 py-2.5 text-sm font-medium transition-colors",
                  collapsed && "lg:justify-center",
                  isActive
                    ? "bg-[#007bff] text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )
              }
            >
              <Icon size={17} className="shrink-0" />
              <span className={cn(collapsed && "lg:hidden")}>{label}</span>
            </NavLink>
          ))}

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            title={collapsed ? "View website" : undefined}
            className={cn(
              "mt-1 flex items-center gap-3 rounded-[3px] px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white",
              collapsed && "lg:justify-center"
            )}
          >
            <ExternalLink size={17} className="shrink-0" />
            <span className={cn(collapsed && "lg:hidden")}>View website</span>
          </a>
        </nav>
      </div>
    </aside>
  );
}
