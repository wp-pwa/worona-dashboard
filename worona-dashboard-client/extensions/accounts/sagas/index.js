import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import browserHistory from 'router/browserHistory';
import { login, logout, createAccount } from 'connection/lib';
import {
  CREATE_ACCOUNT_REQUESTED,
  LOGIN_SUCCEED,
  createAccountSucceed,
  createAccountFailed,
  loginSucceed,
} from '../actions';

export function* createAccountSaga(action) {
  const { name, email, password } = action;
  try {
    const userId = yield call(createAccount, name, email, password);
    yield put(createAccountSucceed(userId));
    yield put(loginSucceed(userId));
  } catch (error) {
    yield put(createAccountFailed(error));
  }
}

export function* loginSucceedSaga() {
  yield call(browserHistory.push, '/');
}

export default function* sagas() {
  yield [
    takeLatest(CREATE_ACCOUNT_REQUESTED, createAccountSaga),
    takeLatest(LOGIN_SUCCEED, loginSucceedSaga),
  ];
}
