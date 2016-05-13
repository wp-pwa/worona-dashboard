/* eslint-disable no-constant-condition */
import { call, take, put, fork } from 'redux-saga/effects';
import { collectionEventChannel, subscribe, unsubscribe, readyEventChannel, errorEventChannel }
  from '../libs';
import { subscriptionStarted, subscriptionModified, subscriptionReady, subscriptionFailed,
  subscriptionStopped } from '../actions';
import { LOGIN_SUCCEED, LOGOUT_SUCCEED } from '../actiontypes';

export function* subscriptionSaga(channel) {
  while (true) {
    const data = yield take(channel);
    yield put(subscriptionModified(data.event, data.id, data.fields));
  }
}

export function* subscriptionEvents(channel, action) {
  while (true) {
    const result = yield take(channel);
    yield put(action(result));
  }
}

export function* subscriptionWatcherCreator(selectedCollection, ...params) {
  const channel = yield call(collectionEventChannel, selectedCollection);
  while (true) {
    yield take(LOGIN_SUCCEED);
    yield put(subscriptionStarted());
    const subscription = yield call(subscribe, selectedCollection, ...params);
    const readyChannel = yield call(readyEventChannel, subscription);
    const errorChannel = yield call(errorEventChannel, subscription);
    yield fork(subscriptionSaga, channel);
    yield fork(subscriptionEvents, readyChannel, subscriptionReady);
    yield fork(subscriptionEvents, errorChannel, subscriptionFailed);
    yield take(LOGOUT_SUCCEED);
    yield call(unsubscribe, subscription.id);
    yield put(subscriptionStopped());
  }
}
