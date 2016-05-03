import { takeLatest } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import { LOGOUT_REQUESTED } from '../actiontypes';
import { logoutSucceed, logoutFailed } from '../actions';
import { logout } from '../libs';

export function* logoutRequestedSaga() {
  try {
    yield call(logout);
    yield put(logoutSucceed());
  } catch (error) {
    yield put(logoutFailed(error));
  }
}
export function* logoutRequestedWatcher() {
  yield* takeLatest(LOGOUT_REQUESTED, logoutRequestedSaga);
}

export default function* logoutSagas() {
  yield [
    fork(logoutRequestedWatcher),
  ];
}
