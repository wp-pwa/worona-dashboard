/* eslint-disable no-constant-condition */
import { takeEvery } from 'redux-saga';
import { select, put, take } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';

export function* changeTheme({ name }) {
  let pkgs = yield select(selectors.packages);
  if ((typeof pkgs[name] === 'undefined') || (pkgs[name].loaded !== true)) {
    // Package hasn't been requested.
    while (true) {
      // Wait until the package downloads (if it does).
      yield take(types.PACKAGES_ADDITION_SUCCEED);
      pkgs = yield select(selectors.packages);
      if (typeof pkgs[name] !== 'undefined' && pkgs[name].loaded === true) {
        // Package has finished downloading and it is loaded, we can exit the while and start
        // the change.
        break;
      }
    }
  }
  try {
    const packages = yield select(selectors.build.packages);
    yield put(actions.themeLoadStarted({ pkg: packages[name] }));
    yield put(actions.themeLoadSucceed({ pkg: packages[name] }));
  } catch (error) {
    yield put(actions.themeLoadFailed({ error: error.message, name }));
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.THEME_LOAD_REQUESTED, changeTheme),
  ];
}
