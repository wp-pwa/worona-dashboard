webpackJsonp([1],{

/***/ 721:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectors = exports.actiontypes = exports.actions = exports.packageJson = undefined;

	var _package = __webpack_require__(722);

	var _package2 = _interopRequireDefault(_package);

	var _actions = __webpack_require__(723);

	var actions = _interopRequireWildcard(_actions);

	var _actiontypes = __webpack_require__(724);

	var actiontypes = _interopRequireWildcard(_actiontypes);

	var _selectors = __webpack_require__(725);

	var selectors = _interopRequireWildcard(_selectors);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.packageJson = _package2.default;
	exports.actions = actions;
	exports.actiontypes = actiontypes;
	exports.selectors = selectors;

/***/ },

/***/ 722:
/***/ function(module, exports) {

	module.exports = {
		"name": "accounts-dashboard-extension-worona",
		"version": "1.0.1",
		"description": "Extension for the Worona Dashboard in charge of the accounts system.",
		"main": "src/index.js",
		"scripts": {
			"build": "webpack -p --progress --config webpack.prod.js && webpack --progress --config webpack.dev.js"
		},
		"repository": {
			"type": "git",
			"url": "git+ssh://git@github.com/worona/worona.git"
		},
		"keywords": [
			"worona",
			"extension",
			"accounts",
			"dashboard"
		],
		"author": "Worona Labs SL | Luis Herranz, @luisherranz",
		"license": "MIT",
		"bugs": {
			"url": "https://github.com/worona/worona/issues"
		},
		"homepage": "https://github.com/worona/worona#readme",
		"worona": {
			"niceName": "Accounts",
			"slug": "accounts",
			"namespace": "accounts",
			"type": "extension",
			"service": "dashboard",
			"authors": [
				"luis@worona.org"
			],
			"default": 1,
			"core": 1,
			"listed": 0,
			"deactivable": 0,
			"public": 1,
			"prod": {
				"files": [
					{
						"file": "accounts-dashboard-extension-worona/dist/prod/js/accounts.dashboard.extension.d49d0be4ef883b5334bd9533538fc498.js",
						"hash": "d49d0be4ef883b5334bd9533538fc498",
						"chunkName": "main"
					}
				],
				"main": "dist/prod/js/accounts.dashboard.extension.d49d0be4ef883b5334bd9533538fc498.js"
			},
			"dev": {
				"files": [
					{
						"file": "accounts-dashboard-extension-worona/dist/dev/js/accounts.dashboard.extension.d3d1e0bedc63925265b277d9b4a7a681.js",
						"hash": "d3d1e0bedc63925265b277d9b4a7a681",
						"chunkName": "main"
					}
				],
				"main": "dist/dev/js/accounts.dashboard.extension.d3d1e0bedc63925265b277d9b4a7a681.js"
			}
		},
		"devDependencies": {},
		"dependencies": {}
	};

/***/ },

/***/ 723:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAccountSucceed = exports.createAccountFailed = exports.createAccountStatusChanged = exports.createAccountRequested = exports.logoutSucceed = exports.logoutFailed = exports.logoutStatusChanged = exports.logoutRequested = exports.loginSucceed = exports.loginFailed = exports.loginStatusChanged = exports.loginRequested = undefined;

	var _actiontypes = __webpack_require__(724);

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

/***/ 724:
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

/***/ 725:
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

});