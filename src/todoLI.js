function TodoLI() {}

TodoLI.prototype.getTitle = function getTitle() {
  return this.title;
};

TodoLI.prototype.setTitle = function setTitle(t) {
  this.title = t || this.title;
};

TodoLI.prototype.getDescription = function getDescription() {
  return this.description;
};

TodoLI.prototype.setDescription = function setDescription(d) {
  this.description = d || this.description;
};

TodoLI.prototype.getDueDate = function getDueDate() {
  return this.dueDate;
};

TodoLI.prototype.setDueDate = function setDueDate(dd) {
  this.dueDate = dd || this.dueDate;
};

TodoLI.prototype.getPriority = function getPriority() {
  return this.priority;
};

TodoLI.prototype.setPriority = function setPriority(p) {
  this.priority = p || this.priority;
};

TodoLI.prototype.getProjectId = function getProjectId() {
  return this.projectId;
};

export default TodoLI;
