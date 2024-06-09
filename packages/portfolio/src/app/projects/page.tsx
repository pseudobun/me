import ProjectCard from '@/components/ProjectCard';
import { PROJECTS } from '../../constants/data.mjs';

export const metadata = {
  title: 'Projects',
};

export default function About() {
  return (
    <div className="flex flex-1 flex-col h-full gap-y-10 w-full justify-start mb-12 text-gray-200">
      <div>
        <p className="sm:text-3xl text-3xl">Projects</p>
        <p className="sm:text-xl text-xl">I 🤍 building things.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full items-center">
        {PROJECTS.map((project, index) => (
          <div
            key={project.title}
            className="w-full xl:w-1/3  flex justify-center"
          >
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
            />
          </div>
        ))}
      </div>
    </div>
  );
}
