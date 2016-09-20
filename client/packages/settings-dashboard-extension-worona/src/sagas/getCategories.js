import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as libs from '../libs';

export function* getCategories() {
  try {
    const categoryIndex = yield call(libs.getCatIndex);
    yield put(actions.getCatIndexSuceed(categoryIndex));
  } catch (error) {
    yield put(actions.getCatIndexFailed(error));
  }
}
