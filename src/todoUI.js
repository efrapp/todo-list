function TodoUI() {}

TodoUI.prototype.createView = function createView() {
  const todoTemplate = document.getElementById('todo-template');
  const todoContent = document.importNode(todoTemplate.content, true);

  todoContent.querySelector('.todo').setAttribute('data-todo-id', this.id);
  todoContent.querySelector('.todo-title').textContent = this.getTitle();
  todoContent.querySelector('.todo-description').textContent = this.getDescription();
  todoContent.querySelector('.todo-due-date').textContent = this.getDueDate();
  todoContent.querySelector('.todo-priority').textContent = this.getPriority();

  return todoContent;
};

TodoUI.prototype.getProjectContainer = function getProjectContainer() {
  const projects = document.getElementById('projects').children;
  return Array.prototype.find.call(projects,
    p => parseInt(p.dataset.projectId, 10) === this.projectId).querySelector('.content');
};

TodoUI.prototype.findElement = function findElement(elements) {
  return Array.prototype.find.call(elements,
    t => parseInt(t.dataset.todoId, 10) === this.id);
};

TodoUI.prototype.remove = function remove() {
  const todoEls = this.getProjectContainer().children;
  const todoEl = this.findElement(todoEls);

  todoEl.remove();
};

export default TodoUI;
