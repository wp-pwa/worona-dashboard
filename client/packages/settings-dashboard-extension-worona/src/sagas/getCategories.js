import { call, put, take } from 'redux-saga/effects';
import * as actions from '../actions';
import * as libs from '../libs';
import * as deps from '../dependencies';

export function* getCategories() {
  try {
    yield take(deps.types.CONNECTION_SUCCEED);
    const categoryIndex = yield call(libs.getCatIndex);
    yield put(actions.getCatIndexSucceed(categoryIndex));
  } catch (error) {
    yield put(actions.getCatIndexFailed(error));
  }
}
