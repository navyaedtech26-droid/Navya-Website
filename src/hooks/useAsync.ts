import { useEffect, useState, type DependencyList } from "react";

export interface AsyncState<T> {
  data: T | undefined;
  loading: boolean;
  error: unknown;
}

/**
 * Runs an async function and tracks its loading/data/error state, cancelling the
 * in-flight result on unmount or when `deps` change (so a fast navigation can't
 * write stale data). Replaces the hand-rolled `let active = true` effect that was
 * copy-pasted across the read-only pages.
 *
 * For screens that also mutate the loaded data locally (the admin CRUD lists),
 * keep their own state — this is aimed at fetch-and-display flows.
 */
export function useAsync<T>(
  fn: () => Promise<T>,
  deps: DependencyList = []
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    data: undefined,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;
    setState((s) => ({ ...s, loading: true }));
    fn().then(
      (data) => {
        if (active) setState({ data, loading: false, error: null });
      },
      (error) => {
        if (active) setState((s) => ({ ...s, loading: false, error }));
      }
    );
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
