import type { MetadataRoute } from 'next';
import { getLocalizedUrl, getXDefaultUrl, SITE_URL } from '@/constants/metadata';
import { locales } from '@/i18n/config';

const publicPaths = ['/', '/projects/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const localized = publicPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: getLocalizedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1 : 0.8,
      alternates: {
        languages: {
          en: getLocalizedUrl('en', path),
          sl: getLocalizedUrl('sl', path),
          'x-default': getXDefaultUrl(path),
        },
      },
    }))
  );

  return [
    ...localized,
    {
      url: new URL('/cv/', SITE_URL).toString(),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];
}
