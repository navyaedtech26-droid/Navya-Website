import { describe, it, expect } from "vitest";
import {
  SITE_URL,
  SITE_NAME,
  serviceListSchema,
  faqPageSchema,
  articleSchema,
  breadcrumbSchema,
} from "@/lib/structuredData";

describe("serviceListSchema", () => {
  it("builds an ItemList with 1-based positions and org provider refs", () => {
    const schema = serviceListSchema([
      { title: "Websites", description: "We build sites" },
      { title: "E-commerce", description: "We build shops" },
    ]);
    expect(schema["@type"]).toBe("ItemList");
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0]).toMatchObject({
      position: 1,
      item: { "@type": "Service", name: "Websites" },
    });
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[0].item.provider).toEqual({
      "@id": `${SITE_URL}/#organization`,
    });
  });

  it("handles an empty service list", () => {
    expect(serviceListSchema([]).itemListElement).toEqual([]);
  });
});

describe("faqPageSchema", () => {
  it("maps each FAQ to a Question/Answer pair", () => {
    const schema = faqPageSchema([
      { question: "Q1?", answer: "A1" },
      { question: "Q2?", answer: "A2" },
    ]);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]).toMatchObject({
      "@type": "Question",
      name: "Q1?",
      acceptedAnswer: { "@type": "Answer", text: "A1" },
    });
  });
});

describe("articleSchema", () => {
  it("builds a BlogPosting with absolute canonical URLs", () => {
    const schema = articleSchema({
      title: "Hello",
      excerpt: "An intro",
      slug: "hello",
      author: "Jane",
      cover_image: "https://cdn/x.png",
      published_at: "2026-01-01T00:00:00Z",
      updated_at: "2026-02-01T00:00:00Z",
    });
    expect(schema).toMatchObject({
      "@type": "BlogPosting",
      headline: "Hello",
      description: "An intro",
      url: `${SITE_URL}/blog/hello`,
      datePublished: "2026-01-01T00:00:00Z",
      dateModified: "2026-02-01T00:00:00Z",
      author: { "@type": "Organization", name: "Jane" },
      mainEntityOfPage: `${SITE_URL}/blog/hello`,
    });
  });

  it("falls back to site name for author and to published date for modified", () => {
    const schema = articleSchema({
      title: "T",
      slug: "t",
      published_at: "2026-01-01T00:00:00Z",
    });
    expect(schema.author.name).toBe(SITE_NAME);
    expect(schema.dateModified).toBe("2026-01-01T00:00:00Z");
    expect(schema.description).toBeUndefined();
    expect(schema.image).toBeUndefined();
  });
});

describe("breadcrumbSchema", () => {
  it("builds an ordered BreadcrumbList with absolute item URLs", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
    expect(schema.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    });
    expect(schema.itemListElement[1].item).toBe(`${SITE_URL}/blog`);
  });
});
