function ProjectUI() {}

ProjectUI.prototype.create = function create() {
  const projectContainer = document.createElement('div');
  const projectNode = document.getElementById('projects');
  const projectTemplate = document.getElementById('project-template');
  const projectContent = document.importNode(projectTemplate.content, true);

  projectContainer.setAttribute('data-project-id', this.id);

  projectContent.querySelector('.title').textContent = this.getTitle();
  projectContainer.prepend(projectContent);
  projectNode.appendChild(projectContainer);
};

ProjectUI.prototype.show = function show() {
  const projectsContainer = document.getElementById('projects');

  Array.prototype.forEach.call(projectsContainer.children, (pject) => {
    const p = pject;
    if (parseInt(p.dataset.projectId, 10) === this.id) {
      p.style.display = 'block';
    } else {
      p.style.display = 'none';
    }
  });
};

ProjectUI.prototype.find = function find() {
  const projectsContainer = document.getElementById('projects');

  return Array.prototype.find.call(projectsContainer.children,
    (p) => parseInt(p.dataset.projectId, 10) === this.id);
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
  this.find()
    .querySelector('.content').appendChild(todo.createView());
};

export default ProjectUI;
