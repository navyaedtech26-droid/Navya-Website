import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Dependency-free Markdown renderer for blog post bodies. Covers the subset of
 * CommonMark + GFM that the admin editor can produce:
 *
 *   Blocks   #/##/### headings, paragraphs, `- `/`* `/`1.` lists,
 *            ``` fenced code blocks, `>` blockquotes, `|` GFM tables and
 *            `---` horizontal rules.
 *   Inline   **bold**, *italic*, ~~strike~~, `code`, [links](url) and
 *            ![images](url).
 *
 * Authors control the input through the dashboard, so this stays intentionally
 * lightweight; swap for `react-markdown` + `remark-gfm` only if untrusted or
 * full-CommonMark content ever needs rendering.
 */

// Order matters: images (![]()) must be tested before links ([]()), and bold
// (**) before italic (*), so the alternation matches the longer token first.
const INLINE_RE =
  /(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|~~[^~]+~~|\*[^*\n]+\*|`[^`]+`)/g;

function renderInline(text: string): ReactNode[] {
  const parts = text.split(INLINE_RE).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("![")) {
      const m = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (m) {
        return (
          <img
            key={i}
            src={m[2]}
            alt={m[1]}
            loading="lazy"
            className="my-6 w-full rounded-2xl ring-1 ring-white/10"
          />
        );
      }
    }
    if (part.startsWith("[")) {
      const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (m) {
        const external = /^https?:\/\//.test(m[2]);
        return (
          <a
            key={i}
            href={m[2]}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="font-medium text-brand-light underline-offset-2 hover:underline"
          >
            {m[1]}
          </a>
        );
      }
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("~~") && part.endsWith("~~")) {
      return (
        <s key={i} className="text-ink-muted/70">
          {part.slice(2, -2)}
        </s>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded-md bg-white/10 px-1.5 py-0.5 text-[0.9em] text-cyan-accent"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return (
        <em key={i} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

type Align = "left" | "center" | "right";

const alignClass = (a: Align) =>
  a === "center" ? "text-center" : a === "right" ? "text-right" : "text-left";

/** True for a GFM table delimiter row, e.g. `| :--- | ---: |`. */
function isSeparatorRow(line: string): boolean {
  const t = line.trim();
  if (!t.includes("|")) return false;
  const cells = splitRow(t);
  return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
}

/** Split a `| a | b |` table row into trimmed cells, dropping edge pipes. */
function splitRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl ring-1 ring-white/10">
      {lang && (
        <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-muted">
          {lang}
        </div>
      )}
      <pre className="overflow-x-auto bg-bg-900/80 p-4 text-sm leading-relaxed">
        <code className="font-mono text-ink-muted">{code}</code>
      </pre>
    </div>
  );
}

function Blockquote({ lines }: { lines: string[] }) {
  // Re-group the quoted lines into paragraphs separated by blank lines.
  const paras: string[][] = [];
  let current: string[] = [];
  for (const line of lines) {
    if (!line.trim()) {
      if (current.length) paras.push(current);
      current = [];
    } else {
      current.push(line);
    }
  }
  if (current.length) paras.push(current);

  return (
    <blockquote className="my-6 border-l-4 border-brand/50 bg-white/[0.02] py-1 pl-5 pr-4">
      {paras.map((p, i) => (
        <p key={i} className="my-2 leading-relaxed text-ink-muted">
          {renderInline(p.join(" "))}
        </p>
      ))}
    </blockquote>
  );
}

function Table({
  head,
  align,
  rows,
}: {
  head: string[];
  align: Align[];
  rows: string[][];
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl ring-1 ring-white/10">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-white/[0.03]">
            {head.map((cell, i) => (
              <th
                key={i}
                className={cn(
                  "border-b border-white/10 px-4 py-2.5 font-semibold text-ink",
                  alignClass(align[i] ?? "left")
                )}
              >
                {renderInline(cell)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-white/5 last:border-0">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className={cn(
                    "px-4 py-2.5 text-ink-muted",
                    alignClass(align[c] ?? "left")
                  )}
                >
                  {renderInline(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;
  const push = (node: ReactNode) =>
    blocks.push(<Fragment key={key++}>{node}</Fragment>);

  /** A GFM table begins on a row with a pipe followed by a delimiter row. */
  const isTableAt = (idx: number) =>
    idx + 1 < lines.length &&
    lines[idx].includes("|") &&
    isSeparatorRow(lines[idx + 1]);

  /** Does the line at `idx` open a new block (so a paragraph must stop here)? */
  const startsBlock = (idx: number): boolean => {
    const l = lines[idx].trim();
    return (
      !l ||
      /^```/.test(l) ||
      /^(?:-{3,}|\*{3,}|_{3,})$/.test(l) ||
      l.startsWith(">") ||
      /^#{1,3}\s/.test(l) ||
      /^[-*+]\s+/.test(l) ||
      /^\d+\.\s+/.test(l) ||
      isTableAt(idx)
    );
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    // Blank line — skip.
    if (!line) {
      i++;
      continue;
    }

    // Fenced code block: ```lang … ```
    const fence = line.match(/^```+\s*([\w-]*)\s*$/);
    if (fence) {
      const lang = fence[1];
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^```+\s*$/.test(lines[i].trim())) {
        code.push(lines[i]);
        i++;
      }
      i++; // consume the closing fence (if present)
      push(<CodeBlock lang={lang} code={code.join("\n")} />);
      continue;
    }

    // Horizontal rule.
    if (/^(?:-{3,}|\*{3,}|_{3,})$/.test(line)) {
      push(<hr className="my-8 border-white/10" />);
      i++;
      continue;
    }

    // Blockquote: gather consecutive `>` lines.
    if (line.startsWith(">")) {
      const quoted: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoted.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      push(<Blockquote lines={quoted} />);
      continue;
    }

    // GFM table: header row + delimiter row + body rows.
    if (isTableAt(i)) {
      const head = splitRow(lines[i]);
      const align: Align[] = splitRow(lines[i + 1]).map((c) => {
        const left = c.startsWith(":");
        const right = c.endsWith(":");
        return right && left ? "center" : right ? "right" : "left";
      });
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) {
        rows.push(splitRow(lines[i]));
        i++;
      }
      push(<Table head={head} align={align} rows={rows} />);
      continue;
    }

    // Ordered list: 1. / 2. / …
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      push(
        <ol className="my-4 list-decimal space-y-2 pl-6 text-ink-muted">
          {items.map((item, n) => (
            <li key={n}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list: - / * / +
    if (/^[-*+]\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*+]\s+/, ""));
        i++;
      }
      push(
        <ul className="my-4 list-disc space-y-2 pl-6 text-ink-muted">
          {items.map((item, n) => (
            <li key={n}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Headings.
    if (line.startsWith("### ")) {
      push(
        <h3 className="mt-8 font-display text-xl font-semibold text-ink">
          {renderInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      push(
        <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
          {renderInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      push(
        <h2 className="mt-10 font-display text-3xl font-semibold text-ink">
          {renderInline(line.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // Paragraph: gather consecutive plain lines (soft wraps) into one block.
    const para: string[] = [lines[i].trim()];
    i++; // always consume the opening line so the cursor can never stall
    while (i < lines.length && lines[i].trim() && !startsBlock(i)) {
      para.push(lines[i].trim());
      i++;
    }
    push(
      <p className="my-4 leading-relaxed text-ink-muted">
        {renderInline(para.join(" "))}
      </p>
    );
  }

  return <div>{blocks}</div>;
}
