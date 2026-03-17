import type { Metadata } from 'next';
import type { Locale } from '@/i18n/config';
import { PERSONAL } from './data.mjs';

export const SITE_URL = 'https://pseudobun.dev';
export const SITE_NAME = "Bunny's Den";
export const SITE_TITLE = 'Urban Vidovič';
export const GOOGLE_SITE_VERIFICATION = '6FH2mAeC6dWc9Y5PCXe_dec8X3SvLKRZx-aZ1I7fanY';

type SitePath = '/' | '/projects/';
type MetadataPage = 'home' | 'projects';

const ogLocales: Record<Locale, string> = {
  en: 'en_US',
  sl: 'sl_SI',
};

const pageMetadata: Record<
  Locale,
  Record<
    MetadataPage,
    {
      description: string;
      keywords: string[];
      title: string;
    }
  >
> = {
  en: {
    home: {
      title: 'Urban Vidovič - Decentralized Identity and Web3 Engineer',
      description:
        'Urban Vidovič is a software engineer from Slovenia focused on decentralized identity, verifiable credentials, Web3 product engineering, and security-minded research.',
      keywords: [
        'Urban Vidovič',
        'Urban Vidovic',
        'pseudobun',
        'decentralized identity engineer',
        'verifiable credentials',
        'web3 engineer',
        'blockchain engineer slovenia',
      ],
    },
    projects: {
      title: 'Urban Vidovič - Projects Across Identity, Web3, and Applied R&D',
      description:
        'Selected projects by Urban Vidovič across decentralized identity, verifiable credentials, DeFi, AI tooling, and Web3 product research and development.',
      keywords: [
        'Urban Vidovič projects',
        'web3 projects',
        'decentralized identity projects',
        'verifiable credentials projects',
        'blockchain portfolio',
      ],
    },
  },
  sl: {
    home: {
      title: 'Urban Vidovič - Software Engineer za decentralizirano identiteto in Web3',
      description:
        'Urban Vidovič je software engineer iz Slovenije, osredotočen na decentralizirano identiteto, preverljive poverilnice, Web3 produkte in varnostno usmerjene raziskave.',
      keywords: [
        'Urban Vidovič',
        'Urban Vidovic',
        'pseudobun',
        'decentralizirana identiteta',
        'preverljive poverilnice',
        'web3 inženir',
        'blockchain slovenija',
      ],
    },
    projects: {
      title: 'Urban Vidovič - Projekti s področja identitete, Web3 in uporabnega R&R',
      description:
        'Izbrani projekti Urbana Vidoviča s področja decentralizirane identitete, preverljivih poverilnic, DeFi-ja, AI orodij in Web3 raziskav ter razvoja.',
      keywords: [
        'Urban Vidovič projekti',
        'web3 projekti',
        'decentralizirana identiteta',
        'preverljive poverilnice',
        'blockchain portfolio',
      ],
    },
  },
};

export const SHARED_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: PERSONAL.fullName, url: SITE_URL }],
  creator: PERSONAL.fullName,
  publisher: PERSONAL.fullName,
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    follow: true,
    index: true,
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export const personSameAs = [
  PERSONAL.github,
  PERSONAL.linkedin,
  PERSONAL.twitter,
  PERSONAL.farcaster,
  PERSONAL.keybase,
  PERSONAL.telegram,
  PERSONAL.hey,
];

export function getLocalizedPath(locale: Locale, path: SitePath) {
  if (path === '/') {
    return `/${locale}/`;
  }

  return `/${locale}${path}`;
}

export function getLocalizedUrl(locale: Locale, path: SitePath) {
  return new URL(getLocalizedPath(locale, path), SITE_URL).toString();
}

export function getXDefaultUrl(path: SitePath) {
  return new URL(path, SITE_URL).toString();
}

function getOgImageUrl(title: string, description: string) {
  const params = new URLSearchParams({ description, title });
  return `${SITE_URL}/api/og/?${params.toString()}`;
}

export function getPageMetadataCopy(locale: Locale, page: MetadataPage) {
  return pageMetadata[locale][page];
}

export function createPageMetadata({
  locale,
  page,
  path,
}: {
  locale: Locale;
  page: MetadataPage;
  path: SitePath;
}): Metadata {
  const copy = getPageMetadataCopy(locale, page);
  const localizedUrl = getLocalizedUrl(locale, path);
  const ogImageUrl = getOgImageUrl(copy.title, copy.description);

  return {
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: {
      canonical: localizedUrl,
      languages: {
        en: getLocalizedUrl('en', path),
        sl: getLocalizedUrl('sl', path),
        'x-default': getXDefaultUrl(path),
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: localizedUrl,
      siteName: SITE_NAME,
      locale: ogLocales[locale],
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${copy.title} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@pseudourban',
      title: copy.title,
      description: copy.description,
      images: [ogImageUrl],
    },
  };
}
