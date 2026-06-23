import { Fragment, type ReactNode } from "react";

/**
 * Minimal, dependency-free Markdown renderer for blog post bodies.
 * Supports: # / ## / ### headings, "- " unordered lists, blank-line
 * paragraphs, images ![alt](url), links [text](url), and inline **bold**
 * and `code`. Good enough for editorial content stored in
 * `blog_posts.content`; swap for `react-markdown` later if you need full
 * CommonMark.
 */

// Order matters: images (![]()) must be tested before links ([]()).
const INLINE_RE =
  /(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;

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
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export default function Markdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={key} className="my-4 list-disc space-y-2 pl-6 text-ink-muted">
        {list.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    list = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      return;
    }
    flushList(`ul-${i}`);

    if (!line) return;
    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={i} className="mt-8 font-display text-xl font-semibold text-ink">
          {renderInline(line.slice(4))}
        </h3>
      );
    } else if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={i} className="mt-10 font-display text-2xl font-semibold text-ink">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (line.startsWith("# ")) {
      blocks.push(
        <h2 key={i} className="mt-10 font-display text-3xl font-semibold text-ink">
          {renderInline(line.slice(2))}
        </h2>
      );
    } else {
      blocks.push(
        <p key={i} className="my-4 leading-relaxed text-ink-muted">
          {renderInline(line)}
        </p>
      );
    }
  });

  flushList("ul-final");
  return <div>{blocks}</div>;
}
