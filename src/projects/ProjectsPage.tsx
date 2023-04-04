import { FC, useEffect, useState } from 'react';

import Project from './Project';
import projectAPI from './projectAPI';
import ProjectList from './ProjectList';

const ProjectsPage: FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        setError('');
        if (currentPage === 1) {
          setProjects(data);
        } else {
          setProjects((prevPj) => [...prevPj, ...data]);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    };
    void loadProjects();
  }, [currentPage]);

  const handleMoreClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const saveProject = (project: Project) => {
    projectAPI
      .put(project)
      .then((updatedProject: Project) => {
        const updatedProjects = projects.map((p: Project) => {
          return p.id === project.id ? new Project(updatedProject) : p;
        });
        setProjects(updatedProjects);
      })
      .catch((e: unknown) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      });
  };

  return (
    <>
      <h1>Projects</h1>

      {error && (
        <div className='row'>
          <div className='card large error'>
            <section>
              <p>
                <span className='icon-alert inverse' />
                {error}
              </p>
            </section>
          </div>
        </div>
      )}

      <ProjectList onSave={saveProject} projects={projects} />

      {!loading && !error && (
        <div className='row'>
          <div className='col-sm-12'>
            <div className='button-group fluid'>
              <button type='button' className='button default' onClick={handleMoreClick}>
                More...
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className='center-page'>
          <span className='spinner primary' />
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};

export default ProjectsPage;
