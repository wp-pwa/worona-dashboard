module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "https://cdn.worona.io/packages/accounts-dashboard-extension-worona/dist/dev/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectors = exports.actiontypes = exports.actions = undefined;

	var _actions = __webpack_require__(1);

	var actions = _interopRequireWildcard(_actions);

	var _actiontypes = __webpack_require__(2);

	var actiontypes = _interopRequireWildcard(_actiontypes);

	var _selectors = __webpack_require__(3);

	var selectors = _interopRequireWildcard(_selectors);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.actions = actions;
	exports.actiontypes = actiontypes;
	exports.selectors = selectors;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAccountSucceed = exports.createAccountFailed = exports.createAccountStatusChanged = exports.createAccountRequested = exports.logoutSucceed = exports.logoutFailed = exports.logoutStatusChanged = exports.logoutRequested = exports.loginSucceed = exports.loginFailed = exports.loginStatusChanged = exports.loginRequested = undefined;

	var _actiontypes = __webpack_require__(2);

	var loginRequested = exports.loginRequested = function loginRequested(email, password) {
	  return { type: _actiontypes.LOGIN_REQUESTED, email: email, password: password };
	};
	var loginStatusChanged = exports.loginStatusChanged = function loginStatusChanged(status) {
	  return { type: _actiontypes.LOGIN_STATUS_CHANGED, status: status };
	};
	var loginFailed = exports.loginFailed = function loginFailed(error) {
	  return { type: _actiontypes.LOGIN_FAILED, error: error };
	};
	var loginSucceed = exports.loginSucceed = function loginSucceed(userId) {
	  return { type: _actiontypes.LOGIN_SUCCEED, userId: userId };
	};
	var logoutRequested = exports.logoutRequested = function logoutRequested() {
	  return { type: _actiontypes.LOGOUT_REQUESTED };
	};
	var logoutStatusChanged = exports.logoutStatusChanged = function logoutStatusChanged(status) {
	  return { type: _actiontypes.LOGOUT_STATUS_CHANGED, status: status };
	};
	var logoutFailed = exports.logoutFailed = function logoutFailed(error) {
	  return { type: _actiontypes.LOGOUT_FAILED, error: error };
	};
	var logoutSucceed = exports.logoutSucceed = function logoutSucceed() {
	  return { type: _actiontypes.LOGOUT_SUCCEED };
	};
	var createAccountRequested = exports.createAccountRequested = function createAccountRequested(name, email, password) {
	  return { type: _actiontypes.CREATE_ACCOUNT_REQUESTED,
	    name: name, email: email, password: password };
	};
	var createAccountStatusChanged = exports.createAccountStatusChanged = function createAccountStatusChanged(status) {
	  return { type: _actiontypes.CREATE_ACCOUNT_STATUS_CHANGED,
	    status: status };
	};
	var createAccountFailed = exports.createAccountFailed = function createAccountFailed(error) {
	  return { type: _actiontypes.CREATE_ACCOUNT_FAILED, error: error };
	};
	var createAccountSucceed = exports.createAccountSucceed = function createAccountSucceed(userId) {
	  return { type: _actiontypes.CREATE_ACCOUNT_SUCCEED, userId: userId };
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var LOGIN_REQUESTED = exports.LOGIN_REQUESTED = 'accounts/LOGIN_REQUESTED';
	var LOGIN_STATUS_CHANGED = exports.LOGIN_STATUS_CHANGED = 'accounts/LOGIN_STATUS_CHANGED';
	var LOGIN_FAILED = exports.LOGIN_FAILED = 'accounts/LOGIN_FAILED';
	var LOGIN_SUCCEED = exports.LOGIN_SUCCEED = 'accounts/LOGIN_SUCCEED';
	var LOGOUT_REQUESTED = exports.LOGOUT_REQUESTED = 'accounts/LOGOUT_REQUESTED';
	var LOGOUT_STATUS_CHANGED = exports.LOGOUT_STATUS_CHANGED = 'accounts/LOGOUT_STATUS_CHANGED';
	var LOGOUT_FAILED = exports.LOGOUT_FAILED = 'accounts/LOGOUT_FAILED';
	var LOGOUT_SUCCEED = exports.LOGOUT_SUCCEED = 'accounts/LOGOUT_SUCCEED';
	var CREATE_ACCOUNT_REQUESTED = exports.CREATE_ACCOUNT_REQUESTED = 'accounts/CREATE_ACCOUNT_REQUESTED';
	var CREATE_ACCOUNT_STATUS_CHANGED = exports.CREATE_ACCOUNT_STATUS_CHANGED = 'accounts/CREATE_ACCOUNT_STATUS_CHANGED';
	var CREATE_ACCOUNT_FAILED = exports.CREATE_ACCOUNT_FAILED = 'accounts/CREATE_ACCOUNT_FAILED';
	var CREATE_ACCOUNT_SUCCEED = exports.CREATE_ACCOUNT_SUCCEED = 'accounts/CREATE_ACCOUNT_SUCCEED';

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isLoggedIn = exports.isLoggedIn = function isLoggedIn(state) {
	  return state.accounts.isLoggedIn;
	};
	var userId = exports.userId = function userId(state) {
	  return state.accounts.userId;
	};
	var isLoggingIn = exports.isLoggingIn = function isLoggingIn(state) {
	  return state.accounts.isLoggingIn;
	};
	var loginStatus = exports.loginStatus = function loginStatus(state) {
	  return state.accounts.loginStatus;
	};
	var loginError = exports.loginError = function loginError(state) {
	  return state.accounts.loginError;
	};
	var isLoggingOut = exports.isLoggingOut = function isLoggingOut(state) {
	  return state.accounts.isLoggingOut;
	};
	var isCreatingAccount = exports.isCreatingAccount = function isCreatingAccount(state) {
	  return state.accounts.isCreatingAccount;
	};
	var createAccountStatus = exports.createAccountStatus = function createAccountStatus(state) {
	  return state.accounts.createAccountStatus;
	};
	var createAccountError = exports.createAccountError = function createAccountError(state) {
	  return state.accounts.createAccountError;
	};
	var isFirstLogin = exports.isFirstLogin = function isFirstLogin(state) {
	  return state.accounts.isFirstLogin;
	};

/***/ }
/******/ ]);