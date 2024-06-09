import ProjectsGrid from '@/components/ProjectsGrid';

export const metadata = {
  title: 'Projects',
};

export default function Projects() {
  return (
    <div className="flex flex-1 flex-col h-full gap-y-10 w-full justify-start mb-12 text-gray-200">
      <div>
        <p className="sm:text-3xl text-3xl">Projects</p>
        <p className="sm:text-xl text-xl">I 🤍 building things.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 w-full items-center">
        <ProjectsGrid />
      </div>
    </div>
  );
}
