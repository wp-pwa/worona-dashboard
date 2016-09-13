import { takeLatest } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from '../actions';
import * as deps from '../dependencies';

export function* logoutRequestedSaga() {
  try {
    yield call(deps.libs.logout);
    yield put(actions.logoutSucceed());
  } catch (error) {
    yield put(actions.logoutFailed(error.message));
  }
}
export function* logoutRequestedWatcher() {
  yield* takeLatest(types.LOGOUT_REQUESTED, logoutRequestedSaga);
}

export function* logoutSucceedSaga() {
  // Redirect the user to the home after a successful logout.
  yield call(deps.libs.push, '/login');
}
export function* logoutSucceedWatcher() {
  yield* takeLatest(types.LOGOUT_SUCCEED, logoutSucceedSaga);
}

export default function* logoutSagas() {
  yield [
    fork(logoutRequestedWatcher),
    fork(logoutSucceedWatcher),
  ];
}
