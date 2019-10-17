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



const dummyProject = () => {
  const defaultProject = Object(_project__WEBPACK_IMPORTED_MODULE_1__["default"])({ title: 'Default Project' });
  let todo;

  for (let i = 0; i < 5; i += 1) {
    todo = Object(_todo__WEBPACK_IMPORTED_MODULE_0__["default"])({
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
  const projectTitleNode = document.createElement('h1');
  const projectContainerNode = document.getElementById('project');
  const todoContainerNode = document.createElement('div');
  let todoNode;

  project.getTodos().forEach((todo) => {
    todoNode = createTodoHTML(todo);
    todoContainerNode.appendChild(todoNode);
  });

  projectTitleNode.textContent = project.getTitle();
  projectContainerNode.appendChild(projectTitleNode);
  projectContainerNode.appendChild(todoContainerNode);
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Todo = (state) => {
  let {
    title, description, dueDate, priority,
  } = state;

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

  return {
    getTitle,
    setTitle,
    getDescription,
    setDescription,
    getDueDate,
    setDueDate,
    getPriority,
    setPriority,
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Todo);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Project = (state) => {
  let { title } = state;
  const todos = [];

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

  return {
    getTitle, setTitle, getTodos, addTodo, removeTodo,
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Project);


/***/ })
/******/ ]);