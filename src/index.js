import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns';
import Todo from './todo';
import Project from './project';

const projects = [];
const todos = [];

const dummyProject = () => {
  // eslint-disable-next-line prefer-object-spread
  const defaultProject = Project({ title: 'Default Project' });

  for (let i = 0; i < 5; i += 1) {
    const todo = Todo({
      title: `First #${i}`,
      description: 'Testing a new task',
      dueDate: format(new Date(), 'MM/dd/yyyy'),
      priority: '1',
      completed: false,
      projectId: defaultProject.id,
    });

    todos.push(todo);
    defaultProject.addTodo(todo);
  }

  projects.push(defaultProject);
  localStorage.setItem('defaultProjectIncluded?', true);
  localStorage.setItem('projects', JSON.stringify(projects));
  localStorage.setItem('todos', JSON.stringify(todos));

  return defaultProject;
};

const findProject = id => projects.find(project => project.id === parseInt(id, 10));

const removeProject = (id) => {
  const project = findProject(id);
  const index = projects.indexOf(project);

  project.remove();
  projects.splice(index, 1);

  if (projects.length !== 0) {
    projects[index - 1].show();
  }

  localStorage.setItem('projects', JSON.stringify(projects));
};

const showEditModal = (id) => {
  const editProjectModal = document.getElementById('edit-project');
  const projectNameField = editProjectModal.querySelector('#project-name');
  const project = findProject(id);

  projectNameField.value = project.getTitle();
  projectNameField.setAttribute('data-project-id', project.id);
  // then show the modal with bootstrap
};

const findTodo = id => todos.find(todo => todo.id === parseInt(id, 10));

const removeTodo = (id) => {
  const todo = findTodo(id);
  const index = todos.indexOf(todo);

  todo.remove();
  todos.splice(index, 1);

  localStorage.setItem('todos', JSON.stringify(todos));
};

const showNewTodoModal = (projectId) => {
  const newTodoModal = document.getElementById('modal-new-todo');
  const newTodoForm = newTodoModal.querySelector('.new-todo');

  newTodoForm.setAttribute('data-project-id', projectId);
};

const showEditTodoModal = (id) => {
  const todo = findTodo(id);
  // const project = findProject(todo.projectId);
  const editModal = document.getElementById('modal-edit-todo');
  const editTodoForm = editModal.querySelector('.edit-todo');
  const title = editTodoForm.querySelector('.todo-title-field');
  const description = editTodoForm.querySelector('.todo-description-field');
  const dueDate = editTodoForm.querySelector('.todo-due-date-field');
  const priority = editTodoForm.querySelector('.todo-priority-field');

  editTodoForm.setAttribute('data-todo-id', todo.id);
  title.placeholder = todo.getTitle();
  description.placeholder = todo.getDescription();
  dueDate.value = format(new Date(todo.getDueDate()), 'yyyy-MM-dd');
  priority.value = todo.getPriority();

  // Show modal with bootstrap
};

const formatDueDate = (dueDate) => {
  const [year, month, day] = dueDate.split('-').map(v => parseInt(v, 10));
  return format(new Date(year, month - 1, day), 'MM/dd/yyyy');
};

const restoreApp = () => {
  const lsProjects = JSON.parse(localStorage.getItem('projects'));
  const lsTodos = JSON.parse(localStorage.getItem('todos'));

  lsProjects.forEach(p => projects.push(Project(p)));
  lsTodos.forEach(t => todos.push(Todo(t)));

  projects.forEach((p) => {
    const todosByProject = todos.filter(t => t.projectId === p.id);

    todosByProject.forEach(t => p.addTodo(t));
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const projectActions = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');
  const updateProjectBtn = document.getElementById('update-project-btn');
  const projectsNode = document.getElementById('projects');
  const todoActions = document.getElementById('todo-actions');
  const defaultProjectIncluded = JSON.parse(localStorage.getItem('defaultProjectIncluded?'));

  if (!defaultProjectIncluded) {
    dummyProject();
  } else {
    restoreApp();
  }

  // Show selected project
  projectActions.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      const project = findProject(e.target.closest('li.project-actions').dataset.projectId);
      project.show();
    }

    if (e.target && e.target.matches('button.remove-project')) {
      removeProject(e.target.closest('li.project-actions').dataset.projectId);
    }

    if (e.target && e.target.matches('button.edit-project-btn')) {
      showEditModal(e.target.closest('li.project-actions').dataset.projectId);
    }
  });

  // Create a project node
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Project({ title: projectNameInput.value });

    projects.push(newProject);
    newProject.show();
    localStorage.setItem('projects', JSON.stringify(projects));
  });

  projectsNode.addEventListener('click', (e) => {
    const el = e.target;
    const todoContainer = el.closest('div.todo');
    let id = null;

    // Exclude create and update task buttons because they are outside of todo container
    if (todoContainer) {
      id = todoContainer.dataset.todoId;
    }

    if (el && el.matches('button.new-todo-btn')) {
      // improve the search for project id
      id = el.closest('div.project').dataset.projectId;
      showNewTodoModal(id);
    }

    if (el && el.matches('button.remove-todo-btn')) {
      removeTodo(id);
    }

    if (el && el.matches('button.edit-todo-btn')) {
      showEditTodoModal(id);
    }

    if (el && el.matches('input.todo-completed')) {
      const completed = e.target.checked;
      const todo = findTodo(id);

      todo.complete({ completed });
      removeTodo(id);

      localStorage.setItem('todos', JSON.stringify(todos));
    }
  });

  // Update project
  updateProjectBtn.addEventListener('click', (e) => {
    const updateProjectModal = e.target.parentElement;
    const updateProjectField = updateProjectModal.querySelector('#project-name');
    const newTitle = updateProjectField.value;
    const project = findProject(updateProjectField.dataset.projectId);

    project.update({ newTitle });
    localStorage.setItem('projects', JSON.stringify(projects));
  });

  todoActions.addEventListener('click', (e) => {
    const el = e.target;

    if (el && el.matches('button.create-todo-btn')) {
      const title = el.parentElement.querySelector('.todo-title-field').value;
      const description = el.parentElement.querySelector('.todo-description-field').value;
      const dueDate = formatDueDate(el.parentElement.querySelector('.todo-due-date-field').value);
      const priority = el.parentElement.querySelector('.todo-priority-field').value;
      const project = findProject(el.closest('div.new-todo').dataset.projectId);
      const todo = Todo({
        title, description, dueDate, priority, projectId: project.id,
      });

      todos.push(todo);
      project.addTodo(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
    }

    if (el && el.matches('button.update-todo-btn')) {
      const todoEditForm = el.closest('div.edit-todo');
      const id = todoEditForm.dataset.todoId;
      const title = todoEditForm.querySelector('.todo-title-field').value;
      const description = todoEditForm.querySelector('.todo-description-field').value;
      const dueDate = formatDueDate(todoEditForm.querySelector('.todo-due-date-field').value);
      const priority = todoEditForm.querySelector('.todo-priority-field').value;
      const todo = findTodo(id);

      todo.update({
        title, description, dueDate, priority,
      });

      localStorage.setItem('todos', JSON.stringify(todos));
    }
  });
});
