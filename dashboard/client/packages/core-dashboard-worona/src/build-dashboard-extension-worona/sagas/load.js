import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { toArray } from 'lodash';
import { getSagas, getReducers } from 'worona-deps';
import { addReducer, startSaga, reloadReducers } from '../store';
import * as types from '../types';
import * as actions from '../actions';

// Function used by packagesLoadSaga to load each package's sagas.
export function* loadSagas(pkg) {
  const newSagas = yield call(getSagas, pkg.namespace);
  if (newSagas) yield call(startSaga, pkg.namespace, newSagas);
}

export function* loadReducers(pkg) {
  const newReducers = yield call(getReducers, pkg.namespace);
  if (newReducers) yield call(addReducer, pkg.namespace, newReducers);
}

export function* packageLoadSaga(pkg, uid) {
  try {
    yield call(loadReducers, pkg);
    yield call(loadSagas, pkg);
    yield call(reloadReducers);
    yield put(actions.packageLoadSucceed({ pkg, uid }));
  } catch (error) {
    yield put(actions.packageLoadFailed({ error, pkg, uid }));
    throw new Error(`Package ${pkg} load failed.`);
  }
}

// Function triggered by PACKAGES_LOAD_REQUESTED which tries to load each package. First, it
// reloads the reducers (already in worona-deps) all at once. Then it goes package by package
// loading its sagas. Once it has loaded everything, it dispatches a PACKAGES_LOAD_SUCCEED.
export function* packagesLoadSaga({ pkgs, uid }) {
  try {
    yield toArray(pkgs).map(pkg => call(packageLoadSaga, pkg, uid));
    yield put(actions.packagesLoadSucceed({ pkgs, uid }));
  } catch (error) {
    yield put(actions.packagesLoadFailed({ error, uid }));
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGES_LOAD_REQUESTED, packagesLoadSaga),
  ];
}
