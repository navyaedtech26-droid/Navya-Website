import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsentProvider } from "@/context/ConsentContext";
import { ToastProvider } from "@/components/common/Toast";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { initErrorReporting } from "@/lib/logger";
import App from "./App";
import "./index.css";

// Wire up error reporting (Sentry) as early as possible. No-ops without a DSN.
void initErrorReporting();

// Apply the non-critical (display/mono) font stylesheets that index.html parked
// at media="print" so they stay off the first-paint path. Doing it here instead
// of an inline onload handler lets us ship a strict CSP with no script
// 'unsafe-inline'. Still non-blocking: the swap happens after the app boots.
for (const link of document.querySelectorAll<HTMLLinkElement>(
  "link[data-defer-font]"
)) {
  link.media = "all";
}

const container = document.getElementById("root")!;

const tree = (
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <ConsentProvider>
          <ToastProvider>
            <BrowserRouter
              future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
            >
              <App />
            </BrowserRouter>
          </ToastProvider>
        </ConsentProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);

// When the route was prerendered (scripts/prerender.mjs bakes static HTML into
// #root at build time), hydrate that markup instead of throwing it away —
// crawlers and first paint get real content, and React attaches to it. On a
// non-prerendered shell (#root empty) we render from scratch as before.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
