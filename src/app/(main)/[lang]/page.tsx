import type { Metadata } from 'next';
import ExoticLink from '@/components/ExoticLink';
import FloatingShapes from '@/components/FloatingShapes';
import JsonLd from '@/components/JsonLd';
import Link from '@/components/Link';
import { Reveal } from '@/components/Reveal';
import { FEATURED_PROJECT_IDS, PERSONAL, PROJECTS } from '@/constants/data';
import {
  createPageMetadata,
  getLocalizedUrl,
  getPageMetadataCopy,
  ORG_ID,
  PERSON_ID,
  PERSON_IMAGE_URL,
  personSameAs,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
} from '@/constants/metadata';
import { defaultLocale, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { lookup } from '@/lib/utils';

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

  const featured = FEATURED_PROJECT_IDS.map((id) =>
    PROJECTS.find((project) => project.id === id)
  ).filter((project) => project !== undefined);

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
      { '@id': ORG_ID },
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

  // Full Organization node for the company Urban co-founded. contactPoint and
  // address are what let an agent verify the business and answer "how do I
  // reach them" without scraping the page body.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: PERSONAL.company2,
    url: PERSONAL.company2Url,
    description:
      'Product studio building standards-based digital identity, DeFi, and Web3 infrastructure.',
    founder: { '@id': PERSON_ID },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Maribor',
      addressRegion: 'Podravska',
      addressCountry: 'SI',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'business enquiries',
        email: PERSONAL.email,
        url: getLocalizedUrl(locale, '/contact/'),
        availableLanguage: ['en', 'sl'],
        areaServed: 'Worldwide',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'security',
        email: PERSONAL.email,
        url: PERSONAL.keybase,
        availableLanguage: ['en', 'sl'],
      },
    ],
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
      <JsonLd data={[profilePageSchema, personSchema, organizationSchema, websiteSchema]} />
      <FloatingShapes />

      <Reveal as="section" className="mx-auto w-full max-w-2xl space-y-4">
        {/* The H1 is the visible hero line, not a hidden duplicate: a sr-only
            H1 reads as "no heading" to extractors that walk visible text, which
            made the page look like it started at H2. The descriptive half stays
            visually hidden so the rendered design is unchanged. */}
        <h1 className="text-2xl font-bold text-foreground">
          {d.greeting}
          <span className="sr-only"> — {d.heading}</span>
        </h1>
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

      <Reveal as="section" delay={120} className="mx-auto w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{d.focus.title}</h2>
        <p className="text-lg leading-8 text-muted-foreground">{d.focus.intro}</p>
        {d.focus.areas.map((area) => (
          <div key={area.title} className="space-y-1">
            <h3 className="text-lg font-bold tracking-tight text-foreground">{area.title}</h3>
            <p className="text-lg leading-8 text-muted-foreground">{area.body}</p>
          </div>
        ))}
      </Reveal>

      <Reveal as="section" delay={160} className="mx-auto w-full max-w-2xl space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">{d.currently.title}</h2>
        <p className="text-lg leading-8 text-muted-foreground">{d.currently.body}</p>
        <p className="text-lg leading-8 text-muted-foreground">
          {d.currently.more}{' '}
          <Link href={`/${locale}/about/`} className="inline text-primary hover:text-primary/80">
            {dict.nav.about}
          </Link>
        </p>
      </Reveal>

      <Reveal as="section" delay={200} className="mx-auto w-full max-w-2xl space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">{d.projects.title}</h2>
        <p className="text-lg font-bold text-muted-foreground">{d.projects.description}</p>
        <ul className="space-y-3">
          {featured.map((project) => (
            <li key={project.id}>
              <h3 className="text-lg font-bold tracking-tight text-foreground">{project.title}</h3>
              <p className="text-lg leading-8 text-muted-foreground">
                {lookup(dict.projects.items, project.id)?.description ?? project.description}{' '}
                <span className="whitespace-nowrap">
                  ({dict.projects.developedAt} {project.org})
                </span>
              </p>
            </li>
          ))}
        </ul>
        <Link
          aria-label={d.ariaLabels.projects}
          href={`/${locale}/projects/`}
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          {d.projects.link}
        </Link>
      </Reveal>

      <Reveal as="section" delay={240} className="mx-auto w-full max-w-2xl space-y-3">
        <h2 className="text-2xl font-bold tracking-tight">{d.elsewhere.title}</h2>
        <p className="text-lg leading-8 text-muted-foreground">{d.elsewhere.body}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-lg">
          <li>
            <ExoticLink ariaLabel={d.elsewhere.github} href={PERSONAL.github}>
              {d.elsewhere.github}
            </ExoticLink>
          </li>
          <li>
            <ExoticLink ariaLabel={d.elsewhere.linkedin} href={PERSONAL.linkedin}>
              {d.elsewhere.linkedin}
            </ExoticLink>
          </li>
          <li>
            <ExoticLink ariaLabel={d.elsewhere.cv} href="/cv/">
              {d.elsewhere.cv}
            </ExoticLink>
          </li>
          <li>
            <Link
              href={`/${locale}/contact/`}
              className="inline text-primary hover:text-primary/80"
            >
              {d.elsewhere.contact}
            </Link>
          </li>
        </ul>
      </Reveal>
    </div>
  );
}
