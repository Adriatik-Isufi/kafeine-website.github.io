import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kafeine-ks.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date('2025-09-15'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date('2025-09-15'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
