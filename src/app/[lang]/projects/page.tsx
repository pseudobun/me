import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ProjectCard from '@/components/ProjectCard';
import { PERSONAL, PROJECTS } from '@/constants/data.mjs';
import { createPageMetadata, getLocalizedUrl, getPageMetadataCopy } from '@/constants/metadata';
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
    page: 'projects',
    path: '/projects/',
  });
}

export default async function Projects({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const metadata = getPageMetadataCopy(locale, 'projects');
  const d = dict.projects;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
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
    name: d.title,
    description: metadata.description,
    url: getLocalizedUrl(locale, '/projects/'),
    inLanguage: locale,
    about: PROJECTS.flatMap((project) => project.tags).slice(0, 20),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          creator: {
            '@type': 'Person',
            name: PERSONAL.fullName,
          },
          description:
            d.items[project.id as keyof typeof d.items]?.description ?? project.description,
          keywords: project.tags.join(', '),
          name: project.title,
          url: project.website ?? project.appStore ?? project.github ?? undefined,
        },
      })),
    },
  };

  return (
    <div className="flex flex-1 flex-col h-full w-full gap-y-8 justify-start mb-12 max-w-full">
      <JsonLd data={[breadcrumbSchema, collectionSchema]} />

      <section className="max-w-4xl space-y-2">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{d.title}</h1>
        <p className="text-xl text-muted-foreground">{d.subtitle}</p>
      </section>

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
              description={
                d.items[project.id as keyof typeof d.items]?.description ?? project.description
              }
              website={project.website}
              image={project.image}
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
