/* eslint-disable no-constant-condition, array-callback-return */
import request from 'superagent';
import { takeEvery } from 'redux-saga';
import { put, fork, call } from 'redux-saga/effects';
import { keyBy } from 'lodash/fp';
import * as actions from '../actions';
import * as types from '../types';
import download from './download';
import load from './load';
import theme from './theme';

// All these functions control the PACKAGES_ADDITION actions initiating downloads first, load
// second and failing if some of those fail.
function* packagesAdditionStarter(action) {
  yield put(actions.packagesDownloadRequested(action));
}
function* packagesAdditionDownloadSucceedWatcher(action) {
  yield put(actions.packagesLoadRequested(action));
}
function* packagesAdditionDownloadFailedWatcher(action) {
  yield put(actions.packagesAdditionFailed(action));
}
function* packagesAdditionLoadSucceedWatcher(action) {
  yield put(actions.packagesAdditionSucceed(action));
}
function* packagesAdditionLoadFailedWatcher(action) {
  yield put(actions.packagesAdditionFailed(action));
}

// Function which download the core packages list from the api and then starts a
// PACKAGES_ADDITION_REQUESTED to add them to the system.
export function* addCorePackagesSaga() {
  put(actions.corePackagesRequested());
  try {
    const res = yield call(request.get, 'https://cdn.worona.io/api/v1/settings/core/dashboard');
    const action = { pkgs: keyBy(pkg => pkg.name)(res.body), uid: 'core' };
    yield put(actions.corePackagesSucceed(action));
    yield put(actions.packagesAdditionRequested(action));
    yield put(actions.themeChangeRequested(
      { name: 'bulma-dashboard-theme-worona', namespace: 'bulma' }));
  } catch (error) {
    yield put(actions.corePackagesFailed({ error }));
  }
}

export default function* sagas() {
  yield [
    fork(download),
    fork(load),
    fork(theme),
    takeEvery(types.PACKAGES_ADDITION_REQUESTED, packagesAdditionStarter),
    takeEvery(types.PACKAGES_DOWNLOAD_SUCCEED, packagesAdditionDownloadSucceedWatcher),
    takeEvery(types.PACKAGES_DOWNLOAD_FAILED, packagesAdditionDownloadFailedWatcher),
    takeEvery(types.PACKAGES_LOAD_SUCCEED, packagesAdditionLoadSucceedWatcher),
    takeEvery(types.PACKAGES_LOAD_FAILED, packagesAdditionLoadFailedWatcher),
    fork(addCorePackagesSaga),
  ];
}
