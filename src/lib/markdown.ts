import 'server-only';
import {
  CV_EDUCATION,
  CV_EXPERIENCE,
  CV_LANGUAGES,
  CV_LOCATION,
  CV_PGP_URL,
  CV_PROJECTS,
  CV_SKILLS,
  CV_SUMMARY,
  CV_TITLE,
} from '@/constants/cv';
import { PERSONAL, PROJECTS } from '@/constants/data';
import { getLocalizedUrl, getPageMetadataCopy, SITE_NAME, SITE_URL } from '@/constants/metadata';
import { blocksToMarkdown, type ContentPage, getPageContent } from '@/content';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';
import { lookup } from '@/lib/utils';

function footer(canonical: string, locale: Locale | null): string {
  const lines = ['', '---', '', `Canonical HTML: ${canonical}`];

  if (locale) {
    const other: Locale = locale === 'en' ? 'sl' : 'en';
    lines.push(`Other language: ${getLocalizedUrl(other, '/')} (${other})`);
  }

  lines.push(`Site index for agents: ${SITE_URL}/llms.txt`);

  return `${lines.join('\n')}\n`;
}

async function homeMarkdown(locale: Locale): Promise<string> {
  const dict = await getDictionary(locale);
  const copy = getPageMetadataCopy(locale, 'home');
  const d = dict.home;

  const body = [
    `# ${d.heading}`,
    '',
    `> ${copy.description}`,
    '',
    '## Introduction',
    '',
    `${d.bio.intro} ${PERSONAL.company} ${d.bio.and} ${PERSONAL.company2} ${d.bio.as} ${PERSONAL.position}. ${d.bio.masterDegree} ${d.bio.university}`,
    '',
    '## Focus areas',
    '',
    ...d.structuredData.knowsAbout.map((item: string) => `- ${item}`),
    '',
    `## ${d.projects.title}`,
    '',
    d.projects.description,
    '',
    `- [${d.projects.link}](${getLocalizedUrl(locale, '/projects/')})`,
    '',
    '## Pages',
    '',
    `- [${dict.nav.about}](${getLocalizedUrl(locale, '/about/')})`,
    `- [${dict.nav.contact}](${getLocalizedUrl(locale, '/contact/')})`,
    `- [${dict.nav.privacy}](${getLocalizedUrl(locale, '/privacy/')})`,
    `- [${dict.nav.cv}](${SITE_URL}/cv/)`,
  ].join('\n');

  return body + footer(getLocalizedUrl(locale, '/'), locale);
}

async function projectsMarkdown(locale: Locale): Promise<string> {
  const dict = await getDictionary(locale);
  const copy = getPageMetadataCopy(locale, 'projects');
  const d = dict.projects;

  const lines = [`# ${d.title}`, '', `> ${copy.description}`, '', d.subtitle];

  for (const project of PROJECTS) {
    const description = lookup(d.items, project.id)?.description ?? project.description;
    const url = project.website ?? project.appStore ?? project.github;

    lines.push('', `## ${project.title}`, '');
    lines.push(description);
    lines.push('', `- ${d.developedAt}: [${project.org}](${project.orgUrl})`);
    lines.push(`- ${d.tagsLabel}: ${project.tags.join(', ')}`);
    if (url) {
      lines.push(`- Link: ${url}`);
    }
    if (project.github && project.github !== url) {
      lines.push(`- Source: ${project.github}`);
    }
  }

  return lines.join('\n') + footer(getLocalizedUrl(locale, '/projects/'), locale);
}

function cvMarkdown(): string {
  const lines = [
    `# ${PERSONAL.fullName}`,
    '',
    `> ${CV_TITLE} — ${CV_LOCATION}`,
    '',
    CV_SUMMARY,
    '',
    '## Contact',
    '',
    `- Email: ${PERSONAL.email}`,
    `- GitHub: ${PERSONAL.github}`,
    `- LinkedIn: ${PERSONAL.linkedin}`,
    `- PGP: ${CV_PGP_URL}`,
    '',
    '## Experience',
  ];

  for (const role of CV_EXPERIENCE) {
    lines.push('', `### ${role.role} — ${role.org}`, '', `${role.period} · ${role.location}`, '');
    for (const point of role.points) {
      lines.push(`- ${point}`);
    }
  }

  lines.push('', '## Education');
  for (const entry of CV_EDUCATION) {
    lines.push('', `### ${entry.degree}`, '', `${entry.school} · ${entry.period}`);
  }

  lines.push('', '## Skills');
  for (const group of CV_SKILLS) {
    lines.push('', `### ${group.label}`, '', group.items.join(', '));
  }

  lines.push('', '## Selected projects');
  for (const project of CV_PROJECTS) {
    lines.push('', `### ${project.title} — ${project.org}`, '', project.description);
    if (project.url) {
      lines.push('', project.url);
    }
  }

  lines.push('', '## Languages', '');
  for (const language of CV_LANGUAGES) {
    lines.push(`- ${language.name}: ${language.level}`);
  }

  lines.push('', `PDF version: ${SITE_URL}/api/cv/`);

  return lines.join('\n') + footer(`${SITE_URL}/cv/`, null);
}

const CONTENT_PATHS = {
  about: '/about/',
  contact: '/contact/',
  privacy: '/privacy/',
} as const;

async function contentMarkdown(locale: Locale, page: ContentPage): Promise<string> {
  const content = getPageContent(locale, page);

  return blocksToMarkdown(content) + footer(getLocalizedUrl(locale, CONTENT_PATHS[page]), locale);
}

/**
 * Markdown representation of a page, or null when the path has no Markdown
 * variant (the caller then falls through to the normal HTML response).
 */
export async function buildPageMarkdown(
  locale: Locale,
  page: 'home' | 'projects' | 'cv' | ContentPage
): Promise<string> {
  switch (page) {
    case 'home':
      return homeMarkdown(locale);
    case 'projects':
      return projectsMarkdown(locale);
    case 'cv':
      return cvMarkdown();
    default:
      return contentMarkdown(locale, page);
  }
}

/** Markdown body served with 404 responses so agents can recover. */
export function notFoundMarkdown(): string {
  return [
    '# 404 — Page not found',
    '',
    '> This URL does not exist on pseudobun.dev. Nothing was moved; this path was never valid.',
    '',
    '## Where to go instead',
    '',
    `- [Home](${SITE_URL}/en/): who Urban Vidovič is and what he works on`,
    `- [Projects](${SITE_URL}/en/projects/): selected work across identity, Web3, and R&D`,
    `- [About](${SITE_URL}/en/about/): background, focus areas, and how he works`,
    `- [Contact](${SITE_URL}/en/contact/): verified channels and what to reach out about`,
    `- [Privacy](${SITE_URL}/en/privacy/): what this site does and does not collect`,
    `- [CV](${SITE_URL}/cv/): full curriculum vitae (HTML and PDF)`,
    '',
    '## Machine-readable index',
    '',
    `- [llms.txt](${SITE_URL}/llms.txt): site index and when-to-use guidance for agents`,
    `- [sitemap.xml](${SITE_URL}/sitemap.xml): every canonical URL`,
    `- [robots.txt](${SITE_URL}/robots.txt): crawl policy`,
    '',
    '## Notes for agents',
    '',
    `Every page on this site is available as Markdown. Send \`Accept: text/markdown\` to any URL above and you will get the Markdown representation instead of HTML. Content exists in Slovene (\`/sl/\`) and English (\`/en/\`); \`${SITE_NAME}\` is the site name.`,
    '',
  ].join('\n');
}
