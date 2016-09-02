/* eslint-disable no-constant-condition */
import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getSagas, getReducers, activatePackage, waitForDeps } from 'worona-deps';
import { addReducer, startSaga, reloadReducers } from '../store';
import * as types from '../types';
import * as actions from '../actions';

// Function used by packagesLoadSaga to load each package's sagas.
export function* loadSagas(name) {
  const newSagas = yield call(getSagas, name);
  if (newSagas) yield call(startSaga, name, newSagas);
}

export function* loadReducers(name) {
  const newReducers = yield call(getReducers, name);
  if (newReducers) yield call(addReducer, name, newReducers);
}

export function* packageLoadSaga({ pkg }) {
  try {
    yield call(waitForDeps, pkg.dependencies, 10000);
    yield call(loadReducers, pkg.name);
    yield call(loadSagas, pkg.name);
    yield call(reloadReducers);
    yield call(activatePackage, pkg.name);
    yield put(actions.packageLoadSucceed({ pkg }));
  } catch (error) {
    yield put(actions.packageLoadFailed({ error: error.message, pkg }));
    throw error;
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGE_LOAD_REQUESTED, packageLoadSaga),
  ];
}
