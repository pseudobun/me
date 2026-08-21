import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/constants/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Internal Markdown variants of the HTML pages. Agents should reach them
      // through Accept negotiation on the canonical URL, not by crawling /md.
      disallow: '/md/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
