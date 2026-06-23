/**
 * Lightweight Google Analytics 4 (gtag.js) loader.
 *
 * The GA script is only injected after the visitor grants cookie consent —
 * see ConsentContext / CookieConsent / Analytics. Set the measurement ID in
 * an `.env` file as VITE_GA_MEASUREMENT_ID (e.g. "G-XXXXXXXXXX"). When it is
 * absent the tracker is a no-op, so local/dev builds stay clean.
 */

export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as
  | string
  | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** True when a valid GA4 measurement ID is configured. */
export function isAnalyticsConfigured(): boolean {
  return Boolean(GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith("G-"));
}

/** Inject gtag.js and configure GA4. Safe to call multiple times. */
export function initAnalytics(): void {
  if (initialized || !isAnalyticsConfigured()) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  // Manual page_view: this is an SPA, so we fire on each route change instead.
  gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });
}

/** Report a virtual page view for the given path (SPA navigation). */
export function trackPageView(path: string): void {
  if (!initialized || !window.gtag || !GA_MEASUREMENT_ID) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.origin + path,
    page_title: document.title,
  });
}
