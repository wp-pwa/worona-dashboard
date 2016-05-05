import { takeLatest } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import { LOGOUT_REQUESTED, LOGOUT_SUCCEED } from '../actiontypes';
import { logoutSucceed, logoutFailed } from '../actions';
import { logout, browserHistory } from '../libs';

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

export function* logoutSucceedSaga() {
  // Redirect the user to the home after a successful logout.
  yield call(browserHistory.push, '/login');
}
export function* logoutSucceedWatcher() {
  yield* takeLatest(LOGOUT_SUCCEED, logoutSucceedSaga);
}

export default function* logoutSagas() {
  yield [
    fork(logoutRequestedWatcher),
    fork(logoutSucceedWatcher),
  ];
}
