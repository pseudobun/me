import type { Metadata } from 'next';
import ExoticLink from '@/components/ExoticLink';
import FloatingShapes from '@/components/FloatingShapes';
import JsonLd from '@/components/JsonLd';
import Link from '@/components/Link';
import { Reveal } from '@/components/Reveal';
import { PERSONAL } from '@/constants/data';
import {
  createPageMetadata,
  getLocalizedUrl,
  getPageMetadataCopy,
  PERSON_ID,
  PERSON_IMAGE_URL,
  personSameAs,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from '@/constants/metadata';
import { defaultLocale, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  return createPageMetadata({
    locale,
    ogType: 'profile',
    page: 'home',
    path: '/',
  });
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const dict = await getDictionary(locale);
  const metadata = getPageMetadataCopy(locale, 'home');
  const d = dict.home;

  const pageUrl = getLocalizedUrl(locale, '/');

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: PERSONAL.fullName,
    givenName: PERSONAL.name,
    familyName: PERSONAL.lastName,
    alternateName: ['Urban Vidovic', 'pseudobun'],
    url: `${SITE_URL}/`,
    mainEntityOfPage: { '@id': `${pageUrl}#profilepage` },
    image: PERSON_IMAGE_URL,
    email: `mailto:${PERSONAL.email}`,
    nationality: { '@type': 'Country', name: 'Slovenia' },
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
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    inLanguage: locale,
    author: { '@id': PERSON_ID },
    creator: { '@id': PERSON_ID },
    publisher: { '@id': PERSON_ID },
    copyrightHolder: { '@id': PERSON_ID },
    description: metadata.description,
  };

  // ProfilePage is the type Google expects for a page whose subject is a person;
  // it is what lets Person show up as an entity rather than page boilerplate.
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${pageUrl}#profilepage`,
    url: pageUrl,
    name: metadata.title,
    description: metadata.description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    mainEntity: { '@id': PERSON_ID },
    about: { '@id': PERSON_ID },
    primaryImageOfPage: PERSON_IMAGE_URL,
  };

  return (
    <div className="mx-auto flex min-h-full w-full max-w-3xl flex-1 flex-col justify-center space-y-12">
      <JsonLd data={[profilePageSchema, personSchema, websiteSchema]} />
      <FloatingShapes />

      <Reveal as="section" className="mx-auto w-full max-w-2xl space-y-4">
        <h1 className="sr-only">{d.heading}</h1>
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
      </Reveal>

      <Reveal as="section" delay={120} className="mx-auto w-full max-w-2xl space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">{d.projects.title}</h2>
        <p className="text-lg font-bold text-muted-foreground">{d.projects.description}</p>
        <Link
          aria-label={d.ariaLabels.projects}
          href={`/${locale}/projects/`}
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          {d.projects.link}
        </Link>
      </Reveal>
    </div>
  );
}
