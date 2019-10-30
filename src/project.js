import ProjectUI from './projectUI';
import ProjectLI from './projectLI';
import Indexer from './idGenerator';

const id = Indexer(0);

const Project = (state) => {
  const { title } = state;
  const todos = [];
  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, ProjectUI.prototype, ProjectLI.prototype);
  const obj = Object.assign(Object.create(proto), { id: id.next().value, title, todos });

  obj.create();
  obj.createTitleLink();

  return obj;
};

export default Project;
