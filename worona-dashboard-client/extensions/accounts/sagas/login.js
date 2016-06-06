/* eslint-disable no-constant-condition */
import { call, take, put, select, race, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { isFirstLogin } from '../selectors';
import { loginStatusChanged, loginSucceed, loginFailed, logoutSucceed } from '../actions';
import { LOGIN_SUCCEED, LOGIN_REQUESTED, LOGIN_FAILED, LOGOUT_REQUESTED, LOGOUT_SUCCEED,
  LOGOUT_FAILED } from '../actiontypes';
import { NOT_CONNECTED, LOGIN_IN, CONNECTED_LOGIN_IN } from '../messages';
import { CONNECTION_SUCCEED, isConnected, browserHistory, loginWithPassword, loggedInEventChannel,
  loggedOutEventChannel } from '../dependencies';

export function* loginRequestedSaga({ email, password }) {
  if (yield select(isConnected)) {
    try {
      yield put(loginStatusChanged(LOGIN_IN));
      const userId = yield call(loginWithPassword, email, password);
      yield put(loginSucceed(userId));
    } catch (error) {
      yield put(loginFailed(error));
    }
  } else {
    yield put(loginStatusChanged(NOT_CONNECTED));
    yield take(CONNECTION_SUCCEED);
    yield put(loginStatusChanged(CONNECTED_LOGIN_IN));
    yield call(loginRequestedSaga, { email, password });
  }
}
export function* loginRequestedWatcher() {
  yield* takeLatest(LOGIN_REQUESTED, loginRequestedSaga);
}

export function* loginSucceedSaga() {
  if (yield select(isFirstLogin)) {
    yield call(browserHistory.push, '/create-first-app');
  } else {
    yield call(browserHistory.push, '/');
  }
}
export function* loginSucceedWatcher() {
  yield* takeLatest(LOGIN_SUCCEED, loginSucceedSaga);
}

export function* loginEvent(loggedInEvents) {
  while (true) {
    const { automaticLogin } = yield race({
      automaticLogin: take(loggedInEvents),
      manualLogin: take(LOGIN_REQUESTED),
    });
    if (automaticLogin) {
      yield put(loginSucceed(automaticLogin));
      break;
    }
    const { success } = yield race({
      success: take(LOGIN_SUCCEED),
      failure: take(LOGIN_FAILED),
    });
    if (!!success) break;
  }
}

export function* logoutEvent(loggedOutEvents) {
  while (true) {
    const { automaticLogout } = yield race({
      automaticLogout: take(loggedOutEvents),
      manualLogout: take(LOGOUT_REQUESTED),
    });
    if (automaticLogout) {
      yield put(logoutSucceed(automaticLogout));
      break;
    }
    const { success } = yield race({
      success: take(LOGOUT_SUCCEED),
      failure: take(LOGOUT_FAILED),
    });
    if (!!success) break;
  }
}

export function* logEventsWatcher() {
  yield take(CONNECTION_SUCCEED);
  const loggedInEvents = yield call(loggedInEventChannel);
  const loggedOutEvents = yield call(loggedOutEventChannel);
  while (true) {
    yield call(loginEvent, loggedInEvents);
    yield call(logoutEvent, loggedOutEvents);
  }
}

export default function* loginSagas() {
  yield [
    fork(loginRequestedWatcher),
    fork(loginSucceedWatcher),
    fork(logEventsWatcher),
  ];
}
