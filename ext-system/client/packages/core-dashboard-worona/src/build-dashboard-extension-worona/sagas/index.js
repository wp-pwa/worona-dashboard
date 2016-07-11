/* eslint-disable no-constant-condition, array-callback-return */
import { addPackage, getSagas } from 'worona-deps';
import { takeEvery } from 'redux-saga';
import { put, fork, call, take, race } from 'redux-saga/effects';
import _ from 'lodash';
import defaultExtensions from '../default/extensions.js';
import defaultTheme from '../default/theme.js';
import * as actions from '../actions';
import * as types from '../types';
import { reloadReducers, runSaga } from '../store';

export const requirePackage = name => new Promise(resolve => {
  const req = require(`../../../../${name}-worona/src/index.js`);
  req(extension => resolve(extension));
});

export function* themeDownloadSaga({ name, uid }) {
  try {
    const pkg = yield call(requirePackage, `${name}-dashboard-theme`);
    yield call(addPackage, name, pkg);
    yield put(actions.themeDownloadSucceed({ name, uid }));
  } catch (error) {
    yield put(actions.themeDownloadFailed({ error, name, uid }));
  }
}

export function* extensionDownloadSaga({ name, uid }) {
  try {
    const pkg = yield call(requirePackage, `${name}-dashboard-extension`);
    yield call(addPackage, name, pkg);
    yield put(actions.extensionDownloadSucceed({ name, uid }));
  } catch (error) {
    yield put(actions.extensionDownloadFailed({ error, name, uid }));
  }
}

export function* packagesDownloadSucceedWatcher({ theme, extensions = [], uid }) {
  const requested = theme ? [theme, ...extensions] : extensions;
  const downloaded = [];
  while (true) {
    const action = yield take([
      types.THEME_DOWNLOAD_SUCCEED,
      types.EXTENSION_DOWNLOAD_SUCCEED,
    ]);
    if (action.uid === uid) {
      downloaded.push(action.name);
      if (_.isEqual(requested.sort(), downloaded.sort())) {
        yield put(actions.packagesDownloadSucceed({ theme, extensions, uid }));
        break;
      }
    }
  }
}

export function* packagesDownloadFailedWatcher(action) {
  yield put(actions.packagesDownloadFailed(action));
}

export function* packagesDownloadStarter({ theme, extensions = [], uid }) {
  yield put(actions.themeDownloadRequested({ name: theme, uid }));
  yield extensions.map(extension =>
    put(actions.extensionDownloadRequested({ name: extension, uid })));
}

export function* packagesAdditionSaga({ theme, extensions, uid }) {
  yield put(actions.packagesDownloadRequested({ theme, extensions, uid }));
  while (true) {
    const { succeed, failed } = yield race({
      succeed: take(types.PACKAGES_DOWNLOAD_SUCCEED),
      failed: take(types.PACKAGES_DOWNLOAD_FAILED),
    });
    if (succeed && succeed.uid === uid) {
      yield put(actions.packagesLoadRequested({ theme, extensions, uid }));
    } else if (failed && failed.uid === uid) {
      yield put(actions.packagesAdditionFailed(failed));
    }
  }
}

export function* loadPackage(name, uid) {
  try {
    const newSagas = getSagas(name);
    if (newSagas) yield call(runSaga, newSagas);
  } catch (error) {
    yield put(actions.packagesLoadFailed({ error, name, uid }));
  }
}

export function* packagesLoadSaga({ theme, extensions, uid }) {
  reloadReducers();
  yield extensions.map(extension => call(loadPackage, extension, uid));
  yield call(loadPackage, theme, uid);
  yield put(actions.packagesLoadSucceed({ theme, extensions, uid }));
}

export function* init() {
  yield put(actions.packagesAdditionRequested(
    { theme: defaultTheme, extensions: defaultExtensions, uid: 'core' }
  ));
}

export function* loadCoreTheme() {
  while (true) {
    const action = yield take(types.PACKAGES_LOAD_SUCCEED);
    if (action.uid === 'core') {
      try {
        yield put(actions.themeChangeRequested({ name: action.theme, uid: 'core' }));
        yield put(actions.themeChangeSucceed({ name: action.theme, uid: 'core' }));
      } catch (error) {
        yield put(actions.themeChangeFailed({ error, name: action.theme, uid: 'core' }));
      }
      break;
    }
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGES_ADDITION_REQUESTED, packagesAdditionSaga),
    takeEvery(types.PACKAGES_DOWNLOAD_REQUESTED, packagesDownloadSucceedWatcher),
    takeEvery(types.PACKAGES_DOWNLOAD_REQUESTED, packagesDownloadStarter),
    takeEvery([types.THEME_DOWNLOAD_FAILED, types.EXTENSION_DOWNLOAD_FAILED],
      packagesDownloadFailedWatcher),
    takeEvery(types.THEME_DOWNLOAD_REQUESTED, themeDownloadSaga),
    takeEvery(types.EXTENSION_DOWNLOAD_REQUESTED, extensionDownloadSaga),
    takeEvery(types.PACKAGES_LOAD_REQUESTED, packagesLoadSaga),
    fork(loadCoreTheme),
    fork(init),
  ];
}
