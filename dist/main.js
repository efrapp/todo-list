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
  const defaultProject = dummyProject();
  const projectsList = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');
  const projectsNode = document.getElementById('projects');

  createProject(defaultProject);

  // Show selected project
  projectsList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      const project = findProject(e.target.parentElement.dataset.projectId);
      displayProject(project);
      displayTodos(project);
    }
  });

  // Create a project node
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Object(_project__WEBPACK_IMPORTED_MODULE_1__["default"])({ title: projectNameInput.value });

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
      const todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
        title, description, dueDate, priority,
      });

      project.addTodo(todo);
      projectUI.querySelector('.content')
        .appendChild(createTodoNode(todo));
    }
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
let id = -1;

const Todo = (state) => {
  let {
    title, description, dueDate, priority,
  } = state;

  id += 1;

  const getTitle = () => title;

  const setTitle = (t) => {
    title = t || title;
  };

  const getDescription = () => description;

  const setDescription = (d) => {
    description = d || description;
  };

  const getDueDate = () => dueDate;

  const setDueDate = (dd) => {
    dueDate = dd || dueDate;
  };

  const getPriority = () => priority;

  const setPriority = (p) => {
    priority = p || priority;
  };

  const proto = {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
  };

  return Object.assign(Object.create(proto), {
    id, title, description, dueDate, priority,
  });
};

/* harmony default export */ __webpack_exports__["default"] = (Todo);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _projectUI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _projectLI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);



let id = -1;

const Project = (state) => {
  const { title } = state;
  const todos = [];
  const protoUI = Object.getPrototypeOf(Object(_projectUI__WEBPACK_IMPORTED_MODULE_0__["default"])());
  const protoLI = Object.getPrototypeOf(Object(_projectLI__WEBPACK_IMPORTED_MODULE_1__["default"])());
  const proto = Object.assign(protoLI, protoUI);

  id += 1;

  return Object.assign(Object.create(proto), { id, title, todos });
};

/* harmony default export */ __webpack_exports__["default"] = (Project);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ProjectUI = () => {
  const proto = {
    create() {
      const projectContainer = document.createElement('div');
      const projectNode = document.getElementById('projects');
      const projectTemplate = document.getElementById('project-template');
      const projectContent = document.importNode(projectTemplate.content, true);

      projectContainer.setAttribute('data-project-id', this.id);

      projectContent.querySelector('.title').textContent = this.getTitle();
      projectContainer.prepend(projectContent);
      projectNode.appendChild(projectContainer);
    },
    show() {
      const projectsContainer = document.getElementById('projects');

      Array.prototype.forEach.call(projectsContainer.children, (pject) => {
        const p = pject;
        if (parseInt(p.dataset.projectId, 10) === this.id) {
          p.style.display = 'none';
        } else {
          p.style.display = 'none';
        }
      });
    },
    createtitleLink() {
      const projectsList = document.getElementById('projects-list');
      const projectsListTemplate = document.getElementById('projects-list-template');
      const projectsListContent = document.importNode(projectsListTemplate.content, true);
      const projectActions = projectsListContent.querySelector('.project-actions');
      const projectLink = projectsListContent.querySelector('.project-link');

      projectLink.textContent = this.getTitle();
      projectActions.setAttribute('data-project-id', this.id);

      projectsList.appendChild(projectsListContent);
    },
  };

  return Object.create(proto);
};

/* harmony default export */ __webpack_exports__["default"] = (ProjectUI);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Project = () => {
  const proto = {
    getTitle() {
      return this.title;
    },
    setTitle(t) {
      this.title = t || this.title;
    },
    getTodos() {
      return this.todos;
    },
    addTodo(todo) {
      this.todos.push(todo);
      return todo;
    },
    removeTodo(id) {
      const todoIndex = this.todos.findIndex((todo) => todo.id === parseInt(id, 10));
      return this.todos.splice(todoIndex, 1);
    },
  };

  return Object.create(proto);
};

/* harmony default export */ __webpack_exports__["default"] = (Project);


/***/ })
/******/ ]);