/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);



const projects = [];
const todos = [];

const dummyProject = () => {
  // eslint-disable-next-line prefer-object-spread
  const defaultProject = Object(_project__WEBPACK_IMPORTED_MODULE_1__["default"])({ title: 'Default Project' });

  for (let i = 0; i < 5; i += 1) {
    const todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
      title: `First #${i}`,
      description: 'Testing a new task',
      dueDate: '2019/10/02',
      priority: '1',
      projectId: defaultProject.id,
    });

    todos.push(todo);
    defaultProject.addTodo(todo);
  }

  projects.push(defaultProject);

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
};

const showEditTodoModal = (id) => {
  const todo = findTodo(id);
  const project = findProject(todo.projectId);
  const editTodoForm = project.getElement().querySelector('.edit-todo');
  const title = editTodoForm.querySelector('.todo-title-field');
  const description = editTodoForm.querySelector('.todo-description-field');
  const dueDate = editTodoForm.querySelector('.todo-due-date-field');
  const priority = editTodoForm.querySelector('.todo-priority-field');

  editTodoForm.setAttribute('data-todo-id', todo.id);
  title.placeholder = todo.getTitle();
  description.placeholder = todo.getDescription();
  dueDate.placeholder = todo.getDueDate();
  priority.value = todo.getPriority();

  // Show modal with bootstrap
};

document.addEventListener('DOMContentLoaded', () => {
  const projectActions = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');
  const updateProjectBtn = document.getElementById('update-project-btn');
  const projectsNode = document.getElementById('projects');

  dummyProject();

  // Show selected project
  projectActions.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      const project = findProject(e.target.parentElement.dataset.projectId);
      project.show();
    }

    if (e.target && e.target.matches('button.remove-project')) {
      removeProject(e.target.parentElement.dataset.projectId);
    }

    if (e.target && e.target.matches('button.edit-project-btn')) {
      showEditModal(e.target.parentElement.dataset.projectId);
    }
  });

  // Create a project node
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Object(_project__WEBPACK_IMPORTED_MODULE_1__["default"])({ title: projectNameInput.value });

    projects.push(newProject);
    newProject.show();
  });

  projectsNode.addEventListener('click', (e) => {
    const button = e.target;
    const todoContainer = button.parentElement;
    const id = todoContainer.dataset.todoId;

    if (button && button.matches('button.create-todo-btn')) {
      const title = button.parentElement.querySelector('.todo-title-field').value;
      const description = button.parentElement.querySelector('.todo-description-field').value;
      const dueDate = button.parentElement.querySelector('.todo-due-date-field').value;
      const priority = button.parentElement.querySelector('.todo-priority-field').value;
      const project = findProject(button.parentElement.parentElement.dataset.projectId);
      const todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
        title, description, dueDate, priority, projectId: project.id,
      });

      todos.push(todo);
      project.addTodo(todo);
    }

    if (button && button.matches('button.remove-todo-btn')) {
      removeTodo(id);
    }

    if (button && button.matches('button.edit-todo-btn')) {
      showEditTodoModal(id);
    }

    if (button && button.matches('button.update-todo-btn')) {
      const title = todoContainer.querySelector('.todo-title-field').value;
      const description = todoContainer.querySelector('.todo-description-field').value;
      const dueDate = todoContainer.querySelector('.todo-due-date-field').value;
      const priority = todoContainer.querySelector('.todo-priority-field').value;
      const todo = findTodo(id);

      todo.update({
        title, description, dueDate, priority,
      });
    }
  });

  updateProjectBtn.addEventListener('click', (e) => {
    const updateProjectModal = e.target.parentElement;
    const updateProjectField = updateProjectModal.querySelector('#project-name');
    const newTitle = updateProjectField.value;
    const project = findProject(updateProjectField.dataset.projectId);

    project.update({ newTitle });
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todoUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _todoLI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _idGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




const id = Object(_idGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(0);

const Todo = (state) => {
  const {
    title, description, dueDate, priority, projectId,
  } = state;

  const publicProto = {
    remove() {
      _todoUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.remove.call(this);
    },
    getElement() {
      return _todoUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.getElement.call(this);
    },
    update(state) {
      const {
        title, description, dueDate, priority,
      } = state;

      _todoLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.setTitle.call(this, title);
      _todoLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.setDescription.call(this, description);
      _todoLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.setDueDate.call(this, dueDate);
      _todoLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.setPriority.call(this, priority);

      _todoUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.update.call(this, state);
    },
  };
  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, _todoUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, _todoLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype, publicProto);
  const obj = Object.assign(Object.create(proto), {
    id: id.next().value, title, description, dueDate, priority, projectId,
  });

  obj.createView();

  return obj;
};

/* harmony default export */ __webpack_exports__["default"] = (Todo);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function TodoUI() {}

TodoUI.prototype.createView = function createView() {
  const todoTemplate = document.getElementById('todo-template');
  const todoContent = document.importNode(todoTemplate.content, true);

  todoContent.querySelector('.todo').setAttribute('data-todo-id', this.id);
  todoContent.querySelector('.todo-title').textContent = this.getTitle();
  todoContent.querySelector('.todo-description').textContent = this.getDescription();
  todoContent.querySelector('.todo-due-date').textContent = this.getDueDate();
  todoContent.querySelector('.todo-priority').textContent = this.getPriority();

  return todoContent;
};

TodoUI.prototype.getProjectContainer = function getProjectContainer() {
  const projects = document.getElementById('projects').children;
  return Array.prototype.find.call(projects,
    p => parseInt(p.dataset.projectId, 10) === this.projectId).querySelector('.content');
};

TodoUI.prototype.findElement = function findElement(elements) {
  return Array.prototype.find.call(elements,
    t => parseInt(t.dataset.todoId, 10) === this.id);
};

TodoUI.prototype.getElement = function getElement() {
  const todoEls = this.getProjectContainer().children;
  const todoEl = this.findElement(todoEls);
  return todoEl;
};

TodoUI.prototype.remove = function remove() {
  const todoEl = this.getElement();

  todoEl.remove();
};

TodoUI.prototype.update = function update(state) {
  const {
    title, description, dueDate, priority,
  } = state;
  const todoEl = this.getElement();

  todoEl.querySelector('.todo-title').textContent = title || this.getTitle();
  todoEl.querySelector('.todo-description').textContent = description || this.getDescription();
  todoEl.querySelector('.todo-due-date').textContent = dueDate || this.getDueDate();
  todoEl.querySelector('.todo-priority').textContent = priority || this.getPriority();
};

/* harmony default export */ __webpack_exports__["default"] = (TodoUI);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function TodoLI() {}

TodoLI.prototype.getTitle = function getTitle() {
  return this.title;
};

TodoLI.prototype.setTitle = function setTitle(t) {
  this.title = t || this.title;
};

TodoLI.prototype.getDescription = function getDescription() {
  return this.description;
};

TodoLI.prototype.setDescription = function setDescription(d) {
  this.description = d || this.description;
};

TodoLI.prototype.getDueDate = function getDueDate() {
  return this.dueDate;
};

TodoLI.prototype.setDueDate = function setDueDate(dd) {
  this.dueDate = dd || this.dueDate;
};

TodoLI.prototype.getPriority = function getPriority() {
  return this.priority;
};

TodoLI.prototype.setPriority = function setPriority(p) {
  this.priority = p || this.priority;
};

TodoLI.prototype.getProjectId = function getProjectId() {
  return this.projectId;
};

/* harmony default export */ __webpack_exports__["default"] = (TodoLI);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return indexer; });
function* indexer(i) {
  let index = i;

  while (true) {
    yield index;
    index += 1;
  }
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _projectUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _projectLI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _idGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




const id = Object(_idGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(0);

const Project = (state) => {
  const { title } = state;
  const todos = [];
  const publicProto = {
    addTodo(todo) {
      _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.addTodo.call(this, todo);
    },
    remove() {
      _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.removeTitleLink.call(this);
      _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.removeContent.call(this);
    },
    update(stateEdit) {
      const { newTitle } = stateEdit;
      _projectLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.setTitle.call(this, newTitle);
      _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.updateTitleLink.call(this, newTitle);
      _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.updateContentTitle.call(this, newTitle);
    },
    getElement() {
      return _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.getElement.call(this);
    },
  };
  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, _projectLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype, publicProto);
  const obj = Object.assign(Object.create(proto), { id: id.next().value, title, todos });

  obj.create();
  obj.createTitleLink();

  return obj;
};

/* harmony default export */ __webpack_exports__["default"] = (Project);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
    .querySelector('.content').appendChild(todo.createView());
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

/* harmony default export */ __webpack_exports__["default"] = (ProjectUI);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ProjectLI() {}

ProjectLI.prototype.getTitle = function getTitle() { return this.title; };

ProjectLI.prototype.setTitle = function setTitle(t) {
  this.title = t || this.title;
};

/* harmony default export */ __webpack_exports__["default"] = (ProjectLI);


/***/ })
/******/ ]);