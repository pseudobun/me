import type { Metadata } from 'next';
import { fallbackLocale, type Locale, locales } from '@/i18n/config';
import { PERSONAL } from './data';

export const SITE_URL = 'https://pseudobun.dev';
export const SITE_NAME = "Bunny's Den";
export const SITE_TITLE = 'Urban Vidovič';
export const GOOGLE_SITE_VERIFICATION = '6FH2mAeC6dWc9Y5PCXe_dec8X3SvLKRZx-aZ1I7fanY';
export const TWITTER_HANDLE = '@pseudourban';

// Stable schema.org node ids. Every locale variant and the CV page reference the
// same @id so search engines resolve one entity instead of one per URL.
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const ORG_ID = `${PERSONAL.company2Url}/#organization`;
export const PERSON_IMAGE_URL = `${SITE_URL}/urban-vidovic.jpg`;

type SitePath = '/' | '/projects/' | '/about/' | '/contact/' | '/privacy/';
type MetadataPage = 'home' | 'projects' | 'about' | 'contact' | 'privacy';

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
      title: 'Urban Vidovič | Decentralized Identity and Web3 Engineer',
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
      title: 'Urban Vidovič | Projects Across Identity, Web3, and Applied R&D',
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
    about: {
      title: 'About Urban Vidovič | Decentralized Identity and Web3 Engineer',
      description:
        'Background, focus areas, and working principles of Urban Vidovič — R&D engineer at Blockchain Lab:UM and co-founder of Lutra Labs, working on decentralized identity and Web3.',
      keywords: [
        'about Urban Vidovič',
        'Urban Vidovic biography',
        'decentralized identity engineer',
        'Lutra Labs co-founder',
        'Blockchain Lab UM engineer',
      ],
    },
    contact: {
      title: 'Contact Urban Vidovič | Email, PGP, and Verified Profiles',
      description:
        'How to reach Urban Vidovič: email, PGP key, and verified GitHub, LinkedIn, X, Telegram, and Farcaster profiles, plus what to reach out about.',
      keywords: [
        'contact Urban Vidovič',
        'Urban Vidovic email',
        'pseudobun contact',
        'PGP key',
        'security disclosure',
      ],
    },
    privacy: {
      title: 'Privacy | pseudobun.dev',
      description:
        'Privacy policy for pseudobun.dev: no cookies, no accounts, no advertising. Only cookieless, aggregate traffic measurement via Vercel Analytics and Speed Insights.',
      keywords: ['privacy policy', 'cookieless analytics', 'GDPR', 'pseudobun.dev privacy'],
    },
  },
  sl: {
    home: {
      title: 'Urban Vidovič | Software Engineer za decentralizirano identiteto in Web3',
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
      title: 'Urban Vidovič | Projekti s področja identitete, Web3 in uporabnega R&R',
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
    about: {
      title: 'O Urbanu Vidoviču | Decentralizirana identiteta in Web3',
      description:
        'Ozadje, področja dela in načela Urbana Vidoviča — R&R inženirja v Blockchain Lab:UM in soustanovitelja Lutra Labs, ki dela na decentralizirani identiteti in Web3.',
      keywords: [
        'o Urbanu Vidoviču',
        'Urban Vidovič biografija',
        'decentralizirana identiteta',
        'Lutra Labs soustanovitelj',
        'Blockchain Lab UM',
      ],
    },
    contact: {
      title: 'Kontakt Urban Vidovič | E-pošta, PGP in preverjeni profili',
      description:
        'Kako doseči Urbana Vidoviča: e-pošta, PGP ključ ter preverjeni profili GitHub, LinkedIn, X, Telegram in Farcaster, in o čem mu pisati.',
      keywords: [
        'kontakt Urban Vidovič',
        'Urban Vidovič e-pošta',
        'pseudobun kontakt',
        'PGP ključ',
        'prijava ranljivosti',
      ],
    },
    privacy: {
      title: 'Zasebnost | pseudobun.dev',
      description:
        'Politika zasebnosti za pseudobun.dev: brez piškotkov, brez računov, brez oglasov. Samo agregirane meritve obiska brez piškotkov prek Vercel Analytics in Speed Insights.',
      keywords: [
        'politika zasebnosti',
        'analitika brez piškotkov',
        'GDPR',
        'zasebnost pseudobun.dev',
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
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
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

// `x-default` must resolve to a 200, self-canonical, indexable page. The bare
// `/{path}` 307-redirects through Accept-Language negotiation, so point it at the
// same locale the proxy falls back to when no language preference is expressed.
export function getXDefaultUrl(path: SitePath) {
  return getLocalizedUrl(fallbackLocale, path);
}

function getOgImageUrl() {
  return `${SITE_URL}/api/og/`;
}

export function getPageMetadataCopy(locale: Locale, page: MetadataPage) {
  return pageMetadata[locale][page];
}

export function createPageMetadata({
  locale,
  ogType = 'website',
  page,
  path,
}: {
  locale: Locale;
  ogType?: 'profile' | 'website';
  page: MetadataPage;
  path: SitePath;
}): Metadata {
  const copy = getPageMetadataCopy(locale, page);
  const localizedUrl = getLocalizedUrl(locale, path);
  const ogImageUrl = getOgImageUrl();

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
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocales[l]),
      ...(ogType === 'profile'
        ? {
            type: 'profile' as const,
            firstName: PERSONAL.name,
            lastName: PERSONAL.lastName,
            username: 'pseudobun',
          }
        : { type: 'website' as const }),
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: `${SITE_TITLE} — ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: copy.title,
      description: copy.description,
      images: [ogImageUrl],
    },
  };
}
