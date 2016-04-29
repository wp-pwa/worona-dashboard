import test from 'ava';
import { put, call, take, race } from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import connectionStarter from '../sagas/connection-starter';
import { start, connectedEventChannel, disconnectedEventChannel, connect } from '../lib';
import { connectionStarted, connectionRequested, connectionSucceed, connectionFailed,
  disconnected } from '../actions';
import { CONNECTION_LOST, CONNECTION_TIMEOUT } from '../errors';
import { timeout } from '../config';

test('connectionStarter connection successfull and disconnected', t => {
  const gen = connectionStarter();
  const connectedChannel = eventChannel(() => {});
  const disconnectedChannel = eventChannel(() => {});
  t.deepEqual(gen.next().value, call(start));
  t.deepEqual(gen.next().value, put(connectionStarted()));
  t.deepEqual(gen.next().value, call(connectedEventChannel));
  t.deepEqual(gen.next(connectedChannel).value,
    call(disconnectedEventChannel));
  t.deepEqual(gen.next(disconnectedChannel).value, put(connectionRequested()));
  t.deepEqual(gen.next().value, call(connect));
  t.deepEqual(gen.next().value, race({
    connected: take(connectedChannel),
    timeout: call(delay, timeout),
  }));
  t.deepEqual(gen.next({ connected: true }).value, put(connectionSucceed()));
  t.deepEqual(gen.next().value, take(disconnectedChannel));
  t.deepEqual(gen.next('disconnected').value, put(disconnected(CONNECTION_LOST)));
  t.deepEqual(gen.next().value, put(connectionRequested()));
});

test('connectionStarter connection failed and reconnected', t => {
  const gen = connectionStarter();
  const connectedChannel = eventChannel(() => {});
  const disconnectedChannel = eventChannel(() => {});
  t.deepEqual(gen.next().value, call(start));
  t.deepEqual(gen.next().value, put(connectionStarted()));
  t.deepEqual(gen.next().value, call(connectedEventChannel));
  t.deepEqual(gen.next(connectedChannel).value,
    call(disconnectedEventChannel));
  t.deepEqual(gen.next(disconnectedChannel).value, put(connectionRequested()));
  t.deepEqual(gen.next().value, call(connect));
  t.deepEqual(gen.next().value, race({
    connected: take(connectedChannel),
    timeout: call(delay, timeout),
  }));
  t.deepEqual(gen.next({ timeout: true }).value, put(connectionFailed(CONNECTION_TIMEOUT)));
  t.deepEqual(gen.next().value, put(connectionRequested()));
});
