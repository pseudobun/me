import type { Metadata } from 'next';
import ContentBlocks from '@/components/ContentBlocks';
import JsonLd from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { createPageMetadata, getLocalizedUrl, PERSON_ID, WEBSITE_ID } from '@/constants/metadata';
import { getPageContent, toPlainText } from '@/content';
import { defaultLocale, isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

const PAGE = 'privacy' as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;

  return createPageMetadata({ locale, page: PAGE, path: `/${PAGE}/` });
}

export default async function PrivacyPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const [dict, content] = await Promise.all([
    getDictionary(locale),
    Promise.resolve(getPageContent(locale, PAGE)),
  ]);

  const pageUrl = getLocalizedUrl(locale, `/${PAGE}/`);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: getLocalizedUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: content.title, item: pageUrl },
    ],
  };

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: content.title,
    description: toPlainText(content.summary),
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    about: { '@id': PERSON_ID },
    author: { '@id': PERSON_ID },
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col">
      <JsonLd data={[breadcrumbSchema, pageSchema]} />

      <Reveal as="section" className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{content.title}</h1>
        <p className="text-xl font-bold text-muted-foreground">{toPlainText(content.summary)}</p>
      </Reveal>

      <article className="mt-4">
        <ContentBlocks blocks={content.blocks} />
      </article>
    </div>
  );
}
