import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "navya-cookie-consent";

interface ConsentContextType {
  /** null = no choice made yet (banner should show). */
  consent: ConsentValue | null;
  accept: () => void;
  decline: () => void;
  /** Clear the saved choice — used by "manage cookies" controls. */
  reset: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentValue | null>(null);

  // Hydrate from storage on mount (avoids SSR/first-paint mismatch).
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "accepted" || stored === "declined") setConsent(stored);
    } catch {
      // Storage may be blocked (private mode) — treat as "no choice".
    }
  }, []);

  const persist = useCallback((value: ConsentValue) => {
    setConsent(value);
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore write failures
    }
  }, []);

  const reset = useCallback(() => {
    setConsent(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        accept: () => persist("accepted"),
        decline: () => persist("declined"),
        reset,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextType {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
