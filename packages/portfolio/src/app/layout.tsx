import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { METADATA } from '@/constants/metadata';
import { Providers } from '@/app/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { monoFont } from 'src/fonts';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = METADATA.root;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={monoFont.className} suppressHydrationWarning>
      <body className="dark flex flex-col min-h-[100dvh]">
        <Providers>
          <Navigation />
          <main className="flex-grow flex flex-col no-scrollbar md:pt-32 md:pb-12 pt-28 pb-12 px-8 items-center justify-center max-w-7xl mx-auto w-full">
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
