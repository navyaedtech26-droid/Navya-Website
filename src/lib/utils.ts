import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

/**
 * Return `url` only if it uses a scheme that is safe to put in an `href`/`src`,
 * otherwise `null`. Relative URLs, anchors and query strings are always allowed;
 * absolute URLs must be http(s)/mailto/tel (plus `data:` for images when
 * `allowData` is set). This blocks `javascript:` (and `vbscript:`/`data:` text)
 * URLs, which React 18 does NOT strip on its own — the main XSS vector in our
 * hand-rolled Markdown renderer. Obfuscation via leading control characters or
 * whitespace (e.g. `java\nscript:`) is defeated by stripping them before the
 * scheme check.
 */
export function safeUrl(
  url: string,
  opts: { allowData?: boolean } = {}
): string | null {
  const raw = url.trim();
  if (!raw) return null;

  // Relative paths, fragments and queries can't carry an executable scheme.
  if (/^(?:[/?#]|\.\.?\/)/.test(raw)) return raw;

  // Strip chars browsers ignore but which can hide a scheme (controls + all
  // whitespace), e.g. "ja\tvascript:alert(1)", then look for an explicit scheme.
  const normalized = Array.from(raw)
    .filter((ch) => {
      const code = ch.codePointAt(0)!;
      return code > 0x20 && code !== 0x7f && !/\s/.test(ch);
    })
    .join("")
    .toLowerCase();
  const scheme = normalized.match(/^([a-z][a-z0-9+.-]*):/)?.[1];

  // No scheme and not caught above → treat as a relative URL (safe).
  if (!scheme) return raw;

  const allowed = new Set(["http", "https", "mailto", "tel"]);
  if (opts.allowData) allowed.add("data");
  return allowed.has(scheme) ? raw : null;
}

/** Format an ISO timestamp as e.g. "Jun 18, 2026". Returns "" on bad input. */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
