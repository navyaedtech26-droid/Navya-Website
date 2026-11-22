import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Newspaper,
  BriefcaseBusiness,
  MessageSquareQuote,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
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
import { authorInitials, cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/blogs", label: "Blogs", icon: Newspaper, end: false },
  { to: "/admin/case-studies", label: "Case Studies", icon: BriefcaseBusiness, end: false },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote, end: false },
  { to: "/admin/messages", label: "Messages", icon: Mail, end: false, hasBadge: true },
  { to: "/admin/settings", label: "Settings", icon: Settings, end: false },
];

export default function AdminSidebar() {
  const { profile, user, signOut } = useAuth();
  const { isMobile, setOpenMobile } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [newCount, setNewCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchBadge = async () => {
      const res = await getRecentContacts(10);
      if (mounted && res.data) {
        setNewCount(res.data.filter((c) => c.status === "new").length);
      }
    };
    fetchBadge();
    const interval = window.setInterval(fetchBadge, 30_000);
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
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border bg-sidebar"
    >
      <SidebarHeader className="border-b border-sidebar-border px-4 py-3 flex flex-row items-center justify-between">
        <Link
          to="/admin"
          className="flex items-center gap-3 overflow-hidden"
          onClick={() => isMobile && setOpenMobile(false)}
        >
          <img
            src="/logo-navy.webp"
            alt="Navya EdTech"
            className="h-8 w-auto shrink-0 object-contain rounded"
          />
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-bold text-sm tracking-tight text-foreground leading-tight">
              Navya EdTech
            </span>
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              Management Suite
            </span>
          </div>
        </Link>
        <SidebarTrigger className="group-data-[collapsible=icon]:hidden text-muted-foreground hover:text-foreground" />
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wider mb-2">
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {NAV_ITEMS.map(({ to, label, icon: Icon, end, hasBadge }) => {
                const isActive = end
                  ? location.pathname === to
                  : location.pathname.startsWith(to);

                return (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={label}
                      className={cn(
                        "h-11 gap-3 rounded-xl border border-transparent px-3 text-sm font-medium tracking-tight text-muted-foreground transition-all duration-200",
                        "hover:bg-sidebar-accent hover:text-foreground",
                        isActive &&
                          "border-border/80 bg-white font-semibold text-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:bg-sidebar-accent dark:text-foreground",
                        "[&_svg]:size-4!",
                        "group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>span]:hidden"
                      )}
                    >
                      <NavLink
                        to={to}
                        end={end}
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => isMobile && setOpenMobile(false)}
                      >
                        <Icon className={isActive ? "text-primary" : "text-muted-foreground"} />
                        <span>{label}</span>
                        {hasBadge && newCount > 0 && (
                          <SidebarMenuBadge className="static ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1.5 text-[11px] font-bold text-white group-data-[collapsible=icon]:hidden">
                            {newCount}
                          </SidebarMenuBadge>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-3 text-[11px] font-bold text-muted-foreground/80 uppercase tracking-wider mb-2">
            External
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="View Website"
                  className={cn(
                    "h-11 gap-3 rounded-xl border border-transparent px-3 text-sm font-medium tracking-tight text-muted-foreground transition-all duration-200 hover:bg-sidebar-accent hover:text-foreground",
                    "[&_svg]:size-4!",
                    "group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:[&>span]:hidden"
                  )}
                >
                  <a href="/" target="_blank" rel="noreferrer">
                    <ExternalLink />
                    <span>View Website</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    "h-14 rounded-xl border border-transparent p-2 text-left transition-all hover:bg-sidebar-accent",
                    "group-data-[collapsible=icon]:size-10! group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0!"
                  )}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 font-bold text-xs text-primary ring-1 ring-primary/20">
                      {authorInitials(userName)}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-emerald-500" />
                  </div>
                  <div className="flex flex-1 flex-col overflow-hidden text-left group-data-[collapsible=icon]:hidden">
                    <span className="truncate text-sm font-semibold text-foreground leading-tight">
                      {userName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {userEmail}
                    </span>
                  </div>
                  <ChevronRight className="size-4 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="start"
                className="bionis-dashboard w-56 rounded-xl border border-border shadow-xl p-1.5"
              >
                <DropdownMenuLabel className="font-normal px-2.5 py-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600" />
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Verified Admin
                    </span>
                  </div>
                  <p className="mt-1 truncate text-xs font-medium text-muted-foreground">
                    {userEmail}
                  </p>
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
