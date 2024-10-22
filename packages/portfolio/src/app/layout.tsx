import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Navigation from '@/components/Navigation';
import { METADATA } from '@/constants/metadata';
import { Providers } from '@/app/providers';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { monoFont } from 'src/fonts';
import Footer from '@/components/Footer';

export const metadata = METADATA.root;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={monoFont.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-[100dvh]">
        <Providers>
          <header className="flex p-4 justify-center">
            <Navigation />
          </header>
          <main className="flex-grow flex flex-col no-scrollbar min-w-full sm:p-24 p-6 items-center justify-center max-w-4xl">
            {children}
          </main>
          <footer className="flex p-4 items-center justify-center w-screen">
            <Footer />
          </footer>
          <Analytics />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
