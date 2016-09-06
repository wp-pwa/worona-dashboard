/* eslint-disable no-constant-condition */
import { put, call, take, select } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getSagas, getReducers, activatePackage, waitForDeps } from 'worona-deps';
import { addReducer, startSaga, reloadReducers, removeReducer, stopSaga } from '../store';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';

// Function used by packagesLoadSaga to load each package's sagas.
export function* loadSagas(name, namespace) {
  const newSagas = yield call(getSagas, name);
  if (newSagas) yield call(startSaga, namespace, newSagas);
}

export function* loadReducers(name, namespace) {
  const newReducers = yield call(getReducers, name);
  if (newReducers) yield call(addReducer, namespace, newReducers);
}

export function* loadAssets(pkg) {
  yield put(actions.themeAssetsLoadRequested({ pkg }));
  while (true) {
    const action = yield take([types.THEME_ASSETS_LOAD_SUCCEED, types.THEME_ASSETS_LOAD_FAILED]);
    if (action.pkg.name === pkg.name) {
      if (action.error) throw action.error;
      else break;
    }
  }
}

export function* deactivateSaga(pkg) {
  try {
    yield put(actions.packageDeactivationRequested({ pkg }));
    yield call(removeReducer, pkg.namespace);
    yield call(stopSaga, pkg.namespace);
    yield put(actions.packageDeactivationSucceed({ pkg }));
  } catch (error) {
    yield put(actions.packageDeactivationFailed({ error: error.message, pkg }));
  }
}

export function* packageLoadSaga({ pkg }) {
  try {
    yield call(waitForDeps, pkg.dependencies, 10000);
    const activated = yield select(selectors.activatedPackages);
    if (activated[pkg.namespace] !== pkg.name) yield call(deactivateSaga, pkg);
    yield call(loadReducers, pkg.name, pkg.namespace);
    yield call(loadSagas, pkg.name, pkg.namespace);
    yield call(reloadReducers);
    yield call(loadAssets, pkg);
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
