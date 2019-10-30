import Indexer from './idGenerator';

const id = Indexer(0);

const Todo = (state) => {
  let {
    title, description, dueDate, priority,
  } = state;

  const getTitle = () => title;

  const setTitle = (t) => {
    title = t || title;
  };

  const getDescription = () => description;

  const setDescription = (d) => {
    description = d || description;
  };

  const getDueDate = () => dueDate;

  const setDueDate = (dd) => {
    dueDate = dd || dueDate;
  };

  const getPriority = () => priority;

  const setPriority = (p) => {
    priority = p || priority;
  };

  const proto = {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
  };

  return Object.assign(Object.create(proto), {
    id: id.next().value, title, description, dueDate, priority,
  });
};

export default Todo;
