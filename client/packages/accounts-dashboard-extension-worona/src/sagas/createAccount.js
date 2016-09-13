import { takeLatest } from 'redux-saga';
import { call, put, select, take } from 'redux-saga/effects';
import { NOT_CONNECTED, CREATING_ACCOUNT, CONNECTED_CREATING_ACCOUNT } from '../messages';
import * as libs from '../libs';
import * as actions from '../actions';
import * as types from '../types';
import * as deps from '../dependencies';

export function* createAccountSaga({ name, email, password }) {
  if (yield select(deps.selectors.isConnected)) {
    try {
      yield put(actions.createAccountStatusChanged(CREATING_ACCOUNT));
      const userId = yield call(libs.createAccount, name, email, password);
      yield put(actions.createAccountSucceed(userId));
      yield put(actions.loginRequested(email, password));
    } catch (error) {
      yield put(actions.createAccountFailed(error.message));
    }
  } else {
    yield put(actions.createAccountStatusChanged(NOT_CONNECTED));
    yield take(deps.types.CONNECTION_SUCCEED);
    yield put(actions.createAccountStatusChanged(CONNECTED_CREATING_ACCOUNT));
    yield call(createAccountSaga, { name, email, password });
  }
}

export default function* createAccountSagas() {
  yield [
    takeLatest(types.CREATE_ACCOUNT_REQUESTED, createAccountSaga),
  ];
}
