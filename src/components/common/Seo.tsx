import { Helmet } from "react-helmet-async";

const SITE_URL = "https://navyaedtech.com";
const SITE_NAME = "Navya EdTech";
const DEFAULT_OG = `${SITE_URL}/og-image.png`;

interface SeoProps {
  title: string;
  description: string;
  /** Path beginning with "/" — used for canonical + og:url. */
  path?: string;
  image?: string;
  /** Set false on pages that should not be indexed (e.g. 404). */
  index?: boolean;
}

/**
 * Centralized SEO head tags — title, description, canonical, OpenGraph,
 * Twitter Card, and Organization JSON-LD. Implements PRD §7.3 / FR-07.
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_OG,
  index = true,
}: SeoProps) {
  const url = `${SITE_URL}${path}`;

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: "navyaedtech26@gmail.com",
    slogan: "Innovate. Build. Elevate.",
    description:
      "Navya EdTech builds high-performance websites and business management systems for modern businesses.",
    sameAs: [
      "https://instagram.com/navyaedtech",
      "https://tiktok.com/@navyaedtech",
    ],
  };

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

      {/* Organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationLd)}
      </script>
    </Helmet>
  );
}
