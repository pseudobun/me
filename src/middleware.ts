import { type NextRequest, NextResponse } from 'next/server';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse Accept-Language header, e.g. "sl,en-US;q=0.9,en;q=0.8"
    const preferred = acceptLanguage
      .split(',')
      .map((entry) => {
        const [code, q] = entry.trim().split(';q=');
        return {
          code: code.trim().split('-')[0].toLowerCase(),
          q: q ? Number.parseFloat(q) : 1.0,
        };
      })
      .sort((a, b) => b.q - a.q);

    for (const { code } of preferred) {
      if (locales.includes(code as Locale)) {
        return code as Locale;
      }
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname === `/${locale}/` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    // Extract the active locale and keep it in a cookie for the root layout
    const locale =
      locales.find(
        (l) => pathname === `/${l}` || pathname === `/${l}/` || pathname.startsWith(`/${l}/`),
      ) ?? defaultLocale;
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
    return response;
  }

  // No locale in the path → detect and redirect
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;

  const response = NextResponse.redirect(newUrl);
  response.cookies.set('NEXT_LOCALE', locale, { path: '/' });
  return response;
}

export const config = {
  // Skip Next.js internals, API routes, and files with extensions (static assets)
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)).*)', '/'],
};
