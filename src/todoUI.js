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

export default TodoUI;
