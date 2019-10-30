import ProjectUI from './projectUI';
import ProjectLI from './projectLI';

let id = -1;

const Project = (state) => {
  const { title } = state;
  const todos = [];
  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, ProjectUI.prototype, ProjectLI.prototype);
  console.log(proto);
  id += 1;

  return Object.assign(Object.create(proto), { id, title, todos });
};

export default Project;
