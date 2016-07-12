webpackJsonp([6],{

/***/ 442:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sagas = exports.selectors = exports.reducers = exports.types = exports.actions = undefined;

	var _actions = __webpack_require__(443);

	var actions = _interopRequireWildcard(_actions);

	var _types = __webpack_require__(444);

	var types = _interopRequireWildcard(_types);

	var _reducers = __webpack_require__(445);

	var reducers = _interopRequireWildcard(_reducers);

	var _selectors = __webpack_require__(448);

	var selectors = _interopRequireWildcard(_selectors);

	var _sagas = __webpack_require__(449);

	var sagas = _interopRequireWildcard(_sagas);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.actions = actions;
	exports.types = types;
	exports.reducers = reducers;
	exports.selectors = selectors;
	exports.sagas = sagas;

/***/ },

/***/ 443:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createSiteFailed = exports.createSiteSucceed = exports.createSiteStatusChanged = exports.createSiteRequested = undefined;

	var _types = __webpack_require__(444);

	var types = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var createSiteRequested = exports.createSiteRequested = function createSiteRequested(name, url, _id) {
	  return { type: types.CREATE_SITE_REQUESTED, name: name, url: url, _id: _id };
	};
	var createSiteStatusChanged = exports.createSiteStatusChanged = function createSiteStatusChanged(status) {
	  return { type: types.CREATE_SITE_STATUS_CHANGED, status: status };
	};
	var createSiteSucceed = exports.createSiteSucceed = function createSiteSucceed(siteId) {
	  return { type: types.CREATE_SITE_SUCCEED, siteId: siteId };
	};
	var createSiteFailed = exports.createSiteFailed = function createSiteFailed(error) {
	  return { type: types.CREATE_SITE_FAILED, error: error };
	};

/***/ },

/***/ 444:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CREATE_SITE_REQUESTED = exports.CREATE_SITE_REQUESTED = 'sites/CREATE_SITE_REQUESTED';
	var CREATE_SITE_STATUS_CHANGED = exports.CREATE_SITE_STATUS_CHANGED = 'sites/CREATE_SITE_STATUS_CHANGED';
	var CREATE_SITE_SUCCEED = exports.CREATE_SITE_SUCCEED = 'sites/CREATE_SITE_SUCCEED';
	var CREATE_SITE_FAILED = exports.CREATE_SITE_FAILED = 'sites/CREATE_SITE_FAILED';

/***/ },

/***/ 445:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createSiteError = exports.createSiteStatus = exports.isCreatingSite = undefined;

	var _redux = __webpack_require__(81);

	var _types = __webpack_require__(444);

	var types = _interopRequireWildcard(_types);

	var _errors = __webpack_require__(446);

	var _dependencies = __webpack_require__(447);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var isCreatingSite = exports.isCreatingSite = function isCreatingSite() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.CREATE_SITE_REQUESTED:
	      return true;
	    case types.CREATE_SITE_SUCCEED:
	    case types.CREATE_SITE_FAILED:
	      return false;
	    default:
	      return state;
	  }
	};

	var createSiteStatus = exports.createSiteStatus = function createSiteStatus() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case types.CREATE_SITE_STATUS_CHANGED:
	      return action.status;
	    case types.CREATE_SITE_SUCCEED:
	    case types.CREATE_SITE_FAILED:
	      return false;
	    default:
	      return state;
	  }
	};

	var createSiteError = exports.createSiteError = function createSiteError() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];
	  var error = action.error;

	  switch (action.type) {
	    case types.CREATE_SITE_FAILED:
	      if (error.error === _errors.METEOR_USER_NOT_LOGGED_IN) {
	        error.reason = _errors.YOU_ARE_NOT_LOGGED_IN;
	      }
	      return error;
	    case types.CREATE_SITE_REQUESTED:
	    case types.CREATE_SITE_SUCCEED:
	      return false;
	    default:
	      return state;
	  }
	};

	exports.default = function () {
	  return (0, _redux.combineReducers)({
	    isCreatingSite: isCreatingSite,
	    createSiteStatus: createSiteStatus,
	    createSiteError: createSiteError,
	    collection: deps.reducerCreators.collectionCreator('sites'),
	    isReady: deps.reducerCreators.isReadyCreator('sites')
	  });
	};

/***/ },

/***/ 446:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var METEOR_USER_NOT_LOGGED_IN = exports.METEOR_USER_NOT_LOGGED_IN = 'User is not logged in.';
	var YOU_ARE_NOT_LOGGED_IN = exports.YOU_ARE_NOT_LOGGED_IN = 'You are not logged in.';

/***/ },

/***/ 447:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sagaCreators = exports.reducerCreators = exports.libs = undefined;

	var _woronaDeps = __webpack_require__(63);

	var libs = exports.libs = {
	  get call() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'call');
	  },
	  get subscription() {
	    return (0, _woronaDeps.dep)('subscriptions', 'libs', 'subscription');
	  },
	  get push() {
	    return (0, _woronaDeps.dep)('build', 'libs', 'push');
	  }
	};

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

/***/ },

/***/ 448:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isCreatingSite = exports.isCreatingSite = function isCreatingSite(state) {
	  return state.sites.isCreatingSite;
	};
	var createSiteStatus = exports.createSiteStatus = function createSiteStatus(state) {
	  return state.sites.createSiteStatus;
	};
	var createSiteError = exports.createSiteError = function createSiteError(state) {
	  return state.sites.createSiteError;
	};

/***/ },

/***/ 449:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = _callee;

	var _effects = __webpack_require__(90);

	var _createSite = __webpack_require__(450);

	var _dependencies = __webpack_require__(447);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [_callee].map(regeneratorRuntime.mark);

	function _callee() {
	  return regeneratorRuntime.wrap(function _callee$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return [(0, _effects.fork)(_createSite.createSiteWatcher), (0, _effects.fork)(deps.sagaCreators.subscriptionWatcherCreator('sites'))];

	        case 2:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this);
	}

/***/ },

/***/ 450:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createSiteSaga = createSiteSaga;
	exports.createSiteWatcher = createSiteWatcher;

	var _reduxSaga = __webpack_require__(88);

	var _effects = __webpack_require__(90);

	var _messages = __webpack_require__(451);

	var _actions = __webpack_require__(443);

	var actions = _interopRequireWildcard(_actions);

	var _libs = __webpack_require__(452);

	var libs = _interopRequireWildcard(_libs);

	var _types = __webpack_require__(444);

	var types = _interopRequireWildcard(_types);

	var _dependencies = __webpack_require__(447);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [createSiteSaga, createSiteWatcher].map(regeneratorRuntime.mark);

	function createSiteSaga(action) {
	  var name, url, _id, siteId;

	  return regeneratorRuntime.wrap(function createSiteSaga$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          name = action.name;
	          url = action.url;
	          _id = action._id;
	          _context.prev = 3;
	          _context.next = 6;
	          return (0, _effects.put)(actions.createSiteStatusChanged(_messages.CREATING_SITE));

	        case 6:
	          _context.next = 8;
	          return (0, _effects.call)(libs.createSite, { name: name, url: url, _id: _id });

	        case 8:
	          siteId = _context.sent;
	          _context.next = 11;
	          return (0, _effects.put)(actions.createSiteSucceed(siteId));

	        case 11:
	          _context.next = 13;
	          return (0, _effects.call)(deps.libs.push, '/');

	        case 13:
	          _context.next = 19;
	          break;

	        case 15:
	          _context.prev = 15;
	          _context.t0 = _context['catch'](3);
	          _context.next = 19;
	          return (0, _effects.put)(actions.createSiteFailed(_context.t0));

	        case 19:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this, [[3, 15]]);
	}

	function createSiteWatcher() {
	  return regeneratorRuntime.wrap(function createSiteWatcher$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          return _context2.delegateYield((0, _reduxSaga.takeEvery)(types.CREATE_SITE_REQUESTED, createSiteSaga), 't0', 1);

	        case 1:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _marked[1], this);
	}

/***/ },

/***/ 451:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CREATING_SITE = exports.CREATING_SITE = 'Creating your app. Please wait...';

/***/ },

/***/ 452:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createSite = undefined;

	var _dependencies = __webpack_require__(447);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var createSite = exports.createSite = function createSite(_ref) {
	  var name = _ref.name;
	  var url = _ref.url;
	  var _id = _ref._id;
	  var _ref$caller = _ref.caller;
	  var caller = _ref$caller === undefined ? deps.libs.call : _ref$caller;
	  return caller('createSite', { name: name, url: url, _id: _id });
	};

/***/ }

});