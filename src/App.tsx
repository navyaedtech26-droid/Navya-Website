import { useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/common/Spinner";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AnimatedBackground from "@/components/effects/AnimatedBackground";
import ScrollProgress from "@/components/effects/ScrollProgress";
import CookieConsent from "@/components/common/CookieConsent";
import Analytics from "@/components/analytics/Analytics";

// The primary nav pages are imported eagerly so moving between them is instant
// — no loading spinner flash. They're small and bundle with the shared chrome.
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

// Secondary / less-trafficked pages are code-split: the blog reader (markdown
// pipeline), the standalone testimonial form, the legal pages and the 404 each
// load on demand so they don't weigh down the initial download of the home page.
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const ShareTestimonial = lazy(() => import("@/pages/ShareTestimonial"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));

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
  const mainRef = useRef<HTMLElement>(null);
  const prevPath = useRef<string | null>(null);

  // On client-side navigation, reset scroll AND move focus to the <main>
  // landmark. Without the focus move, screen-reader and keyboard users stay
  // parked on the link they just activated in the (now-previous) page and lose
  // all context for the new one. We only move focus when the path actually
  // CHANGES — never on initial load (so the skip link stays first in the tab
  // order). Tracking the previous path (rather than a "first render" flag) keeps
  // this correct even under StrictMode's double-invoked effects in dev.
  // `preventScroll` keeps the scrollTo above authoritative.
  useEffect(() => {
    if (location.pathname.startsWith("/admin")) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (prevPath.current !== null && prevPath.current !== location.pathname) {
      mainRef.current?.focus({ preventScroll: true });
    }
    prevPath.current = location.pathname;
  }, [location.pathname]);

  // Admin routes get their own shell — no marketing navbar, footer or effects.
  if (location.pathname.startsWith("/admin")) {
    return <AdminApp />;
  }

  return (
    <>
      {/* First focusable element: lets keyboard users jump past the sticky
          navbar straight to the page content. Visually hidden until focused. */}
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-bg shadow-glow-sm outline-none ring-2 ring-white/80 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <AnimatedBackground />
      <ScrollProgress />
      <Analytics />

      <Navbar />

      <main id="main-content" ref={mainRef} tabIndex={-1} className="outline-none">
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteFallback />}>
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
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />

      <CookieConsent />
    </>
  );
}
