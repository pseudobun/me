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
          <main className="flex-grow flex flex-col no-scrollbar min-w-full sm:p-24 p-6 items-center justify-center max-w-4xl">
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
