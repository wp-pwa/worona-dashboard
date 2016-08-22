/* eslint-disable no-constant-condition, array-callback-return */
import request from 'superagent';
import { takeEvery } from 'redux-saga';
import { put, fork, call, take, race } from 'redux-saga/effects';
import * as actions from '../actions';
import * as types from '../types';
import { packagesDownloadWatcher, packagesDownloadSaga, packageDownloadSaga } from './download';
import { packagesLoadSaga } from './load';

// Function triggered each PACKAGES_ADDITION_REQUESTED which starts the downloads and
// listens to PACKAGES_DOWNLOAD_SUCCEED or PACKAGES_DOWNLOAD_FAILED. Once the packages are
// downloaded, it starts the load and waits until it's complete. It also listens for failures
// to dispatch PACKAGES_ADDITION_FAILED if necessary.
export function* packagesAdditionSaga(action) {
  yield put(actions.packagesDownloadRequested(action));
  while (true) {
    const { downloadSucceed, downloadFailed } = yield race({
      downloadSucceed: take(types.PACKAGES_DOWNLOAD_SUCCEED),
      downloadFailed: take(types.PACKAGES_DOWNLOAD_FAILED),
    });
    if (downloadSucceed && downloadSucceed.uid === action.uid) {
      yield put(actions.packagesLoadRequested(action));
      while (true) {
        const { loadSucceed, loadFailed } = yield race({
          loadSucceed: take(types.PACKAGES_LOAD_SUCCEED),
          loadFailed: take(types.PACKAGES_LOAD_FAILED),
        });
        if (loadSucceed && loadSucceed.uid === action.uid) {
          yield put(actions.packagesAdditionSucceed(action));
          break;
        } else if (loadFailed && loadFailed.uid === action.uid) {
          yield put(actions.packagesAdditionFailed(loadFailed));
          break;
        }
      }
      break;
    } else if (downloadFailed && downloadFailed.uid === action.uid) {
      yield put(actions.packagesAdditionFailed(downloadFailed));
      break;
    }
  }
}

// Function which download the core packages list from the api and then starts a
// PACKAGES_ADDITION_REQUESTED to add them to the system.
export function* addCorePackagesSaga() {
  put(actions.corePackagesRequested());
  try {
    const res = yield call(request.get, 'https://cdn.worona.io/api/v1/settings/core/dashboard');
    const action = { pkgs: res.body, uid: 'core' };
    yield put(actions.corePackagesSucceed(action));
    yield put(actions.packagesAdditionRequested(action));
  } catch (error) {
    yield put(actions.corePackagesFailed({ error }));
  }
}

export function* loadTheme(uid) {
  while (true) {
    const action = yield take(types.PACKAGES_LOAD_SUCCEED);
    if (action.uid === uid) {
      try {
        yield put(actions.themeChangeRequested({ name: action.theme, uid }));
        yield put(actions.themeChangeSucceed({ name: action.theme, uid }));
      } catch (error) {
        yield put(actions.themeChangeFailed({ error, name: action.theme, uid }));
      }
      break;
    }
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGES_ADDITION_REQUESTED, packagesAdditionSaga),
    takeEvery(types.PACKAGES_DOWNLOAD_REQUESTED, packagesDownloadWatcher),
    takeEvery(types.PACKAGES_DOWNLOAD_REQUESTED, packagesDownloadSaga),
    takeEvery(types.PACKAGE_DOWNLOAD_REQUESTED, packageDownloadSaga),
    takeEvery(types.PACKAGES_LOAD_REQUESTED, packagesLoadSaga),
    fork(addCorePackagesSaga),
  ];
}
