import ProjectUI from './projectUI';
import ProjectLI from './projectLI';

let id = -1;

const Project = (state) => {
  const { title } = state;
  const todos = [];
  const protoUI = Object.getPrototypeOf(ProjectUI());
  const protoLI = Object.getPrototypeOf(ProjectLI());
  const proto = Object.assign(protoLI, protoUI);

  id += 1;

  return Object.assign(Object.create(proto), { id, title, todos });
};

export default Project;
