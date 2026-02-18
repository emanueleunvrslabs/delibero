import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const BASE_URL = "https://delibero.lovable.app";
const DEFAULT_TITLE = "Delibero — Delibere ARERA analizzate con AI";
const DEFAULT_DESCRIPTION =
  "Monitoriamo le delibere ARERA e le analizziamo con intelligenza artificiale. Riassunti, punti salienti e aggiornamenti tariffari per operatori energia.";
const DEFAULT_OG_IMAGE = `${BASE_URL}/logo.png`;

export const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | Delibero` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : undefined;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Delibero" />
      <meta property="og:locale" content="it_IT" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLdArray.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};
