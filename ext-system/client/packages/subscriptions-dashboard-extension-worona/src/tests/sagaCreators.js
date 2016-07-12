import test from 'ava';
import { call, put, take, fork } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { subscriptionEvents, subscriptionWatcherCreator } from '../sagaCreators';
import { collectionEventChannel, readyEventChannel, errorEventChannel, subscribe, unsubscribe }
  from '../libs';
import { subscriptionStarted, subscriptionModified, subscriptionReady, subscriptionFailed,
  subscriptionStopped } from '../actions';
import { LOGIN_SUCCEED, LOGOUT_SUCCEED } from '../dependencies';

test('subscriptionEvents', t => {
  const channel = eventChannel(() => {});
  const action = () => ({ type: 'SOME_ACTION' });
  const result = {};
  const gen = subscriptionEvents(channel, action);
  t.deepEqual(gen.next().value, take(channel));
  t.deepEqual(gen.next(result).value, put(action(result)));
  t.deepEqual(gen.next().value, take(channel));
});

test('subscriptionWatcherCreator', t => {
  const params = {};
  const subscription = { id: 1 };
  const watcher = subscriptionWatcherCreator('test', params);
  const gen = watcher();
  const subsChannel = eventChannel(() => {});
  const readyChannel = eventChannel(() => {});
  const errorChannel = eventChannel(() => {});
  const task = { cancel: () => {} };
  t.deepEqual(gen.next().value, call(collectionEventChannel, 'test'));
  t.deepEqual(gen.next(subsChannel).value, take(LOGIN_SUCCEED));
  t.deepEqual(gen.next().value, put(subscriptionStarted()));
  t.deepEqual(gen.next().value, call(subscribe, 'test', params));
  t.deepEqual(gen.next(subscription).value, call(readyEventChannel, subscription));
  t.deepEqual(gen.next(readyChannel).value, call(errorEventChannel, subscription));
  t.deepEqual(gen.next(errorChannel).value,
    fork(subscriptionEvents, subsChannel, subscriptionModified));
  t.deepEqual(gen.next(task).value,
    fork(subscriptionEvents, readyChannel, subscriptionReady));
  t.deepEqual(gen.next(task).value,
    fork(subscriptionEvents, errorChannel, subscriptionFailed));
  t.deepEqual(gen.next(task).value, take(LOGOUT_SUCCEED));
  t.deepEqual(gen.next().value, call(unsubscribe, subscription.id));
  t.deepEqual(gen.next().value, put(subscriptionStopped()));
  t.deepEqual(gen.next().value, take(LOGIN_SUCCEED));
});
