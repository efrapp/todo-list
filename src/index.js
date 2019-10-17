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

document.addEventListener('DOMContentLoaded', () => {
  const defaultProject = dummyProject();
  const defaultProjectLink = document.getElementById('default-project');

  defaultProjectLink.textContent = defaultProject.getTitle();
  displayProject(defaultProject);

  defaultProjectLink.addEventListener('click', () => {
    // displayProject(defaultProject);
  });
});
