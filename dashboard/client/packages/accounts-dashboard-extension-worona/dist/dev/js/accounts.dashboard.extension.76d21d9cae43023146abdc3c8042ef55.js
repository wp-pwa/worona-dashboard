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
	exports.sagas = exports.selectors = exports.reducers = exports.types = exports.actions = undefined;

	var _actions = __webpack_require__(1);

	var actions = _interopRequireWildcard(_actions);

	var _types = __webpack_require__(2);

	var types = _interopRequireWildcard(_types);

	var _reducers = __webpack_require__(3);

	var reducers = _interopRequireWildcard(_reducers);

	var _selectors = __webpack_require__(6);

	var selectors = _interopRequireWildcard(_selectors);

	var _sagas = __webpack_require__(7);

	var sagas = _interopRequireWildcard(_sagas);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.actions = actions;
	exports.types = types;
	exports.reducers = reducers;
	exports.selectors = selectors;
	exports.sagas = sagas;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAccountSucceed = exports.createAccountFailed = exports.createAccountStatusChanged = exports.createAccountRequested = exports.logoutSucceed = exports.logoutFailed = exports.logoutStatusChanged = exports.logoutRequested = exports.loginSucceed = exports.loginFailed = exports.loginStatusChanged = exports.loginRequested = undefined;

	var _types = __webpack_require__(2);

	var t = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var loginRequested = exports.loginRequested = function loginRequested(email, password) {
	  return { type: t.LOGIN_REQUESTED, email: email, password: password };
	};
	var loginStatusChanged = exports.loginStatusChanged = function loginStatusChanged(status) {
	  return { type: t.LOGIN_STATUS_CHANGED, status: status };
	};
	var loginFailed = exports.loginFailed = function loginFailed(error) {
	  return { type: t.LOGIN_FAILED, error: error };
	};
	var loginSucceed = exports.loginSucceed = function loginSucceed(userId) {
	  return { type: t.LOGIN_SUCCEED, userId: userId };
	};
	var logoutRequested = exports.logoutRequested = function logoutRequested() {
	  return { type: t.LOGOUT_REQUESTED };
	};
	var logoutStatusChanged = exports.logoutStatusChanged = function logoutStatusChanged(status) {
	  return { type: t.LOGOUT_STATUS_CHANGED, status: status };
	};
	var logoutFailed = exports.logoutFailed = function logoutFailed(error) {
	  return { type: t.LOGOUT_FAILED, error: error };
	};
	var logoutSucceed = exports.logoutSucceed = function logoutSucceed() {
	  return { type: t.LOGOUT_SUCCEED };
	};
	var createAccountRequested = exports.createAccountRequested = function createAccountRequested(name, email, password) {
	  return { type: t.CREATE_ACCOUNT_REQUESTED, name: name, email: email, password: password };
	};
	var createAccountStatusChanged = exports.createAccountStatusChanged = function createAccountStatusChanged(status) {
	  return { type: t.CREATE_ACCOUNT_STATUS_CHANGED, status: status };
	};
	var createAccountFailed = exports.createAccountFailed = function createAccountFailed(error) {
	  return { type: t.CREATE_ACCOUNT_FAILED, error: error };
	};
	var createAccountSucceed = exports.createAccountSucceed = function createAccountSucceed(userId) {
	  return { type: t.CREATE_ACCOUNT_SUCCEED, userId: userId };
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isFirstLogin = exports.createAccountError = exports.createAccountStatus = exports.isCreatingAccount = exports.logoutError = exports.logoutStatus = exports.isLoggingOut = exports.loginError = exports.loginStatus = exports.isLoggingIn = exports.userId = exports.isLoggedIn = undefined;

	var _redux = __webpack_require__(4);

	var _types = __webpack_require__(2);

	var types = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var isLoggedIn = exports.isLoggedIn = function isLoggedIn() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGIN_SUCCEED:
	      return true;
	    case types.LOGOUT_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	var userId = exports.userId = function userId() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGIN_SUCCEED:
	      return action.userId;
	    case types.LOGOUT_SUCCEED:
	      return null;
	    default:
	      return state;
	  }
	};

	var isLoggingIn = exports.isLoggingIn = function isLoggingIn() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGIN_REQUESTED:
	      return true;
	    case types.LOGIN_FAILED:
	    case types.LOGIN_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	var loginStatus = exports.loginStatus = function loginStatus() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGIN_STATUS_CHANGED:
	      return action.status;
	    case types.LOGIN_SUCCEED:
	    case types.LOGIN_FAILED:
	      return false;
	    default:
	      return state;
	  }
	};

	var loginError = exports.loginError = function loginError() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGIN_FAILED:
	      return action.error;
	    case types.LOGIN_REQUESTED:
	    case types.LOGIN_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	var isLoggingOut = exports.isLoggingOut = function isLoggingOut() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGOUT_REQUESTED:
	      return true;
	    case types.LOGOUT_FAILED:
	    case types.LOGOUT_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	var logoutStatus = exports.logoutStatus = function logoutStatus() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGOUT_STATUS_CHANGED:
	      return action.status;
	    case types.LOGOUT_SUCCEED:
	    case types.LOGOUT_FAILED:
	      return false;
	    default:
	      return state;
	  }
	};

	var logoutError = exports.logoutError = function logoutError() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.LOGOUT_FAILED:
	      return action.error;
	    case types.LOGOUT_REQUESTED:
	    case types.LOGOUT_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	var isCreatingAccount = exports.isCreatingAccount = function isCreatingAccount() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.CREATE_ACCOUNT_REQUESTED:
	      return true;
	    case types.CREATE_ACCOUNT_FAILED:
	    case types.CREATE_ACCOUNT_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	var createAccountStatus = exports.createAccountStatus = function createAccountStatus() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.CREATE_ACCOUNT_STATUS_CHANGED:
	      return action.status;
	    case types.CREATE_ACCOUNT_SUCCEED:
	    case types.CREATE_ACCOUNT_FAILED:
	      return false;
	    default:
	      return state;
	  }
	};

	var createAccountError = exports.createAccountError = function createAccountError() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.CREATE_ACCOUNT_FAILED:
	      return action.error;
	    case types.CREATE_ACCOUNT_REQUESTED:
	    case types.CREATE_ACCOUNT_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	var isFirstLogin = exports.isFirstLogin = function isFirstLogin() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.CREATE_ACCOUNT_SUCCEED:
	      return true;
	    case types.LOGOUT_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	exports.default = function () {
	  return (0, _redux.combineReducers)({
	    isLoggedIn: isLoggedIn,
	    userId: userId,
	    isLoggingIn: isLoggingIn,
	    loginError: loginError,
	    loginStatus: loginStatus,
	    isLoggingOut: isLoggingOut,
	    isCreatingAccount: isCreatingAccount,
	    createAccountError: createAccountError,
	    createAccountStatus: createAccountStatus,
	    isFirstLogin: isFirstLogin
	  });
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(635);

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = vendors_dashboard_worona;

/***/ },
/* 6 */
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = sagas;

	var _effects = __webpack_require__(8);

	var _createAccount = __webpack_require__(9);

	var _createAccount2 = _interopRequireDefault(_createAccount);

	var _login = __webpack_require__(15);

	var _login2 = _interopRequireDefault(_login);

	var _logout = __webpack_require__(16);

	var _logout2 = _interopRequireDefault(_logout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _marked = [sagas].map(regeneratorRuntime.mark);

	function sagas() {
	  return regeneratorRuntime.wrap(function sagas$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return [(0, _effects.fork)(_createAccount2.default), (0, _effects.fork)(_login2.default), (0, _effects.fork)(_logout2.default)];

	        case 2:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this);
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(300);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAccountSaga = createAccountSaga;
	exports.default = createAccountSagas;

	var _reduxSaga = __webpack_require__(10);

	var _effects = __webpack_require__(8);

	var _messages = __webpack_require__(11);

	var _libs = __webpack_require__(12);

	var libs = _interopRequireWildcard(_libs);

	var _actions = __webpack_require__(1);

	var actions = _interopRequireWildcard(_actions);

	var _types = __webpack_require__(2);

	var types = _interopRequireWildcard(_types);

	var _dependencies = __webpack_require__(13);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [createAccountSaga, createAccountSagas].map(regeneratorRuntime.mark);

	function createAccountSaga(_ref) {
	  var name = _ref.name;
	  var email = _ref.email;
	  var password = _ref.password;
	  var userId;
	  return regeneratorRuntime.wrap(function createAccountSaga$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return (0, _effects.select)(deps.selectors.isConnected);

	        case 2:
	          if (!_context.sent) {
	            _context.next = 21;
	            break;
	          }

	          _context.prev = 3;
	          _context.next = 6;
	          return (0, _effects.put)(actions.createAccountStatusChanged(_messages.CREATING_ACCOUNT));

	        case 6:
	          _context.next = 8;
	          return (0, _effects.call)(libs.createAccount, name, email, password);

	        case 8:
	          userId = _context.sent;
	          _context.next = 11;
	          return (0, _effects.put)(actions.createAccountSucceed(userId));

	        case 11:
	          _context.next = 13;
	          return (0, _effects.put)(actions.loginRequested(email, password));

	        case 13:
	          _context.next = 19;
	          break;

	        case 15:
	          _context.prev = 15;
	          _context.t0 = _context['catch'](3);
	          _context.next = 19;
	          return (0, _effects.put)(actions.createAccountFailed(_context.t0));

	        case 19:
	          _context.next = 29;
	          break;

	        case 21:
	          _context.next = 23;
	          return (0, _effects.put)(actions.createAccountStatusChanged(_messages.NOT_CONNECTED));

	        case 23:
	          _context.next = 25;
	          return (0, _effects.take)(deps.types.CONNECTION_SUCCEED);

	        case 25:
	          _context.next = 27;
	          return (0, _effects.put)(actions.createAccountStatusChanged(_messages.CONNECTED_CREATING_ACCOUNT));

	        case 27:
	          _context.next = 29;
	          return (0, _effects.call)(createAccountSaga, { name: name, email: email, password: password });

	        case 29:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this, [[3, 15]]);
	}

	function createAccountSagas() {
	  return regeneratorRuntime.wrap(function createAccountSagas$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          _context2.next = 2;
	          return [(0, _reduxSaga.takeLatest)(types.CREATE_ACCOUNT_REQUESTED, createAccountSaga)];

	        case 2:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _marked[1], this);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(717);

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var NOT_CONNECTED = exports.NOT_CONNECTED = 'Not connected. Waiting for connection...';
	var CONNECTED_LOGIN_IN = exports.CONNECTED_LOGIN_IN = 'Connected. Waiting to login...';
	var LOGIN_IN = exports.LOGIN_IN = 'Waiting to login...';
	var CONNECTED_CREATING_ACCOUNT = exports.CONNECTED_CREATING_ACCOUNT = 'Connected. Waiting to create account...';
	var CREATING_ACCOUNT = exports.CREATING_ACCOUNT = 'Waiting to create account...';

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createAccount = undefined;

	var _dependencies = __webpack_require__(13);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var createAccount = exports.createAccount = function createAccount(name, email, password) {
	  var api = arguments.length <= 3 || arguments[3] === undefined ? deps.libs.call : arguments[3];
	  return api('createAccount', name, email, password);
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectors = exports.types = exports.libs = undefined;

	var _woronaDeps = __webpack_require__(14);

	var libs = exports.libs = {
	  get call() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'call');
	  },
	  get loginWithPassword() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'loginWithPassword');
	  },
	  get loggedInEventChannel() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'loggedInEventChannel');
	  },
	  get loggedOutEventChannel() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'loggedOutEventChannel');
	  },
	  get logout() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'logout');
	  },
	  get push() {
	    return (0, _woronaDeps.dep)('build', 'libs', 'push');
	  }
	};

	var types = exports.types = {
	  get CONNECTION_SUCCEED() {
	    return (0, _woronaDeps.dep)('connection', 'types', 'CONNECTION_SUCCEED');
	  }
	};

	var selectors = exports.selectors = {
	  get isConnected() {
	    return (0, _woronaDeps.dep)('connection', 'selectors', 'isConnected');
	  }
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(326);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loginRequestedSaga = loginRequestedSaga;
	exports.loginRequestedWatcher = loginRequestedWatcher;
	exports.loginSucceedSaga = loginSucceedSaga;
	exports.loginSucceedWatcher = loginSucceedWatcher;
	exports.loginEvent = loginEvent;
	exports.logoutEvent = logoutEvent;
	exports.logEventsWatcher = logEventsWatcher;
	exports.default = loginSagas;

	var _effects = __webpack_require__(8);

	var _reduxSaga = __webpack_require__(10);

	var _messages = __webpack_require__(11);

	var _selectors = __webpack_require__(6);

	var selectors = _interopRequireWildcard(_selectors);

	var _actions = __webpack_require__(1);

	var actions = _interopRequireWildcard(_actions);

	var _types = __webpack_require__(2);

	var types = _interopRequireWildcard(_types);

	var _dependencies = __webpack_require__(13);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [loginRequestedSaga, loginRequestedWatcher, loginSucceedSaga, loginSucceedWatcher, loginEvent, logoutEvent, logEventsWatcher, loginSagas].map(regeneratorRuntime.mark); /* eslint-disable no-constant-condition */


	function loginRequestedSaga(_ref) {
	  var email = _ref.email;
	  var password = _ref.password;
	  var userId;
	  return regeneratorRuntime.wrap(function loginRequestedSaga$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return (0, _effects.select)(deps.selectors.isConnected);

	        case 2:
	          if (!_context.sent) {
	            _context.next = 19;
	            break;
	          }

	          _context.prev = 3;
	          _context.next = 6;
	          return (0, _effects.put)(actions.loginStatusChanged(_messages.LOGIN_IN));

	        case 6:
	          _context.next = 8;
	          return (0, _effects.call)(deps.libs.loginWithPassword, email, password);

	        case 8:
	          userId = _context.sent;
	          _context.next = 11;
	          return (0, _effects.put)(actions.loginSucceed(userId));

	        case 11:
	          _context.next = 17;
	          break;

	        case 13:
	          _context.prev = 13;
	          _context.t0 = _context['catch'](3);
	          _context.next = 17;
	          return (0, _effects.put)(actions.loginFailed(_context.t0));

	        case 17:
	          _context.next = 27;
	          break;

	        case 19:
	          _context.next = 21;
	          return (0, _effects.put)(actions.loginStatusChanged(_messages.NOT_CONNECTED));

	        case 21:
	          _context.next = 23;
	          return (0, _effects.take)(deps.types.CONNECTION_SUCCEED);

	        case 23:
	          _context.next = 25;
	          return (0, _effects.put)(actions.loginStatusChanged(_messages.CONNECTED_LOGIN_IN));

	        case 25:
	          _context.next = 27;
	          return (0, _effects.call)(loginRequestedSaga, { email: email, password: password });

	        case 27:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this, [[3, 13]]);
	}
	function loginRequestedWatcher() {
	  return regeneratorRuntime.wrap(function loginRequestedWatcher$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          return _context2.delegateYield((0, _reduxSaga.takeLatest)(types.LOGIN_REQUESTED, loginRequestedSaga), 't0', 1);

	        case 1:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _marked[1], this);
	}

	function loginSucceedSaga() {
	  return regeneratorRuntime.wrap(function loginSucceedSaga$(_context3) {
	    while (1) {
	      switch (_context3.prev = _context3.next) {
	        case 0:
	          _context3.next = 2;
	          return (0, _effects.select)(selectors.isFirstLogin);

	        case 2:
	          if (!_context3.sent) {
	            _context3.next = 7;
	            break;
	          }

	          _context3.next = 5;
	          return (0, _effects.call)(deps.libs.push, '/create-first-app');

	        case 5:
	          _context3.next = 9;
	          break;

	        case 7:
	          _context3.next = 9;
	          return (0, _effects.call)(deps.libs.push, '/sites');

	        case 9:
	        case 'end':
	          return _context3.stop();
	      }
	    }
	  }, _marked[2], this);
	}
	function loginSucceedWatcher() {
	  return regeneratorRuntime.wrap(function loginSucceedWatcher$(_context4) {
	    while (1) {
	      switch (_context4.prev = _context4.next) {
	        case 0:
	          return _context4.delegateYield((0, _reduxSaga.takeLatest)(types.LOGIN_SUCCEED, loginSucceedSaga), 't0', 1);

	        case 1:
	        case 'end':
	          return _context4.stop();
	      }
	    }
	  }, _marked[3], this);
	}

	function loginEvent(loggedInEvents) {
	  var _ref2, automaticLogin, _ref3, success;

	  return regeneratorRuntime.wrap(function loginEvent$(_context5) {
	    while (1) {
	      switch (_context5.prev = _context5.next) {
	        case 0:
	          if (false) {
	            _context5.next = 17;
	            break;
	          }

	          _context5.next = 3;
	          return (0, _effects.race)({
	            automaticLogin: (0, _effects.take)(loggedInEvents),
	            manualLogin: (0, _effects.take)(types.LOGIN_REQUESTED)
	          });

	        case 3:
	          _ref2 = _context5.sent;
	          automaticLogin = _ref2.automaticLogin;

	          if (!automaticLogin) {
	            _context5.next = 9;
	            break;
	          }

	          _context5.next = 8;
	          return (0, _effects.put)(actions.loginSucceed(automaticLogin));

	        case 8:
	          return _context5.abrupt('break', 17);

	        case 9:
	          _context5.next = 11;
	          return (0, _effects.race)({
	            success: (0, _effects.take)(types.LOGIN_SUCCEED),
	            failure: (0, _effects.take)(types.LOGIN_FAILED)
	          });

	        case 11:
	          _ref3 = _context5.sent;
	          success = _ref3.success;

	          if (!success) {
	            _context5.next = 15;
	            break;
	          }

	          return _context5.abrupt('break', 17);

	        case 15:
	          _context5.next = 0;
	          break;

	        case 17:
	        case 'end':
	          return _context5.stop();
	      }
	    }
	  }, _marked[4], this);
	}

	function logoutEvent(loggedOutEvents) {
	  var _ref4, automaticLogout, _ref5, _success;

	  return regeneratorRuntime.wrap(function logoutEvent$(_context6) {
	    while (1) {
	      switch (_context6.prev = _context6.next) {
	        case 0:
	          if (false) {
	            _context6.next = 17;
	            break;
	          }

	          _context6.next = 3;
	          return (0, _effects.race)({
	            automaticLogout: (0, _effects.take)(loggedOutEvents),
	            manualLogout: (0, _effects.take)(types.LOGOUT_REQUESTED)
	          });

	        case 3:
	          _ref4 = _context6.sent;
	          automaticLogout = _ref4.automaticLogout;

	          if (!automaticLogout) {
	            _context6.next = 9;
	            break;
	          }

	          _context6.next = 8;
	          return (0, _effects.put)(actions.logoutSucceed(automaticLogout));

	        case 8:
	          return _context6.abrupt('break', 17);

	        case 9:
	          _context6.next = 11;
	          return (0, _effects.race)({
	            success: (0, _effects.take)(types.LOGOUT_SUCCEED),
	            failure: (0, _effects.take)(types.LOGOUT_FAILED)
	          });

	        case 11:
	          _ref5 = _context6.sent;
	          _success = _ref5.success;

	          if (!_success) {
	            _context6.next = 15;
	            break;
	          }

	          return _context6.abrupt('break', 17);

	        case 15:
	          _context6.next = 0;
	          break;

	        case 17:
	        case 'end':
	          return _context6.stop();
	      }
	    }
	  }, _marked[5], this);
	}

	function logEventsWatcher() {
	  var loggedInEvents, loggedOutEvents;
	  return regeneratorRuntime.wrap(function logEventsWatcher$(_context7) {
	    while (1) {
	      switch (_context7.prev = _context7.next) {
	        case 0:
	          _context7.next = 2;
	          return (0, _effects.take)(deps.types.CONNECTION_SUCCEED);

	        case 2:
	          _context7.next = 4;
	          return (0, _effects.call)(deps.libs.loggedInEventChannel);

	        case 4:
	          loggedInEvents = _context7.sent;
	          _context7.next = 7;
	          return (0, _effects.call)(deps.libs.loggedOutEventChannel);

	        case 7:
	          loggedOutEvents = _context7.sent;

	        case 8:
	          if (false) {
	            _context7.next = 15;
	            break;
	          }

	          _context7.next = 11;
	          return (0, _effects.call)(loginEvent, loggedInEvents);

	        case 11:
	          _context7.next = 13;
	          return (0, _effects.call)(logoutEvent, loggedOutEvents);

	        case 13:
	          _context7.next = 8;
	          break;

	        case 15:
	        case 'end':
	          return _context7.stop();
	      }
	    }
	  }, _marked[6], this);
	}

	function loginSagas() {
	  return regeneratorRuntime.wrap(function loginSagas$(_context8) {
	    while (1) {
	      switch (_context8.prev = _context8.next) {
	        case 0:
	          _context8.next = 2;
	          return [(0, _effects.fork)(loginRequestedWatcher), (0, _effects.fork)(loginSucceedWatcher), (0, _effects.fork)(logEventsWatcher)];

	        case 2:
	        case 'end':
	          return _context8.stop();
	      }
	    }
	  }, _marked[7], this);
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.logoutRequestedSaga = logoutRequestedSaga;
	exports.logoutRequestedWatcher = logoutRequestedWatcher;
	exports.logoutSucceedSaga = logoutSucceedSaga;
	exports.logoutSucceedWatcher = logoutSucceedWatcher;
	exports.default = logoutSagas;

	var _reduxSaga = __webpack_require__(10);

	var _effects = __webpack_require__(8);

	var _types = __webpack_require__(2);

	var types = _interopRequireWildcard(_types);

	var _actions = __webpack_require__(1);

	var actions = _interopRequireWildcard(_actions);

	var _dependencies = __webpack_require__(13);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [logoutRequestedSaga, logoutRequestedWatcher, logoutSucceedSaga, logoutSucceedWatcher, logoutSagas].map(regeneratorRuntime.mark);

	function logoutRequestedSaga() {
	  return regeneratorRuntime.wrap(function logoutRequestedSaga$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.prev = 0;
	          _context.next = 3;
	          return (0, _effects.call)(deps.libs.logout);

	        case 3:
	          _context.next = 5;
	          return (0, _effects.put)(actions.logoutSucceed());

	        case 5:
	          _context.next = 11;
	          break;

	        case 7:
	          _context.prev = 7;
	          _context.t0 = _context['catch'](0);
	          _context.next = 11;
	          return (0, _effects.put)(actions.logoutFailed(_context.t0));

	        case 11:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this, [[0, 7]]);
	}
	function logoutRequestedWatcher() {
	  return regeneratorRuntime.wrap(function logoutRequestedWatcher$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          return _context2.delegateYield((0, _reduxSaga.takeLatest)(types.LOGOUT_REQUESTED, logoutRequestedSaga), 't0', 1);

	        case 1:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _marked[1], this);
	}

	function logoutSucceedSaga() {
	  return regeneratorRuntime.wrap(function logoutSucceedSaga$(_context3) {
	    while (1) {
	      switch (_context3.prev = _context3.next) {
	        case 0:
	          _context3.next = 2;
	          return (0, _effects.call)(deps.libs.push, '/login');

	        case 2:
	        case 'end':
	          return _context3.stop();
	      }
	    }
	  }, _marked[2], this);
	}
	function logoutSucceedWatcher() {
	  return regeneratorRuntime.wrap(function logoutSucceedWatcher$(_context4) {
	    while (1) {
	      switch (_context4.prev = _context4.next) {
	        case 0:
	          return _context4.delegateYield((0, _reduxSaga.takeLatest)(types.LOGOUT_SUCCEED, logoutSucceedSaga), 't0', 1);

	        case 1:
	        case 'end':
	          return _context4.stop();
	      }
	    }
	  }, _marked[3], this);
	}

	function logoutSagas() {
	  return regeneratorRuntime.wrap(function logoutSagas$(_context5) {
	    while (1) {
	      switch (_context5.prev = _context5.next) {
	        case 0:
	          _context5.next = 2;
	          return [(0, _effects.fork)(logoutRequestedWatcher), (0, _effects.fork)(logoutSucceedWatcher)];

	        case 2:
	        case 'end':
	          return _context5.stop();
	      }
	    }
	  }, _marked[4], this);
	}

/***/ }
/******/ ]);