import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sushipanda-str.ru",
      changeFrequency: "daily",
      priority: 1,
    },
  ]
}
