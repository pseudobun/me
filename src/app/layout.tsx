import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { monoFont } from 'src/fonts';
import { Providers } from '@/app/providers';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import { METADATA } from '@/constants/metadata';

export const metadata = METADATA.root;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={monoFont.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-[100dvh]">
        <Providers>
          <Navigation />
          <main className="grow flex flex-col no-scrollbar md:pt-32 md:pb-12 pt-28 pb-12 px-8 items-center justify-center max-w-7xl mx-auto w-full">
            {children}
          </main>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
