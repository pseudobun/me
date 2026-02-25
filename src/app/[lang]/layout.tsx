import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Providers } from '@/app/providers';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);

  const menus = [
    { label: dict.nav.home, href: `/${locale}/` },
    { label: dict.nav.projects, href: `/${locale}/projects/` },
    { label: dict.nav.lutraBlog, href: 'https://lutralabs.io/blog', external: true },
  ];

  const copyright = dict.footer.copyright.replace('{year}', String(new Date().getFullYear()));

  return (
    <Providers>
      <Navigation lang={locale} menus={menus} openMenuLabel={dict.nav.openMenu} />
      <main className="grow flex flex-col no-scrollbar md:pt-32 md:pb-12 pt-28 pb-12 px-8 items-center justify-center max-w-7xl mx-auto w-full">
        {children}
      </main>
      <Footer copyright={copyright} />
      <Analytics />
      <SpeedInsights />
    </Providers>
  );
}
