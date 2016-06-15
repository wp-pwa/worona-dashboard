/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}

/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "1c1472a98ba1af80c21bb1c500676f43"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + ({"1":"extensions/accounts/js/accounts","2":"extensions/connection/js/connection","3":"themes/bulma/js/bulma"}[chunkId]||chunkId) + "." + {"1":"773cc57dab38cd118d1b3e576bb4a6a5","2":"f445d84b467232f2664d9ae8ac5bb483","3":"d786eeb495631726186c70e4b73ec244"}[chunkId] + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };

/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(3);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	/*globals window __webpack_hash__ */
	if(true) {
		var lastData;
		var upToDate = function upToDate() {
			return lastData.indexOf(__webpack_require__.h()) >= 0;
		};
		var check = function check() {
			module.hot.check(true, function(err, updatedModules) {
				if(err) {
					if(module.hot.status() in {
							abort: 1,
							fail: 1
						}) {
						console.warn("[HMR] Cannot apply update. Need to do a full reload!");
						console.warn("[HMR] " + err.stack || err.message);
						window.location.reload();
					} else {
						console.warn("[HMR] Update failed: " + err.stack || err.message);
					}
					return;
				}

				if(!updatedModules) {
					console.warn("[HMR] Cannot find update. Need to do a full reload!");
					console.warn("[HMR] (Probably because of restarting the webpack-dev-server)");
					window.location.reload();
					return;
				}

				if(!upToDate()) {
					check();
				}

				__webpack_require__(2)(updatedModules, updatedModules);

				if(upToDate()) {
					console.log("[HMR] App is up to date.");
				}

			});
		};
		var addEventListener = window.addEventListener ? function(eventName, listener) {
			window.addEventListener(eventName, listener, false);
		} : function(eventName, listener) {
			window.attachEvent("on" + eventName, listener);
		};
		addEventListener("message", function(event) {
			if(typeof event.data === "string" && event.data.indexOf("webpackHotUpdate") === 0) {
				lastData = event.data;
				if(!upToDate() && module.hot.status() === "idle") {
					console.log("[HMR] Checking for updates on the server...");
					check();
				}
			}
		});
		console.log("[HMR] Waiting for update signal from WDS...");
	} else {
		throw new Error("[HMR] Hot Module Replacement is disabled.");
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(updatedModules, renewedModules) {
		var unacceptedModules = updatedModules.filter(function(moduleId) {
			return renewedModules && renewedModules.indexOf(moduleId) < 0;
		});

		if(unacceptedModules.length > 0) {
			console.warn("[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
			unacceptedModules.forEach(function(moduleId) {
				console.warn("[HMR]  - " + moduleId);
			});
		}

		if(!renewedModules || renewedModules.length === 0) {
			console.log("[HMR] Nothing hot updated.");
		} else {
			console.log("[HMR] Updated modules:");
			renewedModules.forEach(function(moduleId) {
				console.log("[HMR]  - " + moduleId);
			});
		}
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {'use strict';

	var _index = __webpack_require__(6);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(13);

	var _index4 = _interopRequireDefault(_index3);

	var _react2 = __webpack_require__(7);

	var _react3 = _interopRequireDefault(_react2);

	var _index5 = __webpack_require__(14);

	var _index6 = _interopRequireDefault(_index5);

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(149);

	var _reactDom = __webpack_require__(150);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRedux = __webpack_require__(151);

	var _reactI18next = __webpack_require__(152);

	var _store = __webpack_require__(157);

	var _store2 = _interopRequireDefault(_store);

	var _i18n = __webpack_require__(187);

	var _i18n2 = _interopRequireDefault(_i18n);

	var _fastclick = __webpack_require__(207);

	var _fastclick2 = _interopRequireDefault(_fastclick);

	var _Loading = __webpack_require__(208);

	var _Loading2 = _interopRequireDefault(_Loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _components = {
	  Dashboard: {
	    displayName: 'Dashboard'
	  }
	};

	var _UsersLuisherranzCodeWoronaExtSystemClientNode_modulesReactTransformHmrLibIndexJs2 = (0, _index6.default)({
	  filename: '/Users/luisherranz/code/worona/ext-system/client/src/index.js',
	  components: _components,
	  locals: [module],
	  imports: [_react3.default]
	});

	var _UsersLuisherranzCodeWoronaExtSystemClientNode_modulesReactTransformCatchErrorsLibIndexJs2 = (0, _index4.default)({
	  filename: '/Users/luisherranz/code/worona/ext-system/client/src/index.js',
	  components: _components,
	  locals: [],
	  imports: [_react3.default, _index2.default]
	});

	function _wrapComponent(id) {
	  return function (Component) {
	    return _UsersLuisherranzCodeWoronaExtSystemClientNode_modulesReactTransformHmrLibIndexJs2(_UsersLuisherranzCodeWoronaExtSystemClientNode_modulesReactTransformCatchErrorsLibIndexJs2(Component, id), id);
	  };
	} /* eslint-disable react/prefer-stateless-function */

	// import { syncHistoryWithStore } from 'react-router-redux';

	// import { Router, browserHistory } from 'react-router';

	// import routes from './themes/base/routes';


	// const history = syncHistoryWithStore(browserHistory, store);

	var Dashboard = _wrapComponent('Dashboard')(function (_React$Component) {
	  _inherits(Dashboard, _React$Component);

	  function Dashboard() {
	    _classCallCheck(this, Dashboard);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Dashboard).apply(this, arguments));
	  }

	  _createClass(Dashboard, [{
	    key: 'render',
	    value: function render() {
	      return _react3.default.createElement(
	        _reactI18next.I18nextProvider,
	        { i18n: _i18n2.default },
	        _react3.default.createElement(
	          _reactRedux.Provider,
	          { store: _store2.default },
	          _react3.default.createElement(_Loading2.default, null)
	        )
	      );
	    }
	  }]);

	  return Dashboard;
	}(_react3.default.Component));

	if ('ontouchstart' in window) {
	  window.addEventListener('load', function () {
	    return _fastclick2.default.attach(document.body);
	  });
	}

	_reactDom2.default.render(_react3.default.createElement(Dashboard, null), document.getElementById('root'));
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(337);

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = vendors_dashboard_worona;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _styleJs = __webpack_require__(8);

	var _styleJs2 = _interopRequireDefault(_styleJs);

	var _errorStackParser = __webpack_require__(9);

	var _errorStackParser2 = _interopRequireDefault(_errorStackParser);

	var _objectAssign = __webpack_require__(11);

	var _objectAssign2 = _interopRequireDefault(_objectAssign);

	var _lib = __webpack_require__(12);

	var __$Getters__ = [];
	var __$Setters__ = [];
	var __$Resetters__ = [];

	function __GetDependency__(name) {
	  return __$Getters__[name]();
	}

	function __Rewire__(name, value) {
	  __$Setters__[name](value);
	}

	function __ResetDependency__(name) {
	  __$Resetters__[name]();
	}

	var __RewireAPI__ = {
	  '__GetDependency__': __GetDependency__,
	  '__get__': __GetDependency__,
	  '__Rewire__': __Rewire__,
	  '__set__': __Rewire__,
	  '__ResetDependency__': __ResetDependency__
	};
	var React = _react2['default'];
	var Component = _react.Component;
	var PropTypes = _react.PropTypes;

	__$Getters__['React'] = function () {
	  return React;
	};

	__$Setters__['React'] = function (value) {
	  React = value;
	};

	__$Resetters__['React'] = function () {
	  React = _react2['default'];
	};

	__$Getters__['Component'] = function () {
	  return Component;
	};

	__$Setters__['Component'] = function (value) {
	  Component = value;
	};

	__$Resetters__['Component'] = function () {
	  Component = _react.Component;
	};

	__$Getters__['PropTypes'] = function () {
	  return PropTypes;
	};

	__$Setters__['PropTypes'] = function (value) {
	  PropTypes = value;
	};

	__$Resetters__['PropTypes'] = function () {
	  PropTypes = _react.PropTypes;
	};

	var style = _styleJs2['default'];

	__$Getters__['style'] = function () {
	  return style;
	};

	__$Setters__['style'] = function (value) {
	  style = value;
	};

	__$Resetters__['style'] = function () {
	  style = _styleJs2['default'];
	};

	var ErrorStackParser = _errorStackParser2['default'];

	__$Getters__['ErrorStackParser'] = function () {
	  return ErrorStackParser;
	};

	__$Setters__['ErrorStackParser'] = function (value) {
	  ErrorStackParser = value;
	};

	__$Resetters__['ErrorStackParser'] = function () {
	  ErrorStackParser = _errorStackParser2['default'];
	};

	var assign = _objectAssign2['default'];

	__$Getters__['assign'] = function () {
	  return assign;
	};

	__$Setters__['assign'] = function (value) {
	  assign = value;
	};

	__$Resetters__['assign'] = function () {
	  assign = _objectAssign2['default'];
	};

	var isFilenameAbsolute = _lib.isFilenameAbsolute;
	var makeUrl = _lib.makeUrl;
	var makeLinkText = _lib.makeLinkText;

	__$Getters__['isFilenameAbsolute'] = function () {
	  return isFilenameAbsolute;
	};

	__$Setters__['isFilenameAbsolute'] = function (value) {
	  isFilenameAbsolute = value;
	};

	__$Resetters__['isFilenameAbsolute'] = function () {
	  isFilenameAbsolute = _lib.isFilenameAbsolute;
	};

	__$Getters__['makeUrl'] = function () {
	  return makeUrl;
	};

	__$Setters__['makeUrl'] = function (value) {
	  makeUrl = value;
	};

	__$Resetters__['makeUrl'] = function () {
	  makeUrl = _lib.makeUrl;
	};

	__$Getters__['makeLinkText'] = function () {
	  return makeLinkText;
	};

	__$Setters__['makeLinkText'] = function (value) {
	  makeLinkText = value;
	};

	__$Resetters__['makeLinkText'] = function () {
	  makeLinkText = _lib.makeLinkText;
	};

	var RedBox = (function (_Component) {
	  _inherits(RedBox, _Component);

	  function RedBox() {
	    _classCallCheck(this, RedBox);

	    _Component.apply(this, arguments);
	  }

	  RedBox.prototype.renderFrames = function renderFrames(frames) {
	    var _props = this.props;
	    var filename = _props.filename;
	    var editorScheme = _props.editorScheme;
	    var useLines = _props.useLines;
	    var useColumns = _props.useColumns;

	    var _assign = assign({}, style, this.props.style);

	    var frame = _assign.frame;
	    var file = _assign.file;
	    var linkToFile = _assign.linkToFile;

	    return frames.map(function (f, index) {
	      var text = undefined;
	      var url = undefined;

	      if (index === 0 && filename && !isFilenameAbsolute(f.fileName)) {
	        url = makeUrl(filename, editorScheme);
	        text = makeLinkText(filename);
	      } else {
	        var lines = useLines ? f.lineNumber : null;
	        var columns = useColumns ? f.columnNumber : null;
	        url = makeUrl(f.fileName, editorScheme, lines, columns);
	        text = makeLinkText(f.fileName, lines, columns);
	      }

	      return React.createElement(
	        'div',
	        { style: frame, key: index },
	        React.createElement(
	          'div',
	          null,
	          f.functionName
	        ),
	        React.createElement(
	          'div',
	          { style: file },
	          React.createElement(
	            'a',
	            { href: url, style: linkToFile },
	            text
	          )
	        )
	      );
	    });
	  };

	  RedBox.prototype.render = function render() {
	    var error = this.props.error;

	    var _assign2 = assign({}, style, this.props.style);

	    var redbox = _assign2.redbox;
	    var message = _assign2.message;
	    var stack = _assign2.stack;
	    var frame = _assign2.frame;

	    var frames = undefined;
	    var parseError = undefined;
	    try {
	      frames = ErrorStackParser.parse(error);
	    } catch (e) {
	      parseError = new Error('Failed to parse stack trace. Stack trace information unavailable.');
	    }

	    if (parseError) {
	      frames = React.createElement(
	        'div',
	        { style: frame, key: 0 },
	        React.createElement(
	          'div',
	          null,
	          parseError.message
	        )
	      );
	    } else {
	      frames = this.renderFrames(frames);
	    }

	    return React.createElement(
	      'div',
	      { style: redbox },
	      React.createElement(
	        'div',
	        { style: message },
	        error.name,
	        ': ',
	        error.message
	      ),
	      React.createElement(
	        'div',
	        { style: stack },
	        frames
	      )
	    );
	  };

	  _createClass(RedBox, null, [{
	    key: 'propTypes',
	    value: {
	      error: PropTypes.instanceOf(Error).isRequired,
	      filename: PropTypes.string,
	      editorScheme: PropTypes.string,
	      useLines: PropTypes.bool,
	      useColumns: PropTypes.bool,
	      style: PropTypes.object
	    },
	    enumerable: true
	  }, {
	    key: 'displayName',
	    value: 'RedBox',
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      useLines: true,
	      useColumns: true
	    },
	    enumerable: true
	  }]);

	  return RedBox;
	})(Component);

	var _defaultExport = RedBox;

	if (typeof _defaultExport === 'object' || typeof _defaultExport === 'function') {
	  Object.defineProperty(_defaultExport, '__Rewire__', {
	    'value': __Rewire__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__set__', {
	    'value': __Rewire__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__ResetDependency__', {
	    'value': __ResetDependency__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__GetDependency__', {
	    'value': __GetDependency__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__get__', {
	    'value': __GetDependency__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__RewireAPI__', {
	    'value': __RewireAPI__,
	    'enumberable': false
	  });
	}

	exports['default'] = _defaultExport;
	exports.__GetDependency__ = __GetDependency__;
	exports.__get__ = __GetDependency__;
	exports.__Rewire__ = __Rewire__;
	exports.__set__ = __Rewire__;
	exports.__ResetDependency__ = __ResetDependency__;
	exports.__RewireAPI__ = __RewireAPI__;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(299);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var __$Getters__ = [];
	var __$Setters__ = [];
	var __$Resetters__ = [];

	function __GetDependency__(name) {
	  return __$Getters__[name]();
	}

	function __Rewire__(name, value) {
	  __$Setters__[name](value);
	}

	function __ResetDependency__(name) {
	  __$Resetters__[name]();
	}

	var __RewireAPI__ = {
	  '__GetDependency__': __GetDependency__,
	  '__get__': __GetDependency__,
	  '__Rewire__': __Rewire__,
	  '__set__': __Rewire__,
	  '__ResetDependency__': __ResetDependency__
	};
	var _defaultExport = {
	  redbox: {
	    boxSizing: 'border-box',
	    fontFamily: 'sans-serif',
	    position: 'fixed',
	    padding: 10,
	    top: '0px',
	    left: '0px',
	    bottom: '0px',
	    right: '0px',
	    width: '100%',
	    background: 'rgb(204, 0, 0)',
	    color: 'white',
	    zIndex: 9999,
	    textAlign: 'left',
	    fontSize: '16px',
	    lineHeight: 1.2
	  },
	  message: {
	    fontWeight: 'bold'
	  },
	  stack: {
	    fontFamily: 'monospace',
	    marginTop: '2em'
	  },
	  frame: {
	    marginTop: '1em'
	  },
	  file: {
	    fontSize: '0.8em',
	    color: 'rgba(255, 255, 255, 0.7)'
	  },
	  linkToFile: {
	    textDecoration: 'none',
	    color: 'rgba(255, 255, 255, 0.7)'
	  }
	};

	if (typeof _defaultExport === 'object' || typeof _defaultExport === 'function') {
	  Object.defineProperty(_defaultExport, '__Rewire__', {
	    'value': __Rewire__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__set__', {
	    'value': __Rewire__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__ResetDependency__', {
	    'value': __ResetDependency__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__GetDependency__', {
	    'value': __GetDependency__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__get__', {
	    'value': __GetDependency__,
	    'enumberable': false
	  });
	  Object.defineProperty(_defaultExport, '__RewireAPI__', {
	    'value': __RewireAPI__,
	    'enumberable': false
	  });
	}

	exports['default'] = _defaultExport;
	exports.__GetDependency__ = __GetDependency__;
	exports.__get__ = __GetDependency__;
	exports.__Rewire__ = __Rewire__;
	exports.__set__ = __Rewire__;
	exports.__ResetDependency__ = __ResetDependency__;
	exports.__RewireAPI__ = __RewireAPI__;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function(root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory(require('stackframe'));
	    } else {
	        root.ErrorStackParser = factory(root.StackFrame);
	    }
	}(this, function ErrorStackParser(StackFrame) {
	    'use strict';

	    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
	    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
	    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

	    function _map(array, fn, thisArg) {
	        if (typeof Array.prototype.map === 'function') {
	            return array.map(fn, thisArg);
	        } else {
	            var output = new Array(array.length);
	            for (var i = 0; i < array.length; i++) {
	                output[i] = fn.call(thisArg, array[i]);
	            }
	            return output;
	        }
	    }

	    function _filter(array, fn, thisArg) {
	        if (typeof Array.prototype.filter === 'function') {
	            return array.filter(fn, thisArg);
	        } else {
	            var output = [];
	            for (var i = 0; i < array.length; i++) {
	                if (fn.call(thisArg, array[i])) {
	                    output.push(array[i]);
	                }
	            }
	            return output;
	        }
	    }

	    function _indexOf(array, target) {
	        if (typeof Array.prototype.indexOf === 'function') {
	            return array.indexOf(target);
	        } else {
	            for (var i = 0; i < array.length; i++) {
	                if (array[i] === target) {
	                    return i;
	                }
	            }
	            return -1;
	        }
	    }

	    return {
	        /**
	         * Given an Error object, extract the most information from it.
	         *
	         * @param {Error} error object
	         * @return {Array} of StackFrames
	         */
	        parse: function ErrorStackParser$$parse(error) {
	            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
	                return this.parseOpera(error);
	            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
	                return this.parseV8OrIE(error);
	            } else if (error.stack) {
	                return this.parseFFOrSafari(error);
	            } else {
	                throw new Error('Cannot parse given Error object');
	            }
	        },

	        // Separate line and column numbers from a string of the form: (URI:Line:Column)
	        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
	            // Fail-fast but return locations like "(native)"
	            if (urlLike.indexOf(':') === -1) {
	                return [urlLike];
	            }

	            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
	            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
	            return [parts[1], parts[2] || undefined, parts[3] || undefined];
	        },

	        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !!line.match(CHROME_IE_STACK_REGEXP);
	            }, this);

	            return _map(filtered, function(line) {
	                if (line.indexOf('(eval ') > -1) {
	                    // Throw away eval information until we implement stacktrace.js/stackframe#8
	                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
	                }
	                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionName = tokens.join(' ') || undefined;
	                var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];

	                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
	            }, this);
	        },

	        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
	            }, this);

	            return _map(filtered, function(line) {
	                // Throw away eval information until we implement stacktrace.js/stackframe#8
	                if (line.indexOf(' > eval') > -1) {
	                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
	                }

	                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
	                    // Safari eval frames only have function names and nothing else
	                    return new StackFrame(line);
	                } else {
	                    var tokens = line.split('@');
	                    var locationParts = this.extractLocation(tokens.pop());
	                    var functionName = tokens.join('@') || undefined;
	                    return new StackFrame(functionName,
	                        undefined,
	                        locationParts[0],
	                        locationParts[1],
	                        locationParts[2],
	                        line);
	                }
	            }, this);
	        },

	        parseOpera: function ErrorStackParser$$parseOpera(e) {
	            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
	                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
	                return this.parseOpera9(e);
	            } else if (!e.stack) {
	                return this.parseOpera10(e);
	            } else {
	                return this.parseOpera11(e);
	            }
	        },

	        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
	            var lines = e.message.split('\n');
	            var result = [];

	            for (var i = 2, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
	                }
	            }

	            return result;
	        },

	        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
	            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
	            var lines = e.stacktrace.split('\n');
	            var result = [];

	            for (var i = 0, len = lines.length; i < len; i += 2) {
	                var match = lineRE.exec(lines[i]);
	                if (match) {
	                    result.push(
	                        new StackFrame(
	                            match[3] || undefined,
	                            undefined,
	                            match[2],
	                            match[1],
	                            undefined,
	                            lines[i]
	                        )
	                    );
	                }
	            }

	            return result;
	        },

	        // Opera 10.65+ Error.stack very similar to FF/Safari
	        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
	            var filtered = _filter(error.stack.split('\n'), function(line) {
	                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
	            }, this);

	            return _map(filtered, function(line) {
	                var tokens = line.split('@');
	                var locationParts = this.extractLocation(tokens.pop());
	                var functionCall = (tokens.shift() || '');
	                var functionName = functionCall
	                        .replace(/<anonymous function(: (\w+))?>/, '$2')
	                        .replace(/\([^\)]*\)/g, '') || undefined;
	                var argsRaw;
	                if (functionCall.match(/\(([^\)]*)\)/)) {
	                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
	                }
	                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
	                    undefined : argsRaw.split(',');
	                return new StackFrame(
	                    functionName,
	                    args,
	                    locationParts[0],
	                    locationParts[1],
	                    locationParts[2],
	                    line);
	            }, this);
	        }
	    };
	}));



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
	    'use strict';
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports === 'object') {
	        module.exports = factory();
	    } else {
	        root.StackFrame = factory();
	    }
	}(this, function () {
	    'use strict';
	    function _isNumber(n) {
	        return !isNaN(parseFloat(n)) && isFinite(n);
	    }

	    function StackFrame(functionName, args, fileName, lineNumber, columnNumber, source) {
	        if (functionName !== undefined) {
	            this.setFunctionName(functionName);
	        }
	        if (args !== undefined) {
	            this.setArgs(args);
	        }
	        if (fileName !== undefined) {
	            this.setFileName(fileName);
	        }
	        if (lineNumber !== undefined) {
	            this.setLineNumber(lineNumber);
	        }
	        if (columnNumber !== undefined) {
	            this.setColumnNumber(columnNumber);
	        }
	        if (source !== undefined) {
	            this.setSource(source);
	        }
	    }

	    StackFrame.prototype = {
	        getFunctionName: function () {
	            return this.functionName;
	        },
	        setFunctionName: function (v) {
	            this.functionName = String(v);
	        },

	        getArgs: function () {
	            return this.args;
	        },
	        setArgs: function (v) {
	            if (Object.prototype.toString.call(v) !== '[object Array]') {
	                throw new TypeError('Args must be an Array');
	            }
	            this.args = v;
	        },

	        // NOTE: Property name may be misleading as it includes the path,
	        // but it somewhat mirrors V8's JavaScriptStackTraceApi
	        // https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi and Gecko's
	        // http://mxr.mozilla.org/mozilla-central/source/xpcom/base/nsIException.idl#14
	        getFileName: function () {
	            return this.fileName;
	        },
	        setFileName: function (v) {
	            this.fileName = String(v);
	        },

	        getLineNumber: function () {
	            return this.lineNumber;
	        },
	        setLineNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Line Number must be a Number');
	            }
	            this.lineNumber = Number(v);
	        },

	        getColumnNumber: function () {
	            return this.columnNumber;
	        },
	        setColumnNumber: function (v) {
	            if (!_isNumber(v)) {
	                throw new TypeError('Column Number must be a Number');
	            }
	            this.columnNumber = Number(v);
	        },

	        getSource: function () {
	            return this.source;
	        },
	        setSource: function (v) {
	            this.source = String(v);
	        },

	        toString: function() {
	            var functionName = this.getFunctionName() || '{anonymous}';
	            var args = '(' + (this.getArgs() || []).join(',') + ')';
	            var fileName = this.getFileName() ? ('@' + this.getFileName()) : '';
	            var lineNumber = _isNumber(this.getLineNumber()) ? (':' + this.getLineNumber()) : '';
	            var columnNumber = _isNumber(this.getColumnNumber()) ? (':' + this.getColumnNumber()) : '';
	            return functionName + args + fileName + lineNumber + columnNumber;
	        }
	    };

	    return StackFrame;
	}));


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(301);

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var __$Getters__ = [];
	var __$Setters__ = [];
	var __$Resetters__ = [];

	function __GetDependency__(name) {
	  return __$Getters__[name]();
	}

	function __Rewire__(name, value) {
	  __$Setters__[name](value);
	}

	function __ResetDependency__(name) {
	  __$Resetters__[name]();
	}

	var __RewireAPI__ = {
	  '__GetDependency__': __GetDependency__,
	  '__get__': __GetDependency__,
	  '__Rewire__': __Rewire__,
	  '__set__': __Rewire__,
	  '__ResetDependency__': __ResetDependency__
	};
	var filenameWithoutLoaders = function filenameWithoutLoaders() {
	  var filename = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

	  var index = filename.lastIndexOf('!');

	  return index < 0 ? filename : filename.substr(index + 1);
	};

	var _filenameWithoutLoaders = filenameWithoutLoaders;

	__$Getters__['filenameWithoutLoaders'] = function () {
	  return filenameWithoutLoaders;
	};

	__$Setters__['filenameWithoutLoaders'] = function (value) {
	  exports.filenameWithoutLoaders = filenameWithoutLoaders = value;
	};

	__$Resetters__['filenameWithoutLoaders'] = function () {
	  exports.filenameWithoutLoaders = filenameWithoutLoaders = _filenameWithoutLoaders;
	};

	exports.filenameWithoutLoaders = _filenameWithoutLoaders;
	var filenameHasLoaders = function filenameHasLoaders(filename) {
	  var actualFilename = filenameWithoutLoaders(filename);

	  return actualFilename !== filename;
	};

	var _filenameHasLoaders = filenameHasLoaders;

	__$Getters__['filenameHasLoaders'] = function () {
	  return filenameHasLoaders;
	};

	__$Setters__['filenameHasLoaders'] = function (value) {
	  exports.filenameHasLoaders = filenameHasLoaders = value;
	};

	__$Resetters__['filenameHasLoaders'] = function () {
	  exports.filenameHasLoaders = filenameHasLoaders = _filenameHasLoaders;
	};

	exports.filenameHasLoaders = _filenameHasLoaders;
	var filenameHasSchema = function filenameHasSchema(filename) {
	  return (/^[\w]+\:/.test(filename)
	  );
	};

	var _filenameHasSchema = filenameHasSchema;

	__$Getters__['filenameHasSchema'] = function () {
	  return filenameHasSchema;
	};

	__$Setters__['filenameHasSchema'] = function (value) {
	  exports.filenameHasSchema = filenameHasSchema = value;
	};

	__$Resetters__['filenameHasSchema'] = function () {
	  exports.filenameHasSchema = filenameHasSchema = _filenameHasSchema;
	};

	exports.filenameHasSchema = _filenameHasSchema;
	var isFilenameAbsolute = function isFilenameAbsolute(filename) {
	  var actualFilename = filenameWithoutLoaders(filename);

	  if (actualFilename.indexOf('/') === 0) {
	    return true;
	  }

	  return false;
	};

	var _isFilenameAbsolute = isFilenameAbsolute;

	__$Getters__['isFilenameAbsolute'] = function () {
	  return isFilenameAbsolute;
	};

	__$Setters__['isFilenameAbsolute'] = function (value) {
	  exports.isFilenameAbsolute = isFilenameAbsolute = value;
	};

	__$Resetters__['isFilenameAbsolute'] = function () {
	  exports.isFilenameAbsolute = isFilenameAbsolute = _isFilenameAbsolute;
	};

	exports.isFilenameAbsolute = _isFilenameAbsolute;
	var makeUrl = function makeUrl(filename, scheme, line, column) {
	  var actualFilename = filenameWithoutLoaders(filename);

	  if (filenameHasSchema(filename)) {
	    return actualFilename;
	  }

	  var url = 'file://' + actualFilename;

	  if (scheme) {
	    url = scheme + '://open?url=' + url;

	    if (line && actualFilename === filename) {
	      url = url + '&line=' + line;

	      if (column) {
	        url = url + '&column=' + column;
	      }
	    }
	  }

	  return url;
	};

	var _makeUrl = makeUrl;

	__$Getters__['makeUrl'] = function () {
	  return makeUrl;
	};

	__$Setters__['makeUrl'] = function (value) {
	  exports.makeUrl = makeUrl = value;
	};

	__$Resetters__['makeUrl'] = function () {
	  exports.makeUrl = makeUrl = _makeUrl;
	};

	exports.makeUrl = _makeUrl;
	var makeLinkText = function makeLinkText(filename, line, column) {
	  var text = filenameWithoutLoaders(filename);

	  if (line && text === filename) {
	    text = text + ':' + line;

	    if (column) {
	      text = text + ':' + column;
	    }
	  }

	  return text;
	};
	var _makeLinkText = makeLinkText;

	__$Getters__['makeLinkText'] = function () {
	  return makeLinkText;
	};

	__$Setters__['makeLinkText'] = function (value) {
	  exports.makeLinkText = makeLinkText = value;
	};

	__$Resetters__['makeLinkText'] = function () {
	  exports.makeLinkText = makeLinkText = _makeLinkText;
	};

	exports.makeLinkText = _makeLinkText;
	exports.__GetDependency__ = __GetDependency__;
	exports.__get__ = __GetDependency__;
	exports.__Rewire__ = __Rewire__;
	exports.__set__ = __Rewire__;
	exports.__ResetDependency__ = __ResetDependency__;
	exports.__RewireAPI__ = __RewireAPI__;
	exports['default'] = __RewireAPI__;

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = catchErrors;
	function catchErrors(_ref) {
	  var filename = _ref.filename;
	  var components = _ref.components;
	  var imports = _ref.imports;

	  var _imports = _slicedToArray(imports, 3);

	  var React = _imports[0];
	  var ErrorReporter = _imports[1];
	  var reporterOptions = _imports[2];

	  if (!React || !React.Component) {
	    throw new Error('imports[0] for react-transform-catch-errors does not look like React.');
	  }
	  if (typeof ErrorReporter !== 'function') {
	    throw new Error('imports[1] for react-transform-catch-errors does not look like a React component.');
	  }

	  return function wrapToCatchErrors(ReactClass, componentId) {
	    var originalRender = ReactClass.prototype.render;

	    ReactClass.prototype.render = function tryRender() {
	      try {
	        return originalRender.apply(this, arguments);
	      } catch (err) {
	        setTimeout(function () {
	          if (typeof console.reportErrorsAsExceptions !== 'undefined') {
	            var prevReportErrorAsExceptions = console.reportErrorsAsExceptions;
	            // We're in React Native. Don't throw.
	            // Stop react-native from triggering its own error handler
	            console.reportErrorsAsExceptions = false;
	            // Log an error
	            console.error(err);
	            // Reactivate it so other errors are still handled
	            console.reportErrorsAsExceptions = prevReportErrorAsExceptions;
	          } else {
	            throw err;
	          }
	        });

	        return React.createElement(ErrorReporter, _extends({
	          error: err,
	          filename: filename
	        }, reporterOptions));
	      }
	    };

	    return ReactClass;
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports['default'] = proxyReactComponents;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _reactProxy = __webpack_require__(15);

	var _globalWindow = __webpack_require__(148);

	var _globalWindow2 = _interopRequireDefault(_globalWindow);

	var componentProxies = undefined;
	if (_globalWindow2['default'].__reactComponentProxies) {
	  componentProxies = _globalWindow2['default'].__reactComponentProxies;
	} else {
	  componentProxies = {};
	  Object.defineProperty(_globalWindow2['default'], '__reactComponentProxies', {
	    configurable: true,
	    enumerable: false,
	    writable: false,
	    value: componentProxies
	  });
	}

	function proxyReactComponents(_ref) {
	  var filename = _ref.filename;
	  var components = _ref.components;
	  var imports = _ref.imports;
	  var locals = _ref.locals;

	  var _imports = _slicedToArray(imports, 1);

	  var React = _imports[0];

	  var _locals = _slicedToArray(locals, 1);

	  var hot = _locals[0].hot;

	  if (!React.Component) {
	    throw new Error('imports[0] for react-transform-hmr does not look like React.');
	  }

	  if (!hot || typeof hot.accept !== 'function') {
	    throw new Error('locals[0] does not appear to be a `module` object with Hot Module ' + 'replacement API enabled. You should disable react-transform-hmr in ' + 'production by using `env` section in Babel configuration. See the ' + 'example in README: https://github.com/gaearon/react-transform-hmr');
	  }

	  if (Object.keys(components).some(function (key) {
	    return !components[key].isInFunction;
	  })) {
	    hot.accept(function (err) {
	      if (err) {
	        console.warn('[React Transform HMR] There was an error updating ' + filename + ':');
	        console.error(err);
	      }
	    });
	  }

	  var forceUpdate = (0, _reactProxy.getForceUpdate)(React);

	  return function wrapWithProxy(ReactClass, uniqueId) {
	    var _components$uniqueId = components[uniqueId];
	    var _components$uniqueId$isInFunction = _components$uniqueId.isInFunction;
	    var isInFunction = _components$uniqueId$isInFunction === undefined ? false : _components$uniqueId$isInFunction;
	    var _components$uniqueId$displayName = _components$uniqueId.displayName;
	    var displayName = _components$uniqueId$displayName === undefined ? uniqueId : _components$uniqueId$displayName;

	    if (isInFunction) {
	      return ReactClass;
	    }

	    var globalUniqueId = filename + '$' + uniqueId;
	    if (componentProxies[globalUniqueId]) {
	      (function () {
	        console.info('[React Transform HMR] Patching ' + displayName);
	        var instances = componentProxies[globalUniqueId].update(ReactClass);
	        setTimeout(function () {
	          return instances.forEach(forceUpdate);
	        });
	      })();
	    } else {
	      componentProxies[globalUniqueId] = (0, _reactProxy.createProxy)(ReactClass);
	    }

	    return componentProxies[globalUniqueId].get();
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getForceUpdate = exports.createProxy = undefined;

	var _supportsProtoAssignment = __webpack_require__(16);

	var _supportsProtoAssignment2 = _interopRequireDefault(_supportsProtoAssignment);

	var _createClassProxy = __webpack_require__(17);

	var _createClassProxy2 = _interopRequireDefault(_createClassProxy);

	var _reactDeepForceUpdate = __webpack_require__(147);

	var _reactDeepForceUpdate2 = _interopRequireDefault(_reactDeepForceUpdate);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	if (!(0, _supportsProtoAssignment2.default)()) {
	  console.warn('This JavaScript environment does not support __proto__. ' + 'This means that react-proxy is unable to proxy React components. ' + 'Features that rely on react-proxy, such as react-transform-hmr, ' + 'will not function as expected.');
	}

	exports.createProxy = _createClassProxy2.default;
	exports.getForceUpdate = _reactDeepForceUpdate2.default;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = supportsProtoAssignment;
	var x = {};
	var y = { supports: true };
	try {
	  x.__proto__ = y;
	} catch (err) {}

	function supportsProtoAssignment() {
	  return x.supports || false;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.default = proxyClass;
	exports.default = createClassProxy;

	var _find = __webpack_require__(18);

	var _find2 = _interopRequireDefault(_find);

	var _createPrototypeProxy = __webpack_require__(125);

	var _createPrototypeProxy2 = _interopRequireDefault(_createPrototypeProxy);

	var _bindAutoBindMethods = __webpack_require__(145);

	var _bindAutoBindMethods2 = _interopRequireDefault(_bindAutoBindMethods);

	var _deleteUnknownAutoBindMethods = __webpack_require__(146);

	var _deleteUnknownAutoBindMethods2 = _interopRequireDefault(_deleteUnknownAutoBindMethods);

	var _supportsProtoAssignment = __webpack_require__(16);

	var _supportsProtoAssignment2 = _interopRequireDefault(_supportsProtoAssignment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var RESERVED_STATICS = ['length', 'name', 'arguments', 'caller', 'prototype', 'toString'];

	function isEqualDescriptor(a, b) {
	  if (!a && !b) {
	    return true;
	  }
	  if (!a || !b) {
	    return false;
	  }
	  for (var key in a) {
	    if (a[key] !== b[key]) {
	      return false;
	    }
	  }
	  return true;
	}

	// This was originally a WeakMap but we had issues with React Native:
	// https://github.com/gaearon/react-proxy/issues/50#issuecomment-192928066
	var allProxies = [];
	function findProxy(Component) {
	  var pair = (0, _find2.default)(allProxies, function (_ref) {
	    var _ref2 = _slicedToArray(_ref, 1);

	    var key = _ref2[0];
	    return key === Component;
	  });
	  return pair ? pair[1] : null;
	}
	function addProxy(Component, proxy) {
	  allProxies.push([Component, proxy]);
	}

	function proxyClass(InitialComponent) {
	  // Prevent double wrapping.
	  // Given a proxy class, return the existing proxy managing it.
	  var existingProxy = findProxy(InitialComponent);
	  if (existingProxy) {
	    return existingProxy;
	  }

	  var prototypeProxy = (0, _createPrototypeProxy2.default)();
	  var CurrentComponent = undefined;
	  var ProxyComponent = undefined;

	  var staticDescriptors = {};
	  function wasStaticModifiedByUser(key) {
	    // Compare the descriptor with the one we previously set ourselves.
	    var currentDescriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);
	    return !isEqualDescriptor(staticDescriptors[key], currentDescriptor);
	  }

	  function instantiate(factory, context, params) {
	    var component = factory();

	    try {
	      return component.apply(context, params);
	    } catch (err) {
	      (function () {
	        // Native ES6 class instantiation
	        var instance = new (Function.prototype.bind.apply(component, [null].concat(_toConsumableArray(params))))();

	        Object.keys(instance).forEach(function (key) {
	          if (RESERVED_STATICS.indexOf(key) > -1) {
	            return;
	          }
	          context[key] = instance[key];
	        });
	      })();
	    }
	  }

	  try {
	    // Create a proxy constructor with matching name
	    ProxyComponent = new Function('factory', 'instantiate', 'return function ' + (InitialComponent.name || 'ProxyComponent') + '() {\n         return instantiate(factory, this, arguments);\n      }')(function () {
	      return CurrentComponent;
	    }, instantiate);
	  } catch (err) {
	    // Some environments may forbid dynamic evaluation
	    ProxyComponent = function ProxyComponent() {
	      return instantiate(function () {
	        return CurrentComponent;
	      }, this, arguments);
	    };
	  }

	  // Point proxy constructor to the proxy prototype
	  ProxyComponent.prototype = prototypeProxy.get();

	  // Proxy toString() to the current constructor
	  ProxyComponent.toString = function toString() {
	    return CurrentComponent.toString();
	  };

	  function update(NextComponent) {
	    if (typeof NextComponent !== 'function') {
	      throw new Error('Expected a constructor.');
	    }

	    // Prevent proxy cycles
	    var existingProxy = findProxy(NextComponent);
	    if (existingProxy) {
	      return update(existingProxy.__getCurrent());
	    }

	    // Save the next constructor so we call it
	    CurrentComponent = NextComponent;

	    // Update the prototype proxy with new methods
	    var mountedInstances = prototypeProxy.update(NextComponent.prototype);

	    // Set up the constructor property so accessing the statics work
	    ProxyComponent.prototype.constructor = ProxyComponent;

	    // Set up the same prototype for inherited statics
	    ProxyComponent.__proto__ = NextComponent.__proto__;

	    // Copy static methods and properties
	    Object.getOwnPropertyNames(NextComponent).forEach(function (key) {
	      if (RESERVED_STATICS.indexOf(key) > -1) {
	        return;
	      }

	      var staticDescriptor = _extends({}, Object.getOwnPropertyDescriptor(NextComponent, key), {
	        configurable: true
	      });

	      // Copy static unless user has redefined it at runtime
	      if (!wasStaticModifiedByUser(key)) {
	        Object.defineProperty(ProxyComponent, key, staticDescriptor);
	        staticDescriptors[key] = staticDescriptor;
	      }
	    });

	    // Remove old static methods and properties
	    Object.getOwnPropertyNames(ProxyComponent).forEach(function (key) {
	      if (RESERVED_STATICS.indexOf(key) > -1) {
	        return;
	      }

	      // Skip statics that exist on the next class
	      if (NextComponent.hasOwnProperty(key)) {
	        return;
	      }

	      // Skip non-configurable statics
	      var descriptor = Object.getOwnPropertyDescriptor(ProxyComponent, key);
	      if (descriptor && !descriptor.configurable) {
	        return;
	      }

	      // Delete static unless user has redefined it at runtime
	      if (!wasStaticModifiedByUser(key)) {
	        delete ProxyComponent[key];
	        delete staticDescriptors[key];
	      }
	    });

	    // Try to infer displayName
	    ProxyComponent.displayName = NextComponent.displayName || NextComponent.name;

	    // We might have added new methods that need to be auto-bound
	    mountedInstances.forEach(_bindAutoBindMethods2.default);
	    mountedInstances.forEach(_deleteUnknownAutoBindMethods2.default);

	    // Let the user take care of redrawing
	    return mountedInstances;
	  };

	  function get() {
	    return ProxyComponent;
	  }

	  function getCurrent() {
	    return CurrentComponent;
	  }

	  update(InitialComponent);

	  var proxy = { get: get, update: update };
	  addProxy(ProxyComponent, proxy);

	  Object.defineProperty(proxy, '__getCurrent', {
	    configurable: false,
	    writable: false,
	    enumerable: false,
	    value: getCurrent
	  });

	  return proxy;
	}

	function createFallback(Component) {
	  var CurrentComponent = Component;

	  return {
	    get: function get() {
	      return CurrentComponent;
	    },
	    update: function update(NextComponent) {
	      CurrentComponent = NextComponent;
	    }
	  };
	}

	function createClassProxy(Component) {
	  return Component.__proto__ && (0, _supportsProtoAssignment2.default)() ? proxyClass(Component) : createFallback(Component);
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var createFind = __webpack_require__(19),
	    findIndex = __webpack_require__(120);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	var find = createFind(findIndex);

	module.exports = find;


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var baseIteratee = __webpack_require__(20),
	    isArrayLike = __webpack_require__(85),
	    keys = __webpack_require__(79);

	/**
	 * Creates a `_.find` or `_.findLast` function.
	 *
	 * @private
	 * @param {Function} findIndexFunc The function to find the collection index.
	 * @returns {Function} Returns the new find function.
	 */
	function createFind(findIndexFunc) {
	  return function(collection, predicate, fromIndex) {
	    var iterable = Object(collection);
	    predicate = baseIteratee(predicate, 3);
	    if (!isArrayLike(collection)) {
	      var props = keys(collection);
	    }
	    var index = findIndexFunc(props || collection, function(value, key) {
	      if (props) {
	        key = value;
	        value = iterable[key];
	      }
	      return predicate(value, key, iterable);
	    }, fromIndex);
	    return index > -1 ? collection[props ? props[index] : index] : undefined;
	  };
	}

	module.exports = createFind;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(21),
	    baseMatchesProperty = __webpack_require__(103),
	    identity = __webpack_require__(117),
	    isArray = __webpack_require__(90),
	    property = __webpack_require__(118);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (typeof value == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(22),
	    getMatchData = __webpack_require__(100),
	    matchesStrictComparable = __webpack_require__(102);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(23),
	    baseIsEqual = __webpack_require__(64);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(24),
	    stackClear = __webpack_require__(32),
	    stackDelete = __webpack_require__(33),
	    stackGet = __webpack_require__(34),
	    stackHas = __webpack_require__(35),
	    stackSet = __webpack_require__(36);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  this.__data__ = new ListCache(entries);
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var listCacheClear = __webpack_require__(25),
	    listCacheDelete = __webpack_require__(26),
	    listCacheGet = __webpack_require__(29),
	    listCacheHas = __webpack_require__(30),
	    listCacheSet = __webpack_require__(31);

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache.prototype.clear = listCacheClear;
	ListCache.prototype['delete'] = listCacheDelete;
	ListCache.prototype.get = listCacheGet;
	ListCache.prototype.has = listCacheHas;
	ListCache.prototype.set = listCacheSet;

	module.exports = ListCache;


/***/ },
/* 25 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */
	function listCacheClear() {
	  this.__data__ = [];
	}

	module.exports = listCacheClear;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(27);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  return true;
	}

	module.exports = listCacheDelete;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(28);

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 28 */
/***/ function(module, exports) {

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	module.exports = eq;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(27);

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet(key) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	module.exports = listCacheGet;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(27);

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas(key) {
	  return assocIndexOf(this.__data__, key) > -1;
	}

	module.exports = listCacheHas;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(27);

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	module.exports = listCacheSet;


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(24);

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new ListCache;
	}

	module.exports = stackClear;


/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  return this.__data__['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 34 */
/***/ function(module, exports) {

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 35 */
/***/ function(module, exports) {

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var ListCache = __webpack_require__(24),
	    MapCache = __webpack_require__(37);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var cache = this.__data__;
	  if (cache instanceof ListCache && cache.__data__.length == LARGE_ARRAY_SIZE) {
	    cache = this.__data__ = new MapCache(cache.__data__);
	  }
	  cache.set(key, value);
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var mapCacheClear = __webpack_require__(38),
	    mapCacheDelete = __webpack_require__(58),
	    mapCacheGet = __webpack_require__(61),
	    mapCacheHas = __webpack_require__(62),
	    mapCacheSet = __webpack_require__(63);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache.prototype.clear = mapCacheClear;
	MapCache.prototype['delete'] = mapCacheDelete;
	MapCache.prototype.get = mapCacheGet;
	MapCache.prototype.has = mapCacheHas;
	MapCache.prototype.set = mapCacheSet;

	module.exports = MapCache;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(39),
	    ListCache = __webpack_require__(24),
	    Map = __webpack_require__(57);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map || ListCache),
	    'string': new Hash
	  };
	}

	module.exports = mapCacheClear;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var hashClear = __webpack_require__(40),
	    hashDelete = __webpack_require__(53),
	    hashGet = __webpack_require__(54),
	    hashHas = __webpack_require__(55),
	    hashSet = __webpack_require__(56);

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash(entries) {
	  var index = -1,
	      length = entries ? entries.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash.prototype.clear = hashClear;
	Hash.prototype['delete'] = hashDelete;
	Hash.prototype.get = hashGet;
	Hash.prototype.has = hashHas;
	Hash.prototype.set = hashSet;

	module.exports = Hash;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(41);

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear() {
	  this.__data__ = nativeCreate ? nativeCreate(null) : {};
	}

	module.exports = hashClear;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(42);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(43),
	    getValue = __webpack_require__(52);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(44),
	    isHostObject = __webpack_require__(46),
	    isMasked = __webpack_require__(47),
	    isObject = __webpack_require__(45),
	    toSource = __webpack_require__(51);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(45);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}

	module.exports = isFunction;


/***/ },
/* 45 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(479);

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(48);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(49);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var checkGlobal = __webpack_require__(50);

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(typeof self == 'object' && self);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(typeof this == 'object' && this);

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = checkGlobal;


/***/ },
/* 51 */
/***/ function(module, exports) {

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to process.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 52 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 53 */
/***/ function(module, exports) {

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(key) {
	  return this.has(key) && delete this.__data__[key];
	}

	module.exports = hashDelete;


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(41);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(key) {
	  var data = this.__data__;
	  if (nativeCreate) {
	    var result = data[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(data, key) ? data[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(41);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(key) {
	  var data = this.__data__;
	  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
	}

	module.exports = hashHas;


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(41);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet(key, value) {
	  var data = this.__data__;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	module.exports = hashSet;


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(42),
	    root = __webpack_require__(49);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(59);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete(key) {
	  return getMapData(this, key)['delete'](key);
	}

	module.exports = mapCacheDelete;


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var isKeyable = __webpack_require__(60);

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	module.exports = getMapData;


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	module.exports = isKeyable;


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(59);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet(key) {
	  return getMapData(this, key).get(key);
	}

	module.exports = mapCacheGet;


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(59);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas(key) {
	  return getMapData(this, key).has(key);
	}

	module.exports = mapCacheHas;


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var getMapData = __webpack_require__(59);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet(key, value) {
	  getMapData(this, key).set(key, value);
	  return this;
	}

	module.exports = mapCacheSet;


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(65),
	    isObject = __webpack_require__(45),
	    isObjectLike = __webpack_require__(89);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(23),
	    equalArrays = __webpack_require__(66),
	    equalByTag = __webpack_require__(71),
	    equalObjects = __webpack_require__(76),
	    getTag = __webpack_require__(94),
	    isArray = __webpack_require__(90),
	    isHostObject = __webpack_require__(46),
	    isTypedArray = __webpack_require__(99);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    objTag = objTag == argsTag ? objectTag : objTag;
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    othTag = othTag == argsTag ? objectTag : othTag;
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !objIsObj) {
	    stack || (stack = new Stack);
	    return (objIsArr || isTypedArray(object))
	      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
	      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
	  }
	  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(67),
	    arraySome = __webpack_require__(70);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!arraySome(other, function(othValue, othIndex) {
	            if (!seen.has(othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	              return seen.add(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, customizer, bitmask, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(37),
	    setCacheAdd = __webpack_require__(68),
	    setCacheHas = __webpack_require__(69);

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.__data__ = new MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
	SetCache.prototype.has = setCacheHas;

	module.exports = SetCache;


/***/ },
/* 68 */
/***/ function(module, exports) {

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED);
	  return this;
	}

	module.exports = setCacheAdd;


/***/ },
/* 69 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	module.exports = setCacheHas;


/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(72),
	    Uint8Array = __webpack_require__(73),
	    equalArrays = __webpack_require__(66),
	    mapToArray = __webpack_require__(74),
	    setToArray = __webpack_require__(75);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
	  switch (tag) {
	    case dataViewTag:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and
	      // booleans to `1` or `0` treating invalid dates coerced to `NaN` as
	      // not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= UNORDERED_COMPARE_FLAG;
	      stack.set(object, other);

	      // Recursively compare objects (susceptible to call stack limits).
	      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);

	    case symbolTag:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(49);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(49);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 74 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(77),
	    keys = __webpack_require__(79);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
	 *  for more details.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	var getPrototype = __webpack_require__(78);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return object != null &&
	    (hasOwnProperty.call(object, key) ||
	      (typeof object == 'object' && key in object && getPrototype(object) === null));
	}

	module.exports = baseHas;


/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(478);

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(77),
	    baseKeys = __webpack_require__(80),
	    indexKeys = __webpack_require__(81),
	    isArrayLike = __webpack_require__(85),
	    isIndex = __webpack_require__(92),
	    isPrototype = __webpack_require__(93);

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;

	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keys;


/***/ },
/* 80 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;

	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}

	module.exports = baseKeys;


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(82),
	    isArguments = __webpack_require__(83),
	    isArray = __webpack_require__(90),
	    isLength = __webpack_require__(88),
	    isString = __webpack_require__(91);

	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}

	module.exports = indexKeys;


/***/ },
/* 82 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	module.exports = baseTimes;


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(84);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}

	module.exports = isArguments;


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(85),
	    isObjectLike = __webpack_require__(89);

	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}

	module.exports = isArrayLikeObject;


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(86),
	    isFunction = __webpack_require__(44),
	    isLength = __webpack_require__(88);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value)) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(87);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a
	 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
	 * Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 87 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 88 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length,
	 *  else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(480);

/***/ },
/* 90 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(90),
	    isObjectLike = __webpack_require__(89);

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}

	module.exports = isString;


/***/ },
/* 92 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}

	module.exports = isIndex;


/***/ },
/* 93 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(95),
	    Map = __webpack_require__(57),
	    Promise = __webpack_require__(96),
	    Set = __webpack_require__(97),
	    WeakMap = __webpack_require__(98),
	    toSource = __webpack_require__(51);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for data views, maps, sets, and weak maps in IE 11,
	// for data views in Edge, and promises in Node.js.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : undefined;

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(42),
	    root = __webpack_require__(49);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(42),
	    root = __webpack_require__(49);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(42),
	    root = __webpack_require__(49);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(42),
	    root = __webpack_require__(49);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(88),
	    isObjectLike = __webpack_require__(89);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(101),
	    keys = __webpack_require__(79);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, isStrictComparable(value)];
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(45);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 102 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	module.exports = matchesStrictComparable;


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(64),
	    get = __webpack_require__(104),
	    hasIn = __webpack_require__(114),
	    isKey = __webpack_require__(112),
	    isStrictComparable = __webpack_require__(101),
	    matchesStrictComparable = __webpack_require__(102),
	    toKey = __webpack_require__(113);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (isKey(path) && isStrictComparable(srcValue)) {
	    return matchesStrictComparable(toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(105);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined`, the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.7.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(106),
	    isKey = __webpack_require__(112),
	    toKey = __webpack_require__(113);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[toKey(path[index++])];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(90),
	    stringToPath = __webpack_require__(107);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function castPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = castPath;


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	var memoize = __webpack_require__(108),
	    toString = __webpack_require__(109);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	var stringToPath = memoize(function(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	});

	module.exports = stringToPath;


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(37);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/**
	 * Creates a function that memoizes the result of `func`. If `resolver` is
	 * provided, it determines the cache key for storing the result based on the
	 * arguments provided to the memoized function. By default, the first argument
	 * provided to the memoized function is used as the map cache key. The `func`
	 * is invoked with the `this` binding of the memoized function.
	 *
	 * **Note:** The cache is exposed as the `cache` property on the memoized
	 * function. Its creation may be customized by replacing the `_.memoize.Cache`
	 * constructor with one whose instances implement the
	 * [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	 * method interface of `delete`, `get`, `has`, and `set`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to have its output memoized.
	 * @param {Function} [resolver] The function to resolve the cache key.
	 * @returns {Function} Returns the new memoized function.
	 * @example
	 *
	 * var object = { 'a': 1, 'b': 2 };
	 * var other = { 'c': 3, 'd': 4 };
	 *
	 * var values = _.memoize(_.values);
	 * values(object);
	 * // => [1, 2]
	 *
	 * values(other);
	 * // => [3, 4]
	 *
	 * object.a = 2;
	 * values(object);
	 * // => [1, 2]
	 *
	 * // Modify the result cache.
	 * values.cache.set(object, ['a', 'b']);
	 * values(object);
	 * // => ['a', 'b']
	 *
	 * // Replace `_.memoize.Cache`.
	 * _.memoize.Cache = WeakMap;
	 */
	function memoize(func, resolver) {
	  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  var memoized = function() {
	    var args = arguments,
	        key = resolver ? resolver.apply(this, args) : args[0],
	        cache = memoized.cache;

	    if (cache.has(key)) {
	      return cache.get(key);
	    }
	    var result = func.apply(this, args);
	    memoized.cache = cache.set(key, result);
	    return result;
	  };
	  memoized.cache = new (memoize.Cache || MapCache);
	  return memoized;
	}

	// Assign cache to `_.memoize`.
	memoize.Cache = MapCache;

	module.exports = memoize;


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	var baseToString = __webpack_require__(110);

	/**
	 * Converts `value` to a string. An empty string is returned for `null`
	 * and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  return value == null ? '' : baseToString(value);
	}

	module.exports = toString;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(72),
	    isSymbol = __webpack_require__(111);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = symbolProto ? symbolProto.toString : undefined;

	/**
	 * The base implementation of `_.toString` which doesn't convert nullish
	 * values to empty strings.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	function baseToString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return symbolToString ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = baseToString;


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(89);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(90),
	    isSymbol = __webpack_require__(111);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (isArray(value)) {
	    return false;
	  }
	  var type = typeof value;
	  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
	      value == null || isSymbol(value)) {
	    return true;
	  }
	  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	    (object != null && value in Object(object));
	}

	module.exports = isKey;


/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	var isSymbol = __webpack_require__(111);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/**
	 * Converts `value` to a string key if it's not a string or symbol.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {string|symbol} Returns the key.
	 */
	function toKey(value) {
	  if (typeof value == 'string' || isSymbol(value)) {
	    return value;
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toKey;


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(115),
	    hasPath = __webpack_require__(116);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	var castPath = __webpack_require__(106),
	    isArguments = __webpack_require__(83),
	    isArray = __webpack_require__(90),
	    isIndex = __webpack_require__(92),
	    isKey = __webpack_require__(112),
	    isLength = __webpack_require__(88),
	    isString = __webpack_require__(91),
	    toKey = __webpack_require__(113);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  path = isKey(path, object) ? [path] : castPath(path);

	  var result,
	      index = -1,
	      length = path.length;

	  while (++index < length) {
	    var key = toKey(path[index]);
	    if (!(result = object != null && hasFunc(object, key))) {
	      break;
	    }
	    object = object[key];
	  }
	  if (result) {
	    return result;
	  }
	  var length = object ? object.length : 0;
	  return !!length && isLength(length) && isIndex(key, length) &&
	    (isArray(object) || isString(object) || isArguments(object));
	}

	module.exports = hasPath;


/***/ },
/* 117 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(87),
	    basePropertyDeep = __webpack_require__(119),
	    isKey = __webpack_require__(112),
	    toKey = __webpack_require__(113);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(105);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(121),
	    baseIteratee = __webpack_require__(20),
	    toInteger = __webpack_require__(122);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.1.0
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Array|Function|Object|string} [predicate=_.identity]
	 *  The function invoked per iteration.
	 * @param {number} [fromIndex=0] The index to search from.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate, fromIndex) {
	  var length = array ? array.length : 0;
	  if (!length) {
	    return -1;
	  }
	  var index = fromIndex == null ? 0 : toInteger(fromIndex);
	  if (index < 0) {
	    index = nativeMax(length + index, 0);
	  }
	  return baseFindIndex(array, baseIteratee(predicate, 3), index);
	}

	module.exports = findIndex;


/***/ },
/* 121 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	var toFinite = __webpack_require__(123);

	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3.2);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3.2');
	 * // => 3
	 */
	function toInteger(value) {
	  var result = toFinite(value),
	      remainder = result % 1;

	  return result === result ? (remainder ? result - remainder : result) : 0;
	}

	module.exports = toInteger;


/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(124);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;

	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}

	module.exports = toFinite;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(44),
	    isObject = __webpack_require__(45),
	    isSymbol = __webpack_require__(111);

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	module.exports = toNumber;


/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createPrototypeProxy;

	var _assign = __webpack_require__(126);

	var _assign2 = _interopRequireDefault(_assign);

	var _difference = __webpack_require__(133);

	var _difference2 = _interopRequireDefault(_difference);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createPrototypeProxy() {
	  var proxy = {};
	  var current = null;
	  var mountedInstances = [];

	  /**
	   * Creates a proxied toString() method pointing to the current version's toString().
	   */
	  function proxyToString(name) {
	    // Wrap to always call the current version
	    return function toString() {
	      if (typeof current[name] === 'function') {
	        return current[name].toString();
	      } else {
	        return '<method was deleted>';
	      }
	    };
	  }

	  /**
	   * Creates a proxied method that calls the current version, whenever available.
	   */
	  function proxyMethod(name) {
	    // Wrap to always call the current version
	    var proxiedMethod = function proxiedMethod() {
	      if (typeof current[name] === 'function') {
	        return current[name].apply(this, arguments);
	      }
	    };

	    // Copy properties of the original function, if any
	    (0, _assign2.default)(proxiedMethod, current[name]);
	    proxiedMethod.toString = proxyToString(name);

	    return proxiedMethod;
	  }

	  /**
	   * Augments the original componentDidMount with instance tracking.
	   */
	  function proxiedComponentDidMount() {
	    mountedInstances.push(this);
	    if (typeof current.componentDidMount === 'function') {
	      return current.componentDidMount.apply(this, arguments);
	    }
	  }
	  proxiedComponentDidMount.toString = proxyToString('componentDidMount');

	  /**
	   * Augments the original componentWillUnmount with instance tracking.
	   */
	  function proxiedComponentWillUnmount() {
	    var index = mountedInstances.indexOf(this);
	    // Unless we're in a weird environment without componentDidMount
	    if (index !== -1) {
	      mountedInstances.splice(index, 1);
	    }
	    if (typeof current.componentWillUnmount === 'function') {
	      return current.componentWillUnmount.apply(this, arguments);
	    }
	  }
	  proxiedComponentWillUnmount.toString = proxyToString('componentWillUnmount');

	  /**
	   * Defines a property on the proxy.
	   */
	  function defineProxyProperty(name, descriptor) {
	    Object.defineProperty(proxy, name, descriptor);
	  }

	  /**
	   * Defines a property, attempting to keep the original descriptor configuration.
	   */
	  function defineProxyPropertyWithValue(name, value) {
	    var _ref = Object.getOwnPropertyDescriptor(current, name) || {};

	    var _ref$enumerable = _ref.enumerable;
	    var enumerable = _ref$enumerable === undefined ? false : _ref$enumerable;
	    var _ref$writable = _ref.writable;
	    var writable = _ref$writable === undefined ? true : _ref$writable;


	    defineProxyProperty(name, {
	      configurable: true,
	      enumerable: enumerable,
	      writable: writable,
	      value: value
	    });
	  }

	  /**
	   * Creates an auto-bind map mimicking the original map, but directed at proxy.
	   */
	  function createAutoBindMap() {
	    if (!current.__reactAutoBindMap) {
	      return;
	    }

	    var __reactAutoBindMap = {};
	    for (var name in current.__reactAutoBindMap) {
	      if (typeof proxy[name] === 'function' && current.__reactAutoBindMap.hasOwnProperty(name)) {
	        __reactAutoBindMap[name] = proxy[name];
	      }
	    }

	    return __reactAutoBindMap;
	  }

	  /**
	   * Creates an auto-bind map mimicking the original map, but directed at proxy.
	   */
	  function createAutoBindPairs() {
	    var __reactAutoBindPairs = [];

	    for (var i = 0; i < current.__reactAutoBindPairs.length; i += 2) {
	      var name = current.__reactAutoBindPairs[i];
	      var method = proxy[name];

	      if (typeof method === 'function') {
	        __reactAutoBindPairs.push(name, method);
	      }
	    }

	    return __reactAutoBindPairs;
	  }

	  /**
	   * Applies the updated prototype.
	   */
	  function update(next) {
	    // Save current source of truth
	    current = next;

	    // Find changed property names
	    var currentNames = Object.getOwnPropertyNames(current);
	    var previousName = Object.getOwnPropertyNames(proxy);
	    var removedNames = (0, _difference2.default)(previousName, currentNames);

	    // Remove properties and methods that are no longer there
	    removedNames.forEach(function (name) {
	      delete proxy[name];
	    });

	    // Copy every descriptor
	    currentNames.forEach(function (name) {
	      var descriptor = Object.getOwnPropertyDescriptor(current, name);
	      if (typeof descriptor.value === 'function') {
	        // Functions require additional wrapping so they can be bound later
	        defineProxyPropertyWithValue(name, proxyMethod(name));
	      } else {
	        // Other values can be copied directly
	        defineProxyProperty(name, descriptor);
	      }
	    });

	    // Track mounting and unmounting
	    defineProxyPropertyWithValue('componentDidMount', proxiedComponentDidMount);
	    defineProxyPropertyWithValue('componentWillUnmount', proxiedComponentWillUnmount);

	    if (current.hasOwnProperty('__reactAutoBindMap')) {
	      defineProxyPropertyWithValue('__reactAutoBindMap', createAutoBindMap());
	    }

	    if (current.hasOwnProperty('__reactAutoBindPairs')) {
	      defineProxyPropertyWithValue('__reactAutoBindPairs', createAutoBindPairs());
	    }

	    // Set up the prototype chain
	    proxy.__proto__ = next;

	    return mountedInstances;
	  }

	  /**
	   * Returns the up-to-date proxy prototype.
	   */
	  function get() {
	    return proxy;
	  }

	  return {
	    update: update,
	    get: get
	  };
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(127),
	    copyObject = __webpack_require__(128),
	    createAssigner = __webpack_require__(129),
	    isArrayLike = __webpack_require__(85),
	    isPrototype = __webpack_require__(93),
	    keys = __webpack_require__(79);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

	/**
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

	module.exports = assign;


/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(28);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}

	module.exports = assignValue;


/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(127);

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];

	    assignValue(object, key, newValue);
	  }
	  return object;
	}

	module.exports = copyObject;


/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(130),
	    rest = __webpack_require__(131);

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;


/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(28),
	    isArrayLike = __webpack_require__(85),
	    isIndex = __webpack_require__(92),
	    isObject = __webpack_require__(45);

	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}

	module.exports = isIterateeCall;


/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(132),
	    toInteger = __webpack_require__(122);

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as
	 * an array.
	 *
	 * **Note:** This method is based on the
	 * [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	module.exports = rest;


/***/ },
/* 132 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}

	module.exports = apply;


/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var baseDifference = __webpack_require__(134),
	    baseFlatten = __webpack_require__(142),
	    isArrayLikeObject = __webpack_require__(84),
	    rest = __webpack_require__(131);

	/**
	 * Creates an array of unique `array` values not included in the other given
	 * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons. The order of result values is determined by the
	 * order they occur in the first array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Array
	 * @param {Array} array The array to inspect.
	 * @param {...Array} [values] The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 * @see _.without, _.xor
	 * @example
	 *
	 * _.difference([2, 1], [2, 3]);
	 * // => [1]
	 */
	var difference = rest(function(array, values) {
	  return isArrayLikeObject(array)
	    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
	    : [];
	});

	module.exports = difference;


/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	var SetCache = __webpack_require__(67),
	    arrayIncludes = __webpack_require__(135),
	    arrayIncludesWith = __webpack_require__(138),
	    arrayMap = __webpack_require__(139),
	    baseUnary = __webpack_require__(140),
	    cacheHas = __webpack_require__(141);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * The base implementation of methods like `_.difference` without support
	 * for excluding multiple arrays or iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @param {Function} [iteratee] The iteratee invoked per element.
	 * @param {Function} [comparator] The comparator invoked per element.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values, iteratee, comparator) {
	  var index = -1,
	      includes = arrayIncludes,
	      isCommon = true,
	      length = array.length,
	      result = [],
	      valuesLength = values.length;

	  if (!length) {
	    return result;
	  }
	  if (iteratee) {
	    values = arrayMap(values, baseUnary(iteratee));
	  }
	  if (comparator) {
	    includes = arrayIncludesWith;
	    isCommon = false;
	  }
	  else if (values.length >= LARGE_ARRAY_SIZE) {
	    includes = cacheHas;
	    isCommon = false;
	    values = new SetCache(values);
	  }
	  outer:
	  while (++index < length) {
	    var value = array[index],
	        computed = iteratee ? iteratee(value) : value;

	    value = (comparator || value !== 0) ? value : 0;
	    if (isCommon && computed === computed) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === computed) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    }
	    else if (!includes(values, computed, comparator)) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;


/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	var baseIndexOf = __webpack_require__(136);

	/**
	 * A specialized version of `_.includes` for arrays without support for
	 * specifying an index to search from.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludes(array, value) {
	  var length = array ? array.length : 0;
	  return !!length && baseIndexOf(array, value, 0) > -1;
	}

	module.exports = arrayIncludes;


/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	var indexOfNaN = __webpack_require__(137);

	/**
	 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;


/***/ },
/* 137 */
/***/ function(module, exports) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 1 : -1);

	  while ((fromRight ? index-- : ++index < length)) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = indexOfNaN;


/***/ },
/* 138 */
/***/ function(module, exports) {

	/**
	 * This function is like `arrayIncludes` except that it accepts a comparator.
	 *
	 * @private
	 * @param {Array} [array] The array to search.
	 * @param {*} target The value to search for.
	 * @param {Function} comparator The comparator invoked per element.
	 * @returns {boolean} Returns `true` if `target` is found, else `false`.
	 */
	function arrayIncludesWith(array, value, comparator) {
	  var index = -1,
	      length = array ? array.length : 0;

	  while (++index < length) {
	    if (comparator(value, array[index])) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arrayIncludesWith;


/***/ },
/* 139 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array ? array.length : 0,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 140 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing wrapper metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 141 */
/***/ function(module, exports) {

	/**
	 * Checks if a cache value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	module.exports = cacheHas;


/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

	var arrayPush = __webpack_require__(143),
	    isFlattenable = __webpack_require__(144);

	/**
	 * The base implementation of `_.flatten` with support for restricting flattening.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {number} depth The maximum recursion depth.
	 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
	 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
	 * @param {Array} [result=[]] The initial result value.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, depth, predicate, isStrict, result) {
	  var index = -1,
	      length = array.length;

	  predicate || (predicate = isFlattenable);
	  result || (result = []);

	  while (++index < length) {
	    var value = array[index];
	    if (depth > 0 && predicate(value)) {
	      if (depth > 1) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        baseFlatten(value, depth - 1, predicate, isStrict, result);
	      } else {
	        arrayPush(result, value);
	      }
	    } else if (!isStrict) {
	      result[result.length] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;


/***/ },
/* 143 */
/***/ function(module, exports) {

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	module.exports = arrayPush;


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(83),
	    isArray = __webpack_require__(90);

	/**
	 * Checks if `value` is a flattenable `arguments` object or array.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
	 */
	function isFlattenable(value) {
	  return isArray(value) || isArguments(value);
	}

	module.exports = isFlattenable;


/***/ },
/* 145 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = bindAutoBindMethods;
	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of React source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * Original:
	 * https://github.com/facebook/react/blob/6508b1ad273a6f371e8d90ae676e5390199461b4/src/isomorphic/classic/class/ReactClass.js#L650-L713
	 */

	function bindAutoBindMethod(component, method) {
	  var boundMethod = method.bind(component);

	  boundMethod.__reactBoundContext = component;
	  boundMethod.__reactBoundMethod = method;
	  boundMethod.__reactBoundArguments = null;

	  var componentName = component.constructor.displayName,
	      _bind = boundMethod.bind;

	  boundMethod.bind = function (newThis) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    if (newThis !== component && newThis !== null) {
	      console.warn('bind(): React component methods may only be bound to the ' + 'component instance. See ' + componentName);
	    } else if (!args.length) {
	      console.warn('bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See ' + componentName);
	      return boundMethod;
	    }

	    var reboundMethod = _bind.apply(boundMethod, arguments);
	    reboundMethod.__reactBoundContext = component;
	    reboundMethod.__reactBoundMethod = method;
	    reboundMethod.__reactBoundArguments = args;

	    return reboundMethod;
	  };

	  return boundMethod;
	}

	function bindAutoBindMethodsFromMap(component) {
	  for (var autoBindKey in component.__reactAutoBindMap) {
	    if (!component.__reactAutoBindMap.hasOwnProperty(autoBindKey)) {
	      return;
	    }

	    // Tweak: skip methods that are already bound.
	    // This is to preserve method reference in case it is used
	    // as a subscription handler that needs to be detached later.
	    if (component.hasOwnProperty(autoBindKey) && component[autoBindKey].__reactBoundContext === component) {
	      continue;
	    }

	    var method = component.__reactAutoBindMap[autoBindKey];
	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

	function bindAutoBindMethods(component) {
	  if (component.__reactAutoBindPairs) {
	    bindAutoBindMethodsFromArray(component);
	  } else if (component.__reactAutoBindMap) {
	    bindAutoBindMethodsFromMap(component);
	  }
	}

	function bindAutoBindMethodsFromArray(component) {
	  var pairs = component.__reactAutoBindPairs;

	  if (!pairs) {
	    return;
	  }

	  for (var i = 0; i < pairs.length; i += 2) {
	    var autoBindKey = pairs[i];

	    if (component.hasOwnProperty(autoBindKey) && component[autoBindKey].__reactBoundContext === component) {
	      continue;
	    }

	    var method = pairs[i + 1];

	    component[autoBindKey] = bindAutoBindMethod(component, method);
	  }
	}

/***/ },
/* 146 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = deleteUnknownAutoBindMethods;
	function shouldDeleteClassicInstanceMethod(component, name) {
	  if (component.__reactAutoBindMap && component.__reactAutoBindMap.hasOwnProperty(name)) {
	    // It's a known autobound function, keep it
	    return false;
	  }

	  if (component.__reactAutoBindPairs && component.__reactAutoBindPairs.indexOf(name) >= 0) {
	    // It's a known autobound function, keep it
	    return false;
	  }

	  if (component[name].__reactBoundArguments !== null) {
	    // It's a function bound to specific args, keep it
	    return false;
	  }

	  // It's a cached bound method for a function
	  // that was deleted by user, so we delete it from component.
	  return true;
	}

	function shouldDeleteModernInstanceMethod(component, name) {
	  var prototype = component.constructor.prototype;

	  var prototypeDescriptor = Object.getOwnPropertyDescriptor(prototype, name);

	  if (!prototypeDescriptor || !prototypeDescriptor.get) {
	    // This is definitely not an autobinding getter
	    return false;
	  }

	  if (prototypeDescriptor.get().length !== component[name].length) {
	    // The length doesn't match, bail out
	    return false;
	  }

	  // This seems like a method bound using an autobinding getter on the prototype
	  // Hopefully we won't run into too many false positives.
	  return true;
	}

	function shouldDeleteInstanceMethod(component, name) {
	  var descriptor = Object.getOwnPropertyDescriptor(component, name);
	  if (typeof descriptor.value !== 'function') {
	    // Not a function, or something fancy: bail out
	    return;
	  }

	  if (component.__reactAutoBindMap || component.__reactAutoBindPairs) {
	    // Classic
	    return shouldDeleteClassicInstanceMethod(component, name);
	  } else {
	    // Modern
	    return shouldDeleteModernInstanceMethod(component, name);
	  }
	}

	/**
	 * Deletes autobound methods from the instance.
	 *
	 * For classic React classes, we only delete the methods that no longer exist in map.
	 * This means the user actually deleted them in code.
	 *
	 * For modern classes, we delete methods that exist on prototype with the same length,
	 * and which have getters on prototype, but are normal values on the instance.
	 * This is usually an indication that an autobinding decorator is being used,
	 * and the getter will re-generate the memoized handler on next access.
	 */
	function deleteUnknownAutoBindMethods(component) {
	  var names = Object.getOwnPropertyNames(component);

	  names.forEach(function (name) {
	    if (shouldDeleteInstanceMethod(component, name)) {
	      delete component[name];
	    }
	  });
	}

/***/ },
/* 147 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = getForceUpdate;
	function traverseRenderedChildren(internalInstance, callback, argument) {
	  callback(internalInstance, argument);

	  if (internalInstance._renderedComponent) {
	    traverseRenderedChildren(internalInstance._renderedComponent, callback, argument);
	  } else {
	    for (var key in internalInstance._renderedChildren) {
	      if (internalInstance._renderedChildren.hasOwnProperty(key)) {
	        traverseRenderedChildren(internalInstance._renderedChildren[key], callback, argument);
	      }
	    }
	  }
	}

	function setPendingForceUpdate(internalInstance) {
	  if (internalInstance._pendingForceUpdate === false) {
	    internalInstance._pendingForceUpdate = true;
	  }
	}

	function forceUpdateIfPending(internalInstance, React) {
	  if (internalInstance._pendingForceUpdate === true) {
	    var publicInstance = internalInstance._instance;
	    React.Component.prototype.forceUpdate.call(publicInstance);
	  }
	}

	function getForceUpdate(React) {
	  return function (instance) {
	    var internalInstance = instance._reactInternalInstance;
	    traverseRenderedChildren(internalInstance, setPendingForceUpdate);
	    traverseRenderedChildren(internalInstance, forceUpdateIfPending, React);
	  };
	}

	module.exports = exports["default"];

/***/ },
/* 148 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {if (typeof window !== "undefined") {
	    module.exports = window;
	} else if (typeof global !== "undefined") {
	    module.exports = global;
	} else if (typeof self !== "undefined"){
	    module.exports = self;
	} else {
	    module.exports = {};
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(1);

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(338);

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(468);

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.I18nextProvider = exports.Interpolate = exports.translate = exports.loadNamespaces = undefined;

	var _translate = __webpack_require__(153);

	var _translate2 = _interopRequireDefault(_translate);

	var _interpolate = __webpack_require__(154);

	var _interpolate2 = _interopRequireDefault(_interpolate);

	var _I18nextProvider = __webpack_require__(155);

	var _I18nextProvider2 = _interopRequireDefault(_I18nextProvider);

	var _loadNamespaces = __webpack_require__(156);

	var _loadNamespaces2 = _interopRequireDefault(_loadNamespaces);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.loadNamespaces = _loadNamespaces2.default;
	exports.translate = _translate2.default;
	exports.Interpolate = _interpolate2.default;
	exports.I18nextProvider = _I18nextProvider2.default;

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	exports.default = translate;

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function getDisplayName(component) {
	  return component.displayName || component.name || 'Component';
	}

	function translate(namespaces) {
	  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var _options$withRef = options.withRef;
	  var withRef = _options$withRef === undefined ? false : _options$withRef;
	  var _options$wait = options.wait;
	  var wait = _options$wait === undefined ? false : _options$wait;


	  return function Wrapper(WrappedComponent) {
	    var i18n = void 0;

	    var Translate = function (_Component) {
	      _inherits(Translate, _Component);

	      function Translate(props, context) {
	        _classCallCheck(this, Translate);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Translate).call(this, props, context));

	        i18n = context.i18n;
	        namespaces = namespaces || i18n.options.defaultNS;

	        _this.state = {
	          i18nLoadedAt: null,
	          ready: false
	        };

	        _this.onI18nChanged = _this.onI18nChanged.bind(_this);
	        return _this;
	      }

	      _createClass(Translate, [{
	        key: 'getChildContext',
	        value: function getChildContext() {
	          return { t: this.t };
	        }
	      }, {
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	          var _this2 = this;

	          this.mounted = true;
	          i18n.loadNamespaces(namespaces, function () {
	            _this2.setState({ ready: true });
	          });
	          this.t = i18n.getFixedT(null, namespaces);
	        }
	      }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	          i18n.on('languageChanged loaded', this.onI18nChanged);
	        }
	      }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	          this.mounted = false;
	          if (this.onI18nChanged) {
	            i18n.off('languageChanged', this.onI18nChanged);
	            i18n.off('loaded', this.onI18nChanged);
	          }
	        }
	      }, {
	        key: 'onI18nChanged',
	        value: function onI18nChanged() {
	          if (!this.mounted) return;

	          this.setState({ i18nLoadedAt: new Date() });
	        }
	      }, {
	        key: 'getWrappedInstance',
	        value: function getWrappedInstance() {
	          if (!withRef) {
	            // eslint-disable-next-line no-console
	            console.error('To access the wrapped instance, you need to specify ' + '{ withRef: true } as the second argument of the translate() call.');
	          }

	          return this.refs.wrappedInstance;
	        }
	      }, {
	        key: 'render',
	        value: function render() {
	          var _state = this.state;
	          var i18nLoadedAt = _state.i18nLoadedAt;
	          var ready = _state.ready;

	          var extraProps = { i18nLoadedAt: i18nLoadedAt, t: this.t };

	          if (withRef) {
	            extraProps.ref = 'wrappedInstance';
	          }

	          if (!ready && wait) return null;

	          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, extraProps));
	        }
	      }]);

	      return Translate;
	    }(_react.Component);

	    Translate.WrappedComponent = WrappedComponent;

	    Translate.contextTypes = {
	      i18n: _react.PropTypes.object.isRequired
	    };

	    Translate.childContextTypes = {
	      t: _react.PropTypes.func.isRequired
	    };

	    Translate.displayName = 'Translate[' + getDisplayName(WrappedComponent) + ']';

	    Translate.namespaces = namespaces;

	    return Translate;
	  };
	}

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Interpolate = function (_Component) {
	  _inherits(Interpolate, _Component);

	  function Interpolate(props, context) {
	    _classCallCheck(this, Interpolate);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Interpolate).call(this, props, context));

	    _this.i18n = context.i18n;
	    _this.t = context.t;
	    return _this;
	  }

	  _createClass(Interpolate, [{
	    key: 'render',
	    value: function render() {
	      var _this2 = this;

	      var parent = this.props.parent || 'span';
	      var REGEXP = this.props.regexp || this.i18n.services.interpolator.regexp;

	      var tOpts = _extends({}, this.props.options, { interpolation: { prefix: '#$?', suffix: '?$#' } });
	      var format = this.t(this.props.i18nKey, tOpts);

	      if (!format || typeof format !== 'string') return _react2.default.createElement('noscript', null);

	      var children = [];

	      format.split(REGEXP).reduce(function (memo, match, index) {
	        var child;

	        if (index % 2 === 0) {
	          if (match.length === 0) return memo;
	          child = match;
	        } else {
	          child = _this2.props[match];
	        }

	        memo.push(child);
	        return memo;
	      }, children);

	      return _react2.default.createElement.apply(this, [parent, this.props].concat(children));
	    }
	  }]);

	  return Interpolate;
	}(_react.Component);

	Interpolate.contextTypes = {
	  i18n: _react.PropTypes.object.isRequired,
	  t: _react.PropTypes.func.isRequired
	};

	exports.default = Interpolate;

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var I18nextProvider = function (_Component) {
	  _inherits(I18nextProvider, _Component);

	  function I18nextProvider(props, context) {
	    _classCallCheck(this, I18nextProvider);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(I18nextProvider).call(this, props, context));

	    _this.i18n = props.i18n;
	    return _this;
	  }

	  _createClass(I18nextProvider, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { i18n: this.i18n };
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if (this.props.i18n !== nextProps.i18n) {
	        console.error('[react-i18next][I18nextProvider]does not support changing the i18n object.');
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var children = this.props.children;

	      return _react.Children.only(children);
	    }
	  }]);

	  return I18nextProvider;
	}(_react.Component);

	I18nextProvider.propTypes = {
	  i18n: _react.PropTypes.object.isRequired,
	  children: _react.PropTypes.element.isRequired
	};

	I18nextProvider.childContextTypes = {
	  i18n: _react.PropTypes.object.isRequired
	};

	exports.default = I18nextProvider;

/***/ },
/* 156 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.default = loadNamespaces;
	// Borrowed from https://github.com/Rezonans/redux-async-connect/blob/master/modules/ReduxAsyncConnect.js#L16
	function eachComponents(components, iterator) {
	  for (var i = 0, l = components.length; i < l; i++) {
	    // eslint-disable-line id-length
	    if (_typeof(components[i]) === 'object') {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.entries(components[i])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2);

	          var key = _step$value[0];
	          var value = _step$value[1];

	          iterator(value, i, key);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    } else {
	      iterator(components[i], i);
	    }
	  }
	}

	function filterAndFlattenComponents(components) {
	  var flattened = [];
	  eachComponents(components, function (Component) {
	    if (Component && Component.namespaces) {

	      Component.namespaces.forEach(function (namespace) {
	        if (flattened.indexOf(namespace) === -1) {
	          flattened.push(namespace);
	        }
	      });
	    }
	  });
	  return flattened;
	}

	function loadNamespaces(_ref) {
	  var components = _ref.components;
	  var i18n = _ref.i18n;

	  var allNamespaces = filterAndFlattenComponents(components);

	  return new Promise(function (resolve) {
	    i18n.loadNamespaces(allNamespaces, resolve);
	  });
	}

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(158);

	var _reduxSaga = __webpack_require__(159);

	var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

	var _reducers = __webpack_require__(160);

	var _reducers2 = _interopRequireDefault(_reducers);

	var _sagas = __webpack_require__(165);

	var _sagas2 = _interopRequireDefault(_sagas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sageMiddleware = (0, _reduxSaga2.default)();

	var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.compose)((0, _redux.applyMiddleware)(sageMiddleware), typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : function (f) {
	  return f;
	}));

	sageMiddleware.run(_sagas2.default);

	exports.default = store;


	if (true) {
	  module.hot.accept(160, function () {
	    var next = __webpack_require__(160).reducers;
	    store.replaceReducer(next);
	  });
	  module.hot.decline(165);
	}

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(475);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(554);

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(158);

	var _reducers = __webpack_require__(161);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.combineReducers)({
	  build: _reducers2.default
	});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(158);

	var _themes = __webpack_require__(162);

	var _themes2 = _interopRequireDefault(_themes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = (0, _redux.combineReducers)({
	  themes: _themes2.default,
	  extensions: _themes2.default
	});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isReady = exports.isLoading = undefined;

	var _redux = __webpack_require__(158);

	var _actiontypes = __webpack_require__(163);

	var t = _interopRequireWildcard(_actiontypes);

	var _reducerCreators = __webpack_require__(164);

	var rC = _interopRequireWildcard(_reducerCreators);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var isLoading = exports.isLoading = rC.isLoadingCreator({
	  requested: t.THEME_LOAD_REQUESTED,
	  succeed: t.THEME_LOAD_SUCCEED,
	  failed: t.THEME_LOAD_FAILED
	});

	var isReady = exports.isReady = rC.isReadyCreator({
	  requested: t.THEME_LOAD_REQUESTED,
	  succeed: t.THEME_LOAD_SUCCEED
	});

	exports.default = (0, _redux.combineReducers)({
	  isLoading: isLoading,
	  isReady: isReady
	});

/***/ },
/* 163 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var THEME_LOAD_REQUESTED = exports.THEME_LOAD_REQUESTED = 'build/THEME_LOAD_REQUESTED';
	var THEME_LOAD_SUCCEED = exports.THEME_LOAD_SUCCEED = 'build/THEME_LOAD_SUCCEED';
	var THEME_LOAD_FAILED = exports.THEME_LOAD_FAILED = 'build/THEME_LOAD_FAILED';

	var EXTENSION_LOAD_REQUESTED = exports.EXTENSION_LOAD_REQUESTED = 'build/EXTENSION_LOAD_REQUESTED';
	var EXTENSION_LOAD_SUCCEED = exports.EXTENSION_LOAD_SUCCEED = 'build/EXTENSION_LOAD_SUCCEED';
	var EXTENSION_LOAD_FAILED = exports.EXTENSION_LOAD_FAILED = 'build/EXTENSION_LOAD_FAILED';

/***/ },
/* 164 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var isLoadingCreator = exports.isLoadingCreator = function isLoadingCreator(_ref) {
	  var requested = _ref.requested;
	  var succeed = _ref.succeed;
	  var failed = _ref.failed;
	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	      case requested:
	        return true;
	      case succeed:
	      case failed:
	        return false;
	      default:
	        return state;
	    }
	  };
	};

	var isReadyCreator = exports.isReadyCreator = function isReadyCreator(_ref2) {
	  var requested = _ref2.requested;
	  var succeed = _ref2.succeed;
	  return function () {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	      case succeed:
	        return true;
	      case requested:
	        return false;
	      default:
	        return state;
	    }
	  };
	};

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = rootSaga;

	var _effects = __webpack_require__(166);

	var _sagas = __webpack_require__(167);

	var _sagas2 = _interopRequireDefault(_sagas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _marked = [rootSaga].map(regeneratorRuntime.mark);

	function rootSaga() {
	  return regeneratorRuntime.wrap(function rootSaga$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return [(0, _effects.fork)(_sagas2.default)];

	        case 2:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this);
	}

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = (__webpack_require__(5))(566);

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadExtension = loadExtension;
	exports.loadDefaultExtensions = loadDefaultExtensions;
	exports.default = sagas;

	var _effects = __webpack_require__(166);

	var _actions = __webpack_require__(168);

	var _extensions = __webpack_require__(169);

	var _extensions2 = _interopRequireDefault(_extensions);

	var _worona = __webpack_require__(170);

	var _worona2 = _interopRequireDefault(_worona);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _marked = [loadExtension, loadDefaultExtensions, sagas].map(regeneratorRuntime.mark);

	var requireExtension = function requireExtension(name) {
	  return new Promise(function (resolve) {
	    var req = __webpack_require__(171)("./" + name + '/src/index.js');
	    req(function (extension) {
	      return resolve(extension);
	    });
	  });
	};

	var requireTheme = function requireTheme(name) {
	  return new Promise(function (resolve) {
	    var req = __webpack_require__(184)("./" + name + '/src/index.js');
	    req(function (theme) {
	      return resolve(theme);
	    });
	  });
	};

	function loadExtension(name) {
	  var extension;
	  return regeneratorRuntime.wrap(function loadExtension$(_context) {
	    while (1) {
	      switch (_context.prev = _context.next) {
	        case 0:
	          _context.next = 2;
	          return (0, _effects.put)((0, _actions.extensionLoadRequested)(name));

	        case 2:
	          _context.next = 4;
	          return (0, _effects.call)(requireExtension, name);

	        case 4:
	          extension = _context.sent;

	          _worona2.default.actions[name] = extension.actions;
	          _worona2.default.actiontypes[name] = extension.actiontypes;
	          _worona2.default.selectors[name] = extension.selectors;

	        case 8:
	        case 'end':
	          return _context.stop();
	      }
	    }
	  }, _marked[0], this);
	}

	function loadDefaultExtensions() {
	  return regeneratorRuntime.wrap(function loadDefaultExtensions$(_context2) {
	    while (1) {
	      switch (_context2.prev = _context2.next) {
	        case 0:
	          _context2.next = 2;
	          return _extensions2.default.map(function (name) {
	            return (0, _effects.fork)(loadExtension, name);
	          });

	        case 2:
	        case 'end':
	          return _context2.stop();
	      }
	    }
	  }, _marked[1], this);
	}

	function sagas() {
	  return regeneratorRuntime.wrap(function sagas$(_context3) {
	    while (1) {
	      switch (_context3.prev = _context3.next) {
	        case 0:
	          _context3.next = 2;
	          return [(0, _effects.fork)(loadDefaultExtensions)];

	        case 2:
	        case 'end':
	          return _context3.stop();
	      }
	    }
	  }, _marked[2], this);
	}

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.extensionLoadFailed = exports.extensionLoadSucceed = exports.extensionLoadRequested = exports.themeLoadFailed = exports.themeLoadSucceed = exports.themeLoadRequested = undefined;

	var _actiontypes = __webpack_require__(163);

	var t = _interopRequireWildcard(_actiontypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var themeLoadRequested = exports.themeLoadRequested = function themeLoadRequested(name) {
	  return { type: t.THEME_LOAD_REQUESTED, name: name };
	};
	var themeLoadSucceed = exports.themeLoadSucceed = function themeLoadSucceed() {
	  return { type: t.THEME_LOAD_SUCCEED };
	};
	var themeLoadFailed = exports.themeLoadFailed = function themeLoadFailed(error) {
	  return { type: t.THEME_LOAD_FAILED, error: error };
	};

	var extensionLoadRequested = exports.extensionLoadRequested = function extensionLoadRequested(name) {
	  return { type: t.EXTENSION_LOAD_REQUESTED, name: name };
	};
	var extensionLoadSucceed = exports.extensionLoadSucceed = function extensionLoadSucceed() {
	  return { type: t.EXTENSION_LOAD_SUCCEED };
	};
	var extensionLoadFailed = exports.extensionLoadFailed = function extensionLoadFailed(error) {
	  return { type: t.EXTENSION_LOAD_FAILED, error: error };
	};

/***/ },
/* 169 */
/***/ function(module, exports) {

	module.exports = [
		"connection",
		"accounts"
	];

/***/ },
/* 170 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var actions = exports.actions = {};
	var actiontypes = exports.actiontypes = {};
	var selectors = exports.selectors = {};
	var libs = exports.libs = {};
	var reducerCreators = exports.reducerCreators = {};
	var sagaCreators = exports.sagaCreators = {};
	var messages = exports.messages = {};

	var worona = {
	  actions: actions,
	  actiontypes: actiontypes,
	  selectors: selectors,
	  libs: libs,
	  reducerCreators: reducerCreators,
	  sagaCreators: sagaCreators,
	  messages: messages
	};

	exports.default = worona;


	if (typeof window !== 'undefined') window.worona = worona;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./accounts/src/index.js": 172,
		"./connection/src/index.js": 177
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 171;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/* nsure */(1, function(require) {
			cb(__webpack_require__(173));
		});
	}

/***/ },
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/* nsure */(2, function(require) {
			cb(__webpack_require__(178));
		});
	}

/***/ },
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./bulma/src/index.js": 185
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 184;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(cb) {
		__webpack_require__.e/* nsure */(3, function(require) {
			cb(__webpack_require__(186));
		});
	}

/***/ },
/* 186 */,
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _i18next = __webpack_require__(188);

	var _i18next2 = _interopRequireDefault(_i18next);

	var _i18nextXhrBackend = __webpack_require__(204);

	var _i18nextXhrBackend2 = _interopRequireDefault(_i18nextXhrBackend);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_i18next2.default
	// .use(XHR)
	.init({
	  lng: 'es',
	  fallbackLng: 'en',
	  ns: 'connection',
	  debug: true,
	  interpolation: {
	    escapeValue: false
	  }
	});

	// backend: {
	//   loadPath: '/locales/{{ns}}.{{lng}}.json',
	//   allowMultiLoading: false,
	// },
	exports.default = _i18next2.default;

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(189).default;


/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _i18next = __webpack_require__(190);

	var _i18next2 = _interopRequireDefault(_i18next);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _i18next2.default;

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	var _EventEmitter2 = __webpack_require__(192);

	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

	var _ResourceStore = __webpack_require__(193);

	var _ResourceStore2 = _interopRequireDefault(_ResourceStore);

	var _Translator = __webpack_require__(195);

	var _Translator2 = _interopRequireDefault(_Translator);

	var _LanguageUtils = __webpack_require__(198);

	var _LanguageUtils2 = _interopRequireDefault(_LanguageUtils);

	var _PluralResolver = __webpack_require__(199);

	var _PluralResolver2 = _interopRequireDefault(_PluralResolver);

	var _Interpolator = __webpack_require__(200);

	var _Interpolator2 = _interopRequireDefault(_Interpolator);

	var _BackendConnector = __webpack_require__(201);

	var _BackendConnector2 = _interopRequireDefault(_BackendConnector);

	var _CacheConnector = __webpack_require__(202);

	var _CacheConnector2 = _interopRequireDefault(_CacheConnector);

	var _defaults2 = __webpack_require__(203);

	var _postProcessor = __webpack_require__(196);

	var _postProcessor2 = _interopRequireDefault(_postProcessor);

	var _v = __webpack_require__(197);

	var compat = _interopRequireWildcard(_v);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var I18n = function (_EventEmitter) {
	  _inherits(I18n, _EventEmitter);

	  function I18n() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    _classCallCheck(this, I18n);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.options = (0, _defaults2.transformOptions)(options);
	    _this.services = {};
	    _this.logger = _logger2.default;
	    _this.modules = {};

	    if (callback && !_this.isInitialized) _this.init(options, callback);
	    return _this;
	  }

	  I18n.prototype.init = function init(options, callback) {
	    var _this2 = this;

	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};

	    if (options.compatibilityAPI === 'v1') {
	      this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertAPIOptions(options)), {});
	    } else if (options.compatibilityJSON === 'v1') {
	      this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertJSONOptions(options)), {});
	    } else {
	      this.options = _extends({}, (0, _defaults2.get)(), this.options, (0, _defaults2.transformOptions)(options));
	    }
	    if (!callback) callback = function callback() {};

	    function createClassOnDemand(ClassOrObject) {
	      if (!ClassOrObject) return;
	      if (typeof ClassOrObject === 'function') return new ClassOrObject();
	      return ClassOrObject;
	    }

	    // init services
	    if (!this.options.isClone) {
	      if (this.modules.logger) {
	        _logger2.default.init(createClassOnDemand(this.modules.logger), this.options);
	      } else {
	        _logger2.default.init(null, this.options);
	      }

	      var lu = new _LanguageUtils2.default(this.options);
	      this.store = new _ResourceStore2.default(this.options.resources, this.options);

	      var s = this.services;
	      s.logger = _logger2.default;
	      s.resourceStore = this.store;
	      s.resourceStore.on('added removed', function (lng, ns) {
	        s.cacheConnector.save();
	      });
	      s.languageUtils = lu;
	      s.pluralResolver = new _PluralResolver2.default(lu, { prepend: this.options.pluralSeparator, compatibilityJSON: this.options.compatibilityJSON });
	      s.interpolator = new _Interpolator2.default(this.options);

	      s.backendConnector = new _BackendConnector2.default(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.backendConnector.on('*', function (event) {
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });

	      s.backendConnector.on('loaded', function (loaded) {
	        s.cacheConnector.save();
	      });

	      s.cacheConnector = new _CacheConnector2.default(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
	      // pipe events from backendConnector
	      s.cacheConnector.on('*', function (event) {
	        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	          args[_key2 - 1] = arguments[_key2];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });

	      if (this.modules.languageDetector) {
	        s.languageDetector = createClassOnDemand(this.modules.languageDetector);
	        s.languageDetector.init(s, this.options.detection, this.options);
	      }

	      this.translator = new _Translator2.default(this.services, this.options);
	      // pipe events from translator
	      this.translator.on('*', function (event) {
	        for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
	          args[_key3 - 1] = arguments[_key3];
	        }

	        _this2.emit.apply(_this2, [event].concat(args));
	      });
	    }

	    // append api
	    var storeApi = ['getResource', 'addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle', 'hasResourceBundle', 'getResourceBundle'];
	    storeApi.forEach(function (fcName) {
	      _this2[fcName] = function () {
	        return this.store[fcName].apply(this.store, arguments);
	      };
	    });

	    // TODO: COMPATIBILITY remove this
	    if (this.options.compatibilityAPI === 'v1') compat.appendBackwardsAPI(this);

	    var load = function load() {
	      _this2.changeLanguage(_this2.options.lng, function (err, t) {
	        _this2.emit('initialized', _this2.options);
	        _this2.logger.log('initialized', _this2.options);

	        callback(err, t);
	      });
	    };

	    if (this.options.resources || !this.options.initImmediate) {
	      load();
	    } else {
	      setTimeout(load, 0);
	    }

	    return this;
	  };

	  I18n.prototype.loadResources = function loadResources(callback) {
	    var _this3 = this;

	    if (!callback) callback = function callback() {};

	    if (!this.options.resources) {
	      var _ret = function () {
	        if (_this3.language && _this3.language.toLowerCase() === 'cimode') return {
	            v: callback()
	          }; // avoid loading resources for cimode

	        var toLoad = [];

	        var append = function append(lng) {
	          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
	          lngs.forEach(function (l) {
	            if (toLoad.indexOf(l) < 0) toLoad.push(l);
	          });
	        };

	        append(_this3.language);

	        if (_this3.options.preload) {
	          _this3.options.preload.forEach(function (l) {
	            append(l);
	          });
	        }

	        _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function () {
	          _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
	        });
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      callback(null);
	    }
	  };

	  I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
	    if (!lngs) lngs = this.languages;
	    if (!ns) ns = this.options.ns;
	    this.services.backendConnector.reload(lngs, ns);
	  };

	  I18n.prototype.use = function use(module) {
	    if (module.type === 'backend') {
	      this.modules.backend = module;
	    }

	    if (module.type === 'cache') {
	      this.modules.cache = module;
	    }

	    if (module.type === 'logger' || module.log && module.warn && module.warn) {
	      this.modules.logger = module;
	    }

	    if (module.type === 'languageDetector') {
	      this.modules.languageDetector = module;
	    }

	    if (module.type === 'postProcessor') {
	      _postProcessor2.default.addPostProcessor(module);
	    }

	    return this;
	  };

	  I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
	    var _this4 = this;

	    var done = function done(err) {
	      if (lng) {
	        _this4.emit('languageChanged', lng);
	        _this4.logger.log('languageChanged', lng);
	      }

	      if (callback) callback(err, function () {
	        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	          args[_key4] = arguments[_key4];
	        }

	        return _this4.t.apply(_this4, args);
	      });
	    };

	    if (!lng && this.services.languageDetector) lng = this.services.languageDetector.detect();

	    if (lng) {
	      this.language = lng;
	      this.languages = this.services.languageUtils.toResolveHierarchy(lng);

	      this.translator.changeLanguage(lng);

	      if (this.services.languageDetector) this.services.languageDetector.cacheUserLanguage(lng);
	    }

	    this.loadResources(function (err) {
	      done(err);
	    });
	  };

	  I18n.prototype.getFixedT = function getFixedT(lng, ns) {
	    var _this5 = this;

	    var fixedT = function fixedT(key, options) {
	      options = options || {};
	      options.lng = options.lng || fixedT.lng;
	      options.ns = options.ns || fixedT.ns;
	      return _this5.t(key, options);
	    };
	    fixedT.lng = lng;
	    fixedT.ns = ns;
	    return fixedT;
	  };

	  I18n.prototype.t = function t() {
	    return this.translator && this.translator.translate.apply(this.translator, arguments);
	  };

	  I18n.prototype.exists = function exists() {
	    return this.translator && this.translator.exists.apply(this.translator, arguments);
	  };

	  I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
	    this.options.defaultNS = ns;
	  };

	  I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
	    var _this6 = this;

	    if (!this.options.ns) return callback && callback();
	    if (typeof ns === 'string') ns = [ns];

	    ns.forEach(function (n) {
	      if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
	    });

	    this.loadResources(callback);
	  };

	  I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
	    if (typeof lngs === 'string') lngs = [lngs];
	    var preloaded = this.options.preload || [];

	    var newLngs = lngs.filter(function (lng) {
	      return preloaded.indexOf(lng) < 0;
	    });
	    // Exit early if all given languages are already preloaded
	    if (!newLngs.length) return callback();

	    this.options.preload = preloaded.concat(newLngs);
	    this.loadResources(callback);
	  };

	  I18n.prototype.dir = function dir(lng) {
	    if (!lng) lng = this.language;

	    var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];

	    return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
	  };

	  I18n.prototype.createInstance = function createInstance() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    return new I18n(options, callback);
	  };

	  I18n.prototype.cloneInstance = function cloneInstance() {
	    var _this7 = this;

	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var callback = arguments[1];

	    var clone = new I18n(_extends({}, options, this.options, { isClone: true }), callback);
	    var membersToCopy = ['store', 'translator', 'services', 'language'];
	    membersToCopy.forEach(function (m) {
	      clone[m] = _this7[m];
	    });

	    return clone;
	  };

	  return I18n;
	}(_EventEmitter3.default);

	exports.default = new I18n();

/***/ },
/* 191 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var consoleLogger = {
	  type: 'logger',

	  log: function log(args) {
	    this._output('log', args);
	  },
	  warn: function warn(args) {
	    this._output('warn', args);
	  },
	  error: function error(args) {
	    this._output('error', args);
	  },
	  _output: function _output(type, args) {
	    if (console && console[type]) console[type].apply(console, Array.prototype.slice.call(args));
	  }
	};

	var Logger = function () {
	  function Logger(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Logger);

	    this.subs = [];
	    this.init(concreteLogger, options);
	  }

	  Logger.prototype.init = function init(concreteLogger) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    this.prefix = options.prefix || 'i18next:';
	    this.logger = concreteLogger || consoleLogger;
	    this.options = options;
	    this.debug = options.debug === false ? false : true;
	  };

	  Logger.prototype.setDebug = function setDebug(bool) {
	    this.debug = bool;
	    this.subs.forEach(function (sub) {
	      sub.setDebug(bool);
	    });
	  };

	  Logger.prototype.log = function log() {
	    this.forward(arguments, 'log', '', true);
	  };

	  Logger.prototype.warn = function warn() {
	    this.forward(arguments, 'warn', '', true);
	  };

	  Logger.prototype.error = function error() {
	    this.forward(arguments, 'error', '');
	  };

	  Logger.prototype.deprecate = function deprecate() {
	    this.forward(arguments, 'warn', 'WARNING DEPRECATED: ', true);
	  };

	  Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
	    if (debugOnly && !this.debug) return;
	    if (typeof args[0] === 'string') args[0] = prefix + this.prefix + ' ' + args[0];
	    this.logger[lvl](args);
	  };

	  Logger.prototype.create = function create(moduleName) {
	    var sub = new Logger(this.logger, _extends({ prefix: this.prefix + ':' + moduleName + ':' }, this.options));
	    this.subs.push(sub);

	    return sub;
	  };

	  // createInstance(options = {}) {
	  //   return new Logger(options, callback);
	  // }

	  return Logger;
	}();

	;

	exports.default = new Logger();

/***/ },
/* 192 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var EventEmitter = function () {
		function EventEmitter() {
			_classCallCheck(this, EventEmitter);

			this.observers = {};
		}

		EventEmitter.prototype.on = function on(events, listener) {
			var _this = this;

			events.split(' ').forEach(function (event) {
				_this.observers[event] = _this.observers[event] || [];
				_this.observers[event].push(listener);
			});
		};

		EventEmitter.prototype.off = function off(event, listener) {
			var _this2 = this;

			if (!this.observers[event]) {
				return;
			}

			this.observers[event].forEach(function () {
				if (!listener) {
					delete _this2.observers[event];
				} else {
					var index = _this2.observers[event].indexOf(listener);
					if (index > -1) {
						_this2.observers[event].splice(index, 1);
					}
				}
			});
		};

		EventEmitter.prototype.emit = function emit(event) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			if (this.observers[event]) {
				this.observers[event].forEach(function (observer) {
					observer.apply(undefined, args);
				});
			}

			if (this.observers['*']) {
				this.observers['*'].forEach(function (observer) {
					var _ref;

					observer.apply(observer, (_ref = [event]).concat.apply(_ref, args));
				});
			}
		};

		return EventEmitter;
	}();

	exports.default = EventEmitter;

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _EventEmitter2 = __webpack_require__(192);

	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

	var _utils = __webpack_require__(194);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var ResourceStore = function (_EventEmitter) {
	  _inherits(ResourceStore, _EventEmitter);

	  function ResourceStore() {
	    var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { ns: ['translation'], defaultNS: 'translation' } : arguments[1];

	    _classCallCheck(this, ResourceStore);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.data = data;
	    _this.options = options;
	    return _this;
	  }

	  ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
	    if (this.options.ns.indexOf(ns) < 0) {
	      this.options.ns.push(ns);
	    }
	  };

	  ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
	    var index = this.options.ns.indexOf(ns);
	    if (index > -1) {
	      this.options.ns.splice(index, 1);
	    }
	  };

	  ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    var keySeparator = options.keySeparator || this.options.keySeparator;
	    if (keySeparator === undefined) keySeparator = '.';

	    var path = [lng, ns];
	    if (key && typeof key !== 'string') path = path.concat(key);
	    if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	    }

	    return utils.getPath(this.data, path);
	  };

	  ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
	    var options = arguments.length <= 4 || arguments[4] === undefined ? { silent: false } : arguments[4];

	    var keySeparator = this.options.keySeparator;
	    if (keySeparator === undefined) keySeparator = '.';

	    var path = [lng, ns];
	    if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	      value = ns;
	      ns = path[1];
	    }

	    this.addNamespaces(ns);

	    utils.setPath(this.data, path, value);

	    if (!options.silent) this.emit('added', lng, ns, key, value);
	  };

	  ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
	    for (var m in resources) {
	      if (typeof resources[m] === 'string') this.addResource(lng, ns, m, resources[m], { silent: true });
	    }
	    this.emit('added', lng, ns, resources);
	  };

	  ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
	    var path = [lng, ns];
	    if (lng.indexOf('.') > -1) {
	      path = lng.split('.');
	      deep = resources;
	      resources = ns;
	      ns = path[1];
	    }

	    this.addNamespaces(ns);

	    var pack = utils.getPath(this.data, path) || {};

	    if (deep) {
	      utils.deepExtend(pack, resources, overwrite);
	    } else {
	      pack = _extends({}, pack, resources);
	    }

	    utils.setPath(this.data, path, pack);

	    this.emit('added', lng, ns, resources);
	  };

	  ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
	    if (this.hasResourceBundle(lng, ns)) {
	      delete this.data[lng][ns];
	    }
	    this.removeNamespaces(ns);

	    this.emit('removed', lng, ns);
	  };

	  ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
	    return this.getResource(lng, ns) !== undefined;
	  };

	  ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
	    if (!ns) ns = this.options.defaultNS;

	    // TODO: COMPATIBILITY remove extend in v2.1.0
	    if (this.options.compatibilityAPI === 'v1') return _extends({}, this.getResource(lng, ns));

	    return this.getResource(lng, ns);
	  };

	  ResourceStore.prototype.toJSON = function toJSON() {
	    return this.data;
	  };

	  return ResourceStore;
	}(_EventEmitter3.default);

	exports.default = ResourceStore;

/***/ },
/* 194 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.makeString = makeString;
	exports.copy = copy;
	exports.setPath = setPath;
	exports.pushPath = pushPath;
	exports.getPath = getPath;
	exports.deepExtend = deepExtend;
	exports.regexEscape = regexEscape;
	exports.escape = escape;
	function makeString(object) {
	  if (object == null) return '';
	  return '' + object;
	}

	function copy(a, s, t) {
	  a.forEach(function (m) {
	    if (s[m]) t[m] = s[m];
	  });
	}

	function getLastOfPath(object, path, Empty) {
	  function cleanKey(key) {
	    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
	  }

	  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');
	  while (stack.length > 1) {
	    if (!object) return {};

	    var key = cleanKey(stack.shift());
	    if (!object[key] && Empty) object[key] = new Empty();
	    object = object[key];
	  }

	  if (!object) return {};
	  return {
	    obj: object,
	    k: cleanKey(stack.shift())
	  };
	}

	function setPath(object, path, newValue) {
	  var _getLastOfPath = getLastOfPath(object, path, Object);

	  var obj = _getLastOfPath.obj;
	  var k = _getLastOfPath.k;


	  obj[k] = newValue;
	}

	function pushPath(object, path, newValue, concat) {
	  var _getLastOfPath2 = getLastOfPath(object, path, Object);

	  var obj = _getLastOfPath2.obj;
	  var k = _getLastOfPath2.k;


	  obj[k] = obj[k] || [];
	  if (concat) obj[k] = obj[k].concat(newValue);
	  if (!concat) obj[k].push(newValue);
	}

	function getPath(object, path) {
	  var _getLastOfPath3 = getLastOfPath(object, path);

	  var obj = _getLastOfPath3.obj;
	  var k = _getLastOfPath3.k;


	  if (!obj) return undefined;
	  return obj[k];
	}

	function deepExtend(target, source, overwrite) {
	  for (var prop in source) {
	    if (prop in target) {
	      // If we reached a leaf string in target or source then replace with source or skip depending on the 'overwrite' switch
	      if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
	        if (overwrite) target[prop] = source[prop];
	      } else {
	        deepExtend(target[prop], source[prop], overwrite);
	      }
	    } else {
	      target[prop] = source[prop];
	    }
	  }return target;
	}

	function regexEscape(str) {
	  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
	}

	/* eslint-disable */
	var _entityMap = {
	  "&": "&amp;",
	  "<": "&lt;",
	  ">": "&gt;",
	  '"': '&quot;',
	  "'": '&#39;',
	  "/": '&#x2F;'
	};
	/* eslint-enable */

	function escape(data) {
	  if (typeof data === 'string') {
	    return data.replace(/[&<>"'\/]/g, function (s) {
	      return _entityMap[s];
	    });
	  } else {
	    return data;
	  }
	}

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	var _EventEmitter2 = __webpack_require__(192);

	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

	var _postProcessor = __webpack_require__(196);

	var _postProcessor2 = _interopRequireDefault(_postProcessor);

	var _v = __webpack_require__(197);

	var compat = _interopRequireWildcard(_v);

	var _utils = __webpack_require__(194);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var Translator = function (_EventEmitter) {
	  _inherits(Translator, _EventEmitter);

	  function Translator(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Translator);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    utils.copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector'], services, _this);

	    _this.options = options;
	    _this.logger = _logger2.default.create('translator');
	    return _this;
	  }

	  Translator.prototype.changeLanguage = function changeLanguage(lng) {
	    if (lng) this.language = lng;
	  };

	  Translator.prototype.exists = function exists(key) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { interpolation: {} } : arguments[1];

	    if (this.options.compatibilityAPI === 'v1') {
	      options = compat.convertTOptions(options);
	    }

	    return this.resolve(key, options) !== undefined;
	  };

	  Translator.prototype.extractFromKey = function extractFromKey(key, options) {
	    var nsSeparator = options.nsSeparator || this.options.nsSeparator;
	    if (nsSeparator === undefined) nsSeparator = ':';

	    var namespaces = options.ns || this.options.defaultNS;
	    if (nsSeparator && key.indexOf(nsSeparator) > -1) {
	      var parts = key.split(nsSeparator);
	      namespaces = parts[0];
	      key = parts[1];
	    }
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    return {
	      key: key,
	      namespaces: namespaces
	    };
	  };

	  Translator.prototype.translate = function translate(keys) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') {
	      options = this.options.overloadTranslationOptionHandler(arguments);
	    } else if (this.options.compatibilityAPI === 'v1') {
	      options = compat.convertTOptions(options);
	    }

	    // non valid keys handling
	    if (keys === undefined || keys === null || keys === '') return '';
	    if (typeof keys === 'number') keys = String(keys);
	    if (typeof keys === 'string') keys = [keys];

	    // return key on CIMode
	    var lng = options.lng || this.language;
	    if (lng && lng.toLowerCase() === 'cimode') return keys[keys.length - 1];

	    // separators
	    var keySeparator = options.keySeparator || this.options.keySeparator || '.';

	    // get namespace(s)

	    var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options);

	    var key = _extractFromKey.key;
	    var namespaces = _extractFromKey.namespaces;

	    var namespace = namespaces[namespaces.length - 1];

	    // resolve from store
	    var res = this.resolve(keys, options);

	    var resType = Object.prototype.toString.apply(res);
	    var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
	    var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;

	    // object
	    if (res && typeof res !== 'string' && noObject.indexOf(resType) < 0 && !(joinArrays && resType === '[object Array]')) {
	      if (!options.returnObjects && !this.options.returnObjects) {
	        this.logger.warn('accessing an object - but returnObjects options is not enabled!');
	        return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : 'key \'' + key + ' (' + this.language + ')\' returned an object instead of string.';
	      }

	      var copy = resType === '[object Array]' ? [] : {}; // apply child translation on a copy

	      for (var m in res) {
	        copy[m] = this.translate('' + key + keySeparator + m, _extends({ joinArrays: false, ns: namespaces }, options));
	      }
	      res = copy;
	    }
	    // array special treatment
	    else if (joinArrays && resType === '[object Array]') {
	        res = res.join(joinArrays);
	        if (res) res = this.extendTranslation(res, key, options);
	      }
	      // string, empty or null
	      else {
	          var usedDefault = false,
	              usedKey = false;

	          // fallback value
	          if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
	            usedDefault = true;
	            res = options.defaultValue;
	          }
	          if (!this.isValidLookup(res)) {
	            usedKey = true;
	            res = key;
	          }

	          // save missing
	          if (usedKey || usedDefault) {
	            this.logger.log('missingKey', lng, namespace, key, res);

	            var lngs = [];
	            if (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng && this.options.fallbackLng[0]) {
	              for (var i = 0; i < this.options.fallbackLng.length; i++) {
	                lngs.push(this.options.fallbackLng[i]);
	              }
	            } else if (this.options.saveMissingTo === 'all') {
	              lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
	            } else {
	              //(this.options.saveMissingTo === 'current' || (this.options.saveMissingTo === 'fallback' && this.options.fallbackLng[0] === false) ) {
	              lngs.push(options.lng || this.language);
	            }

	            if (this.options.saveMissing) {
	              if (this.options.missingKeyHandler) {
	                this.options.missingKeyHandler(lngs, namespace, key, res);
	              } else if (this.backendConnector && this.backendConnector.saveMissing) {
	                this.backendConnector.saveMissing(lngs, namespace, key, res);
	              }
	            }

	            this.emit('missingKey', lngs, namespace, key, res);
	          }

	          // extend
	          res = this.extendTranslation(res, key, options);

	          // append namespace if still key
	          if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ':' + key;

	          // parseMissingKeyHandler
	          if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
	        }

	    // return
	    return res;
	  };

	  Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
	    var _this2 = this;

	    if (options.interpolation) this.interpolator.init(options);

	    // interpolate
	    var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
	    if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
	    res = this.interpolator.interpolate(res, data);

	    // nesting
	    res = this.interpolator.nest(res, function () {
	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return _this2.translate.apply(_this2, args);
	    }, options);

	    if (options.interpolation) this.interpolator.reset();

	    // post process
	    var postProcess = options.postProcess || this.options.postProcess;
	    var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

	    if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
	      res = _postProcessor2.default.handle(postProcessorNames, res, key, options, this);
	    }

	    return res;
	  };

	  Translator.prototype.resolve = function resolve(keys) {
	    var _this3 = this;

	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var found = void 0;

	    if (typeof keys === 'string') keys = [keys];

	    // forEach possible key
	    keys.forEach(function (k) {
	      if (_this3.isValidLookup(found)) return;

	      var _extractFromKey2 = _this3.extractFromKey(k, options);

	      var key = _extractFromKey2.key;
	      var namespaces = _extractFromKey2.namespaces;

	      if (_this3.options.fallbackNS) namespaces = namespaces.concat(_this3.options.fallbackNS);

	      var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
	      var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';

	      var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);

	      namespaces.forEach(function (ns) {
	        if (_this3.isValidLookup(found)) return;

	        codes.forEach(function (code) {
	          if (_this3.isValidLookup(found)) return;

	          var finalKey = key;
	          var finalKeys = [finalKey];

	          var pluralSuffix = void 0;
	          if (needsPluralHandling) pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);

	          // fallback for plural if context not found
	          if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);

	          // get key for context if needed
	          if (needsContextHandling) finalKeys.push(finalKey += '' + _this3.options.contextSeparator + options.context);

	          // get key for plural if needed
	          if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);

	          // iterate over finalKeys starting with most specific pluralkey (-> contextkey only) -> singularkey only
	          var possibleKey = void 0;
	          while (possibleKey = finalKeys.pop()) {
	            if (_this3.isValidLookup(found)) continue;
	            found = _this3.getResource(code, ns, possibleKey, options);
	          }
	        });
	      });
	    });

	    return found;
	  };

	  Translator.prototype.isValidLookup = function isValidLookup(res) {
	    return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
	  };

	  Translator.prototype.getResource = function getResource(code, ns, key) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    return this.resourceStore.getResource(code, ns, key, options);
	  };

	  return Translator;
	}(_EventEmitter3.default);

	exports.default = Translator;

/***/ },
/* 196 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {

	  processors: {},

	  addPostProcessor: function addPostProcessor(module) {
	    this.processors[module.name] = module;
	  },
	  handle: function handle(processors, value, key, options, translator) {
	    var _this = this;

	    processors.forEach(function (processor) {
	      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
	    });

	    return value;
	  }
	};

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.convertAPIOptions = convertAPIOptions;
	exports.convertJSONOptions = convertJSONOptions;
	exports.convertTOptions = convertTOptions;
	exports.appendBackwardsAPI = appendBackwardsAPI;

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function convertInterpolation(options) {

	  options.interpolation = {
	    unescapeSuffix: 'HTML'
	  };

	  options.interpolation.prefix = options.interpolationPrefix || '__';
	  options.interpolation.suffix = options.interpolationSuffix || '__';
	  options.interpolation.escapeValue = options.escapeInterpolation || false;

	  options.interpolation.nestingPrefix = options.reusePrefix || '$t(';
	  options.interpolation.nestingSuffix = options.reuseSuffix || ')';

	  return options;
	}

	function convertAPIOptions(options) {
	  if (options.resStore) options.resources = options.resStore;

	  if (options.ns && options.ns.defaultNs) {
	    options.defaultNS = options.ns.defaultNs;
	    options.ns = options.ns.namespaces;
	  } else {
	    options.defaultNS = options.ns || 'translation';
	  }

	  if (options.fallbackToDefaultNS && options.defaultNS) options.fallbackNS = options.defaultNS;

	  options.saveMissing = options.sendMissing;
	  options.saveMissingTo = options.sendMissingTo || 'current';
	  options.returnNull = options.fallbackOnNull ? false : true;
	  options.returnEmptyString = options.fallbackOnEmpty ? false : true;
	  options.returnObjects = options.returnObjectTrees;
	  options.joinArrays = '\n';

	  options.returnedObjectHandler = options.objectTreeKeyHandler;
	  options.parseMissingKeyHandler = options.parseMissingKey;
	  options.appendNamespaceToMissingKey = true;

	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;

	  if (options.shortcutFunction === 'sprintf') {
	    options.overloadTranslationOptionHandler = function (args) {
	      var values = [];

	      for (var i = 1; i < args.length; i++) {
	        values.push(args[i]);
	      }

	      return {
	        postProcess: 'sprintf',
	        sprintf: values
	      };
	    };
	  }

	  options.whitelist = options.lngWhitelist;
	  options.preload = options.preload;
	  if (options.load === 'current') options.load = 'currentOnly';
	  if (options.load === 'unspecific') options.load = 'languageOnly';

	  // backend
	  options.backend = options.backend || {};
	  options.backend.loadPath = options.resGetPath || 'locales/__lng__/__ns__.json';
	  options.backend.addPath = options.resPostPath || 'locales/add/__lng__/__ns__';
	  options.backend.allowMultiLoading = options.dynamicLoad;

	  // cache
	  options.cache = options.cache || {};
	  options.cache.prefix = 'res_';
	  options.cache.expirationTime = 7 * 24 * 60 * 60 * 1000;
	  options.cache.enabled = options.useLocalStorage ? true : false;

	  options = convertInterpolation(options);
	  if (options.defaultVariables) options.interpolation.defaultVariables = options.defaultVariables;

	  // TODO: deprecation
	  // if (options.getAsync === false) throw deprecation error

	  return options;
	}

	function convertJSONOptions(options) {
	  options = convertInterpolation(options);
	  options.joinArrays = '\n';

	  return options;
	}

	function convertTOptions(options) {
	  if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
	    options = convertInterpolation(options);
	  }

	  options.nsSeparator = options.nsseparator;
	  options.keySeparator = options.keyseparator;

	  options.returnObjects = options.returnObjectTrees;

	  return options;
	}

	function appendBackwardsAPI(i18n) {
	  i18n.lng = function () {
	    _logger2.default.deprecate('i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.');
	    return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
	  };

	  i18n.preload = function (lngs, cb) {
	    _logger2.default.deprecate('i18next.preload() can be replaced with i18next.loadLanguages()');
	    i18n.loadLanguages(lngs, cb);
	  };

	  i18n.setLng = function (lng, options, callback) {
	    _logger2.default.deprecate('i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.');
	    if (typeof options === 'function') {
	      callback = options;
	      options = {};
	    }
	    if (!options) options = {};

	    if (options.fixLng === true) {
	      if (callback) return callback(null, i18n.getFixedT(lng));
	    }

	    i18n.changeLanguage(lng, callback);
	  };

	  i18n.addPostProcessor = function (name, fc) {
	    _logger2.default.deprecate('i18next.addPostProcessor() can be replaced by i18next.use({ type: \'postProcessor\', name: \'name\', process: fc })');
	    i18n.use({
	      type: 'postProcessor',
	      name: name,
	      process: fc
	    });
	  };
	}

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function capitalize(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	var LanguageUtil = function () {
	  function LanguageUtil(options) {
	    _classCallCheck(this, LanguageUtil);

	    this.options = options;

	    this.whitelist = this.options.whitelist || false;
	    this.logger = _logger2.default.create('languageUtils');
	  }

	  LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
	    if (code.indexOf('-') < 0) return code;

	    var specialCases = ['NB-NO', 'NN-NO', 'nb-NO', 'nn-NO', 'nb-no', 'nn-no'];
	    var p = code.split('-');
	    return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
	  };

	  LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
	    // http://www.iana.org/assignments/language-tags/language-tags.xhtml
	    if (typeof code === 'string' && code.indexOf('-') > -1) {
	      var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
	      var p = code.split('-');

	      if (this.options.lowerCaseLng) {
	        p = p.map(function (part) {
	          return part.toLowerCase();
	        });
	      } else if (p.length === 2) {
	        p[0] = p[0].toLowerCase();
	        p[1] = p[1].toUpperCase();

	        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
	      } else if (p.length === 3) {
	        p[0] = p[0].toLowerCase();

	        // if lenght 2 guess it's a country
	        if (p[1].length === 2) p[1] = p[1].toUpperCase();
	        if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();

	        if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
	        if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
	      }

	      return p.join('-');
	    } else {
	      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
	    }
	  };

	  LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code) {
	    if (this.options.load === 'languageOnly') code = this.getLanguagePartFromCode(code);
	    return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
	  };

	  LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
	    var _this = this;

	    fallbackCode = fallbackCode || this.options.fallbackLng || [];
	    if (typeof fallbackCode === 'string') fallbackCode = [fallbackCode];

	    var codes = [];
	    var addCode = function addCode(code) {
	      if (_this.isWhitelisted(code)) {
	        codes.push(code);
	      } else {
	        _this.logger.warn('rejecting non-whitelisted language code: ' + code);
	      }
	    };

	    if (typeof code === 'string' && code.indexOf('-') > -1) {
	      if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
	      if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
	    } else if (typeof code === 'string') {
	      addCode(this.formatLanguageCode(code));
	    }

	    fallbackCode.forEach(function (fc) {
	      if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
	    });

	    return codes;
	  };

	  return LanguageUtil;
	}();

	;

	exports.default = LanguageUtil;

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// definition http://translate.sourceforge.net/wiki/l10n/pluralforms
	/* eslint-disable */
	var sets = [{ lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'tg', 'ti', 'tr', 'uz', 'wa'], nr: [1, 2], fc: 1 }, { lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'es_ar', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'he', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt', 'pt_br', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'], nr: [1, 2], fc: 2 }, { lngs: ['ay', 'bo', 'cgg', 'fa', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'], nr: [1], fc: 3 }, { lngs: ['be', 'bs', 'dz', 'hr', 'ru', 'sr', 'uk'], nr: [1, 2, 5], fc: 4 }, { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 }, { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 }, { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 }, { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 }, { lngs: ['fr'], nr: [1, 2], fc: 9 }, { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 }, { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 }, { lngs: ['is'], nr: [1, 2], fc: 12 }, { lngs: ['jv'], nr: [0, 1], fc: 13 }, { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 }, { lngs: ['lt'], nr: [1, 2, 10], fc: 15 }, { lngs: ['lv'], nr: [1, 2, 0], fc: 16 }, { lngs: ['mk'], nr: [1, 2], fc: 17 }, { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 }, { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 }, { lngs: ['or'], nr: [2, 1], fc: 2 }, { lngs: ['ro'], nr: [1, 2, 20], fc: 20 }, { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 }];

	var _rulesPluralsTypes = {
	  1: function _(n) {
	    return Number(n > 1);
	  },
	  2: function _(n) {
	    return Number(n != 1);
	  },
	  3: function _(n) {
	    return 0;
	  },
	  4: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  5: function _(n) {
	    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
	  },
	  6: function _(n) {
	    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
	  },
	  7: function _(n) {
	    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  8: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
	  },
	  9: function _(n) {
	    return Number(n >= 2);
	  },
	  10: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
	  },
	  11: function _(n) {
	    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
	  },
	  12: function _(n) {
	    return Number(n % 10 != 1 || n % 100 == 11);
	  },
	  13: function _(n) {
	    return Number(n !== 0);
	  },
	  14: function _(n) {
	    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
	  },
	  15: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
	  },
	  16: function _(n) {
	    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
	  },
	  17: function _(n) {
	    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
	  },
	  18: function _(n) {
	    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
	  },
	  19: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
	  },
	  20: function _(n) {
	    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
	  },
	  21: function _(n) {
	    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
	  }
	};
	/* eslint-enable */

	function createRules() {
	  var l,
	      rules = {};
	  sets.forEach(function (set) {
	    set.lngs.forEach(function (l) {
	      return rules[l] = {
	        numbers: set.nr,
	        plurals: _rulesPluralsTypes[set.fc]
	      };
	    });
	  });
	  return rules;
	}

	var PluralResolver = function () {
	  function PluralResolver(languageUtils) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, PluralResolver);

	    this.languageUtils = languageUtils;
	    this.options = options;

	    this.logger = _logger2.default.create('pluralResolver');

	    this.rules = createRules();
	  }

	  PluralResolver.prototype.addRule = function addRule(lng, obj) {
	    this.rules[lng] = obj;
	  };

	  PluralResolver.prototype.getRule = function getRule(code) {
	    return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
	  };

	  PluralResolver.prototype.needsPlural = function needsPlural(code) {
	    var rule = this.getRule(code);

	    return rule && rule.numbers.length <= 1 ? false : true;
	  };

	  PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
	    var _this = this;

	    var rule = this.getRule(code);

	    if (rule) {
	      var _ret = function () {
	        if (rule.numbers.length === 1) return {
	            v: ''
	          }; // only singular

	        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
	        var suffix = rule.numbers[idx];

	        // special treatment for lngs only having singular and plural
	        if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	          if (suffix === 2) {
	            suffix = 'plural';
	          } else if (suffix === 1) {
	            suffix = '';
	          }
	        }

	        var returnSuffix = function returnSuffix() {
	          return _this.options.prepend && suffix.toString() ? _this.options.prepend + suffix.toString() : suffix.toString();
	        };

	        // COMPATIBILITY JSON
	        // v1
	        if (_this.options.compatibilityJSON === 'v1') {
	          if (suffix === 1) return {
	              v: ''
	            };
	          if (typeof suffix === 'number') return {
	              v: '_plural_' + suffix.toString()
	            };
	          return {
	            v: returnSuffix()
	          };
	        }
	        // v2
	        else if (_this.options.compatibilityJSON === 'v2' || rule.numbers.length === 2 && rule.numbers[0] === 1) {
	            return {
	              v: returnSuffix()
	            };
	          }
	          // v3 - gettext index
	          else if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
	              return {
	                v: returnSuffix()
	              };
	            }
	        return {
	          v: _this.options.prepend && idx.toString() ? _this.options.prepend + idx.toString() : idx.toString()
	        };
	      }();

	      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	    } else {
	      this.logger.warn('no plural rule found for: ' + code);
	      return '';
	    }
	  };

	  return PluralResolver;
	}();

	;

	exports.default = PluralResolver;

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _utils = __webpack_require__(194);

	var utils = _interopRequireWildcard(_utils);

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Interpolator = function () {
	  function Interpolator() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    _classCallCheck(this, Interpolator);

	    this.logger = _logger2.default.create('interpolator');

	    this.init(options, true);
	  }

	  Interpolator.prototype.init = function init() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var reset = arguments[1];

	    if (reset) this.options = options;
	    if (!options.interpolation) options.interpolation = { escapeValue: true };

	    var iOpts = options.interpolation;

	    this.escapeValue = iOpts.escapeValue;

	    this.prefix = iOpts.prefix ? utils.regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
	    this.suffix = iOpts.suffix ? utils.regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';

	    this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
	    this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';

	    this.nestingPrefix = iOpts.nestingPrefix ? utils.regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || utils.regexEscape('$t(');
	    this.nestingSuffix = iOpts.nestingSuffix ? utils.regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || utils.regexEscape(')');

	    // the regexp
	    var regexpStr = this.prefix + '(.+?)' + this.suffix;
	    this.regexp = new RegExp(regexpStr, 'g');

	    var regexpUnescapeStr = this.prefix + this.unescapePrefix + '(.+?)' + this.unescapeSuffix + this.suffix;
	    this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');

	    var nestingRegexpStr = this.nestingPrefix + '(.+?)' + this.nestingSuffix;
	    this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
	  };

	  Interpolator.prototype.reset = function reset() {
	    if (this.options) this.init(this.options);
	  };

	  Interpolator.prototype.interpolate = function interpolate(str, data) {
	    var match = void 0,
	        value = void 0;

	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }

	    // unescape if has unescapePrefix/Suffix
	    while (match = this.regexpUnescape.exec(str)) {
	      var _value = utils.getPath(data, match[1].trim());
	      str = str.replace(match[0], _value);
	    }

	    // regular escape on demand
	    while (match = this.regexp.exec(str)) {
	      value = utils.getPath(data, match[1].trim());
	      if (typeof value !== 'string') value = utils.makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };

	  Interpolator.prototype.nest = function nest(str, fc) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var match = void 0,
	        value = void 0;

	    var clonedOptions = JSON.parse(JSON.stringify(options));
	    clonedOptions.applyPostProcessor = false; // avoid post processing on nested lookup

	    function regexSafe(val) {
	      return val.replace(/\$/g, '$$$$');
	    }

	    // if value is something like "myKey": "lorem $(anotherKey, { "count": {{aValueInOptions}} })"
	    function handleHasOptions(key) {
	      if (key.indexOf(',') < 0) return key;

	      var p = key.split(',');
	      key = p.shift();
	      var optionsString = p.join(',');
	      optionsString = this.interpolate(optionsString, clonedOptions);

	      try {
	        clonedOptions = JSON.parse(optionsString);
	      } catch (e) {
	        this.logger.error('failed parsing options string in nesting for key ' + key, e);
	      }

	      return key;
	    }

	    // regular escape on demand
	    while (match = this.nestingRegexp.exec(str)) {
	      value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);
	      if (typeof value !== 'string') value = utils.makeString(value);
	      if (!value) {
	        this.logger.warn('missed to pass in variable ' + match[1] + ' for interpolating ' + str);
	        value = '';
	      }
	      value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
	      str = str.replace(match[0], value);
	      this.regexp.lastIndex = 0;
	    }
	    return str;
	  };

	  return Interpolator;
	}();

	exports.default = Interpolator;

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _utils = __webpack_require__(194);

	var utils = _interopRequireWildcard(_utils);

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	var _EventEmitter2 = __webpack_require__(192);

	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	function remove(arr, what) {
	  var found = arr.indexOf(what);

	  while (found !== -1) {
	    arr.splice(found, 1);
	    found = arr.indexOf(what);
	  }
	}

	var Connector = function (_EventEmitter) {
	  _inherits(Connector, _EventEmitter);

	  function Connector(backend, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck(this, Connector);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.backend = backend;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = _logger2.default.create('backendConnector');

	    _this.state = {};
	    _this.queue = [];

	    _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
	    return _this;
	  }

	  Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
	    var _this2 = this;

	    // find what needs to be loaded
	    var toLoad = [],
	        pending = [],
	        toLoadLanguages = [],
	        toLoadNamespaces = [];

	    languages.forEach(function (lng) {
	      var hasAllNamespaces = true;

	      namespaces.forEach(function (ns) {
	        var name = lng + '|' + ns;

	        if (_this2.store.hasResourceBundle(lng, ns)) {
	          _this2.state[name] = 2; // loaded
	        } else if (_this2.state[name] < 0) {
	            // nothing to do for err
	          } else if (_this2.state[name] === 1) {
	              if (pending.indexOf(name) < 0) pending.push(name);
	            } else {
	              _this2.state[name] = 1; // pending

	              hasAllNamespaces = false;

	              if (pending.indexOf(name) < 0) pending.push(name);
	              if (toLoad.indexOf(name) < 0) toLoad.push(name);
	              if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
	            }
	      });

	      if (!hasAllNamespaces) toLoadLanguages.push(lng);
	    });

	    if (toLoad.length || pending.length) {
	      this.queue.push({
	        pending: pending,
	        loaded: {},
	        errors: [],
	        callback: callback
	      });
	    }

	    return {
	      toLoad: toLoad,
	      pending: pending,
	      toLoadLanguages: toLoadLanguages,
	      toLoadNamespaces: toLoadNamespaces
	    };
	  };

	  Connector.prototype.loaded = function loaded(name, err, data) {
	    var _this3 = this;

	    var _name$split = name.split('|');

	    var _name$split2 = _slicedToArray(_name$split, 2);

	    var lng = _name$split2[0];
	    var ns = _name$split2[1];


	    if (err) this.emit('failedLoading', lng, ns, err);

	    if (data) {
	      this.store.addResourceBundle(lng, ns, data);
	    }

	    // set loaded
	    this.state[name] = err ? -1 : 2;
	    // callback if ready
	    this.queue.forEach(function (q) {
	      utils.pushPath(q.loaded, [lng], ns);
	      remove(q.pending, name);

	      if (err) q.errors.push(err);

	      if (q.pending.length === 0 && !q.done) {
	        q.errors.length ? q.callback(q.errors) : q.callback();
	        _this3.emit('loaded', q.loaded);
	        q.done = true;
	      }
	    });

	    // remove done load requests
	    this.queue = this.queue.filter(function (q) {
	      return !q.done;
	    });
	  };

	  Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
	    var _this4 = this;

	    if (!tried) tried = 0;
	    if (!wait) wait = 250;

	    if (!lng.length) return callback(null, {}); // noting to load

	    this.backend[fcName](lng, ns, function (err, data) {
	      if (err && data /* = retryFlag */ && tried < 5) {
	        setTimeout(function () {
	          _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
	        }, wait);
	        return;
	      }
	      callback(err, data);
	    });
	  };

	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this5 = this;

	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	      return callback && callback();
	    }
	    var options = _extends({}, this.backend.options, this.options.backend);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    var toLoad = this.queueLoad(languages, namespaces, callback);
	    if (!toLoad.toLoad.length) {
	      if (!toLoad.pending.length) callback(); // nothing to load and no pendings...callback now
	      return; // pendings will trigger callback
	    }

	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this5.logger.warn('loading namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this5.logger.log('loaded namespaces ' + toLoad.toLoadNamespaces.join(', ') + ' for languages ' + toLoad.toLoadLanguages.join(', ') + ' via multiloading', data);

	        toLoad.toLoad.forEach(function (name) {
	          var _name$split3 = name.split('|');

	          var _name$split4 = _slicedToArray(_name$split3, 2);

	          var l = _name$split4[0];
	          var n = _name$split4[1];


	          var bundle = utils.getPath(data, [l, n]);
	          if (bundle) {
	            _this5.loaded(name, err, bundle);
	          } else {
	            var _err = 'loading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	            _this5.loaded(name, _err);
	            _this5.logger.error(_err);
	          }
	        });
	      });
	    }

	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this6 = this;

	            var _name$split5 = name.split('|');

	            var _name$split6 = _slicedToArray(_name$split5, 2);

	            var lng = _name$split6[0];
	            var ns = _name$split6[1];


	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this6.logger.warn('loading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this6.logger.log('loaded namespace ' + ns + ' for language ' + lng, data);

	              _this6.loaded(name, err, data);
	            });
	          };

	          ;

	          toLoad.toLoad.forEach(function (name) {
	            readOne.call(_this5, name);
	          });
	        })();
	      }
	  };

	  Connector.prototype.reload = function reload(languages, namespaces) {
	    var _this7 = this;

	    if (!this.backend) {
	      this.logger.warn('No backend was added via i18next.use. Will not load resources.');
	    }
	    var options = _extends({}, this.backend.options, this.options.backend);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    // load with multi-load
	    if (options.allowMultiLoading && this.backend.readMulti) {
	      this.read(languages, namespaces, 'readMulti', null, null, function (err, data) {
	        if (err) _this7.logger.warn('reloading namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading failed', err);
	        if (!err && data) _this7.logger.log('reloaded namespaces ' + namespaces.join(', ') + ' for languages ' + languages.join(', ') + ' via multiloading', data);

	        languages.forEach(function (l) {
	          namespaces.forEach(function (n) {
	            var bundle = utils.getPath(data, [l, n]);
	            if (bundle) {
	              _this7.loaded(l + '|' + n, err, bundle);
	            } else {
	              var _err2 = 'reloading namespace ' + n + ' for language ' + l + ' via multiloading failed';
	              _this7.loaded(l + '|' + n, _err2);
	              _this7.logger.error(_err2);
	            }
	          });
	        });
	      });
	    }

	    // load one by one
	    else {
	        (function () {
	          var readOne = function readOne(name) {
	            var _this8 = this;

	            var _name$split7 = name.split('|');

	            var _name$split8 = _slicedToArray(_name$split7, 2);

	            var lng = _name$split8[0];
	            var ns = _name$split8[1];


	            this.read(lng, ns, 'read', null, null, function (err, data) {
	              if (err) _this8.logger.warn('reloading namespace ' + ns + ' for language ' + lng + ' failed', err);
	              if (!err && data) _this8.logger.log('reloaded namespace ' + ns + ' for language ' + lng, data);

	              _this8.loaded(name, err, data);
	            });
	          };

	          ;

	          languages.forEach(function (l) {
	            namespaces.forEach(function (n) {
	              readOne.call(_this7, l + '|' + n);
	            });
	          });
	        })();
	      }
	  };

	  Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
	    if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);

	    // write to store to avoid resending
	    if (!languages || !languages[0]) return;
	    this.store.addResource(languages[0], namespace, key, fallbackValue);
	  };

	  return Connector;
	}(_EventEmitter3.default);

	exports.default = Connector;

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _utils = __webpack_require__(194);

	var utils = _interopRequireWildcard(_utils);

	var _logger = __webpack_require__(191);

	var _logger2 = _interopRequireDefault(_logger);

	var _EventEmitter2 = __webpack_require__(192);

	var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

	var Connector = function (_EventEmitter) {
	  _inherits(Connector, _EventEmitter);

	  function Connector(cache, store, services) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck(this, Connector);

	    var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));

	    _this.cache = cache;
	    _this.store = store;
	    _this.services = services;
	    _this.options = options;
	    _this.logger = _logger2.default.create('cacheConnector');

	    _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
	    return _this;
	  }

	  Connector.prototype.load = function load(languages, namespaces, callback) {
	    var _this2 = this;

	    if (!this.cache) return callback && callback();
	    var options = _extends({}, this.cache.options, this.options.cache);

	    if (typeof languages === 'string') languages = this.services.languageUtils.toResolveHierarchy(languages);
	    if (typeof namespaces === 'string') namespaces = [namespaces];

	    if (options.enabled) {
	      this.cache.load(languages, function (err, data) {
	        if (err) _this2.logger.error('loading languages ' + languages.join(', ') + ' from cache failed', err);
	        if (data) {
	          for (var l in data) {
	            for (var n in data[l]) {
	              if (n === 'i18nStamp') continue;
	              var bundle = data[l][n];
	              if (bundle) _this2.store.addResourceBundle(l, n, bundle);
	            }
	          }
	        }
	        if (callback) callback();
	      });
	    } else {
	      if (callback) callback();
	    }
	  };

	  Connector.prototype.save = function save() {
	    if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
	  };

	  return Connector;
	}(_EventEmitter3.default);

	exports.default = Connector;

/***/ },
/* 203 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.get = get;
	exports.transformOptions = transformOptions;
	function get() {
	  return {
	    debug: false,
	    initImmediate: true,

	    ns: ['translation'],
	    defaultNS: ['translation'],
	    fallbackLng: ['dev'],
	    fallbackNS: false, // string or array of namespaces

	    whitelist: false, // array with whitelisted languages
	    load: 'all', // | currentOnly | languageOnly
	    preload: false, // array with preload languages

	    keySeparator: '.',
	    nsSeparator: ':',
	    pluralSeparator: '_',
	    contextSeparator: '_',

	    saveMissing: false, // enable to send missing values
	    saveMissingTo: 'fallback', // 'current' || 'all'
	    missingKeyHandler: false, // function(lng, ns, key, fallbackValue) -> override if prefer on handling

	    postProcess: false, // string or array of postProcessor names
	    returnNull: true, // allows null value as valid translation
	    returnEmptyString: true, // allows empty string value as valid translation
	    returnObjects: false,
	    joinArrays: false, // or string to join array
	    returnedObjectHandler: function returnedObjectHandler() {}, // function(key, value, options) triggered if key returns object but returnObjects is set to false
	    parseMissingKeyHandler: false, // function(key) parsed a key that was not found in t() before returning
	    appendNamespaceToMissingKey: false,
	    overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
	      return { defaultValue: args[1] };
	    },

	    interpolation: {
	      escapeValue: true,
	      prefix: '{{',
	      suffix: '}}',
	      // prefixEscaped: '{{',
	      // suffixEscaped: '}}',
	      // unescapeSuffix: '',
	      unescapePrefix: '-',

	      nestingPrefix: '$t(',
	      nestingSuffix: ')',
	      // nestingPrefixEscaped: '$t(',
	      // nestingSuffixEscaped: ')',
	      defaultVariables: undefined // object that can have values to interpolate on - extends passed in interpolation data
	    }
	  };
	}

	function transformOptions(options) {
	  // create namespace object if namespace is passed in as string
	  if (typeof options.ns === 'string') options.ns = [options.ns];
	  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
	  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

	  // extend whitelist with cimode
	  if (options.whitelist && options.whitelist.indexOf('cimode') < 0) options.whitelist.push('cimode');

	  return options;
	}

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(205).default;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _utils = __webpack_require__(206);

	var utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// https://gist.github.com/Xeoncross/7663273
	function ajax(url, options, callback, data, cache) {
	  // Must encode data
	  if (data && (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	    var y = '',
	        e = encodeURIComponent;
	    for (var m in data) {
	      y += '&' + e(m) + '=' + e(data[m]);
	    }
	    data = y.slice(1) + (!cache ? '&_t=' + new Date() : '');
	  }

	  try {
	    var x = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
	    x.open(data ? 'POST' : 'GET', url, 1);
	    if (!options.crossDomain) {
	      x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	    }
	    if (data) {
	      x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	    }
	    x.onreadystatechange = function () {
	      x.readyState > 3 && callback && callback(x.responseText, x);
	    };
	    x.send(data);
	  } catch (e) {
	    window.console && console.log(e);
	  }
	};

	// ajax.uriEncode = function(o) {
	//     var x, y = '', e = encodeURIComponent;
	//     for (x in o) y += '&' + e(x) + '=' + e(o[x]);
	//     return y.slice(1);
	// };
	//
	// ajax.collect = (a, f) {
	//     var n = [];
	//     for (var i = 0; i < a.length; i++) {
	//         var v = f(a[i]);
	//         if (v != null) n.push(v);
	//     }
	//     return n;
	// };
	//
	// ajax.serialize = function (f) {
	//     function g(n) {
	//         return f.getElementsByTagName(n);
	//     };
	//     var nv = function (e) {
	//         if (e.name) return encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value);
	//     };
	//     var i = collect(g('input'), function (i) {
	//         if ((i.type != 'radio' && i.type != 'checkbox') || i.checked) return nv(i);
	//     });
	//     var s = collect(g('select'), nv);
	//     var t = collect(g('textarea'), nv);
	//     return i.concat(s).concat(t).join('&');
	// };
	//

	function getDefaults() {
	  return {
	    loadPath: '/locales/{{lng}}/{{ns}}.json',
	    addPath: 'locales/add/{{lng}}/{{ns}}',
	    allowMultiLoading: false,
	    parse: JSON.parse,
	    crossDomain: false,
	    ajax: ajax
	  };
	}

	var Backend = function () {
	  function Backend(services) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, Backend);

	    this.init(services, options);

	    this.type = 'backend';
	  }

	  _createClass(Backend, [{
	    key: 'init',
	    value: function init(services) {
	      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	      this.services = services;
	      this.options = utils.defaults(options, this.options || {}, getDefaults());
	    }
	  }, {
	    key: 'readMulti',
	    value: function readMulti(languages, namespaces, callback) {
	      var url = this.services.interpolator.interpolate(this.options.loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

	      this.loadUrl(url, callback);
	    }
	  }, {
	    key: 'read',
	    value: function read(language, namespace, callback) {
	      var url = this.services.interpolator.interpolate(this.options.loadPath, { lng: language, ns: namespace });

	      this.loadUrl(url, callback);
	    }
	  }, {
	    key: 'loadUrl',
	    value: function loadUrl(url, callback) {
	      var _this = this;

	      this.options.ajax(url, this.options, function (data, xhr) {
	        if (xhr.status >= 500 && xhr.status < 600) return callback('failed loading ' + url, true /* retry */);
	        if (xhr.status >= 400 && xhr.status < 500) return callback('failed loading ' + url, false /* no retry */);

	        var ret = void 0,
	            err = void 0;
	        try {
	          ret = _this.options.parse(data, url);
	        } catch (e) {
	          err = 'failed parsing ' + url + ' to json';
	        }
	        if (err) return callback(err, false);
	        callback(null, ret);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(languages, namespace, key, fallbackValue) {
	      var _this2 = this;

	      if (typeof languages === 'string') languages = [languages];

	      var payload = {};
	      payload[key] = fallbackValue || '';

	      languages.forEach(function (lng) {
	        var url = _this2.services.interpolator.interpolate(_this2.options.addPath, { lng: lng, ns: namespace });

	        _this2.options.ajax(url, _this2.options, function (data, xhr) {
	          //const statusCode = xhr.status.toString();
	          // TODO: if statusCode === 4xx do log
	        }, payload);
	      });
	    }
	  }]);

	  return Backend;
	}();

	Backend.type = 'backend';

	exports.default = Backend;

/***/ },
/* 206 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaults = defaults;
	exports.extend = extend;
	var arr = [];
	var each = arr.forEach;
	var slice = arr.slice;

	function defaults(obj) {
	  each.call(slice.call(arguments, 1), function (source) {
	    if (source) {
	      for (var prop in source) {
	        if (obj[prop] === undefined) obj[prop] = source[prop];
	      }
	    }
	  });
	  return obj;
	}

	function extend(obj) {
	  each.call(slice.call(arguments, 1), function (source) {
	    if (source) {
	      for (var prop in source) {
	        obj[prop] = source[prop];
	      }
	    }
	  });
	  return obj;
	}

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';

		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */

		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/


		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;


			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;


			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;


			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;


			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;


			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;


			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;


			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;

			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;

			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}


			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}

			return (/\bneedsclick\b/).test(target.className);
		};


		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};


		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function(targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};


		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};


		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};


		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};


		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};


		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};


		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};


		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};


		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};


		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};


		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};


		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};


		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};


		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};


		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};


		if (true) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Loading = function Loading() {
	  return _react2.default.createElement(
	    'div',
	    null,
	    'Loading...'
	  );
	};

	exports.default = Loading;

/***/ }
/******/ ]);