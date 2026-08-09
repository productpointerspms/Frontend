import type { Metadata } from "next";

export const SITE_URL = "https://productpointers.com";
export const SITE_NAME = "ProductPointers";

export const SITE_DESCRIPTION =
  "ProductPointers is a Product Management education and career development platform helping aspiring and growing Product Managers build practical skills, gain real-world experience and accelerate their careers through structured programs, mentorship, apprenticeships and community.";

export const SOCIAL_LINKS = {
  x: "https://x.com/ProductPointers",
  linkedin: "https://www.linkedin.com/company/productpointers/",
  instagram: "https://www.instagram.com/productpointers",
  youtube: "https://youtube.com/@productpointerspms",
} as const;

/** Organization structured data (schema.org/JSON-LD) — establishes entity
 *  consistency between the site and its social profiles for search engines. */
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  sameAs: Object.values(SOCIAL_LINKS),
};

/**
 * Builds per-page Metadata (title, description, canonical, Open Graph,
 * Twitter card) from a small set of inputs, keyed off `metadataBase` set in
 * the root layout so relative `path`/`image` values resolve to absolute URLs.
 */
export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = "/logo.png",
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      description,
      url: path,
      siteName: SITE_NAME,
      images: [{ url: image }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      description,
      images: [image],
    },
  };
}
