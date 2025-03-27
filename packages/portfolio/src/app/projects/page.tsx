import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '@/constants/data.mjs';

export const metadata = {
  title: 'Projects',
};

export default function Projects() {
  return (
    <div className="flex flex-1 flex-col h-full w-full gap-y-10 justify-center mb-12 max-w-full">
      <div>
        <p className="sm:text-3xl text-3xl">Projects</p>
        <p className="sm:text-xl text-xl">I 🤍 building things.</p>
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
            description={project.description}
            website={project.website}
            image={project.image}
            firstInRow={index % 2 === 0} // Update firstInRow logic for 2-column grid
          />
        ))}
      </div>
    </div>
  );
}
