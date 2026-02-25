import './globals.css';
import { cookies } from 'next/headers';
import { monoFont } from 'src/fonts';
import { METADATA } from '@/constants/metadata';
import { defaultLocale, type Locale } from '@/i18n/config';

export const metadata = METADATA.root;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const lang = (cookieStore.get('NEXT_LOCALE')?.value as Locale) ?? defaultLocale;

  return (
    <html lang={lang} className={monoFont.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-[100dvh]">{children}</body>
    </html>
  );
}
