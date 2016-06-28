/* eslint-disable no-constant-condition */
import worona from 'worona';
import { put, fork, call, take, race } from 'redux-saga/effects';
import _ from 'lodash';
import * as a from '../actions';
import * as t from '../actiontypes';


const defaultExtensions = [
  'accounts',
  'connection',
];

const defaultTheme = 'bulma';

export const requirePackage = name => new Promise(resolve => {
  const req = require(`../../../../${name}-worona/src/index.js`);
  req(extension => resolve(extension));
});

export function* loadExtension(name) {
  yield put(a.extensionLoadRequested(name));
  try {
    worona[name] = yield call(requirePackage, `${name}-dashboard-extension`);
    yield put(a.extensionLoadSucceed(name));
  } catch (error) {
    yield put(a.extensionLoadFailed(name));
  }
}

export function* loadTheme(name) {
  yield put(a.themeLoadRequested(name));
  try {
    worona[name] = yield call(requirePackage, `${name}-dashboard-theme`);
    yield put(a.themeLoadSucceed(name));
  } catch (error) {
    yield put(a.themeLoadFailed(name));
  }
}

export function* extensionsSuccessWatcher() {
  const extensionsLoaded = [];
  while (true) {
    const action = yield take(t.EXTENSION_LOAD_SUCCEED);
    extensionsLoaded.push(action.name);
    if (_.isEqual(defaultExtensions, extensionsLoaded)) return true;
  }
}

export function* extensionsLoader(extensions) {
  yield put(a.extensionsLoadRequested());
  yield extensions.map(name => fork(loadExtension, name));
  const { succeed } = yield race({
    succeed: call(extensionsSuccessWatcher),
    failure: take(t.EXTENSION_LOAD_FAILED),
  });
  if (succeed) {
    yield put(a.extensionsLoadSucceed());
  } else {
    yield put(a.extensionsLoadFailed());
  }
}

export function* themeLoader(theme) {
  yield fork(loadTheme, theme);
}

export function* init() {
  yield put(a.packagesLoadRequested());
  const { succeed } = yield race({
    succeed: [
      take(t.EXTENSIONS_LOAD_SUCCEED),
      take(t.THEME_LOAD_SUCCEED),
    ],
    failed1: take(t.EXTENSIONS_LOAD_FAILED),
    failed2: take(t.THEME_LOAD_FAILED),
  });
  if (succeed) yield put(a.packagesLoadSucceed());
  else yield put(a.packagesLoadFailed());
}

export default function* sagas() {
  yield [
    fork(init),
    fork(extensionsLoader, defaultExtensions),
    // fork(themeLoader, defaultTheme),
  ];
}
