function ProjectLI() {}

ProjectLI.prototype.getTitle = function getTitle() { return this.title; };

ProjectLI.prototype.setTitle = function setTitle(t) {
  this.title = t || this.title;
};

ProjectLI.prototype.getTodos = function getTodos() { return this.todos; };

ProjectLI.prototype.addTodo = function addTodo(todo) {
  this.todos.push(todo);
  return todo;
};

ProjectLI.prototype.removeTodo = function removeTodo(id) {
  const todoIndex = this.todos.findIndex(todo => todo.id === parseInt(id, 10));
  return this.todos.splice(todoIndex, 1);
};

export default ProjectLI;
