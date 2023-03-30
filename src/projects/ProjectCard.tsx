import { FC } from 'react';

import Project from './Project';

interface ProjectCardProps {
  project: Project;
}

const formatDescription = (description: string) => {
  return `${description.substring(0, 60)}...`;
};

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { project } = props;
  const handleEditClick = (projectBeingEdited: Project) => {
    console.log(projectBeingEdited);
  };

  return (
    <div className='card'>
      <img src={project.imageUrl} alt={project.name} />
      <section className='section dark'>
        <h5 className='strong'>
          <strong>{project.name}</strong>
        </h5>
        <p>{formatDescription(project.description)}</p>
        <p>Budget: {project.budget.toLocaleString()}</p>
        <button
          type='button'
          className='bordered'
          onClick={() => {
            handleEditClick(project);
          }}
        >
          <span className='icon-edit' />
          Edit
        </button>
      </section>
    </div>
  );
};

export default ProjectCard;