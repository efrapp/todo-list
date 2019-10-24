import Todo from './todo';
import Project from './project';

const projects = [];
const currentProject = {};

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

const findProjectNode = (project) => {
  const projectsContainer = document.getElementById('projects');

  return Array.prototype.find.call(projectsContainer.children,
    (p) => parseInt(p.dataset.projectId, 10) === project.id);
};

const setCurrentProject = (p) => {
  currentProject.node = findProjectNode(p);
  currentProject.obj = p;

  return currentProject;
};

const createTodoNode = (todo) => {
  const todoTemplate = document.getElementById('todo-template');
  const todoContent = document.importNode(todoTemplate.content, true);

  todoContent.querySelector('.todo').setAttribute('data-todo-id', todo.id);
  todoContent.querySelector('.todo-title').textContent = todo.getTitle();
  todoContent.querySelector('.todo-description').textContent = todo.getDescription();
  todoContent.querySelector('.todo-due-date').textContent = todo.getDueDate();
  todoContent.querySelector('.todo-priority').textContent = todo.getPriority();

  return todoContent;
};

// Add project title to the list project in the sidebar
const listProjectTitle = () => {
  const projectsList = document.getElementById('projects-list');
  const projectsListTemplate = document.getElementById('projects-list-template');
  const projectsListContent = document.importNode(projectsListTemplate.content, true);
  const projectLink = projectsListContent.querySelector('.project-link');

  projectLink.textContent = currentProject.obj.getTitle();
  projectLink.setAttribute('data-project-id', currentProject.obj.id);

  projectsList.appendChild(projectsListContent);
};

const displayProject = () => {
  const projectsContainer = document.getElementById('projects');

  Array.prototype.forEach.call(projectsContainer.children, (pject) => {
    const p = pject;
    p.style.display = 'none';
  });

  currentProject.node.style.display = 'block';
};

const findProject = (id) => projects.find((project) => project.id === parseInt(id, 10));

const createProject = (project) => {
  const projectContainer = document.createElement('div');
  const projectNode = document.getElementById('projects');
  const projectTemplate = document.getElementById('project-template');
  const projectContent = document.importNode(projectTemplate.content, true);

  projectContainer.setAttribute('data-project-id', project.id);

  projectContent.querySelector('.title').textContent = project.getTitle();
  projectContainer.prepend(projectContent);
  projectNode.appendChild(projectContainer);

  projects.push(project);
  setCurrentProject(project);
  listProjectTitle();
  displayProject();
};

document.addEventListener('DOMContentLoaded', () => {
  const defaultProject = dummyProject();
  const projectsList = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');
  const projectsNode = document.getElementById('projects');

  createProject(defaultProject);

  // Show selected project
  projectsList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      displayProject(findProject(e.target.dataset.projectId));
    }
  });

  // Create a project node
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Project({ title: projectNameInput.value });

    createProject(newProject);
  });

  projectsNode.addEventListener('click', (e) => {
    const button = e.target;
    if (button && button.matches('button.create-todo-btn')) {
      const title = button.parentElement.querySelector('.todo-title-field').value;
      const description = button.parentElement.querySelector('.todo-description-field').value;
      const dueDate = button.parentElement.querySelector('.todo-due-date-field').value;
      const priority = button.parentElement.querySelector('.todo-priority-field').value;
      const todo = Todo({
        title, description, dueDate, priority,
      });

      currentProject.obj.addTodo(todo);
      currentProject.node.querySelector('.content')
        .appendChild(createTodoNode(todo));
    }
  });
});
