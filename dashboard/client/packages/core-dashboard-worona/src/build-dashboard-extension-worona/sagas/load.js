import { put, call } from 'redux-saga/effects';
import { getSagas } from 'worona-deps';
import { reloadReducers, runSaga } from '../store';
import * as actions from '../actions';

// Function used by packagesLoadSaga to load each package's sagas.
export function* loadSagas(pkg, uid) {
  try {
    const newSagas = yield call(getSagas, pkg.namespace);
    if (newSagas) yield call(runSaga, newSagas);
  } catch (error) {
    yield put(actions.packagesLoadFailed({ error, pkg, uid }));
  }
}

// Function triggered by PACKAGES_LOAD_REQUESTED which tries to load each package. First, it
// reloads the reducers (already in worona-deps) all at once. Then it goes package by package
// loading its sagas. Once it has loaded everything, it dispatches a PACKAGES_LOAD_SUCCEED.
export function* packagesLoadSaga({ pkgs, uid }) {
  try {
    yield call(reloadReducers);
    yield pkgs.map(pkg => call(loadSagas, pkg, uid));
    yield put(actions.packagesLoadSucceed({ pkgs, uid }));
  } catch (error) {
    // This error will be triggered only by the reloadReducers because the error in sagas are
    // catched on the loadSagas function.
    yield put(actions.packagesLoadFailed({ error, uid }));
  }
}
