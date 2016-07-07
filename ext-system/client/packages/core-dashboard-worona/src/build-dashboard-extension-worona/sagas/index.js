/* eslint-disable no-constant-condition */
import { addPackage } from 'worona-deps';
import { put, fork, call, take, race, spawn } from 'redux-saga/effects';
import _ from 'lodash';
import defaultExtensions from '../../includes/extensions.js';
import defaultTheme from '../../includes/theme.js';
import * as actions from '../actions';
import * as types from '../types';

export const requirePackage = name => new Promise(resolve => {
  const req = require(`../../../../${name}-worona/src/index.js`);
  req(extension => resolve(extension));
});

export function* reloadReducers() {
  while (true) {
    const action = yield take(RELOAD_REDUCERS_REQUESTED);
    try {
      yield call(store.replaceReducer, combineReducers(getReducers()));
      yield put(reloadReducersSucceed(action.name));
    } catch (error) {
      yield put(reloadReducersFailed(action.name));
    }
  }
}

export function* downloadExtension(name) {
  yield put(actions.extensionLoadRequested(name));
  try {
    const pkg = yield call(requirePackage, `${name}-dashboard-extension`);
    yield call(addPackage, name, pkg);
    yield put(actions.reloadReducersRequested(name));
    yield put(actions.extensionLoadSucceed(name));
  } catch (error) {
    yield put(actions.extensionLoadFailed(name));
  }
}

export function* loadTheme(name) {
  yield put(actions.themeLoadRequested(name));
  try {
    const pkg = yield call(requirePackage, `${name}-dashboard-theme`);
    yield call(addPackage, name, pkg);
    yield put(deps.reloadReducersRequested(name));
    yield put(actions.themeLoadSucceed(name));
  } catch (error) {
    yield put(actions.themeLoadFailed(name));
  }
}

export function* extensionsSuccessWatcher() {
  const extensionsLoaded = [];
  while (true) {
    const action = yield take(types.EXTENSION_LOAD_SUCCEED);
    extensionsLoaded.push(action.name);
    if (_.isEqual(defaultExtensions, extensionsLoaded)) return true;
  }
}

export function* extensionsLoader(extensions) {
  yield put(actions.extensionsLoadRequested());
  yield extensions.map(name => fork(loadExtension, name));
  const { succeed } = yield race({
    succeed: call(extensionsSuccessWatcher),
    failure: take(types.EXTENSION_LOAD_FAILED),
  });
  if (succeed) {
    yield put(actions.extensionsLoadSucceed());
  } else {
    yield put(actions.extensionsLoadFailed());
  }
}

export function* themeLoader(theme) {
  yield fork(loadTheme, theme);
}

export function* init() {
  yield put(actions.packagesLoadRequested());
  const { succeed } = yield race({
    succeed: [
      take(types.EXTENSIONS_LOAD_SUCCEED),
      take(types.THEME_LOAD_SUCCEED),
    ],
    failed1: take(types.EXTENSIONS_LOAD_FAILED),
    failed2: take(types.THEME_LOAD_FAILED),
  });
  if (succeed) yield put(actions.packagesLoadSucceed());
  else yield put(actions.packagesLoadFailed());
}

export default function* sagas() {
  yield spawn(init);
  yield [
    fork(extensionsLoader, defaultExtensions),
    fork(themeLoader, defaultTheme),
  ];
}
