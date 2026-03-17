import type { MetadataRoute } from 'next';
import { getLocalizedUrl, getXDefaultUrl } from '@/constants/metadata';
import { locales } from '@/i18n/config';

const publicPaths = ['/', '/projects/'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: getLocalizedUrl(locale, path),
      lastModified: new Date(),
      changeFrequency: 'weekly',
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
}
