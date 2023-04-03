import { FC } from 'react';

import Project from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const handleEdit = (project: Project) => {
    console.log(project);
  };

  return (
    <ul className='row'>
      {projects.map((project) => (
        <div key={project.id} className='cols-sm'>
          <ProjectCard project={project} onEdit={handleEdit} />
          <ProjectForm />
        </div>
      ))}
    </ul>
  );
};

export default ProjectList;
