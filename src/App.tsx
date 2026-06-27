import { useEffect, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/common/Spinner";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/effects/AnimatedBackground";
import ScrollProgress from "@/components/effects/ScrollProgress";
import CookieConsent from "@/components/common/CookieConsent";
import Analytics from "@/components/analytics/Analytics";

// Public pages are imported eagerly so navigating between them is instant —
// no loading spinner flash between routes. They're small and bundle together
// with the shared chrome.
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import ShareTestimonial from "@/pages/ShareTestimonial";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Terms from "@/pages/Terms";
import NotFound from "@/pages/NotFound";

// The admin area (and its heavy deps like Chart.js) stays lazily loaded so
// public visitors never download it. It lives behind a login, so the one-time
// chunk fetch there is acceptable.
const RequireAdmin = lazy(() => import("@/components/admin/RequireAdmin"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminForgotPassword = lazy(() => import("@/pages/admin/AdminForgotPassword"));
const AdminResetPassword = lazy(() => import("@/pages/admin/AdminResetPassword"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const Overview = lazy(() => import("@/pages/admin/Overview"));
const BlogsAdmin = lazy(() => import("@/pages/admin/BlogsAdmin"));
const TestimonialsAdmin = lazy(() => import("@/pages/admin/TestimonialsAdmin"));
const MessagesAdmin = lazy(() => import("@/pages/admin/MessagesAdmin"));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function RouteFallback() {
  return <LoadingScreen className="min-h-[100svh] bg-bg" />;
}

/** The admin dashboard is a self-contained area without the public chrome. */
function AdminApp() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="blogs" element={<BlogsAdmin />} />
            <Route path="testimonials" element={<TestimonialsAdmin />} />
            <Route path="messages" element={<MessagesAdmin />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default function App() {
  const location = useLocation();

  // Admin routes get their own shell — no marketing navbar, footer or effects.
  if (location.pathname.startsWith("/admin")) {
    return <AdminApp />;
  }

  return (
    <>
      <AnimatedBackground />
      <ScrollProgress />
      <ScrollToTop />
      <Analytics />

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/share-your-story" element={<ShareTestimonial />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>

      <Footer />

      <CookieConsent />
    </>
  );
}
