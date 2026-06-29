/**
 * Markdown editor used in the blog admin: a formatting toolbar (bold, italic,
 * heading, bulleted/numbered lists, quote, code block, table, link, inline
 * image upload) over a textarea, plus a live Write/Preview toggle. Stays
 * dependency-free and writes plain Markdown into `blog_posts.content`, which
 * the public site renders with <Markdown/>.
 */
import { useRef, useState } from "react";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code2,
  Table,
  LinkIcon,
  ImagePlus,
} from "lucide-react";
import Markdown from "@/components/blog/Markdown";
import { Spinner } from "@/components/common/Spinner";
import { uploadBlogImage } from "@/services/storage";
import { inputCls } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export default function MarkdownEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [preview, setPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Replace the current selection, keeping focus and a sensible caret. */
  const replaceSelection = (transform: (selected: string) => string) => {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end } = el;
    const selected = value.slice(start, end);
    const inserted = transform(selected);
    const next = value.slice(0, start) + inserted + value.slice(end);
    onChange(next);
    // Restore the caret after React re-renders the controlled value.
    requestAnimationFrame(() => {
      el.focus();
      const caret = start + inserted.length;
      el.setSelectionRange(caret, caret);
    });
  };

  const wrap = (before: string, after = before) =>
    replaceSelection((s) => `${before}${s || "text"}${after}`);

  const prefixLine = (prefix: string) =>
    replaceSelection((s) => `${prefix}${s || "..."}`);

  const insertLink = () => {
    const url = window.prompt("Link URL", "https://");
    if (!url) return;
    replaceSelection((s) => `[${s || "link text"}](${url})`);
  };

  const insertCodeBlock = () =>
    replaceSelection((s) => `\n\`\`\`\n${s || "code"}\n\`\`\`\n`);

  const insertTable = () =>
    replaceSelection(
      () =>
        "\n| Column | Column |\n| --- | --- |\n| Cell | Cell |\n| Cell | Cell |\n"
    );

  const handleImage = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setUploading(true);
    const res = await uploadBlogImage(file);
    setUploading(false);
    if (res.error || !res.url) {
      setError(res.error ?? "Upload failed.");
      return;
    }
    replaceSelection(() => `\n![${file.name.replace(/\.[^.]+$/, "")}](${res.url})\n`);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor="content" className="text-sm font-medium text-ink">
          Content
        </label>
        <div className="flex rounded-lg border border-white/10 p-0.5 text-xs">
          <Tab active={!preview} onClick={() => setPreview(false)}>
            Write
          </Tab>
          <Tab active={preview} onClick={() => setPreview(true)}>
            Preview
          </Tab>
        </div>
      </div>

      {!preview && (
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-white/10 bg-white/[0.02] p-1">
          <ToolButton label="Bold" onClick={() => wrap("**")}>
            <Bold size={15} />
          </ToolButton>
          <ToolButton label="Italic" onClick={() => wrap("*")}>
            <Italic size={15} />
          </ToolButton>
          <ToolButton label="Heading" onClick={() => prefixLine("## ")}>
            <Heading2 size={15} />
          </ToolButton>
          <ToolButton label="Bulleted list" onClick={() => prefixLine("- ")}>
            <List size={15} />
          </ToolButton>
          <ToolButton label="Numbered list" onClick={() => prefixLine("1. ")}>
            <ListOrdered size={15} />
          </ToolButton>
          <ToolButton label="Quote" onClick={() => prefixLine("> ")}>
            <Quote size={15} />
          </ToolButton>
          <ToolButton label="Code block" onClick={insertCodeBlock}>
            <Code2 size={15} />
          </ToolButton>
          <ToolButton label="Table" onClick={insertTable}>
            <Table size={15} />
          </ToolButton>
          <ToolButton label="Link" onClick={insertLink}>
            <LinkIcon size={15} />
          </ToolButton>
          <label
            title="Upload image"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
          >
            {uploading ? (
              <Spinner size={15} />
            ) : (
              <ImagePlus size={15} />
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                handleImage(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
        </div>
      )}

      {preview ? (
        <div className="min-h-[10rem] rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
          {value.trim() ? (
            <Markdown content={value} />
          ) : (
            <p className="text-sm text-ink-muted">Nothing to preview yet.</p>
          )}
        </div>
      ) : (
        <textarea
          id="content"
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          className={inputCls}
        />
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function Tab({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-2.5 py-1 font-medium transition-colors",
        active ? "bg-brand/20 text-ink" : "text-ink-muted hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function ToolButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-white/5 hover:text-ink"
    >
      {children}
    </button>
  );
}
