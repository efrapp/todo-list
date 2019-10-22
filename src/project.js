let id = -1;

const Project = (state) => {
  let { title } = state;
  const todos = [];

  id += 1;

  const getTitle = () => title;

  const setTitle = (t) => {
    title = t || title;
  };

  const getTodos = () => todos;

  const addTodo = (todo) => {
    todos.push(todo);
    return todo;
  };

  const removeTodo = (name) => {
    const todoIndex = todos.findIndex((todo) => todo.name === name);
    return todos.splice(todoIndex, 1);
  };

  const proto = {
    getTitle, setTitle, getTodos, addTodo, removeTodo,
  };

  return Object.assign(Object.create(proto), { id, title });
};

export default Project;
