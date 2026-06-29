/**
 * App-wide logging + error reporting.
 *
 * One channel for every diagnostic message so callers never reach for
 * `console.*` directly. In development everything prints to the console with a
 * readable prefix; in production warnings/errors are additionally forwarded to
 * an error-reporting backend (Sentry) when one is configured.
 *
 * Sentry is **opt-in and lazy**: it is only loaded and initialised when
 * `VITE_SENTRY_DSN` is set (see `.env.example`). With no DSN the SDK chunk is
 * never fetched, so there is zero runtime cost for local dev or for deployments
 * that don't use it. Call `initErrorReporting()` once at startup (see main.tsx).
 */

type LogLevel = "debug" | "info" | "warn" | "error";

/** Arbitrary structured metadata attached to a log/report (no PII, please). */
export type LogContext = Record<string, unknown>;

const isDev = import.meta.env.DEV;
const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;

/**
 * Minimal surface of the Sentry SDK we depend on. Kept narrow so the rest of
 * the app never imports `@sentry/react` directly.
 */
/** Sentry severity levels (a superset of our internal log levels). */
type Severity = "fatal" | "error" | "warning" | "info" | "debug" | "log";

interface ErrorReporter {
  captureException: (error: unknown, hint?: { extra?: LogContext }) => void;
  captureMessage: (message: string, level?: Severity) => void;
}

let reporter: ErrorReporter | null = null;

/**
 * Load + initialise Sentry when a DSN is present. Safe to call once at startup;
 * no-ops when unconfigured or if the SDK fails to load (reporting must never
 * take the app down).
 */
export async function initErrorReporting(): Promise<void> {
  if (!sentryDsn || reporter) return;
  try {
    const Sentry = await import("@sentry/react");
    Sentry.init({
      dsn: sentryDsn,
      environment: import.meta.env.MODE,
      // Keep volume modest by default; tune per environment as needed.
      tracesSampleRate: 0.1,
      // Don't report the noise from local development.
      enabled: !isDev,
    });
    reporter = {
      captureException: (error, hint) => Sentry.captureException(error, hint),
      captureMessage: (message, level) => Sentry.captureMessage(message, level),
    };
  } catch (err) {
    // Reporting is best-effort. Fall back to console and carry on.
    // eslint-disable-next-line no-console -- logger is the sanctioned console user
    console.error("[logger] failed to initialise error reporting", err);
  }
}

/** A namespaced label so log lines say where they came from, e.g. "[blogs]". */
function prefix(scope?: string): string {
  return scope ? `[${scope}]` : "";
}

function emit(level: LogLevel, scope: string | undefined, args: unknown[]): void {
  if (!isDev && level === "debug") return; // debug is dev-only
  const tag = prefix(scope);
  const line = tag ? [tag, ...args] : args;
  // eslint-disable-next-line no-console -- this is the single sanctioned console use
  console[level === "debug" ? "log" : level](...line);
}

export interface Logger {
  debug: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  /**
   * Log an error and, in production, report it. Pass the original error/cause
   * as `error` so stack traces survive; `context` adds searchable metadata.
   */
  error: (message: string, error?: unknown, context?: LogContext) => void;
  /** Return a logger bound to a `scope` label (e.g. `logger.scope("blogs")`). */
  scope: (scope: string) => Logger;
}

function makeLogger(scope?: string): Logger {
  return {
    debug: (...args) => emit("debug", scope, args),
    info: (...args) => emit("info", scope, args),
    warn: (...args) => {
      emit("warn", scope, args);
      reporter?.captureMessage(
        [prefix(scope), ...args.map(String)].filter(Boolean).join(" "),
        "warning"
      );
    },
    error: (message, error, context) => {
      emit("error", scope, error !== undefined ? [message, error] : [message]);
      const merged = scope ? { scope, ...context } : context;
      reporter?.captureException(error ?? new Error(message), { extra: merged });
    },
    scope: (childScope) => makeLogger(scope ? `${scope}:${childScope}` : childScope),
  };
}

/** The root logger. Prefer `logger.scope("area")` in modules. */
export const logger = makeLogger();
