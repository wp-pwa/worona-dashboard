/* eslint-disable no-constant-condition, array-callback-return */
import request from 'superagent';
import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { put, fork, call, take } from 'redux-saga/effects';
import { toArray } from 'lodash';
import * as actions from '../actions';
import * as types from '../types';
import * as schemas from '../schemas';
import download from './download';
import load from './load';

// Function which download the core packages list from the api and then starts a
// PACKAGES_ADDITION_REQUESTED to add them to the system.
export function* addCorePackagesSaga() {
  yield put(actions.corePackagesRequested());
  try {
    // Call the API.
    const res = yield call(request.get, 'https://cdn.worona.io/api/v1/settings/core/dashboard');
    // Normalize the result using normalizr.
    const pkgs = normalize(res.body, schemas.arrayOfPackages).entities.packages;
    // Inform that the API call was successful.
    yield put(actions.corePackagesSucceed({ pkgs }));
    // Start activation for each downloaded package.
    yield toArray(pkgs).map(pkg => put(actions.packageActivationRequested({ pkg })));
    // yield put(actions.themeLoadRequested({ name: 'bulma-dashboard-theme-worona' }));
  } catch (error) {
    yield put(actions.corePackagesFailed({ error: error.message }));
  }
}

// Wait until success or failure actions. It ends on success and throws on failure.
export function* waitFor(name, success, failure) {
  while (true) {
    const { type, pkg, error } = yield take([success, failure]);
    if (pkg.name === name) {
      if (type === success) break;
      else if (error) throw error;
    }
  }
}

export function* packageActivationSaga({ pkg }) {
  try {
    yield put(actions.packageDownloadRequested({ pkg }));
    yield call(waitFor, pkg.name, types.PACKAGE_DOWNLOAD_SUCCEED, types.PACKAGE_DOWNLOAD_FAILED);
    yield put(actions.packageLoadRequested({ pkg }));
    yield call(waitFor, pkg.name, types.PACKAGE_LOAD_SUCCEED, types.PACKAGE_LOAD_FAILED);
    yield put(actions.packageActivationSucceed({ pkg }));
  } catch (error) {
    yield put(actions.packageActivationFailed({ error: error.message, pkg }));
  }
}

export default function* sagas() {
  yield [
    fork(download),
    fork(load),
    // fork(theme),
    // takeEvery(types.PACKAGES_DOWNLOAD_SUCCEED, packagesAdditionDownloadSucceedWatcher),
    // takeEvery(types.PACKAGES_DOWNLOAD_FAILED, packagesAdditionDownloadFailedWatcher),
    // takeEvery(types.PACKAGES_LOAD_SUCCEED, packagesAdditionLoadSucceedWatcher),
    // takeEvery(types.PACKAGES_LOAD_FAILED, packagesAdditionLoadFailedWatcher),
    takeEvery(types.PACKAGE_ACTIVATION_REQUESTED, packageActivationSaga),
    fork(addCorePackagesSaga),
  ];
}
