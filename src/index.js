import Todo from './todo';
import Project from './project';

const dummyProject = () => {
  const defaultProject = Project({ title: 'Default Project' });
  let todo;

  for (let i = 0; i < 5; i += 1) {
    todo = Todo({
      title: 'First task',
      description: 'Testing a new task',
      dueDate: '20019/10/02',
    });
    defaultProject.addTodo(todo);
  }

  return defaultProject;
};

const createTodoHTML = (todo) => {
  const todoNode = document.createElement('div');
  const titleNode = document.createElement('h2');
  const descriptionNode = document.createElement('p');
  const dueDateNode = document.createElement('p');
  const priorityNode = document.createElement('p');

  titleNode.textContent = todo.getTitle();
  descriptionNode.textContent = todo.getDescription();
  dueDateNode.textContent = todo.getDueDate();
  priorityNode.textContent = todo.getPriority();

  todoNode.appendChild(titleNode);
  todoNode.appendChild(descriptionNode);
  todoNode.appendChild(dueDateNode);
  todoNode.appendChild(priorityNode);

  return todoNode;
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

document.addEventListener('DOMContentLoaded', () => {
  const defaultProject = dummyProject();
  const defaultProjectLink = document.getElementById('default-project');

  defaultProjectLink.textContent = defaultProject.getTitle();
  displayProject(defaultProject);

  defaultProjectLink.addEventListener('click', () => {
    // displayProject(defaultProject);
  });
});
