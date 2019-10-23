import Todo from './todo';
import Project from './project';

const projects = [];

const dummyProject = () => {
  const defaultProject = Project({ title: 'Default Project' });

  for (let i = 0; i < 5; i += 1) {
    const todo = Todo({
      title: 'First task',
      description: 'Testing a new task',
      dueDate: '20019/10/02',
    });
    defaultProject.addTodo(todo);
  }

  return defaultProject;
};

const createTodoHTML = (todo) => {
  const todoTemplate = document.getElementById('todo-template');
  const todoContent = document.importNode(todoTemplate.content, true);

  todoContent.querySelector('.todo-title').textContent = todo.getTitle();
  todoContent.querySelector('.todo-description').textContent = todo.getDescription();
  todoContent.querySelector('.todo-due-date').textContent = todo.getDueDate();
  todoContent.querySelector('.todo-priority').textContent = todo.getPriority();

  return todoContent;
};

const createProject = (project) => {
  const projectContainer = document.createElement('div');
  const projectNode = document.getElementById('projects');
  const projectTemplate = document.getElementById('project-template');
  const projectContent = document.importNode(projectTemplate.content, true);

  projectContainer.id = project.id;

  project.getTodos().forEach((todo) => {
    const todoNode = createTodoHTML(todo);
    projectContent.querySelector('.content').appendChild(todoNode);
  });

  projectContent.querySelector('.title').textContent = project.getTitle();
  projectContainer.appendChild(projectContent);
  projectNode.appendChild(projectContainer);
};

const findProject = (title) => {
  const projectIndex = projects.findIndex((project) => project.getTitle() === title);
  return projects[projectIndex];
};

// Add project title to the list project in the sidebar
const listProjectTitle = (project) => {
  const projectsList = document.getElementById('projects-list');
  const projectsListTemplate = document.getElementById('projects-list-template');
  const projectsListContent = document.importNode(projectsListTemplate.content, true);
  const projectLink = projectsListContent.querySelector('.project-link');

  projectLink.textContent = project.getTitle();
  projectLink.setAttribute('data-id', project.id);

  projectsList.appendChild(projectsListContent);
};

const displayProject = (project) => {
  const projectsContainer = document.getElementById('projects');

  Array.prototype.forEach.call(projectsContainer.children, (pject) => {
    const p = pject;
    p.style.display = 'none';
  });

  projectsContainer.children.namedItem(`${project.id}`).style.display = 'block';
};

document.addEventListener('DOMContentLoaded', () => {
  const defaultProject = dummyProject();
  const projectsList = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');

  projects.push(defaultProject);

  createProject(defaultProject);

  projects.forEach((p) => {
    listProjectTitle(p);
  });

  // Show selected project
  projectsList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      const currentProject = findProject(e.target.textContent);

      displayProject(currentProject);
    }
  });

  // Create a project
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Project({ title: projectNameInput.value });

    projects.push(newProject);
    listProjectTitle(newProject);
    createProject(newProject);
    displayProject(newProject);
  });
});
