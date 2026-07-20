import type { Faq } from "@/data/faqs";

export const SITE_URL = "https://navyaedtech.com";
export const SITE_NAME = "Navya EdTech";
const SITE_EMAIL = "navyaedtech26@gmail.com";

/**
 * Organization / LocalBusiness identity. Rendered on every page so search
 * engines can build a knowledge-panel entity for the brand.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  email: SITE_EMAIL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.jpg`,
    width: 1577,
    height: 656,
  },
  image: `${SITE_URL}/og-image.jpg`,
  slogan: "Digital transformation that drives growth.",
  description:
    "Navya EdTech turns digital investment into measurable growth, revenue-driving websites, cost-cutting business systems, and business intelligence for founders, schools, hospitals, and enterprises.",
  // Country-level address only — Navya operates remotely across Nepal. Add a
  // street address + geo here if/when a public office location exists, which is
  // what unlocks Google local-pack / map rich results.
  address: {
    "@type": "PostalAddress",
    addressCountry: "NP",
  },
  areaServed: { "@type": "Country", name: "Nepal" },
  knowsAbout: [
    "Website Development",
    "E-Commerce",
    "CRM & ERP Systems",
    "Billing & Inventory Systems",
    "Business Intelligence Dashboards",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: SITE_EMAIL,
    availableLanguage: ["English", "Nepali"],
  },
  sameAs: [
    "https://www.instagram.com/navyaedtech/",
    "https://www.tiktok.com/@navyaedtech",
    "https://www.linkedin.com/company/navya-edtech/",
  ],
};

/**
 * WebSite entity — enables sitelinks/search box eligibility. `potentialAction`
 * points at the real /blog search (Blog.tsx reads `?q=` into its filter state
 * on mount), which is what makes the Sitelinks Search Box eligible rather than
 * just decorative markup.
 */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/**
 * Build a Service schema for a single service/solution detail page. Distinct
 * from `serviceListSchema` (an ItemList) — this is a first-class Service node
 * with its own @id and canonical URL, which is the correct shape for a page
 * that IS that service, rather than a page that catalogues several.
 */
export function serviceSchema(service: {
  title: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_URL}${service.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.title,
    description: service.description,
    url,
    serviceType: service.title,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Nepal" },
  };
}

/**
 * Build an ItemList of Service entries, each provided by the Organization.
 * Surfaces the catalogue of offerings on the Services page so search engines
 * understand exactly what the business does.
 */
export function serviceListSchema(
  services: { title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "Nepal" },
      },
    })),
  };
}

/** Build an FAQPage schema from a list of FAQ entries. */
export function faqPageSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Build a BlogPosting (Article) schema for a single post. */
export function articleSchema(post: {
  title: string;
  excerpt?: string | null;
  slug: string;
  author?: string | null;
  cover_image?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? undefined,
    // Google's Article rich-result eligibility requires an image — fall back
    // to the site's branded OG card so posts without a cover image still
    // qualify instead of silently dropping the field.
    image: post.cover_image ?? `${SITE_URL}/og-image.jpg`,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: { "@type": "Organization", name: post.author ?? SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };
}

/**
 * Build a WebPage entity for a given route. Emitted on every page by the Seo
 * component so each URL is a first-class node in the site graph, linked back to
 * the WebSite and Organization. `isPartOf` / `publisher` reference the global
 * entities by @id so search engines can stitch the graph together.
 */
export function webPageSchema(page: {
  title: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
}) {
  const url = `${SITE_URL}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@type": page.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    primaryImageOfPage: `${SITE_URL}/og-image.jpg`,
  };
}

/**
 * Review + AggregateRating for the Organization, built from real published
 * testimonials — never fabricated, so this returns `null` (render nothing)
 * when there are none yet rather than emitting a zero-review AggregateRating,
 * which structured-data validators flag as invalid.
 *
 * Re-declares the Organization node under its existing `@id` rather than
 * inventing a new entity, so consumers that assemble the page's JSON-LD into
 * one graph merge these facts onto the same Organization described by
 * `organizationSchema` instead of treating it as an unrelated duplicate.
 */
export function reviewsSchema(
  items: { name: string; quote: string; rating: number }[]
) {
  if (items.length === 0) return null;
  const ratingValue =
    Math.round((items.reduce((sum, t) => sum + t.rating, 0) / items.length) * 10) /
    10;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      reviewCount: items.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: items.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.quote,
    })),
  };
}

/** Build a BreadcrumbList schema from ordered [name, path] pairs. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
