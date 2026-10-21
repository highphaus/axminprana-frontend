import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://axminprana.com';

  const staticRoutes = [
    '',
    '/shop',
    '/education',
    '/articles',
    '/about',
    '/faqs',
    '/contact',
    '/policies/shipping',
    '/policies/returns',
    '/policies/cancellation',
    '/policies/privacy',
    '/policies/terms',
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return staticRoutes;
}
