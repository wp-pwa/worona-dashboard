/* eslint-disable no-constant-condition */
import { put, call, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { CONNECTION_LOST, CONNECTION_TIMEOUT } from '../errors';
import { timeout } from '../config';
import * as libs from '../libs';
import * as actions from '../actions';

export default function* connectionStarter() {
  yield call(libs.start);
  yield put(actions.connectionStarted());
  const connectedChannel = yield call(libs.connectedEventChannel);
  const disconnectedChannel = yield call(libs.disconnectedEventChannel);

  while (true) {
    yield put(actions.connectionRequested());
    yield call(libs.connect);
    const { connected } = yield race({
      connected: take(connectedChannel),
      timeout: call(delay, timeout),
    });
    if (connected) {
      yield put(actions.connectionSucceed());
      yield take(disconnectedChannel);
      yield put(actions.disconnected(CONNECTION_LOST));
    } else {
      yield put(actions.connectionFailed(CONNECTION_TIMEOUT));
    }
  }
}
