import { ORGANIZATION_JSON_LD } from "@/lib/seo";

/** Site-wide Organization structured data — renders once in the root layout. */
export default function OrganizationJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
    />
  );
}
