import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  organizationSchema,
  websiteSchema,
} from "@/lib/structuredData";

const DEFAULT_OG = `${SITE_URL}/og-image.png`;

interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + og:url. */
  path?: string;
  image?: string;
  /** Set false on pages that should not be indexed (e.g. 404). */
  index?: boolean;
  /**
   * Extra structured-data object(s) for this page (FAQPage, BreadcrumbList,
   * etc.). Rendered alongside the global Organization + WebSite schema.
   */
  jsonLd?: object | object[];
}

/**
 * Centralized SEO head tags — title, description, canonical, OpenGraph,
 * Twitter Card, and JSON-LD structured data (Organization + WebSite globally,
 * plus any page-specific schema passed via `jsonLd`).
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG,
  index = true,
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const extraSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={index ? "index, follow" : "noindex, follow"}
      />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Global structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* Page-specific structured data */}
      {extraSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
