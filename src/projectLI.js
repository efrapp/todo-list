const Project = () => {
  const proto = {
    getTitle() {
      return this.title;
    },
    setTitle(t) {
      this.title = t || this.title;
    },
    getTodos() {
      return this.todos;
    },
    addTodo(todo) {
      this.todos.push(todo);
      return todo;
    },
    removeTodo(id) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id, 10));
      return this.todos.splice(todoIndex, 1);
    },
  };

  return Object.create(proto);
};

export default Project;
