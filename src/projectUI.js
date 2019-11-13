function ProjectUI() {}

const getContainer = () => document.getElementById('projects');

ProjectUI.prototype.create = function create() {
  const projectContainer = document.createElement('div');
  const projectNode = getContainer();
  const projectTemplate = document.getElementById('project-template');
  const projectContent = document.importNode(projectTemplate.content, true);

  projectContainer.setAttribute('data-project-id', this.id);

  projectContent.querySelector('.title').textContent = this.getTitle();
  projectContainer.prepend(projectContent);
  projectNode.appendChild(projectContainer);
};

ProjectUI.prototype.show = function show() {
  const projectsContainer = getContainer();

  Array.prototype.forEach.call(projectsContainer.children, (pject) => {
    const p = pject;
    if (parseInt(p.dataset.projectId, 10) === this.id) {
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
};

ProjectUI.prototype.findElement = function findElement(elements) {
  return Array.prototype.find.call(elements,
    p => parseInt(p.dataset.projectId, 10) === this.id);
};

ProjectUI.prototype.getElement = function getElement() {
  const projectsContainer = getContainer();
  const projectEl = this.findElement(projectsContainer.children);

  return projectEl;
};

ProjectUI.prototype.createTitleLink = function createTitleLink() {
  const projectsList = document.getElementById('projects-list');
  const projectsListTemplate = document.getElementById('projects-list-template');
  const projectsListContent = document.importNode(projectsListTemplate.content, true);
  const projectActions = projectsListContent.querySelector('.project-actions');
  const projectLink = projectsListContent.querySelector('.project-link');

  projectLink.textContent = this.getTitle();
  projectActions.setAttribute('data-project-id', this.id);

  projectsList.appendChild(projectsListContent);
};

ProjectUI.prototype.addTodo = function addTodo(todo) {
  const projectsContainer = getContainer();
  this.findElement(projectsContainer.children)
    .querySelector('.content').prepend(todo.createView());
};

ProjectUI.prototype.removeTitleLink = function removeTitleLink() {
  const titleLinks = document.querySelectorAll('.project-actions');
  const titleLink = this.findElement(titleLinks);

  titleLink.remove();
};

ProjectUI.prototype.removeContent = function removeContent() {
  const projectsContainer = getContainer();
  const content = this.findElement(projectsContainer.children);

  content.remove();
};

ProjectUI.prototype.updateTitleLink = function updateTitleLink(newTitle) {
  const actionsContainer = document.getElementById('projects-list');
  const titleLink = this.findElement(actionsContainer.children).querySelector('a.project-link');

  titleLink.textContent = newTitle;
};

ProjectUI.prototype.updateContentTitle = function updateContentTitle(newTitle) {
  const projectContainer = this.findElement(getContainer().children);
  const projectTitle = projectContainer.querySelector('h1.title');

  projectTitle.textContent = newTitle;
};

export default ProjectUI;
