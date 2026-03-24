import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://www.tergomedia.com',                                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: 'https://www.tergomedia.com/services',                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://www.tergomedia.com/services/ai-automation',           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.tergomedia.com/services/custom-dev',              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.tergomedia.com/services/cto-advisory',            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.tergomedia.com/services/digital-transformation',  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.tergomedia.com/sectors/real-estate',              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.tergomedia.com/sectors/travel-hospitality',       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.tergomedia.com/sectors/agriculture',              lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.tergomedia.com/sectors/professional-services',    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://www.tergomedia.com/portfolio',                        lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://www.tergomedia.com/about',                            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://www.tergomedia.com/contact',                          lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    { url: 'https://www.tergomedia.com/tools',                            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];
}
