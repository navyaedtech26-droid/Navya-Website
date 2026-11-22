import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import AdminNavbar from "@/components/admin/layout/AdminNavbar";
import AdminFooter from "@/components/admin/layout/AdminFooter";
import "@/components/watermelon/bionis-dashboard/dashboard.css";

export default function AdminLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider
        defaultOpen
        className="bionis-dashboard h-svh overflow-hidden no-scrollbar bg-background text-foreground"
        style={
          {
            "--sidebar-width": "17.5rem",
            "--sidebar-width-icon": "4.25rem",
          } as React.CSSProperties
        }
      >
        <AdminSidebar />
        <main className="flex flex-1 flex-col overflow-hidden bg-[#F6F8FB]/80 dark:bg-background">
          <AdminNavbar />
          <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8 flex flex-col justify-between">
            <div>
              <Outlet />
            </div>
            <AdminFooter />
          </div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
