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
/* harmony import */ var _project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);



const projects = [];

const dummyProject = () => {
  // eslint-disable-next-line prefer-object-spread
  const defaultProject = Object(_project__WEBPACK_IMPORTED_MODULE_1__["default"])({ title: 'Default Project' });

  for (let i = 0; i < 5; i += 1) {
    const todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
      title: `First #${i}`,
      description: 'Testing a new task',
      dueDate: '20019/10/02',
    });
    defaultProject.addTodo(todo);
  }

  projects.push(defaultProject);

  return defaultProject;
};

const findProject = (id) => projects.find((project) => project.id === parseInt(id, 10));

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

    // if (e.target && e.target.matches('button.remove-project')) {
    //   projects = removeProject(e.target.parentElement.dataset.projectId);
    //   console.log(projects);
    // }
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
    if (button && button.matches('button.create-todo-btn')) {
      const title = button.parentElement.querySelector('.todo-title-field').value;
      const description = button.parentElement.querySelector('.todo-description-field').value;
      const dueDate = button.parentElement.querySelector('.todo-due-date-field').value;
      const priority = button.parentElement.querySelector('.todo-priority-field').value;
      const project = findProject(button.parentElement.parentElement.dataset.projectId);
      const todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
        title, description, dueDate, priority,
      });

      project.addTodo(todo);
    }
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todoUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _todoLI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _idGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




const id = Object(_idGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(0);

const Todo = (state) => {
  const {
    title, description, dueDate, priority,
  } = state;

  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, _todoUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, _todoLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype);
  const obj = Object.assign(Object.create(proto), {
    id: id.next().value, title, description, dueDate, priority,
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
/* harmony import */ var _projectUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _projectLI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _idGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




const id = Object(_idGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(0);

const Project = (state) => {
  const { title } = state;
  const todos = [];
  const customProto = {
    addTodo(todo) {
      _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.addTodo.call(this, todo);
      _projectLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype.addTodo.call(this, todo);
    },
  };
  // eslint-disable-next-line prefer-object-spread
  const proto = Object.assign({}, _projectUI__WEBPACK_IMPORTED_MODULE_0__["default"].prototype, _projectLI__WEBPACK_IMPORTED_MODULE_1__["default"].prototype, customProto);
  const obj = Object.assign(Object.create(proto), { id: id.next().value, title, todos });

  obj.create();
  obj.createTitleLink();

  return obj;
};

/* harmony default export */ __webpack_exports__["default"] = (Project);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (ProjectUI);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function ProjectLI() {}

ProjectLI.prototype.getTitle = function getTitle() { return this.title; };

ProjectLI.prototype.setTitle = function setTitle(t) {
  this.title = t || this.title;
};

ProjectLI.prototype.getTodos = function getTodos() { return this.todos; };

ProjectLI.prototype.addTodo = function addTodo(todo) {
  this.todos.push(todo);
  return todo;
};

ProjectLI.prototype.removeTodo = function removeTodo(id) {
  const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id, 10));
  return this.todos.splice(todoIndex, 1);
};

/* harmony default export */ __webpack_exports__["default"] = (ProjectLI);


/***/ }),
/* 5 */
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
/* 6 */
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

/* harmony default export */ __webpack_exports__["default"] = (TodoUI);


/***/ }),
/* 7 */
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

/* harmony default export */ __webpack_exports__["default"] = (TodoLI);


/***/ })
/******/ ]);