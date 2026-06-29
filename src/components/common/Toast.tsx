/**
 * App-wide toast notifications: a provider that owns the queue, a `useToast()`
 * hook for firing them, and a portalled viewport that renders + auto-dismisses
 * each toast. Use for transient success/error feedback (saved, deleted, action
 * failed). Persistent "this screen is broken" states should stay as inline
 * <Alert>s so they don't disappear on a timer.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastKind = "success" | "error" | "info";

interface ToastItem {
  id: number;
  kind: ToastKind;
  message: ReactNode;
}

interface ToastOptions {
  /** Auto-dismiss delay in ms. Pass 0 to require a manual close. */
  duration?: number;
}

export interface ToastApi {
  success: (message: ReactNode, opts?: ToastOptions) => number;
  error: (message: ReactNode, opts?: ToastOptions) => number;
  info: (message: ReactNode, opts?: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Errors linger a touch longer so they're not missed. */
const DEFAULT_DURATION: Record<ToastKind, number> = {
  success: 4000,
  info: 4000,
  error: 6000,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (kind: ToastKind, message: ReactNode, duration?: number) => {
      const id = nextId.current++;
      setToasts((prev) => [...prev, { id, kind, message }]);
      const ms = duration ?? DEFAULT_DURATION[kind];
      if (ms > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), ms)
        );
      }
      return id;
    },
    [dismiss]
  );

  // Clear any pending timers if the provider unmounts.
  useEffect(() => {
    const map = timers.current;
    return () => map.forEach(clearTimeout);
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      success: (m, o) => push("success", m, o?.duration),
      error: (m, o) => push("error", m, o?.duration),
      info: (m, o) => push("info", m, o?.duration),
      dismiss,
    }),
    [push, dismiss]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a <ToastProvider>");
  return ctx;
}

const ICONS: Record<ToastKind, typeof Info> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const ACCENTS: Record<ToastKind, string> = {
  success: "border-emerald-500/40 text-emerald-400",
  error: "border-red-500/40 text-red-400",
  info: "border-brand/40 text-brand-light",
};

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-relevant="additions"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex flex-col items-center gap-2 p-4 sm:items-end sm:p-6"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const Icon = ICONS[t.kind];
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              role={t.kind === "error" ? "alert" : "status"}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border bg-bg-900/95 px-4 py-3 text-sm shadow-2xl backdrop-blur",
                ACCENTS[t.kind]
              )}
            >
              <Icon size={18} className="mt-0.5 shrink-0" aria-hidden />
              <span className="flex-1 text-ink">{t.message}</span>
              <button
                onClick={() => onDismiss(t.id)}
                aria-label="Dismiss notification"
                className="-mr-1 shrink-0 rounded-md p-0.5 text-ink-muted transition-colors hover:text-ink"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body
  );
}
