import type { Metadata } from 'next';
import GithubStatsStatement from '@/components/GithubStatsStatement';
import JsonLd from '@/components/JsonLd';
import ProjectCard from '@/components/ProjectCard';
import { Reveal } from '@/components/Reveal';
import { PROJECTS } from '@/constants/data';
import {
  createPageMetadata,
  getLocalizedUrl,
  getPageMetadataCopy,
  PERSON_ID,
  WEBSITE_ID,
} from '@/constants/metadata';
import { defaultLocale, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { getProjectGithubStats } from '@/lib/github-project-stats';
import { lookup } from '@/lib/utils';

// Must be a static literal (Next segment config); keep in sync with
// GITHUB_STATS_REVALIDATE_SECONDS in @/lib/github-project-stats.
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  return createPageMetadata({
    locale,
    page: 'projects',
    path: '/projects/',
  });
}

export default async function Projects({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const [dict, projectGithubStats] = await Promise.all([
    getDictionary(locale),
    getProjectGithubStats(),
  ]);
  const metadata = getPageMetadataCopy(locale, 'projects');
  const d = dict.projects;
  const statsLocale = locale === 'sl' ? 'sl-SI' : 'en-US';

  const pageUrl = getLocalizedUrl(locale, '/projects/');

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: dict.nav.home,
        item: getLocalizedUrl(locale, '/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: d.title,
        item: getLocalizedUrl(locale, '/projects/'),
      },
    ],
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#collectionpage`,
    name: d.title,
    description: metadata.description,
    url: pageUrl,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    author: { '@id': PERSON_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: PROJECTS.length,
      itemListOrder: 'https://schema.org/ItemListOrderAscending',
      itemListElement: PROJECTS.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        // Descriptions are omitted deliberately: they are already in the
        // rendered DOM, and JsonLd server-renders into both the flight payload
        // and the document, so every byte here is paid for twice.
        item: {
          '@type': 'CreativeWork',
          author: { '@id': PERSON_ID },
          name: project.title,
          keywords: project.tags.join(', '),
          url: project.website ?? project.appStore ?? project.github ?? undefined,
        },
      })),
    },
  };

  return (
    <div className="flex flex-1 flex-col h-full w-full gap-y-8 justify-start mb-12 max-w-full">
      <JsonLd data={[breadcrumbSchema, collectionSchema]} />

      <Reveal as="section" className="max-w-4xl space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{d.title}</h1>
        <p className="text-xl font-bold text-muted-foreground">{d.subtitle}</p>
      </Reveal>

      <Reveal as="section" delay={100} className="max-w-5xl" aria-label={d.githubStats.ariaLabel}>
        <GithubStatsStatement
          additionsLabel={d.githubStats.added}
          acrossLabel={d.githubStats.across}
          andLabel={d.githubStats.and}
          commitsLabel={d.githubStats.commits}
          locale={statsLocale}
          removalsLabel={d.githubStats.removed}
          reposLabel={d.githubStats.repos}
          stats={projectGithubStats}
          unavailableLabel={d.githubStats.unavailable}
          withLabel={d.githubStats.with}
        />
      </Reveal>

      <section aria-label={d.title}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              delay={index * 0.08}
              appStore={project.appStore}
              github={project.github}
              org={project.org}
              orgUrl={project.orgUrl}
              highlight={project.highlight}
              title={project.title}
              description={lookup(d.items, project.id)?.description ?? project.description}
              website={project.website}
              image={
                project.image
                  ? {
                      src: project.image.src,
                      width: project.image.width,
                      height: project.image.height,
                    }
                  : undefined
              }
              developedAt={d.developedAt}
              readMore={d.readMore}
              showLess={d.showLess}
              tags={project.tags}
              tagsLabel={d.tagsLabel}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
