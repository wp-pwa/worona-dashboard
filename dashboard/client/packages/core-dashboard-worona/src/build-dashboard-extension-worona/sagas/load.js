/* eslint-disable no-constant-condition */
import { put, call, take } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getSagas, getReducers, activatePackage } from 'worona-deps';
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

export function* waitForDependencies(dependencies) {
  const left = [...dependencies];
  while (true) {
    const action = yield take([types.PACKAGE_DOWNLOAD_SUCCEED, types.PACKAGE_DOWNLOAD_FAILED]);
    debugger;
    const index = left.indexOf(action.pkg.namespace);
    if (index !== -1) {
      if (action.error) throw action.error; // Throw error (cancel) if package failed downloading.
      left.splice(index); // Delete package from left array.
      if (left.length === 0) break; // Check if there are no dependencies left and exit.
    }
  }
}

export function* packageLoadSaga({ pkg }) {
  try {
    yield pkg.dependencies.map(dep => waitForDep(dep));
    yield call(loadReducers, pkg.name);
    yield call(loadSagas, pkg.name);
    yield call(reloadReducers);
    yield call(activatePackage, pkg.name);
    yield put(actions.packageLoadSucceed({ pkg }));
  } catch (error) {
    yield put(actions.packageLoadFailed({ error: error.message, pkg }));
    throw new Error(`Package ${pkg} load failed.`);
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.PACKAGE_LOAD_REQUESTED, packageLoadSaga),
  ];
}
