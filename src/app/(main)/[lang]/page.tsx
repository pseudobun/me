import type { Metadata } from 'next';
import Link from 'next/link';
import ExoticLink from '@/components/ExoticLink';
import JsonLd from '@/components/JsonLd';
import { PERSONAL } from '@/constants/data.mjs';
import {
  createPageMetadata,
  getLocalizedUrl,
  getPageMetadataCopy,
  personSameAs,
  SITE_NAME,
} from '@/constants/metadata';
import { defaultLocale, type Locale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;

  return createPageMetadata({
    locale,
    page: 'home',
    path: '/',
  });
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const metadata = getPageMetadataCopy(locale, 'home');
  const d = dict.home;

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSONAL.fullName,
    alternateName: ['Urban Vidovic', 'pseudobun'],
    url: getLocalizedUrl(locale, '/'),
    jobTitle: PERSONAL.position,
    description: metadata.description,
    homeLocation: {
      '@type': 'Place',
      addressLocality: 'Maribor',
      addressCountry: 'SI',
    },
    worksFor: [
      {
        '@type': 'Organization',
        name: PERSONAL.company,
        url: PERSONAL.companyUrl,
      },
      {
        '@type': 'Organization',
        name: PERSONAL.company2,
        url: PERSONAL.company2Url,
      },
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Maribor',
      url: PERSONAL.universityUrl,
    },
    knowsAbout: d.structuredData.knowsAbout,
    sameAs: personSameAs,
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: getLocalizedUrl(locale, '/'),
    inLanguage: locale,
    author: {
      '@type': 'Person',
      name: PERSONAL.fullName,
    },
    description: metadata.description,
  };

  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-1 flex-col justify-center space-y-12">
      <JsonLd data={[personSchema, websiteSchema]} />

      <section className="mx-auto w-full max-w-2xl space-y-4">
        <h1 className="sr-only">{PERSONAL.fullName}</h1>
        <p className="text-2xl font-bold text-foreground">{d.greeting}</p>
        <p className="text-lg leading-8 text-muted-foreground">
          {d.bio.intro}{' '}
          <ExoticLink
            ariaLabel={d.ariaLabels.company}
            className="font-medium"
            href={PERSONAL.companyUrl}
          >
            {PERSONAL.company}
          </ExoticLink>{' '}
          {d.bio.and}{' '}
          <ExoticLink
            ariaLabel={d.ariaLabels.company}
            className="font-medium"
            href={PERSONAL.company2Url}
          >
            {PERSONAL.company2}
          </ExoticLink>{' '}
          {d.bio.as} {PERSONAL.position}. {d.bio.masterDegree}{' '}
          <ExoticLink
            ariaLabel={d.ariaLabels.university}
            className="font-medium"
            href={PERSONAL.universityUrl}
          >
            {d.bio.university}
          </ExoticLink>
        </p>
      </section>

      <section className="mx-auto w-full max-w-2xl space-y-3">
        <h2 className="text-2xl font-semibold tracking-tight">{d.projects.title}</h2>
        <p className="text-lg text-muted-foreground">{d.projects.description}</p>
        <Link
          aria-label={d.ariaLabels.projects}
          href={`/${locale}/projects/`}
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          {d.projects.link}
        </Link>
      </section>
    </div>
  );
}
