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

  const items = projects.map((project) => (
    <div key={project.id} className='cols-sm'>
      <ProjectCard project={project} onEdit={handleEdit} />
      <ProjectForm />
    </div>
  ));
  return <div className='row'>{items}</div>;
};

export default ProjectList;
