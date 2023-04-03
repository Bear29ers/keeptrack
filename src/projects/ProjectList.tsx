import { FC, useState } from 'react';

import Project from './Project';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';

interface ProjectListProps {
  projects: Project[];
  onSave: (project: Project) => void;
}

const ProjectList: FC<ProjectListProps> = ({ projects, onSave }) => {
  const [projectBeingEdited, setProjectBeingEdited] = useState({});

  const handleEdit = (project: Project) => {
    setProjectBeingEdited(project);
  };

  const cancelEditing = () => {
    setProjectBeingEdited({});
  };

  return (
    <ul className='row'>
      {projects.map((project) => (
        <div key={project.id} className='cols-sm'>
          {project === projectBeingEdited ? (
            <ProjectForm project={project} onSave={onSave} onCancel={cancelEditing} />
          ) : (
            <ProjectCard project={project} onEdit={handleEdit} />
          )}
        </div>
      ))}
    </ul>
  );
};

export default ProjectList;
