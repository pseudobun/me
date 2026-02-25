import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '@/constants/data.mjs';
import { defaultLocale, type Locale, locales } from '@/i18n/config';
import { getDictionary } from '@/i18n/getDictionary';

export const metadata = {
  title: 'Projects',
};

export default async function Projects({ params }: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await params;
  const locale = locales.includes(lang as Locale) ? (lang as Locale) : defaultLocale;
  const dict = await getDictionary(locale);
  const d = dict.projects;

  return (
    <div className="flex flex-1 flex-col h-full w-full gap-y-10 justify-center mb-12 max-w-full">
      <div>
        <p className="sm:text-3xl text-3xl">{d.title}</p>
        <p className="sm:text-xl text-xl">{d.subtitle}</p>
      </div>

      {/* Grid layout for projects - responsive grid with 1 column on mobile, 2 on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={project.title}
            delay={index * 0.3}
            github={project.github}
            org={project.org!}
            orgUrl={project.orgUrl!}
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
          />
        ))}
      </div>
    </div>
  );
}
