import Project from './Project';

import type { ProjectInfo } from '../types/project';

const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/projects`;

const translateStatusToErrorMessage = (status: number) => {
  switch (status) {
    case 401:
      return 'Please login again.';
    case 403:
      return 'You do not have permission to view the project(s)';
    default:
      return 'There was an error retrieving the project(s). Please try again.';
  }
};

const checkStatus = (res: Response) => {
  if (res.ok) {
    return res;
  }

  const httpErrorInfo = {
    status: res.status,
    statusText: res.statusText,
    url: res.url,
  };
  console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

  const errorMessage = translateStatusToErrorMessage(httpErrorInfo.status);
  throw new Error(errorMessage);
};

const parseJSON = (res: Response) => {
  return res.json();
};

const delay = (ms: number) => {
  return (x: any): Promise<any> => {
    // eslint-disable-next-line no-promise-executor-return
    return new Promise((resolve) => setTimeout(() => resolve(x), ms));
  };
};

const convertToProjectModel = (item: ProjectInfo): Project => {
  return new Project(item);
};

const convertToProjectModels = (data: ProjectInfo[]): Project[] => {
  const projects: Project[] = data.map(convertToProjectModel);
  return projects;
};

const projectAPI = {
  get(page = 1, limit = 20) {
    return (
      fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
        // .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModels)
        .catch((error: TypeError) => {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          console.log(`log client error ${error}`);
          throw new Error('There was an error retrieving the projects. Please try again.');
        })
    );
  },
};

export default projectAPI;
