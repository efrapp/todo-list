let id = -1;

const Todo = (state) => {
  let {
    title, description, dueDate, priority,
  } = state;

  id += 1;

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
    id, title, description, dueDate, priority,
  });
};

export default Todo;
