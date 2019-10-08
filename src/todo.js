const Todo = ({
  title, description, dueDate, priority,
}) => {
  const getTitle = () => title;
  const getDescription = () => description;

  const proto = { getTitle, getDescription };

  return Object.freeze(Object.assign(Object.create(proto), {
    title, description, dueDate, priority,
  }));
  // return Object.freeze({ getTitle, getDescription });
  // return Object.freeze(Object.assign({ getTitle, getDescription }));
  // return Object.freeze(Object.assign({}, { getTitle, getDescription }));
};

export default Todo;
