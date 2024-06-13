import { PROJECTS } from '@/constants/data.mjs';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full items-center">
      {PROJECTS.map((project, index) => (
        <div
          key={project.title}
          className="w-full xl:w-1/3 2xl:w-1/6 flex justify-center"
        >
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
        </div>
      ))}
    </div>
  );
}
