/**
 * Route guard for the admin area.
 *
 * While auth is resolving it shows a spinner; once resolved it admits only
 * signed-in users whose profile role is `admin`. Everyone else is redirected
 * to the admin login. The server still enforces access via RLS — this guard is
 * purely for UX (no point rendering a dashboard the API will reject).
 */
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { LoadingScreen } from "@/components/common/Spinner";
import { useAuth } from "@/context/AuthContext";

export default function RequireAdmin() {
  const { loading, user, profile, isAdmin } = useAuth();
  const location = useLocation();

  // Auth still resolving, or signed in but profile not loaded yet.
  if (loading || (user && !profile)) {
    return <LoadingScreen label="Checking access…" className="min-h-[100svh] bg-bg" />;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}
