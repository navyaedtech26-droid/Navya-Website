import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  organizationSchema,
  websiteSchema,
} from "@/lib/structuredData";

// Default 1200×630 social-share card (see scripts/generate-og-image.mjs).
// Blog posts override this with their own cover image; every other page falls
// back to this branded card.
const DEFAULT_OG = `${SITE_URL}/og-image.png`;
const DEFAULT_OG_WIDTH = "1200";
const DEFAULT_OG_HEIGHT = "630";

interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + og:url. */
  path?: string;
  image?: string;
  /** Alt text describing the social-share image. */
  imageAlt?: string;
  /** Set false on pages that should not be indexed (e.g. 404, forms). */
  index?: boolean;
  /** OpenGraph object type. Use "article" for blog posts. */
  type?: "website" | "article";
  /** Article metadata — only emitted when `type` is "article". */
  article?: {
    publishedTime?: string | null;
    modifiedTime?: string | null;
    author?: string | null;
    section?: string | null;
    tags?: string[];
  };
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
  imageAlt = SITE_NAME,
  index = true,
  type = "website",
  article,
  jsonLd,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  // Resolve relative image paths (e.g. blog cover images) to absolute URLs,
  // which OpenGraph/Twitter require.
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  // We only know the exact dimensions of the default card, so only advertise
  // width/height for it — cover images vary in size.
  const isDefaultImage = image === DEFAULT_OG;
  const extraSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={index ? "index, follow" : "noindex, follow"}
      />

      {/* OpenGraph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      {isDefaultImage && (
        <meta property="og:image:width" content={DEFAULT_OG_WIDTH} />
      )}
      {isDefaultImage && (
        <meta property="og:image:height" content={DEFAULT_OG_HEIGHT} />
      )}

      {/* Article-specific OpenGraph (blog posts) */}
      {type === "article" && article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {type === "article" && article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {type === "article" && article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {type === "article" && article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      {type === "article" &&
        article?.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />

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
