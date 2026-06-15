import '../globals.css';
import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/constants/metadata';
import { monoFont } from '@/fonts';

const CV_TITLE = 'Urban Vidovič | CV';
const CV_DESCRIPTION =
  'Curriculum vitae of Urban Vidovič — Research & Development Engineer focused on decentralized identity, verifiable credentials, and Web3 product engineering.';
const CV_URL = new URL('/cv/', SITE_URL).toString();
const OG_IMAGE_URL = new URL('/api/og/', SITE_URL).toString();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: CV_TITLE,
  description: CV_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: { canonical: CV_URL },
  openGraph: {
    title: CV_TITLE,
    description: CV_DESCRIPTION,
    url: CV_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, alt: CV_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@pseudourban',
    title: CV_TITLE,
    description: CV_DESCRIPTION,
    images: [OG_IMAGE_URL],
  },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={monoFont.className} style={{ colorScheme: 'light' }}>
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
