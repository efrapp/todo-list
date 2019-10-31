import TodoUI from './todoUI';
import TodoLI from './todoLI';
import Indexer from './idGenerator';

const id = Indexer(0);

const Todo = (state) => {
  const {
    title, description, dueDate, priority,
  } = state;

  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, TodoUI.prototype, TodoLI.prototype);
  const obj = Object.assign(Object.create(proto), {
    id: id.next().value, title, description, dueDate, priority,
  });

  obj.createView();

  return obj;
};

export default Todo;
