'use client';
import { PROJECTS } from '../../constants/data.mjs';
import { useEffect, useState } from 'react';
import ProjectCard from '../ProjectCard';

export default function ProjectsGrid() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const cardClicked = localStorage.getItem('cardClicked');
    if (cardClicked === 'true') {
      setShowOverlay(false);
    }
  }, []);

  const handleCardClick = () => {
    setShowOverlay(false);
    localStorage.setItem('cardClicked', 'true');
  };
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
        showOverlay={showOverlay}
        onCardClick={handleCardClick}
      />
    </div>
  ));
}
