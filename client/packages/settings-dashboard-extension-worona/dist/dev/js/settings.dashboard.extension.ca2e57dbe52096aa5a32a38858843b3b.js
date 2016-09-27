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
/******/ 	__webpack_require__.p = "https://cdn.worona.io/packages/settings-dashboard-extension-worona/dist/dev/";

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
	exports.selectors = exports.reducers = exports.sagas = undefined;

	var _reducers = __webpack_require__(1);

	var reducers = _interopRequireWildcard(_reducers);

	var _sagas = __webpack_require__(7);

	var sagas = _interopRequireWildcard(_sagas);

	var _selectors = __webpack_require__(12);

	var selectors = _interopRequireWildcard(_selectors);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.sagas = sagas;
	exports.reducers = reducers;
	exports.selectors = selectors;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.categories = undefined;

	var _redux = __webpack_require__(2);

	var _dependencies = __webpack_require__(4);

	var deps = _interopRequireWildcard(_dependencies);

	var _types = __webpack_require__(6);

	var types = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var categories = exports.categories = function categories() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	  var action = arguments[1];

	  if (action.type === types.GOTTEN_CATEGORIES_INDEX) {
	    return [].concat(_toConsumableArray(action.categoryIndex));
	  }
	  return state;
	};

	exports.default = function () {
	  return (0, _redux.combineReducers)({
	    categories: categories,
	    collection: deps.reducerCreators.collectionCreator('settings'),
	    isReady: deps.reducerCreators.isReadyCreator('settings')
	  });
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))("c02e47e5e61c3e61b153c56e595bd867");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = vendors_dashboard_worona;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.types = exports.libs = exports.sagaCreators = exports.reducerCreators = undefined;

	var _woronaDeps = __webpack_require__(5);

	var reducerCreators = exports.reducerCreators = {
	  get collectionCreator() {
	    return (0, _woronaDeps.dep)('subscriptions', 'reducerCreators', 'collectionCreator');
	  },
	  get isReadyCreator() {
	    return (0, _woronaDeps.dep)('subscriptions', 'reducerCreators', 'isReadyCreator');
	  }
	};

	var sagaCreators = exports.sagaCreators = {
	  get subscriptionWatcherCreator() {
	    return (0, _woronaDeps.dep)('subscriptions', 'sagaCreators', 'subscriptionWatcherCreator');
	  }
	};

	var libs = exports.libs = {
	  get call() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'call');
	  }
	};

	var types = exports.types = {
	  get CONNECTION_SUCCEED() {
	    return (0, _woronaDeps.dep)('connection', 'types', 'CONNECTION_SUCCEED');
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))("3dc67d31d7435ab49745de8e10359378");

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var SUBSCRIPTION_STARTED = exports.SUBSCRIPTION_STARTED = 'subscriptions/SUBSCRIPTION_STARTED';
	var SUBSCRIPTION_MODIFIED = exports.SUBSCRIPTION_MODIFIED = 'subscriptions/SUBSCRIPTION_MODIFIED';
	var SUBSCRIPTION_READY = exports.SUBSCRIPTION_READY = 'subscriptions/SUBSCRIPTION_READY';
	var SUBSCRIPTION_FAILED = exports.SUBSCRIPTION_FAILED = 'subscriptions/SUBSCRIPTION_FAILED';
	var SUBSCRIPTION_STOPPED = exports.SUBSCRIPTION_STOPPED = 'subscriptions/SUBSCRIPTION_STOPPED';
	// getCatIndex types:
	var GOTTEN_CATEGORIES_INDEX = exports.GOTTEN_CATEGORIES_INDEX = 'settings/GOTTEN_CATEGORIES_INDEX';
	var MISSING_CATEGORIES_INDEX = exports.MISSING_CATEGORIES_INDEX = 'settings/MISSING_CATEGORIES_INDEX';

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = settingsagas;

	var _effects = __webpack_require__(8);

	var _dependencies = __webpack_require__(4);

	var deps = _interopRequireWildcard(_dependencies);

	var _getCategories = __webpack_require__(9);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [settingsagas].map(regeneratorRuntime.mark);

	function settingsagas() {
	  return regeneratorRuntime.wrap(function settingsagas$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return [(0, _effects.fork)(_getCategories.getCategories), (0, _effects.fork)(deps.sagaCreators.subscriptionWatcherCreator('settings'))];

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

	module.exports = (__webpack_require__(3))("9538dc1f1f3ffc7eff656785a3b0e00e");

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCategories = getCategories;

	var _effects = __webpack_require__(8);

	var _actions = __webpack_require__(10);

	var actions = _interopRequireWildcard(_actions);

	var _libs = __webpack_require__(11);

	var libs = _interopRequireWildcard(_libs);

	var _dependencies = __webpack_require__(4);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [getCategories].map(regeneratorRuntime.mark);

	function getCategories() {
	  var categoryIndex;
	  return regeneratorRuntime.wrap(function getCategories$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.prev = 0;
	          _context.next = 3;
	          return (0, _effects.take)(deps.types.CONNECTION_SUCCEED);

	        case 3:
	          _context.next = 5;
	          return (0, _effects.call)(libs.getCatIndex);

	        case 5:
	          categoryIndex = _context.sent;
	          _context.next = 8;
	          return (0, _effects.put)(actions.getCatIndexSucceed(categoryIndex));

	        case 8:
	          _context.next = 14;
	          break;

	        case 10:
	          _context.prev = 10;
	          _context.t0 = _context['catch'](0);
	          _context.next = 14;
	          return (0, _effects.put)(actions.getCatIndexFailed(_context.t0));

	        case 14:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this, [[0, 10]]);
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCatIndexFailed = exports.getCatIndexSucceed = undefined;

	var _types = __webpack_require__(6);

	var types = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	// getCatIndex actions:
	var getCatIndexSucceed = exports.getCatIndexSucceed = function getCatIndexSucceed(categoryIndex) {
	  return { type: types.GOTTEN_CATEGORIES_INDEX, categoryIndex: categoryIndex };
	};
	var getCatIndexFailed = exports.getCatIndexFailed = function getCatIndexFailed(error) {
	  return { type: types.MISSING_CATEGORIES_INDEX, error: error };
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getCatIndex = undefined;

	var _dependencies = __webpack_require__(4);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var getCatIndex = exports.getCatIndex = function getCatIndex() {
	  var api = arguments.length <= 0 || arguments[0] === undefined ? deps.libs.call : arguments[0];
	  return api('getCatIndex');
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getSiteSettingsByCategory = exports.getSiteSettings = exports.getCategories = exports.getAllSettings = undefined;

	var _reselect = __webpack_require__(13);

	var getAllSettings = exports.getAllSettings = function getAllSettings(state) {
	  return state.settings.collection;
	};
	var getCategories = exports.getCategories = function getCategories(state) {
	  return state.settings.categories;
	};
	var getSiteSettings = exports.getSiteSettings = function getSiteSettings(id) {
	  return (0, _reselect.createSelector)(getAllSettings, function (settings) {
	    return settings.filter(function (setting) {
	      return setting.siteId === id;
	    });
	  });
	};
	var getSiteSettingsByCategory = exports.getSiteSettingsByCategory = function getSiteSettingsByCategory(id) {
	  return (0, _reselect.createSelector)(getCategories, getSiteSettings(id), function (categories, settings) {
	    return categories.map(function (_ref) {
	      var name = _ref.name;
	      return {
	        name: name,
	        entries: settings.filter(function (entry) {
	          return entry.categoryName === name;
	        })
	      };
	    });
	  });
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(3))("febe5374b4779e3d8170ecd4f4641bf2");

/***/ }
/******/ ]);