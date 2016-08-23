/* eslint-disable no-constant-condition */
import { takeEvery } from 'redux-saga';
import { select, put, take } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from '../actions';
import * as selectors from '../selectors';

export function* changeTheme({ namespace }) {
  let loaded = yield select(selectors.packages.loaded);
  if (typeof loaded[namespace] === 'undefined') { // Package is not loaded.
    while (true) {
      // Wait until the package downloads (if it does).
      yield take(types.PACKAGES_ADDITION_SUCCEED);
      loaded = yield select(selectors.packages.loaded);
      if (typeof loaded[namespace] !== 'undefined') {
        // Package has finished downloading, we can start exit the while and start the change.
        break;
      }
    }
  }
  try {
    yield put(actions.themeChangeStarted({ namespace }));
    yield put(actions.themeChangeSucceed({ namespace }));
  } catch (error) {
    yield put(actions.themeChangeFailed({ error, namespace }));
  }
}

export default function* sagas() {
  yield [
    takeEvery(types.THEME_CHANGE_REQUESTED, changeTheme),
  ];
}
