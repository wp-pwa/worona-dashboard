/* eslint-disable no-constant-condition */
import { isProd, getSagas, getReducers, packageActivated, getDeps, waitForDeps,
  getDevelopmentPackages } from 'worona-deps';
import { put, call, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { addReducer, startSaga, reloadReducers, removeReducer, stopSaga } from '../store';
import * as types from '../types';
import * as actions from '../actions';
import { waitFor } from './waitFor';

// Function used by packagesLoadSaga to load each package's sagas.
export function* loadSagas(name, namespace) {
  const newSagas = yield call(getSagas, name);
  if (newSagas) yield call(startSaga, namespace, newSagas);
}

export function* loadReducers(name, namespace) {
  const newReducers = yield call(getReducers, name);
  if (newReducers) yield call(addReducer, namespace, newReducers);
}

export function* packageLoadSaga({ pkg }) {
  try {
    const deps = yield call(getDeps, pkg.name);
    yield call(waitForDeps, deps, 10000);
    yield call(loadReducers, pkg.name, pkg.namespace);
    yield call(reloadReducers);
    yield call(loadSagas, pkg.name, pkg.namespace);
    if (isProd) {
      yield [
        call(waitFor, pkg.name,
          types.PACKAGE_ASSETS_LOAD_SUCCEED, types.PACKAGE_ASSETS_LOAD_FAILED),
        put(actions.packageAssetsLoadRequested({ pkg })),
      ];
    }
    yield put(actions.packageLoadSucceed({ pkg }));
    yield call(packageActivated, pkg.name);
  } catch (error) {
    yield put(actions.packageLoadFailed({ error, pkg }));
    throw error;
  }
}

export function* packageUnloadSaga(pkg) {
  try {
    yield call(removeReducer, pkg.namespace);
    yield call(stopSaga, pkg.namespace);
    yield put(actions.packageDeactivationSucceed({ pkg }));
  } catch (error) {
    yield put(actions.packageDeactivationFailed({ error: error.message, pkg }));
  }
}

export function* addDevelopmentPackagesSaga() {
  const pkgs = getDevelopmentPackages();
  yield pkgs.map(pkg => put(actions.packageLoadRequested({ pkg })));
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGE_LOAD_REQUESTED, packageLoadSaga),
    takeEvery(types.PACKAGE_DEACTIVATION_REQUESTED, packageUnloadSaga),
    fork(addDevelopmentPackagesSaga),
  ];
}
