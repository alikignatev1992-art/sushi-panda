import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sushipanda-str.ru"
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/#delivery`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/#reviews`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${base}/#contacts`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/account`, changeFrequency: "monthly", priority: 0.3 },
  ]
}
