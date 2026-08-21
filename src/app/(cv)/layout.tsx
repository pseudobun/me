import '../globals.css';
import type { Metadata } from 'next';
import { PERSONAL } from '@/constants/data';
import { SITE_NAME, SITE_URL, TWITTER_HANDLE } from '@/constants/metadata';
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
  applicationName: SITE_NAME,
  authors: [{ name: PERSONAL.fullName, url: SITE_URL }],
  creator: PERSONAL.fullName,
  publisher: PERSONAL.fullName,
  keywords: [
    'Urban Vidovič CV',
    'Urban Vidovic resume',
    'pseudobun',
    'decentralized identity engineer',
    'verifiable credentials engineer',
    'web3 engineer resume',
    'blockchain engineer slovenia',
  ],
  robots: { index: true, follow: true },
  // English-only document: x-default must resolve here too, otherwise the page
  // sits outside every hreflang cluster on the site.
  alternates: { canonical: CV_URL, languages: { en: CV_URL, 'x-default': CV_URL } },
  manifest: '/site.webmanifest',
  openGraph: {
    title: CV_TITLE,
    description: CV_DESCRIPTION,
    url: CV_URL,
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'profile',
    images: [{ url: OG_IMAGE_URL, width: 1200, height: 630, type: 'image/png', alt: CV_TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
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
