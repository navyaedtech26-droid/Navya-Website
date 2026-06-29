import { describe, it, expect } from "vitest";
import { cn, safeUrl, formatDate } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy class values", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values and conditionals", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
    expect(cn("a", { b: true, c: false })).toBe("a b");
  });

  it("dedupes conflicting tailwind utilities (last wins)", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-left", "text-center")).toBe("text-center");
  });
});

describe("safeUrl", () => {
  it("allows http(s), mailto and tel schemes", () => {
    expect(safeUrl("https://example.com")).toBe("https://example.com");
    expect(safeUrl("http://example.com")).toBe("http://example.com");
    expect(safeUrl("mailto:a@b.com")).toBe("mailto:a@b.com");
    expect(safeUrl("tel:+15551234")).toBe("tel:+15551234");
  });

  it("allows relative paths, anchors and queries", () => {
    expect(safeUrl("/blog/post")).toBe("/blog/post");
    expect(safeUrl("./img.png")).toBe("./img.png");
    expect(safeUrl("../up")).toBe("../up");
    expect(safeUrl("#section")).toBe("#section");
    expect(safeUrl("?q=1")).toBe("?q=1");
    expect(safeUrl("relative/path")).toBe("relative/path");
  });

  it("rejects javascript: and other dangerous schemes", () => {
    expect(safeUrl("javascript:alert(1)")).toBeNull();
    expect(safeUrl("vbscript:msgbox(1)")).toBeNull();
    expect(safeUrl("data:text/html,<script>")).toBeNull();
    expect(safeUrl("file:///etc/passwd")).toBeNull();
  });

  it("defeats obfuscation via whitespace / control chars hiding the scheme", () => {
    expect(safeUrl("java\nscript:alert(1)")).toBeNull();
    expect(safeUrl("ja\tvascript:alert(1)")).toBeNull();
    expect(safeUrl("  javascript:alert(1)")).toBeNull();
    expect(safeUrl("JAVAScript:alert(1)")).toBeNull();
    // Leading control char: stripped before the scheme check, then caught.
    expect(safeUrl("javascript:alert(1)")).toBeNull();
  });

  it("returns null for empty / whitespace-only input", () => {
    expect(safeUrl("")).toBeNull();
    expect(safeUrl("   ")).toBeNull();
  });

  it("permits data: URLs only when allowData is set", () => {
    const img = "data:image/png;base64,iVBORw0KGgo=";
    expect(safeUrl(img)).toBeNull();
    expect(safeUrl(img, { allowData: true })).toBe(img);
    // ...but still blocks javascript: even with allowData.
    expect(safeUrl("javascript:alert(1)", { allowData: true })).toBeNull();
  });
});

describe("formatDate", () => {
  it("formats an ISO timestamp as 'Mon D, YYYY'", () => {
    expect(formatDate("2026-06-18T10:00:00.000Z")).toBe("Jun 18, 2026");
  });

  it("returns '' for null, undefined or unparseable input", () => {
    expect(formatDate(null)).toBe("");
    expect(formatDate(undefined)).toBe("");
    expect(formatDate("not-a-date")).toBe("");
  });
});
