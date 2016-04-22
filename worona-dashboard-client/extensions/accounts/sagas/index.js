import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { login, logout, createAccount } from 'connection/lib';
import { CREATE_ACCOUNT_REQUEST, createAccountSuccess, createAccountFailure } from '../actions';

export function* createAccountSaga(action) {
  const { name, email, password } = action;
  try {
    const userId = yield call(createAccount, name, email, password);
    yield put(createAccountSuccess(userId));
  } catch (error) {
    yield put(createAccountFailure(error));
  }
}

export default function* sagas() {
  yield [
    takeLatest(CREATE_ACCOUNT_REQUEST, createAccountSaga),
  ];
}
