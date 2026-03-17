import '../globals.css';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import Telemetry from '@/components/Telemetry';
import { SHARED_METADATA } from '@/constants/metadata';
import { monoFont } from '@/fonts';
import { defaultLocale, type Locale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export const metadata = SHARED_METADATA;

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
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);

  const menus = [
    { label: dict.nav.home, href: `/${locale}/` },
    { label: dict.nav.projects, href: `/${locale}/projects/` },
    { label: dict.nav.lutraBlog, href: 'https://lutralabs.io/blog', external: true },
  ];

  const copyright = dict.footer.copyright.replace('{year}', String(new Date().getFullYear()));

  return (
    <html lang={locale} className={`${monoFont.className} dark`} style={{ colorScheme: 'dark' }}>
      <body className="flex min-h-[100dvh] flex-col bg-background text-foreground">
        <Navigation lang={locale} menus={menus} openMenuLabel={dict.nav.openMenu} />
        <main className="grow flex flex-col no-scrollbar md:pt-32 md:pb-12 pt-28 pb-12 px-8 items-center justify-start max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Footer copyright={copyright} />
        <Telemetry />
      </body>
    </html>
  );
}
