/* eslint-disable no-constant-condition */
import { call, take, put, select, race, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { NOT_CONNECTED, LOGIN_IN, CONNECTED_LOGIN_IN } from '../messages';
import * as selectors from '../selectors';
import * as actions from '../actions';
import * as types from '../types';
import * as deps from '../dependencies';

export function* loginRequestedSaga({ email, password }) {
  if (yield select(deps.selectors.getIsConnected)) {
    try {
      yield put(actions.loginStatusChanged(LOGIN_IN));
      const userId = yield call(deps.libs.loginWithPassword, email, password);
      yield put(actions.loginSucceed(userId));
    } catch (error) {
      yield put(actions.loginFailed(error));
    }
  } else {
    yield put(actions.loginStatusChanged(NOT_CONNECTED));
    yield take(deps.types.CONNECTION_SUCCEED);
    yield put(actions.loginStatusChanged(CONNECTED_LOGIN_IN));
    yield call(loginRequestedSaga, { email, password });
  }
}

export function* loginSucceedSaga() {
  if (yield select(selectors.getIsFirstLogin)) {
    yield call(deps.libs.push, '/add-site');
  } else {
    const redirect = yield select(selectors.getRedirectAfterLogin);
    yield call(deps.libs.push, redirect);
  }
}

export function* loginEvent(loggedInEvents) {
  while (true) {
    const { automaticLogin } = yield race({
      automaticLogin: take(loggedInEvents),
      manualLogin: take(types.LOGIN_REQUESTED),
    });
    if (automaticLogin) {
      yield put(actions.loginSucceed(automaticLogin));
      break;
    }
    const { success } = yield race({
      success: take(types.LOGIN_SUCCEED),
      failure: take(types.LOGIN_FAILED),
    });
    if (!!success) break;
  }
}

export function* logoutEvent(loggedOutEvents) {
  while (true) {
    const { automaticLogout } = yield race({
      automaticLogout: take(loggedOutEvents),
      manualLogout: take(types.LOGOUT_REQUESTED),
    });
    if (automaticLogout) {
      yield put(actions.logoutSucceed(automaticLogout));
      break;
    }
    const { success } = yield race({
      success: take(types.LOGOUT_SUCCEED),
      failure: take(types.LOGOUT_FAILED),
    });
    if (!!success) break;
  }
}

export function* logEventsWatcher() {
  yield take(deps.types.CONNECTION_SUCCEED);
  const loggedInEvents = yield call(deps.libs.loggedInEventChannel);
  const loggedOutEvents = yield call(deps.libs.loggedOutEventChannel);
  while (true) {
    yield call(loginEvent, loggedInEvents);
    yield call(logoutEvent, loggedOutEvents);
  }
}

export default function* loginSagas() {
  yield [
    takeLatest(types.LOGIN_REQUESTED, loginRequestedSaga),
    takeLatest(types.LOGIN_SUCCEED, loginSucceedSaga),
    fork(logEventsWatcher),
  ];
}
