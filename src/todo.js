import TodoUI from './todoUI';
import TodoLI from './todoLI';
import Indexer from './idGenerator';

const id = Indexer(0);

const Todo = (state) => {
  const {
    title, description, dueDate, priority, projectId,
  } = state;

  const publicProto = {
    remove() {
      TodoUI.prototype.remove.call(this);
    },
    getElement() {
      return TodoUI.prototype.getElement.call(this);
    },
    update(state) {
      const {
        title, description, dueDate, priority,
      } = state;

      TodoLI.prototype.setTitle.call(this, title);
      TodoLI.prototype.setDescription.call(this, description);
      TodoLI.prototype.setDueDate.call(this, dueDate);
      TodoLI.prototype.setPriority.call(this, priority);

      TodoUI.prototype.update.call(this, state);
    },
  };
  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, TodoUI.prototype, TodoLI.prototype, publicProto);
  const obj = Object.assign(Object.create(proto), {
    id: id.next().value, title, description, dueDate, priority, projectId,
  });

  obj.createView();

  return obj;
};

export default Todo;
