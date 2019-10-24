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
const currentProject = {};

const dummyProject = () => {
  const defaultProject = Object(_project__WEBPACK_IMPORTED_MODULE_1__["default"])({ title: 'Default Project' });

  for (let i = 0; i < 5; i += 1) {
    const todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
      title: 'First task',
      description: 'Testing a new task',
      dueDate: '20019/10/02',
    });
    defaultProject.addTodo(todo);
  }

  return defaultProject;
};

const createTodoNode = (todo) => {
  const todoTemplate = document.getElementById('todo-template');
  const todoContent = document.importNode(todoTemplate.content, true);

  todoContent.querySelector('.todo-title').textContent = todo.getTitle();
  todoContent.querySelector('.todo-description').textContent = todo.getDescription();
  todoContent.querySelector('.todo-due-date').textContent = todo.getDueDate();
  todoContent.querySelector('.todo-priority').textContent = todo.getPriority();

  return todoContent;
};

const createProject = (project) => {
  const projectContainer = document.createElement('div');
  const projectNode = document.getElementById('projects');
  const projectTemplate = document.getElementById('project-template');
  const projectContent = document.importNode(projectTemplate.content, true);

  projectContainer.setAttribute('data-project-id', project.id);

  project.getTodos().forEach((todo) => {
    const todoNode = createTodoNode(todo);
    projectContent.querySelector('.content').appendChild(todoNode);
  });

  projectContent.querySelector('.title').textContent = project.getTitle();
  projectContainer.prepend(projectContent);
  projectNode.appendChild(projectContainer);
};

const findProject = (id) => projects.find((project) => project.id === parseInt(id, 10));

// Add project title to the list project in the sidebar
const listProjectTitle = (project) => {
  const projectsList = document.getElementById('projects-list');
  const projectsListTemplate = document.getElementById('projects-list-template');
  const projectsListContent = document.importNode(projectsListTemplate.content, true);
  const projectLink = projectsListContent.querySelector('.project-link');

  projectLink.textContent = project.getTitle();
  projectLink.setAttribute('data-project-id', project.id);

  projectsList.appendChild(projectsListContent);
};

const findProjectNode = (project) => {
  const projectsContainer = document.getElementById('projects');

  return Array.prototype.find.call(projectsContainer.children,
    (p) => parseInt(p.dataset.projectId, 10) === project.id);
};

const displayProject = (project) => {
  const projectsContainer = document.getElementById('projects');

  Array.prototype.forEach.call(projectsContainer.children, (pject) => {
    const p = pject;
    p.style.display = 'none';
  });

  findProjectNode(project).style.display = 'block';
};

const setCurrentProject = (p) => {
  currentProject.node = findProjectNode(p);
  currentProject.obj = p;

  return currentProject;
};

document.addEventListener('DOMContentLoaded', () => {
  const defaultProject = dummyProject();
  const projectsList = document.getElementById('projects-list');
  const createProjectBtn = document.getElementById('create-project');
  const projectsNode = document.getElementById('projects');

  projects.push(defaultProject);

  createProject(defaultProject);

  projects.forEach((p) => {
    listProjectTitle(p);
  });

  // Show selected project
  projectsList.addEventListener('click', (e) => {
    if (e.target && e.target.matches('a.project-link')) {
      displayProject(findProject(e.target.dataset.projectId));
    }
  });

  // Create a project node
  createProjectBtn.addEventListener('click', () => {
    const projectNameInput = document.getElementById('project-name');
    const newProject = Object(_project__WEBPACK_IMPORTED_MODULE_1__["default"])({ title: projectNameInput.value });

    projects.push(newProject);
    listProjectTitle(newProject);
    createProject(newProject);
    displayProject(newProject);
    setCurrentProject(newProject);
  });

  projectsNode.addEventListener('click', (e) => {
    const button = e.target;
    if (button && button.matches('button.create-todo-btn')) {
      const title = button.parentElement.querySelector('.todo-title-field').value;
      const description = button.parentElement.querySelector('.todo-description-field').value;
      const dueDate = button.parentElement.querySelector('.todo-due-date-field').value;
      const priority = button.parentElement.querySelector('.todo-priority-field').value;
      const todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
        title, description, dueDate, priority,
      });

      console.log(todo);
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
let id = -1;

const Project = (state) => {
  let { title } = state;
  const todos = [];

  id += 1;

  const getTitle = () => title;

  const setTitle = (t) => {
    title = t || title;
  };

  const getTodos = () => todos;

  const addTodo = (todo) => {
    todos.push(todo);
    return todo;
  };

  const removeTodo = (name) => {
    const todoIndex = todos.findIndex((todo) => todo.name === name);
    return todos.splice(todoIndex, 1);
  };

  const proto = {
    getTitle, setTitle, getTodos, addTodo, removeTodo,
  };

  return Object.assign(Object.create(proto), { id, title });
};

/* harmony default export */ __webpack_exports__["default"] = (Project);


/***/ })
/******/ ]);