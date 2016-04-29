/* eslint-disable no-constant-condition */
import { put, call, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { start, connectedEventChannel, disconnectedEventChannel, connect } from '../lib';
import { connectionStarted, connectionRequested, connectionSucceed, connectionFailed,
  disconnected } from '../actions';
import { CONNECTION_LOST, CONNECTION_TIMEOUT } from '../errors';
import { timeout } from '../config';

export default function* connectionStarter() {
  yield call(start);
  yield put(connectionStarted());
  const connectedChannel = yield call(connectedEventChannel);
  const disconnectedChannel = yield call(disconnectedEventChannel);

  while (true) {
    yield put(connectionRequested());
    yield call(connect);
    const { connected } = yield race({
      connected: take(connectedChannel),
      timeout: call(delay, timeout),
    });
    if (connected) {
      yield put(connectionSucceed());
      yield take(disconnectedChannel);
      yield put(disconnected(CONNECTION_LOST));
    } else {
      yield put(connectionFailed(CONNECTION_TIMEOUT));
    }
  }
}
