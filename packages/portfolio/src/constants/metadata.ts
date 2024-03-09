import type { Metadata } from 'next';

type ExtendedMetadata = Record<string, Metadata>;

export const METADATA: ExtendedMetadata = {
  root: {
    metadataBase: new URL('https://pseudobun.dev'),
    title: { template: 'Urban | %s', default: 'Urban | Portfolio' },
    description:
      "Delve into the innovative world of blockchain and Web3 with Urban Vidovič (Urban Vidovic), known online as pseudobun. With a Master's Degree in Computer Science, Urban, a skilled Research and Development (R&D) Engineer at Blockchain Lab:UM, specializes in decentralization, Ethereum, and the verifiable web and contributes to open-source software. His expertise extends to cybersecurity, cryptography, and networking. Discover Urban's groundbreaking work and insights at pseudobun.dev.",
    openGraph: {
      title: "Bunny's Den",
      description: "Urban's personal website. Written with 🤍.",
      url: 'https://pseudobun.dev',
      siteName: "Bunny's Den",
      images: [
        {
          url: 'https://pseudobun.dev/api/og',
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Bunny's Den",
      description: "Urban's personal website. Written with 🤍.",
      creator: '@pseudourban',
      images: ['https://pseudobun.dev/api/og'],
    },
    verification: {
      google: '6FH2mAeC6dWc9Y5PCXe_dec8X3SvLKRZx-aZ1I7fanY',
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/favicon.ico',
    },
  },
};
