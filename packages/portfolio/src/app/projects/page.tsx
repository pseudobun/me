import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '@/constants/data.mjs';

export const metadata = {
  title: 'Projects',
};

export default function Projects() {
  return (
    <div className="flex flex-1 flex-col h-full max-w-[1024px] gap-y-10 justify-center mb-12 text-stone-200">
      <div>
        <p className="sm:text-3xl text-3xl">Projects</p>
        <p className="sm:text-xl text-xl">I 🤍 building things.</p>
      </div>
      {PROJECTS.map((project, index) => (
        <ProjectCard
          key={project.title}
          delay={index * 0.3}
          github={project.github}
          org={project.org!}
          orgUrl={project.orgUrl!}
          highlight={project.highlight}
          title={project.title}
          description={project.description}
          website={project.website}
          image={project.image}
          firstInRow={index === 0}
        />
      ))}
    </div>
  );
}
