import type { Faq } from "@/data/faqs";

export const SITE_URL = "https://navyaedtech.com";
export const SITE_NAME = "Navya EdTech";
export const SITE_EMAIL = "navyaedtech26@gmail.com";

/**
 * Organization / LocalBusiness identity. Rendered on every page so search
 * engines can build a knowledge-panel entity for the brand.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  email: SITE_EMAIL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  slogan: "Innovate. Build. Elevate.",
  description:
    "Navya EdTech builds high-performance websites, e-commerce platforms, and business management systems for modern businesses.",
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
    "https://instagram.com/navyaedtech",
    "https://tiktok.com/@navyaedtech",
  ],
};

/** WebSite entity — enables sitelinks/search box eligibility. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

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
    image: post.cover_image ?? undefined,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.published_at ?? undefined,
    dateModified: post.updated_at ?? post.published_at ?? undefined,
    author: { "@type": "Organization", name: post.author ?? SITE_NAME },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
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
