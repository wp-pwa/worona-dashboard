import test from 'ava';
import { put, call, take, race } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import connectionStarter from '../sagas/connection-starter';
import * as libs from '../libs';
import * as actions from '../actions';
import { CONNECTION_LOST, CONNECTION_TIMEOUT } from '../errors';
import { timeout } from '../config';

test('connectionStarter: connection successfull and disconnected', t => {
  const gen = connectionStarter();
  const connectedChannel = eventChannel(() => (() => {}));
  const disconnectedChannel = eventChannel(() => (() => {}));
  t.deepEqual(gen.next().value, call(libs.start));
  t.deepEqual(gen.next().value, put(actions.connectionStarted()));
  t.deepEqual(gen.next().value, call(libs.connectedEventChannel));
  t.deepEqual(gen.next(connectedChannel).value,
    call(libs.disconnectedEventChannel));
  t.deepEqual(gen.next(disconnectedChannel).value, put(actions.connectionRequested()));
  t.deepEqual(gen.next().value, call(libs.connect));
  t.deepEqual(gen.next().value, race({
    connected: take(connectedChannel),
    timeout: call(delay, timeout),
  }));
  t.deepEqual(gen.next({ connected: true }).value, put(actions.connectionSucceed()));
  t.deepEqual(gen.next().value, take(disconnectedChannel));
  t.deepEqual(gen.next('disconnected').value, put(actions.disconnected(CONNECTION_LOST)));
  t.deepEqual(gen.next().value, put(actions.connectionRequested()));
});

test('connectionStarter: connection failed and reconnected', t => {
  const gen = connectionStarter();
  const connectedChannel = eventChannel(() => (() => {}));
  const disconnectedChannel = eventChannel(() => (() => {}));
  t.deepEqual(gen.next().value, call(libs.start));
  t.deepEqual(gen.next().value, put(actions.connectionStarted()));
  t.deepEqual(gen.next().value, call(libs.connectedEventChannel));
  t.deepEqual(gen.next(connectedChannel).value,
    call(libs.disconnectedEventChannel));
  t.deepEqual(gen.next(disconnectedChannel).value, put(actions.connectionRequested()));
  t.deepEqual(gen.next().value, call(libs.connect));
  t.deepEqual(gen.next().value, race({
    connected: take(connectedChannel),
    timeout: call(delay, timeout),
  }));
  t.deepEqual(gen.next({ timeout: true }).value, put(actions.connectionFailed(CONNECTION_TIMEOUT)));
  t.deepEqual(gen.next().value, put(actions.connectionRequested()));
});
