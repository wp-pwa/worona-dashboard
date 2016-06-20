import { put, fork, call } from 'redux-saga/effects';
import * as a from '../actions';
import worona from 'worona';

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

export function* loadDefaultExtensions() {
  yield defaultExtensions.map(name => fork(loadExtension, name));
  yield fork(loadTheme, defaultTheme);
}

export default function* sagas() {
  yield [
    fork(loadDefaultExtensions),
  ];
}
