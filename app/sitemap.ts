import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://sushipanda-str.ru"
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/account`, changeFrequency: "monthly", priority: 0.3 },
  ]
}
