import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Navigation from '../components/Navigation';
import { METADATA } from '../constants/metadata';
import { Providers } from './providers';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = METADATA.root;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="font-cabin text-cappuccino no-scrollbar flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-tr from-black to-gray-800 bg-fixed sm:p-24 p-6 pt-20">
            <Navigation />
            {children}
            {/* <Footer /> */}
            <Analytics />
            <SpeedInsights />
          </main>
        </Providers>
      </body>
    </html>
  );
}
