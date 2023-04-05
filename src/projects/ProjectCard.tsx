import { FC } from 'react';
import { Link } from 'react-router-dom';

import Project from './Project';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

const formatDescription = (description: string) => {
  return `${description.substring(0, 60)}...`;
};

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { project, onEdit } = props;
  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
  };

  return (
    <div className='card'>
      <img src={project.imageUrl} alt={project.name} />
      <section className='section dark'>
        <Link to={`/projects/${Number(project.id)}`}>
          <h5 className='strong'>
            <strong>{project.name}</strong>
          </h5>
          <p>{formatDescription(project.description)}</p>
          <p>Budget: {project.budget.toLocaleString()}</p>
        </Link>
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
