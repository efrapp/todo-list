const Project = (state) => {
  let { title } = state;
  const todos = [];

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

  return {
    getTitle, setTitle, getTodos, addTodo, removeTodo,
  };
};

export default Project;
