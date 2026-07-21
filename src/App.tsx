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
const Portfolio = lazy(() => import("@/pages/Portfolio"));
const CaseStudyDetail = lazy(() => import("@/pages/CaseStudyDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const ServiceWebsites = lazy(() => import("@/pages/services/Websites"));
const ServiceCustomSoftware = lazy(() => import("@/pages/services/CustomSoftwareDevelopment"));
const ServiceMobileApps = lazy(() => import("@/pages/services/MobileAppDevelopment"));
const ServiceAiSolutions = lazy(() => import("@/pages/services/AiSolutions"));
const ServiceCloud = lazy(() => import("@/pages/services/CloudServices"));
const ServiceUiUxDesign = lazy(() => import("@/pages/services/UiUxDesign"));
const ServiceDevOps = lazy(() => import("@/pages/services/DevOps"));
const ServiceItConsulting = lazy(() => import("@/pages/services/ItConsulting"));
const ServiceDedicatedDevelopers = lazy(() => import("@/pages/services/DedicatedDevelopers"));
const SolutionDigitalTransformation = lazy(() => import("@/pages/solutions/DigitalTransformation"));
const SolutionLegacyModernization = lazy(() => import("@/pages/solutions/LegacySystemModernization"));
const SolutionErpSystems = lazy(() => import("@/pages/solutions/ErpSystems"));
const SolutionCrmSystems = lazy(() => import("@/pages/solutions/CrmSystems"));
const SolutionBillingInvoicing = lazy(() => import("@/pages/solutions/BillingInvoicing"));
const SolutionLms = lazy(() => import("@/pages/solutions/LearningManagementSystems"));
const SolutionInventoryManagement = lazy(() => import("@/pages/solutions/InventoryManagement"));
const SolutionBusinessIntelligence = lazy(() => import("@/pages/solutions/BusinessIntelligenceAnalytics"));
const SolutionCloudDevOps = lazy(() => import("@/pages/solutions/CloudDevOps"));
const SolutionSocialMediaGrowth = lazy(() => import("@/pages/solutions/SocialMediaGrowth"));
const Industries = lazy(() => import("@/pages/Industries"));
const IndustrySchools = lazy(() => import("@/pages/industries/Schools"));
const IndustryColleges = lazy(() => import("@/pages/industries/Colleges"));
const IndustryHospitals = lazy(() => import("@/pages/industries/Hospitals"));
const IndustryManufacturing = lazy(() => import("@/pages/industries/Manufacturing"));
const IndustryHotels = lazy(() => import("@/pages/industries/Hotels"));
const IndustryRestaurants = lazy(() => import("@/pages/industries/Restaurants"));
const IndustryRetail = lazy(() => import("@/pages/industries/Retail"));
const IndustryNGOs = lazy(() => import("@/pages/industries/NGOs"));
const IndustryRealEstate = lazy(() => import("@/pages/industries/RealEstate"));
const IndustryTravelAgencies = lazy(() => import("@/pages/industries/TravelAgencies"));
const ShareTestimonial = lazy(() => import("@/pages/ShareTestimonial"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const Terms = lazy(() => import("@/pages/Terms"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// AuthContext pulls in the full @supabase/supabase-js SDK (auth + realtime +
// storage), which only the admin area needs — useAuth() has no public-site
// consumers. Loading it here (rather than wrapping the whole app in
// main.tsx) keeps that weight out of every public visitor's bundle.
const AuthProvider = lazy(() =>
  import("@/context/AuthContext").then((m) => ({ default: m.AuthProvider }))
);

// The admin area (and its heavy deps like Chart.js) stays lazily loaded so
// public visitors never download it. It lives behind a login, so the one-time
// chunk fetch there is acceptable.
const RequireAdmin = lazy(() => import("@/components/admin/RequireAdmin"));
const AdminLogin = lazy(() => import("@/pages/admin/AdminLogin"));
const AdminForgotPassword = lazy(() => import("@/pages/admin/AdminForgotPassword"));
const AdminResetPassword = lazy(() => import("@/pages/admin/AdminResetPassword"));
const AdminConfirm = lazy(() => import("@/pages/admin/AdminConfirm"));
const AdminLayout = lazy(() => import("@/pages/admin/AdminLayout"));
const Overview = lazy(() => import("@/pages/admin/Overview"));
const AdminSettings = lazy(() => import("@/pages/admin/AdminSettings"));
const BlogsAdmin = lazy(() => import("@/pages/admin/BlogsAdmin"));
const CaseStudiesAdmin = lazy(() => import("@/pages/admin/CaseStudiesAdmin"));
const TestimonialsAdmin = lazy(() => import("@/pages/admin/TestimonialsAdmin"));
const MessagesAdmin = lazy(() => import("@/pages/admin/MessagesAdmin"));

function RouteFallback() {
  return <LoadingScreen className="min-h-[100svh] bg-paper" />;
}

/** The admin dashboard is a self-contained area without the public chrome. */
function AdminApp() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
          <Route path="/admin/reset-password" element={<AdminResetPassword />} />
          <Route path="/admin/confirm" element={<AdminConfirm />} />
          <Route element={<RequireAdmin />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Overview />} />
              <Route path="blogs" element={<BlogsAdmin />} />
              <Route path="case-studies" element={<CaseStudiesAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
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

    if (location.hash) {
      // Target page may be a lazy-loaded chunk (see `Suspense` below) still
      // rendering its fallback, so the element isn't in the DOM on the first
      // tick. Poll briefly instead of a single rAF check.
      const id = location.hash.slice(1);
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
        } else if (attempts++ < 40) {
          timer = window.setTimeout(tryScroll, 50);
        }
      };
      let timer = window.setTimeout(tryScroll, 0);
      prevPath.current = location.pathname;
      return () => window.clearTimeout(timer);
    }

    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (prevPath.current !== null && prevPath.current !== location.pathname) {
      mainRef.current?.focus({ preventScroll: true });
    }
    prevPath.current = location.pathname;
  }, [location.pathname, location.hash]);

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
        onClick={(e) => {
          // Firefox and WebKit don't reliably move keyboard focus to a
          // tabindex=-1 target on fragment-link activation. Drive the focus
          // move explicitly so the skip link works across all engines.
          e.preventDefault();
          mainRef.current?.focus();
        }}
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white shadow-glow-sm outline-none ring-2 ring-white/80 transition-transform focus:translate-y-0"
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
              <Route path="/services/websites" element={<ServiceWebsites />} />
              <Route path="/services/custom-software-development" element={<ServiceCustomSoftware />} />
              <Route path="/services/mobile-app-development" element={<ServiceMobileApps />} />
              <Route path="/services/ai-solutions" element={<ServiceAiSolutions />} />
              <Route path="/services/cloud-services" element={<ServiceCloud />} />
              <Route path="/services/ui-ux-design" element={<ServiceUiUxDesign />} />
              <Route path="/services/devops" element={<ServiceDevOps />} />
              <Route path="/services/it-consulting" element={<ServiceItConsulting />} />
              <Route path="/services/dedicated-developers" element={<ServiceDedicatedDevelopers />} />
              <Route path="/solutions/digital-transformation" element={<SolutionDigitalTransformation />} />
              <Route path="/solutions/legacy-system-modernization" element={<SolutionLegacyModernization />} />
              <Route path="/solutions/erp-systems" element={<SolutionErpSystems />} />
              <Route path="/solutions/crm-systems" element={<SolutionCrmSystems />} />
              <Route path="/solutions/billing-invoicing" element={<SolutionBillingInvoicing />} />
              <Route path="/solutions/learning-management-systems" element={<SolutionLms />} />
              <Route path="/solutions/inventory-management" element={<SolutionInventoryManagement />} />
              <Route path="/solutions/business-intelligence-analytics" element={<SolutionBusinessIntelligence />} />
              <Route path="/solutions/cloud-devops" element={<SolutionCloudDevOps />} />
              <Route path="/solutions/social-media-growth" element={<SolutionSocialMediaGrowth />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/schools" element={<IndustrySchools />} />
              <Route path="/industries/colleges" element={<IndustryColleges />} />
              <Route path="/industries/hospitals" element={<IndustryHospitals />} />
              <Route path="/industries/manufacturing" element={<IndustryManufacturing />} />
              <Route path="/industries/hotels" element={<IndustryHotels />} />
              <Route path="/industries/restaurants" element={<IndustryRestaurants />} />
              <Route path="/industries/retail" element={<IndustryRetail />} />
              <Route path="/industries/ngos" element={<IndustryNGOs />} />
              <Route path="/industries/real-estate" element={<IndustryRealEstate />} />
              <Route path="/industries/travel-agencies" element={<IndustryTravelAgencies />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<CaseStudyDetail />} />
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
