/* eslint-disable no-constant-condition */
import { put, call, take } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { getSagas, getReducers, activatePackage, waitForDeps } from 'worona-deps';
import { addReducer, startSaga, reloadReducers, removeReducer, stopSaga } from '../store';
import * as types from '../types';
import * as actions from '../actions';

// Function used by packagesLoadSaga to load each package's sagas.
export function* loadSagas(name, namespace) {
  const newSagas = yield call(getSagas, name);
  if (newSagas) yield call(startSaga, namespace, newSagas);
}

export function* loadReducers(name, namespace) {
  const newReducers = yield call(getReducers, name);
  if (newReducers) yield call(addReducer, namespace, newReducers);
}

export function* loadTheme(pkg) {
  yield put(actions.themeCssLoadRequested({ pkg }));
  while (true) {
    let action = yield take([types.THEME_CSS_LOAD_SUCCEED, types.THEME_CSS_LOAD_FAILED]);
    if (action.name === pkg.name) {
      if (action.error) throw action.error;
      else {
        yield put(actions.themeHtmlLoadRequested({ name: pkg.name }));
        while (true) {
          action = yield take([types.THEME_HTML_LOAD_SUCCEED, types.THEME_HTML_LOAD_FAILED]);
          if (action.name === pkg.name) {
            if (action.error) throw action.error;
            else break;
          }
          break;
        }
      }
    }
  }
}

export function* packageLoadSaga({ pkg }) {
  try {
    yield call(waitForDeps, pkg.dependencies, 10000);
    yield call(removeReducer, pkg.namespace);
    yield call(loadReducers, pkg.name, pkg.namespace);
    yield call(stopSaga, pkg.namespace);
    yield call(loadSagas, pkg.name, pkg.namespace);
    yield call(reloadReducers);
    if (pkg.type === 'theme') yield call(loadTheme, pkg);
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
