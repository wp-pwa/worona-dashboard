import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { createAccount, browserHistory } from '../dependencies';
import {
  CREATE_ACCOUNT_REQUESTED,
  LOGIN_SUCCEED,
  createAccountSucceed,
  createAccountFailed,
  loginSucceed,
} from '../actions';

// Create a new account for the user.
export function* createAccountSaga(action) {
  const { email, password } = action;
  try {
    const userId = yield call(createAccount, email, password);
    yield put(createAccountSucceed(userId));
    yield put(loginSucceed(userId));
  } catch (error) {
    yield put(createAccountFailed(error));
  }
}
export function* createAccountWatcher() {
  yield* takeLatest(CREATE_ACCOUNT_REQUESTED, createAccountSaga);
}

// Redirect the user to the home after a successful login.
export function* loginSucceedSaga() {
  yield call(browserHistory.push, '/');
}
export function* loginSucceedWatcher() {
  yield* takeLatest(LOGIN_SUCCEED, loginSucceedSaga);
}

export default [
  createAccountWatcher,
  loginSucceedWatcher,
];
