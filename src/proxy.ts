import { type NextRequest, NextResponse } from 'next/server';
import { fallbackLocale, isLocale, type Locale, locales } from '@/i18n/config';
import { mergeVary, negotiatePageType } from '@/lib/accept';
import { isCvPath, markdownPath } from '@/lib/md-route';

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');

  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(',')
      .map((entry) => {
        const [code, q] = entry.trim().split(';q=');
        const parsed = q ? Number.parseFloat(q) : 1;

        return {
          code: code.trim().split('-')[0].toLowerCase(),
          q: Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 1,
        };
      })
      .sort((a, b) => b.q - a.q);

    for (const { code } of preferred) {
      if (isLocale(code)) {
        return code;
      }
    }
  }

  return fallbackLocale;
}

function hasLocalePrefix(pathname: string) {
  return locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname === `/${locale}/` || pathname.startsWith(`/${locale}/`)
  );
}

/**
 * React Server Component navigations and prefetches carry their own Accept
 * (`text/x-component`). Negotiating those would break client-side routing, so
 * they are always passed straight through.
 */
function isRscRequest(request: NextRequest) {
  return (
    request.headers.has('rsc') ||
    request.headers.has('next-router-prefetch') ||
    request.nextUrl.searchParams.has('_rsc') ||
    (request.headers.get('accept') ?? '').includes('text/x-component')
  );
}

/**
 * Append `Vary: Accept` without dropping the values Next.js sets for its own
 * router headers — the CDN needs the union, not the last writer's value.
 *
 * This only reaches responses the proxy actually generates — the Markdown
 * rewrite and the 406. Next.js overwrites `Vary` on prerendered pages with its
 * own router value, and neither `next.config.ts` `headers()` nor `vercel.json`
 * can win that (verified in production: a sibling header from the same
 * vercel.json rule landed while `Vary` did not). Forcing it would mean making
 * every page dynamic, which is not worth it: negotiation happens here, ahead
 * of the CDN lookup, so a Markdown request is rewritten to /md and never
 * consults the HTML cache entry in the first place.
 */
function withVaryAccept(response: NextResponse) {
  response.headers.set('vary', mergeVary(response.headers.get('vary'), 'Accept'));

  return response;
}

const NOT_ACCEPTABLE_BODY = [
  '# 406 — Not Acceptable',
  '',
  'This URL can be served as `text/html` or `text/markdown`.',
  'Send `Accept: text/markdown`, `Accept: text/html`, or `Accept: */*`.',
  '',
].join('\n');

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method.toUpperCase();

  // Negotiation only applies to safe reads of real page routes.
  const negotiable =
    (method === 'GET' || method === 'HEAD') &&
    !isRscRequest(request) &&
    (isCvPath(pathname) || hasLocalePrefix(pathname));

  if (negotiable) {
    const wanted = negotiatePageType(request.headers.get('accept'));

    if (wanted === 406) {
      return new NextResponse(NOT_ACCEPTABLE_BODY, {
        status: 406,
        headers: {
          'content-type': 'text/markdown; charset=utf-8',
          vary: 'Accept, Accept-Encoding',
        },
      });
    }

    if (wanted === 'markdown') {
      const url = request.nextUrl.clone();
      url.pathname = markdownPath(pathname);

      return withVaryAccept(NextResponse.rewrite(url));
    }

    return withVaryAccept(NextResponse.next());
  }

  // Non-localized standalone routes (own root layout) — never prefix with a locale.
  if (isCvPath(pathname) || hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|llms\\.txt|agent\\.txt|api|md|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|txt|xml|json|webmanifest|pdf|ttf|otf|woff|woff2)).*)',
    '/',
  ],
};
