import Todo from './todo';
import Project from './project';

const projects = [];

const dummyProject = () => {
  // eslint-disable-next-line prefer-object-spread
  const defaultProject = Project({ title: 'Default Project' });

  for (let i = 0; i < 5; i += 1) {
    const todo = Todo({
      title: `First #${i}`,
      description: 'Testing a new task',
      dueDate: '2019/10/02',
    });
    defaultProject.addTodo(todo);
  }

  projects.push(defaultProject);

  return defaultProject;
};

const findProject = (id) => projects.find((project) => project.id === parseInt(id, 10));

const removeProject = (id) => {
  const project = findProject(id);
  const index = projects.indexOf(project);

  project.remove();
  projects.splice(index, 1);

  if (projects.length !== 0) {
    projects[index - 1].show();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const projectsList = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');
  const projectsNode = document.getElementById('projects');

  dummyProject();

  // Show selected project
  projectsList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      const project = findProject(e.target.parentElement.dataset.projectId);
      project.show();
    }

    if (e.target && e.target.matches('button.remove-project')) {
      removeProject(e.target.parentElement.dataset.projectId);
    }
  });

  // Create a project node
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Project({ title: projectNameInput.value });

    projects.push(newProject);
    newProject.show();
  });

  projectsNode.addEventListener('click', (e) => {
    const button = e.target;
    if (button && button.matches('button.create-todo-btn')) {
      const title = button.parentElement.querySelector('.todo-title-field').value;
      const description = button.parentElement.querySelector('.todo-description-field').value;
      const dueDate = button.parentElement.querySelector('.todo-due-date-field').value;
      const priority = button.parentElement.querySelector('.todo-priority-field').value;
      const project = findProject(button.parentElement.parentElement.dataset.projectId);
      const todo = Todo({
        title, description, dueDate, priority,
      });

      project.addTodo(todo);
    }
  });
});
