webpackJsonp([7],{

/***/ 454:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.sagaCreators = exports.reducerCreators = exports.types = exports.actions = undefined;

	var _actions = __webpack_require__(455);

	var actions = _interopRequireWildcard(_actions);

	var _types = __webpack_require__(456);

	var types = _interopRequireWildcard(_types);

	var _reducerCreators = __webpack_require__(457);

	var reducerCreators = _interopRequireWildcard(_reducerCreators);

	var _sagaCreators = __webpack_require__(458);

	var sagaCreators = _interopRequireWildcard(_sagaCreators);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.actions = actions;
	exports.types = types;
	exports.reducerCreators = reducerCreators;
	exports.sagaCreators = sagaCreators;

/***/ },

/***/ 455:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.subscriptionStopped = exports.subscriptionFailed = exports.subscriptionReady = exports.subscriptionModified = exports.subscriptionStarted = undefined;

	var _types = __webpack_require__(456);

	var types = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var subscriptionStarted = exports.subscriptionStarted = function subscriptionStarted(collection) {
	  return { type: types.SUBSCRIPTION_STARTED, collection: collection };
	};

	var subscriptionModified = exports.subscriptionModified = function subscriptionModified(_ref) {
	  var collection = _ref.collection;
	  var event = _ref.event;
	  var id = _ref.id;
	  var fields = _ref.fields;
	  return { type: types.SUBSCRIPTION_MODIFIED, collection: collection, event: event, id: id, fields: fields };
	};

	var subscriptionReady = exports.subscriptionReady = function subscriptionReady(collection) {
	  return { type: types.SUBSCRIPTION_READY, collection: collection };
	};

	var subscriptionFailed = exports.subscriptionFailed = function subscriptionFailed(collection, error) {
	  return { type: types.SUBSCRIPTION_FAILED, collection: collection, error: error };
	};

	var subscriptionStopped = exports.subscriptionStopped = function subscriptionStopped(collection) {
	  return { type: types.SUBSCRIPTION_STOPPED, collection: collection };
	};

/***/ },

/***/ 456:
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

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isReadyCreator = exports.collectionCreator = undefined;

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _findIndex = __webpack_require__(23);

	var _findIndex2 = _interopRequireDefault(_findIndex);

	var _types = __webpack_require__(456);

	var types = _interopRequireWildcard(_types);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var newItem = function newItem(id, fields) {
	  return Object.assign({}, { id: id }, fields);
	};
	var changeItem = function changeItem(oldFields, newFields) {
	  return Object.assign({}, oldFields, newFields);
	};

	var collectionCreator = exports.collectionCreator = function collectionCreator(collection) {
	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	    var action = arguments[1];

	    if (action.type === types.SUBSCRIPTION_MODIFIED && action.collection === collection) {
	      var _ret = function () {
	        var id = action.id;
	        var fields = action.fields;

	        switch (action.event) {
	          case 'added':
	            {
	              var _ret2 = function () {
	                var index = (0, _findIndex2.default)(state, { id: id });
	                if (index === -1) return {
	                    v: {
	                      v: [].concat(_toConsumableArray(state), [newItem(id, fields)])
	                    }
	                  };
	                return {
	                  v: {
	                    v: state.map(function (item, i) {
	                      return i === index ? newItem(id, fields) : item;
	                    })
	                  }
	                };
	              }();

	              if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
	            }
	          case 'changed':
	            return {
	              v: state.map(function (item) {
	                return item.id === id ? changeItem(item, fields) : item;
	              })
	            };
	          case 'removed':
	            return {
	              v: state.filter(function (item) {
	                return item.id !== id;
	              })
	            };
	          default:
	            return {
	              v: state
	            };
	        }
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    }
	    return state;
	  };
	};

	var isReadyCreator = exports.isReadyCreator = function isReadyCreator(collection) {
	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	    var action = arguments[1];

	    if (action.collection === collection) {
	      switch (action.type) {
	        case types.SUBSCRIPTION_READY:
	          return true;
	        case types.SUBSCRIPTION_STOPPED:
	          return false;
	        default:
	          return state;
	      }
	    }
	    return state;
	  };
	};

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.subscriptionEvents = subscriptionEvents;
	exports.subscriptionWatcherCreator = subscriptionWatcherCreator;

	var _effects = __webpack_require__(90);

	var _actions = __webpack_require__(455);

	var actions = _interopRequireWildcard(_actions);

	var _dependencies = __webpack_require__(459);

	var deps = _interopRequireWildcard(_dependencies);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var _marked = [subscriptionEvents].map(regeneratorRuntime.mark); /* eslint-disable no-constant-condition */


	function subscriptionEvents(channel, action) {
	  var result;
	  return regeneratorRuntime.wrap(function subscriptionEvents$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          if (false) {
	            _context.next = 8;
	            break;
	          }

	          _context.next = 3;
	          return (0, _effects.take)(channel);

	        case 3:
	          result = _context.sent;
	          _context.next = 6;
	          return (0, _effects.put)(action(result));

	        case 6:
	          _context.next = 0;
	          break;

	        case 8:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this);
	}

	function subscriptionWatcherCreator(selectedCollection) {
	  for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    params[_key - 1] = arguments[_key];
	  }

	  return regeneratorRuntime.mark(function subscriptionWatcher() {
	    var subsChannel, subscription, readyChannel, errorChannel, subsSaga, readySaga, failedSaga;
	    return regeneratorRuntime.wrap(function subscriptionWatcher$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _effects.call)(deps.libs.collectionEventChannel, selectedCollection);

	          case 2:
	            subsChannel = _context2.sent;

	          case 3:
	            if (false) {
	              _context2.next = 37;
	              break;
	            }

	            _context2.next = 6;
	            return (0, _effects.take)(deps.types.LOGIN_SUCCEED);

	          case 6:
	            _context2.next = 8;
	            return (0, _effects.put)(actions.subscriptionStarted());

	          case 8:
	            _context2.next = 10;
	            return _effects.call.apply(undefined, [deps.libs.subscribe, selectedCollection].concat(params));

	          case 10:
	            subscription = _context2.sent;
	            _context2.next = 13;
	            return (0, _effects.call)(deps.libs.readyEventChannel, subscription);

	          case 13:
	            readyChannel = _context2.sent;
	            _context2.next = 16;
	            return (0, _effects.call)(deps.libs.errorEventChannel, subscription);

	          case 16:
	            errorChannel = _context2.sent;
	            _context2.next = 19;
	            return (0, _effects.fork)(subscriptionEvents, subsChannel, actions.subscriptionModified);

	          case 19:
	            subsSaga = _context2.sent;
	            _context2.next = 22;
	            return (0, _effects.fork)(subscriptionEvents, readyChannel, actions.subscriptionReady);

	          case 22:
	            readySaga = _context2.sent;
	            _context2.next = 25;
	            return (0, _effects.fork)(subscriptionEvents, errorChannel, actions.subscriptionFailed);

	          case 25:
	            failedSaga = _context2.sent;
	            _context2.next = 28;
	            return (0, _effects.take)(deps.types.LOGOUT_SUCCEED);

	          case 28:
	            subsSaga.cancel();
	            readySaga.cancel();
	            failedSaga.cancel();
	            _context2.next = 33;
	            return (0, _effects.call)(deps.libs.unsubscribe, subscription.id);

	          case 33:
	            _context2.next = 35;
	            return (0, _effects.put)(actions.subscriptionStopped());

	          case 35:
	            _context2.next = 3;
	            break;

	          case 37:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, subscriptionWatcher, this);
	  });
	}

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.types = exports.libs = undefined;

	var _woronaDeps = __webpack_require__(63);

	var libs = exports.libs = {
	  get collectionEventChannel() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'collectionEventChannel');
	  },
	  get subscribe() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'subscribe');
	  },
	  get unsubscribe() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'unsubscribe');
	  },
	  get readyEventChannel() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'readyEventChannel');
	  },
	  get errorEventChannel() {
	    return (0, _woronaDeps.dep)('connection', 'libs', 'errorEventChannel');
	  }
	};

	var types = exports.types = {
	  get LOGIN_SUCCEED() {
	    return (0, _woronaDeps.dep)('accounts', 'types', 'LOGIN_SUCCEED');
	  },
	  get LOGOUT_SUCCEED() {
	    return (0, _woronaDeps.dep)('accounts', 'types', 'LOGOUT_SUCCEED');
	  }
	};

/***/ }

});