import { type NextRequest, NextResponse } from 'next/server';
import { type ContentPage, isContentPage } from '@/content';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';
import { MARKDOWN_CONTENT_TYPE } from '@/lib/accept';
import { buildPageMarkdown, notFoundMarkdown } from '@/lib/markdown';

// Internal endpoint. The proxy rewrites `Accept: text/markdown` page requests
// here; it is never linked and never appears in the sitemap.
export const revalidate = 86400;

// Derived from ContentPage so adding a content page cannot silently leave its
// Markdown variant unroutable.
type Page = 'home' | 'projects' | 'cv' | ContentPage;

function resolve(segments: string[]): { locale: Locale; page: Page } | null {
  // /md/cv
  if (segments.length === 1 && segments[0] === 'cv') {
    return { locale: defaultLocale, page: 'cv' };
  }

  const [lang, ...rest] = segments;
  if (!lang || !isLocale(lang)) {
    return null;
  }

  if (rest.length === 0) {
    return { locale: lang, page: 'home' };
  }

  if (rest.length === 1) {
    const page = rest[0];
    if (page === 'projects') {
      return { locale: lang, page: 'projects' };
    }
    if (isContentPage(page)) {
      return { locale: lang, page };
    }
  }

  return null;
}

function markdownResponse(body: string, status: number) {
  return new NextResponse(body, {
    status,
    headers: {
      'content-type': MARKDOWN_CONTENT_TYPE,
      // Required by acceptmarkdown.com: without it a CDN can hand the cached
      // HTML variant to a client that asked for Markdown, or vice versa.
      vary: 'Accept, Accept-Encoding',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex',
    },
  });
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await context.params;
  const resolved = resolve(slug ?? []);

  if (!resolved) {
    return markdownResponse(notFoundMarkdown(), 404);
  }

  return markdownResponse(await buildPageMarkdown(resolved.locale, resolved.page), 200);
}
