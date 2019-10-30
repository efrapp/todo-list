import Todo from './todo';
import Project from './project';

const projects = [];

const dummyProject = () => {
  // eslint-disable-next-line prefer-object-spread
  const defaultProject = Project({ title: 'Default Project' });
  console.log(defaultProject);
  defaultProject.create();
  defaultProject.createTitleLink();

  for (let i = 0; i < 5; i += 1) {
    const todo = Todo({
      title: `First #${i}`,
      description: 'Testing a new task',
      dueDate: '20019/10/02',
    });
    defaultProject.addTodo(todo);
  }

  projects.push(defaultProject);

  return defaultProject;
};

const findProjectNode = (project) => {
  const projectsContainer = document.getElementById('projects');

  return Array.prototype.find.call(projectsContainer.children,
    (p) => parseInt(p.dataset.projectId, 10) === project.id);
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

const displayTodos = (project) => {
  project.getTodos().forEach((todo) => {
    const todoNode = createTodoNode(todo);
    findProjectNode(project).querySelector('.content').appendChild(todoNode);
  });
};

// Add project title to the list project in the sidebar
const listProjectTitle = (project) => {
  const projectsList = document.getElementById('projects-list');
  const projectsListTemplate = document.getElementById('projects-list-template');
  const projectsListContent = document.importNode(projectsListTemplate.content, true);
  const projectActions = projectsListContent.querySelector('.project-actions');
  const projectLink = projectsListContent.querySelector('.project-link');

  projectLink.textContent = project.getTitle();
  projectActions.setAttribute('data-project-id', project.id);

  projectsList.appendChild(projectsListContent);
};

const displayProject = (project) => {
  const projectsContainer = document.getElementById('projects');

  Array.prototype.forEach.call(projectsContainer.children, (pject) => {
    const p = pject;
    p.style.display = 'none';
  });

  findProjectNode(project).style.display = 'block';
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
  listProjectTitle(project);
  displayProject(project);
};

document.addEventListener('DOMContentLoaded', () => {
  const projectsList = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');
  const projectsNode = document.getElementById('projects');

  dummyProject();
  // createProject(defaultProject);

  // Show selected project
  projectsList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      const project = findProject(e.target.parentElement.dataset.projectId);
      displayProject(project);
      displayTodos(project);
    }

    if (e.target && e.target.matches('button.remove-project')) {
      projects = removeProject(e.target.parentElement.dataset.projectId);
      console.log(projects);
    }
  });

  // Create a project node
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Project({ title: projectNameInput.value });
    console.log(newProject);
    createProject(newProject);
  });

  projectsNode.addEventListener('click', (e) => {
    const button = e.target;
    if (button && button.matches('button.create-todo-btn')) {
      const title = button.parentElement.querySelector('.todo-title-field').value;
      const description = button.parentElement.querySelector('.todo-description-field').value;
      const dueDate = button.parentElement.querySelector('.todo-due-date-field').value;
      const priority = button.parentElement.querySelector('.todo-priority-field').value;
      const projectUI = button.parentElement.parentElement;
      const project = findProject(button.parentElement.parentElement.dataset.projectId);
      const todo = Todo({
        title, description, dueDate, priority,
      });

      project.addTodo(todo);
      projectUI.querySelector('.content')
        .appendChild(createTodoNode(todo));
    }
  });
});
