import { FC, SyntheticEvent, useState } from 'react';

import Project from './Project';

import type { FormErrors } from '../types/project';

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

const ProjectForm: FC<ProjectFormProps> = ({ project: initialProject, onSave, onCancel }) => {
  const [project, setProject] = useState(initialProject);
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    description: '',
    budget: '',
  });

  const validate = (pj: Project): FormErrors => {
    const formErrors: FormErrors = { name: '', description: '', budget: '' };
    if (pj.name.length === 0) {
      formErrors.name = 'Name is required';
    }

    if (pj.name.length > 0 && pj.name.length < 3) {
      formErrors.name = 'Name needs to be at least 3 characters.';
    }

    if (pj.description.length === 0) {
      formErrors.description = 'Description is required.';
    }

    if (pj.budget === 0) {
      formErrors.budget = 'Budget must be more than $0.';
    }

    return formErrors;
  };

  const isValid = () => {
    return errors.name.length === 0 && errors.description.length === 0 && errors.budget.length === 0;
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid()) return;
    onSave(project);
  };

  const handleChange = (event: any) => {
    const { type, name, value, checked } = event.target;
    // if input type is checkbox use checked
    // otherwise it's type is text, number etc. so use value
    let updatedValue = type === 'checkbox' ? checked : value;

    // if input type is number convert the updatedValue string to a number
    if (type === 'number') {
      updatedValue = Number(updatedValue);
    }

    const change = {
      [name]: updatedValue,
    };

    let updatedProject: Project;
    // need to do functional update b/c
    // the new project state is based on the previous project state
    // so we can keep the project properties that aren't being edited like project.id
    // the spread operator (...) is used to
    // spread the previous project properties and the new change
    setProject((p) => {
      updatedProject = new Project({ ...p, ...change });
      return updatedProject;
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    setErrors(() => validate(updatedProject));
  };

  return (
    <form className='input-group vertical' onSubmit={handleSubmit}>
      <label htmlFor='name'>Project Name</label>
      <input type='text' name='name' placeholder='enter name' value={project.name} onChange={handleChange} />
      {errors.name.length > 0 && (
        <div className='card error'>
          <p>{errors.name}</p>
        </div>
      )}

      <label htmlFor='description'>Project Description</label>
      <textarea
        name='description'
        placeholder='enter description'
        value={project.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 && (
        <div className='card error'>
          <p>{errors.description}</p>
        </div>
      )}

      <label htmlFor='budget'>Project Budget</label>
      <input type='number' name='budget' placeholder='enter budget' value={project.budget} onChange={handleChange} />
      {errors.budget.length > 0 && (
        <div className='card error'>
          <p>{errors.budget}</p>
        </div>
      )}

      <label htmlFor='isActive'>Active?</label>
      <input type='checkbox' name='isActive' checked={project.isActive} onChange={handleChange} />

      <div className='input-group'>
        <button type='submit' className='primary bordered medium'>
          Save
        </button>
        <span />
        <button type='button' className='bordered medium' onClick={onCancel}>
          cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
