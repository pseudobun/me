import { type NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, type Locale, locales } from '@/i18n/config';

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

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Non-localized standalone routes (own root layout) — never prefix with a locale.
  if (pathname === '/cv' || pathname.startsWith('/cv/')) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname === `/${locale}` || pathname === `/${locale}/` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  redirectUrl.search = request.nextUrl.search;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)).*)',
    '/',
  ],
};
