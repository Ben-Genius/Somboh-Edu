import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();
  const routes = [
    { path: "/", priority: 1, changeFrequency: "monthly" as const },
    { path: "/mission", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/vision", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/programs", priority: 0.9, changeFrequency: "monthly" as const },
    {
      path: "/get-involved",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return routes.map((route) => ({
    url: `${base}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
