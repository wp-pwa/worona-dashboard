import test from 'ava';
import { mock } from 'worona-deps';
import { call, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as sagaCreators from '../sagaCreators';
import * as actions from '../actions';
import * as deps from '../deps';

mock(deps);

test('subscriptionEvents', t => {
  const channel = eventChannel(() => () => {});
  const action = () => ({ type: 'SOME_ACTION' });
  const result = {};
  const gen = sagaCreators.subscriptionEvents(channel, action);
  t.deepEqual(gen.next().value, take(channel));
  t.deepEqual(gen.next(result).value, put(action(result)));
  t.deepEqual(gen.next().value, take(channel));
});

test('subscriptionWatcherCreator', t => {
  const params = {};
  const subscription = { id: 1 };
  const watcher = sagaCreators.subscriptionWatcherCreator('test', params);
  const gen = watcher();
  const subsChannel = eventChannel(() => () => {});
  const readyChannel = eventChannel(() => () => {});
  const errorChannel = eventChannel(() => () => {});
  const task = { cancel: () => {} };
  t.deepEqual(gen.next().value, call(deps.libs.collectionEventChannel, 'test'));
  t.deepEqual(gen.next(subsChannel).value, take(deps.types.LOGIN_SUCCEED));
  t.deepEqual(gen.next().value, put(actions.subscriptionStarted('test')));
  t.deepEqual(gen.next().value, call(deps.libs.subscribe, 'test', params));
  t.deepEqual(gen.next(subscription).value, call(deps.libs.readyEventChannel, subscription));
  t.deepEqual(gen.next(readyChannel).value, call(deps.libs.errorEventChannel, subscription));
  t.deepEqual(gen.next(errorChannel).value,
    fork(sagaCreators.subscriptionEvents, subsChannel, actions.subscriptionModified));
  t.deepEqual(gen.next(task).value,
    fork(sagaCreators.subscriptionEvents, readyChannel, actions.subscriptionReady));
  t.deepEqual(gen.next(task).value,
    fork(sagaCreators.subscriptionEvents, errorChannel, actions.subscriptionFailed));
  t.deepEqual(gen.next(task).value, take(deps.types.LOGOUT_SUCCEED));
  t.deepEqual(gen.next().value, call(deps.libs.unsubscribe, subscription.id));
  t.deepEqual(gen.next().value, put(actions.subscriptionStopped()));
  t.deepEqual(gen.next().value, take(deps.types.LOGIN_SUCCEED));
});
