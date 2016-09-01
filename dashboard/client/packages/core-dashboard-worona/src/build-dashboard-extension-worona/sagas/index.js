/* eslint-disable no-constant-condition, array-callback-return */
import request from 'superagent';
import { normalize } from 'normalizr';
import { takeEvery } from 'redux-saga';
import { put, fork, call } from 'redux-saga/effects';
import { toArray } from 'lodash';
import * as actions from '../actions';
import * as types from '../types';
import * as schemas from '../schemas';
import download from './download';
import load from './load';
import theme from './theme';

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

export function* packageActivationSaga({ pkg }) {
  try {
    yield put(actions.packageDownloadRequested({ pkg }));
  } catch (error) {
    yield put(actions.packageActivationFailed({ error: error.message, pkg }));
  }
}

export default function* sagas() {
  yield [
    fork(download),
    // fork(load),
    // fork(theme),
    // takeEvery(types.PACKAGES_DOWNLOAD_SUCCEED, packagesAdditionDownloadSucceedWatcher),
    // takeEvery(types.PACKAGES_DOWNLOAD_FAILED, packagesAdditionDownloadFailedWatcher),
    // takeEvery(types.PACKAGES_LOAD_SUCCEED, packagesAdditionLoadSucceedWatcher),
    // takeEvery(types.PACKAGES_LOAD_FAILED, packagesAdditionLoadFailedWatcher),
    takeEvery(types.PACKAGE_ACTIVATION_REQUESTED, packageActivationSaga),
    fork(addCorePackagesSaga),
  ];
}
