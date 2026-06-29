import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ConsentProvider } from "@/context/ConsentContext";
import { AuthProvider } from "@/context/AuthContext";
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <ConsentProvider>
            <ToastProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ToastProvider>
          </ConsentProvider>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
);
