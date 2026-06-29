/**
 * Top-level React error boundary.
 *
 * Without this, any uncaught error thrown while rendering unmounts the whole
 * tree and leaves the user staring at a blank white page. This catches those
 * errors, reports them through the logger (→ Sentry in production) and shows a
 * recoverable fallback instead.
 *
 * Error boundaries must be class components — there is no hook equivalent for
 * `componentDidCatch` / `getDerivedStateFromError`.
 */
import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "@/lib/logger";

interface Props {
  children: ReactNode;
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("Unhandled render error", error, {
      componentStack: info.componentStack,
    });
  }

  reset = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div
        role="alert"
        className="flex min-h-[100svh] flex-col items-center justify-center gap-6 bg-bg px-6 text-center"
      >
        <div className="max-w-md">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Something went wrong
          </h1>
          <p className="mt-3 text-sm text-ink-muted">
            An unexpected error interrupted the page. You can try again, or reload if the
            problem persists.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={this.reset}
            className="rounded-2xl bg-brand-gradient px-6 py-3 text-sm font-medium text-bg shadow-glow-sm transition-all hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-light"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="rounded-2xl px-6 py-3 text-sm font-medium text-ink-muted ring-1 ring-white/10 transition-colors hover:text-ink"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
