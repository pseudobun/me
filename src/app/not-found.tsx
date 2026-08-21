import './globals.css';
import type { Metadata } from 'next';
import NotFoundContent, { NOT_FOUND_COPY_EN } from '@/components/NotFoundContent';
import { monoFont } from '@/fonts';

// Global 404. This file sits above both root layouts ((main) and (cv)), so it
// has to render <html>/<body> itself — Next has no root layout to wrap it in.
export const metadata: Metadata = {
  title: '404 — Page not found',
  description:
    'This URL does not exist on pseudobun.dev. Links to the site index, sitemap, and llms.txt for recovery.',
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${monoFont.className} dark`} style={{ colorScheme: 'dark' }}>
      <body className="flex min-h-[100dvh] flex-col bg-background px-8 text-foreground">
        <main className="mx-auto flex w-full max-w-7xl grow flex-col justify-center">
          <NotFoundContent copy={NOT_FOUND_COPY_EN} locale="en" />
        </main>
      </body>
    </html>
  );
}
