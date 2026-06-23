import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useConsent } from "@/context/ConsentContext";
import {
  initAnalytics,
  isAnalyticsConfigured,
  trackPageView,
} from "@/lib/analytics";

/**
 * Bridges cookie consent + router navigation to Google Analytics 4.
 * Loads gtag only once consent is granted, then sends a virtual page_view
 * on every route change. Renders nothing.
 */
export default function Analytics() {
  const { consent } = useConsent();
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (consent === "accepted") initAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent === "accepted" && isAnalyticsConfigured()) {
      trackPageView(pathname + search);
    }
  }, [consent, pathname, search]);

  return null;
}
