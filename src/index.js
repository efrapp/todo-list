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

const displayProject = (project) => {
  const projectNode = document.getElementById('project');
  const projectTemplate = document.getElementById('project-template');
  const projectContent = document.importNode(projectTemplate.content, true);

  project.getTodos().forEach((todo) => {
    const todoNode = createTodoHTML(todo);
    projectContent.querySelector('.content').appendChild(todoNode);
  });

  projectContent.querySelector('.title').textContent = project.getTitle();
  projectNode.appendChild(projectContent);
};

const findProject = (title) => {
  const projectIndex = projects.findIndex((project) => project.getTitle() === title);
  return projects[projectIndex];
};

document.addEventListener('DOMContentLoaded', () => {
  const defaultProject = dummyProject();
  const defaultProjectLink = document.getElementById('default-project-link');
  const projectLink = document.querySelector('.project-link');

  projects.push(defaultProject);

  defaultProjectLink.textContent = defaultProject.getTitle();
  displayProject(defaultProject);

  projectLink.addEventListener('click', () => {
    const currentProject = findProject(projectLink.textContent);
    displayProject(currentProject);
  });
});
