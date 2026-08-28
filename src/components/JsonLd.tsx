import { personJsonLd, webSiteJsonLd } from "@/lib/seo";

export default function JsonLd() {
  const schemas = [personJsonLd(), webSiteJsonLd()];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}
