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

  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
  };
};

export default Todo;
