import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Transactional / auth flows — no value indexed, and applications
      // shouldn't surface in search results ahead of their landing pages.
      disallow: [
        "/apply",
        "/ppap/apply",
        "/ppip/apply",
        "/ppcp/apply",
        "/pptp/apply",
        "/checkout",
        "/payment",
        "/login",
        "/signup",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
