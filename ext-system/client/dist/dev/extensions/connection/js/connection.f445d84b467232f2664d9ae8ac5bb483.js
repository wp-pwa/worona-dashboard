webpackJsonp([2],{

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.selectors = exports.actiontypes = exports.actions = undefined;

	var _actions = __webpack_require__(179);

	var actions = _interopRequireWildcard(_actions);

	var _actiontypes = __webpack_require__(180);

	var actiontypes = _interopRequireWildcard(_actiontypes);

	var _selectors = __webpack_require__(181);

	var selectors = _interopRequireWildcard(_selectors);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	exports.actions = actions;
	exports.actiontypes = actiontypes;
	exports.selectors = selectors;

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.disconnected = exports.connectionFailed = exports.connectionSucceed = exports.connectionRequested = exports.connectionStarted = undefined;

	var _actiontypes = __webpack_require__(180);

	var t = _interopRequireWildcard(_actiontypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var connectionStarted = exports.connectionStarted = function connectionStarted() {
	  return { type: t.CONNECTION_STARTED };
	};
	var connectionRequested = exports.connectionRequested = function connectionRequested() {
	  return { type: t.CONNECTION_REQUESTED };
	};
	var connectionSucceed = exports.connectionSucceed = function connectionSucceed() {
	  return { type: t.CONNECTION_SUCCEED };
	};
	var connectionFailed = exports.connectionFailed = function connectionFailed(error) {
	  return { type: t.CONNECTION_FAILED, error: error };
	};
	var disconnected = exports.disconnected = function disconnected(error) {
	  return { type: t.DISCONNECTED, error: error };
	};

/***/ },

/***/ 180:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CONNECTION_STARTED = exports.CONNECTION_STARTED = 'connection/CONNECTION_STARTED';
	var CONNECTION_REQUESTED = exports.CONNECTION_REQUESTED = 'connection/CONNECTION_REQUESTED';
	var CONNECTION_SUCCEED = exports.CONNECTION_SUCCEED = 'connection/CONNECTION_SUCCEED';
	var CONNECTION_FAILED = exports.CONNECTION_FAILED = 'connection/CONNECTION_FAILED';
	var DISCONNECTED = exports.DISCONNECTED = 'connection/DISCONNECTED';

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _lodash = __webpack_require__(182);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _reducers = __webpack_require__(183);

	var reducers = _interopRequireWildcard(_reducers);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _lodash2.default)(reducers).omit('default').keys().forEach(function (reducer) {
	  module.exports[reducer] = function (state) {
	    return state.connection[reducer];
	  };
	});

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(336);

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isConnecting = exports.isConnected = undefined;

	var _redux = __webpack_require__(158);

	var _actiontypes = __webpack_require__(180);

	var t = _interopRequireWildcard(_actiontypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var isConnected = exports.isConnected = function isConnected() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case t.CONNECTION_SUCCEED:
	      return true;
	    case t.DISCONNECTED:
	      return false;
	    default:
	      return state;
	  }
	};

	var isConnecting = exports.isConnecting = function isConnecting() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case t.CONNECTION_REQUESTED:
	      return true;
	    case t.CONNECTION_SUCCEED:
	    case t.CONNECTION_FAILED:
	      return false;
	    default:
	      return state;
	  }
	};

	exports.default = (0, _redux.combineReducers)({
	  isConnected: isConnected,
	  isConnecting: isConnecting
	});

/***/ }

});