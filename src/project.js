import ProjectUI from './projectUI';
import ProjectLI from './projectLI';
import Indexer from './idGenerator';

const id = Indexer(0);

const Project = (state) => {
  const { title } = state;
  const todos = [];
  const publicProto = {
    addTodo(todo) {
      ProjectUI.prototype.addTodo.call(this, todo);
    },
    remove() {
      ProjectUI.prototype.removeTitleLink.call(this);
      ProjectUI.prototype.removeContent.call(this);
    },
    update(stateEdit) {
      const { newTitle } = stateEdit;
      ProjectLI.prototype.setTitle.call(this, newTitle);
      ProjectUI.prototype.updateTitleLink.call(this, newTitle);
      ProjectUI.prototype.updateContentTitle.call(this, newTitle);
    },
  };
  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, ProjectUI.prototype, ProjectLI.prototype, publicProto);
  const obj = Object.assign(Object.create(proto), { id: id.next().value, title, todos });

  obj.create();
  obj.createTitleLink();

  return obj;
};

export default Project;
