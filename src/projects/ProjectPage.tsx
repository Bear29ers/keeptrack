import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Project from './Project';
import projectAPI from './projectAPI';
import ProjectDetail from './ProjectDetail';

const ProjectPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    setLoading(true);
    projectAPI
      .find(id)
      .then((data) => {
        setProject(data);
      })
      .catch((e: unknown) => {
        if (e instanceof Error) {
          setError(e.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <h1>Project Detail</h1>

      {loading && (
        <div className='center-page'>
          <span className='spinner primary' />
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className='row'>
          <div className='card large error'>
            <section>
              <p>
                <span className='icon-alert inverse' /> {error}
              </p>
            </section>
          </div>
        </div>
      )}

      {project && <ProjectDetail project={project} />}
    </>
  );
};

export default ProjectPage;
