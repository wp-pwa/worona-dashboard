import { takeLatest } from 'redux-saga';
import { fork, call, put, select, take } from 'redux-saga/effects';
import { createAccount } from '../libs';
import { createAccountSucceed, createAccountStatusChanged, loginRequested, createAccountFailed }
  from '../actions';
import { CREATE_ACCOUNT_REQUESTED, CONNECTION_SUCCEED } from '../actiontypes';
import { isConnected } from '../selectors';
import { NOT_CONNECTED, CREATING_ACCOUNT, CONNECTED_CREATING_ACCOUNT } from '../messages';

export function* createAccountSaga({ name, email, password }) {
  if (yield select(isConnected)) {
    try {
      yield put(createAccountStatusChanged(CREATING_ACCOUNT));
      const userId = yield call(createAccount, name, email, password);
      yield put(createAccountSucceed(userId));
      yield put(loginRequested(email, password));
    } catch (error) {
      yield put(createAccountFailed(error));
    }
  } else {
    yield put(createAccountStatusChanged(NOT_CONNECTED));
    yield take(CONNECTION_SUCCEED);
    yield put(createAccountStatusChanged(CONNECTED_CREATING_ACCOUNT));
    yield call(createAccountSaga, { name, email, password });
  }
}

export function* createAccountWatcher() {
  yield* takeLatest(CREATE_ACCOUNT_REQUESTED, createAccountSaga);
}

export default function* createAccountSagas() {
  yield [
    fork(createAccountWatcher),
  ];
}
