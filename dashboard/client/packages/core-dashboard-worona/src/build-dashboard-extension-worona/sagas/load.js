import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getSagas, getReducers } from 'worona-deps';
import { addReducer, startSaga, reloadReducers } from '../store';
import * as types from '../types';
import * as actions from '../actions';

// Function used by packagesLoadSaga to load each package's sagas.
export function* loadSagas(pkg, uid) {
  try {
    const newSagas = yield call(getSagas, pkg.namespace);
    if (newSagas) yield call(startSaga, pkg.namespace, newSagas);
  } catch (error) {
    yield put(actions.packagesLoadFailed({ error, pkg, uid }));
  }
}

export function* loadReducers(pkg, uid) {
  try {
    const newReducers = yield call(getReducers, pkg.namespace);
    if (newReducers) yield call(addReducer, pkg.namespace, newReducers);
  } catch (error) {
    yield put(actions.packagesLoadFailed({ error, pkg, uid }));
  }
}

// Function triggered by PACKAGES_LOAD_REQUESTED which tries to load each package. First, it
// reloads the reducers (already in worona-deps) all at once. Then it goes package by package
// loading its sagas. Once it has loaded everything, it dispatches a PACKAGES_LOAD_SUCCEED.
export function* packagesLoadSaga({ pkgs, uid }) {
  try {
    yield pkgs.map(pkg => call(loadReducers, pkg, uid));
    yield call(reloadReducers);
    yield pkgs.map(pkg => call(loadSagas, pkg, uid));
    yield put(actions.packagesLoadSucceed({ pkgs, uid }));
  } catch (error) {
    // This error will be triggered only by the reloadReducers because the error in sagas and
    // reducers is catched on the other functions.
    yield put(actions.packagesLoadFailed({ error, uid }));
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGES_LOAD_REQUESTED, packagesLoadSaga),
  ];
}
