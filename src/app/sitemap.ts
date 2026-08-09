import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Only pages actually reachable from the site's primary navigation (see
// components/Header.tsx, Footer.tsx) — keeps the sitemap free of orphaned,
// duplicate, or not-yet-launched program pages that would dilute it.
const ROUTES: {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/ppap", changeFrequency: "weekly", priority: 0.9 },
  { path: "/ppip", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/community", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
