import '../../globals.css';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Telemetry from '@/components/Telemetry';
import { SHARED_METADATA } from '@/constants/metadata';
import { monoFont } from '@/fonts';
import { defaultLocale, isLocale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export const metadata = SHARED_METADATA;

// Regenerate daily so the footer copyright year (new Date()) doesn't freeze at
// build time on this statically-generated layout.
export const revalidate = 86400;

// Only real locales resolve here. Without this, `/[lang]` happily matches any
// single-segment path (`/llms.txt`, `/anything`) and renders the homepage with
// a 200, which tells crawlers and agents that every URL on the site exists.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);

  const menus = [
    { label: dict.nav.home, href: `/${locale}/` },
    { label: dict.nav.projects, href: `/${locale}/projects/` },
    { label: dict.nav.lutraBlog, href: 'https://lutralabs.io/blog', external: true },
    { label: dict.nav.cv, href: '/cv/', external: true },
  ];

  // Trust-anchor pages live in the footer rather than the primary nav: they are
  // the pages agents and readers look up deliberately, not primary navigation.
  const footerLinks = [
    { label: dict.nav.about, href: `/${locale}/about/` },
    { label: dict.nav.contact, href: `/${locale}/contact/` },
    { label: dict.nav.privacy, href: `/${locale}/privacy/` },
  ];

  const copyright = dict.footer.copyright.replace('{year}', String(new Date().getFullYear()));

  return (
    <html lang={locale} className={`${monoFont.className} dark`} style={{ colorScheme: 'dark' }}>
      <body className="flex min-h-[100dvh] flex-col bg-background text-foreground">
        <Navigation
          lang={locale}
          menus={menus}
          openMenuLabel={dict.nav.openMenu}
          externalHint={dict.nav.opensInNewTab}
        />
        <main className="grow flex flex-col no-scrollbar md:pt-32 md:pb-12 pt-28 pb-12 px-8 items-center justify-start max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Footer copyright={copyright} links={footerLinks} />
        <Telemetry />
      </body>
    </html>
  );
}
