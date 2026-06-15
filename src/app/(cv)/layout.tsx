import '../globals.css';
import type { Metadata } from 'next';
import { monoFont } from '@/fonts';

export const metadata: Metadata = {
  title: 'Urban Vidovič — CV',
  description:
    'Curriculum vitae of Urban Vidovič — Research & Development Engineer focused on decentralized identity, verifiable credentials, and Web3 product engineering.',
  robots: { index: true, follow: true },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={monoFont.className} style={{ colorScheme: 'light' }}>
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
