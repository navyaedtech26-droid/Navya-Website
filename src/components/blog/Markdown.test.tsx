import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Markdown from "@/components/blog/Markdown";

const renderMd = (content: string) => render(<Markdown content={content} />);

describe("Markdown — blocks", () => {
  it("renders headings (# ## ###)", () => {
    renderMd("# Title\n\n## Sub\n\n### Small");
    // `#` maps to an h2 with display styling, `##`/`###` to h2/h3.
    expect(screen.getByText("Title").tagName).toBe("H2");
    expect(screen.getByText("Sub").tagName).toBe("H2");
    expect(screen.getByText("Small").tagName).toBe("H3");
  });

  it("renders paragraphs, joining soft-wrapped lines", () => {
    const { container } = renderMd("line one\nline two\n\nsecond para");
    const paras = container.querySelectorAll("p");
    expect(paras).toHaveLength(2);
    expect(paras[0].textContent).toBe("line one line two");
  });

  it("renders unordered and ordered lists", () => {
    const { container } = renderMd("- a\n- b\n\n1. one\n2. two");
    expect(container.querySelectorAll("ul li")).toHaveLength(2);
    expect(container.querySelectorAll("ol li")).toHaveLength(2);
  });

  it("renders a fenced code block with its language label", () => {
    const { container } = renderMd("```ts\nconst x = 1;\n```");
    expect(container.querySelector("pre code")?.textContent).toBe("const x = 1;");
    expect(screen.getByText("ts")).toBeInTheDocument();
  });

  it("renders a horizontal rule", () => {
    const { container } = renderMd("above\n\n---\n\nbelow");
    expect(container.querySelector("hr")).toBeInTheDocument();
  });

  it("renders a blockquote", () => {
    const { container } = renderMd("> quoted line");
    expect(container.querySelector("blockquote")?.textContent).toContain("quoted line");
  });

  it("renders a GFM table with header and body cells", () => {
    const { container } = renderMd("| A | B |\n| :-- | --: |\n| 1 | 2 |");
    expect(container.querySelectorAll("thead th")).toHaveLength(2);
    expect(container.querySelectorAll("tbody td")).toHaveLength(2);
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});

describe("Markdown — inline", () => {
  it("renders bold, italic, strikethrough and inline code", () => {
    const { container } = renderMd("**b** *i* ~~s~~ `c`");
    expect(container.querySelector("strong")?.textContent).toBe("b");
    expect(container.querySelector("em")?.textContent).toBe("i");
    expect(container.querySelector("s")?.textContent).toBe("s");
    expect(container.querySelector("code")?.textContent).toBe("c");
  });

  it("renders safe links and marks external links target=_blank", () => {
    renderMd("[ext](https://example.com)");
    const link = screen.getByRole("link", { name: "ext" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("renders internal links without target=_blank", () => {
    renderMd("[home](/about)");
    const link = screen.getByRole("link", { name: "home" });
    expect(link).toHaveAttribute("href", "/about");
    expect(link).not.toHaveAttribute("target");
  });
});

describe("Markdown — XSS hardening", () => {
  it("drops a javascript: link, keeping the label as plain text", () => {
    renderMd("[click](javascript:stealCookies)");
    // No live link is created…
    expect(screen.queryByRole("link")).toBeNull();
    // …but the visible label survives.
    expect(screen.getByText("click")).toBeInTheDocument();
  });

  it("renders a data: image (allowed for images)", () => {
    const { container } = renderMd("![pic](data:image/png;base64,iVBORw0KGgo=)");
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "data:image/png;base64,iVBORw0KGgo=");
  });

  it("drops an image with an unsafe scheme, keeping the alt text", () => {
    const { container } = renderMd("![evil](javascript:stealCookies)");
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("evil")).toBeInTheDocument();
  });
});

describe("Markdown — edge cases", () => {
  it("renders nothing for empty content", () => {
    const { container } = renderMd("");
    expect(container.querySelector("div")?.children).toHaveLength(0);
  });

  it("normalizes CRLF line endings", () => {
    const { container } = renderMd("a\r\n\r\nb");
    expect(container.querySelectorAll("p")).toHaveLength(2);
  });
});
