import { FC } from 'react';

import Project from './Project';

// propsの型定義
interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
}

// 説明文が60文字以上の場合は以降を...に置き換える
const formatDescription = (description: string) => {
  return `${description.substring(0, 60)}...`;
};

const ProjectCard: FC<ProjectCardProps> = (props) => {
  const { project, onEdit } = props;
  // イベントハンドラ
  const handleEditClick = (projectBeingEdited: Project) => {
    onEdit(projectBeingEdited);
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
