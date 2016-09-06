/* eslint-disable no-constant-condition */
import { takeLatest } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from '../actions';

export function* cssLoadSaga({ pkg }) {
  if (pkg.prod.assets.css) {
    const left = pkg.prod.assets.css.slice(0); // Clone array.
    while (true) {
      const { file } = yield take(types.THEME_CSS_FILE_DOWNLOADED);
      const index = left.indexOf(file);
      if (index !== -1) {
        left.splice(index, 1); // Delete item.
      }
      if (left.length === 0) break;
    }
  }
  yield put(actions.themeCssLoadSucceed({ pkg }));
}

export default function* sagas() {
  yield [
    takeLatest(types.THEME_CSS_LOAD_REQUESTED, cssLoadSaga),
  ];
}
