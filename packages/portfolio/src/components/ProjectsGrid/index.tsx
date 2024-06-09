import { PROJECTS } from '@/constants/data.mjs';
import ProjectCard from '@/components/ProjectCard';

export default function ProjectsGrid() {
  return PROJECTS.map((project, index) => (
    <div key={project.title} className="w-full xl:w-1/3  flex justify-center">
      <ProjectCard
        key={project.title}
        delay={index * 0.3}
        github={project.github}
        org={project.org}
        orgUrl={project.orgUrl}
        title={project.title}
        description={project.description}
        website={project.website}
        image={project.image}
        firstInRow={index === 0}
      />
    </div>
  ));
}