import { useEffect, useRef } from "react";
import { TURNSTILE_SITE_KEY, isTurnstileConfigured } from "@/lib/turnstile";

/**
 * Cloudflare Turnstile widget (explicit render). Loads the CF script once,
 * mounts the challenge, and reports the resulting token via `onVerify`. Renders
 * nothing when no site key is configured, so forms can include it
 * unconditionally and only enforce a token when Turnstile is actually set up.
 */

interface TurnstileApi {
  render: (el: HTMLElement, opts: TurnstileRenderOptions) => string;
  remove: (id: string) => void;
  reset: (id?: string) => void;
}

interface TurnstileRenderOptions {
  sitekey: string;
  callback: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

/** Inject the Turnstile script once and resolve when its API is available. */
function loadTurnstile(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptPromise = null; // allow a later retry
      reject(new Error("Failed to load Turnstile"));
    };
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface TurnstileProps {
  /** Called with a fresh verification token whenever the challenge passes. */
  onVerify: (token: string) => void;
  /** Token expired (Turnstile rotates ~every 5 min) — clear any stored token. */
  onExpire?: () => void;
  /** Widget failed to load or errored — treat as "no token". */
  onError?: () => void;
  className?: string;
}

export default function Turnstile({
  onVerify,
  onExpire,
  onError,
  className,
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Keep the latest callbacks without re-running the (render-once) effect.
  const handlers = useRef({ onVerify, onExpire, onError });
  handlers.current = { onVerify, onExpire, onError };

  useEffect(() => {
    if (!isTurnstileConfigured() || !containerRef.current) return;
    let cancelled = false;
    let widgetId: string | null = null;

    loadTurnstile()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetId = window.turnstile.render(containerRef.current, {
          sitekey: TURNSTILE_SITE_KEY!,
          theme: "auto",
          callback: (token) => handlers.current.onVerify(token),
          "expired-callback": () => handlers.current.onExpire?.(),
          "error-callback": () => handlers.current.onError?.(),
        });
      })
      .catch(() => handlers.current.onError?.());

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          // Widget already gone — nothing to clean up.
        }
      }
    };
  }, []);

  if (!isTurnstileConfigured()) return null;
  return <div ref={containerRef} className={className} />;
}
