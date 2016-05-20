/* eslint-disable no-constant-condition */
import { call, take, put, fork } from 'redux-saga/effects';
import { collectionEventChannel, subscribe, unsubscribe, readyEventChannel, errorEventChannel }
  from '../libs';
import { subscriptionStarted, subscriptionModified, subscriptionReady, subscriptionFailed,
  subscriptionStopped } from '../actions';
import { LOGIN_SUCCEED, LOGOUT_SUCCEED } from '../dependencies';

export function* subscriptionEvents(channel, action) {
  while (true) {
    const result = yield take(channel);
    yield put(action(result));
  }
}

export function subscriptionWatcherCreator(selectedCollection, ...params) {
  return function* subscriptionWatcher() {
    const subsChannel = yield call(collectionEventChannel, selectedCollection);
    while (true) {
      yield take(LOGIN_SUCCEED);
      yield put(subscriptionStarted());
      const subscription = yield call(subscribe, selectedCollection, ...params);
      const readyChannel = yield call(readyEventChannel, subscription);
      const errorChannel = yield call(errorEventChannel, subscription);
      const subsSaga = yield fork(subscriptionEvents, subsChannel, subscriptionModified);
      const readySaga = yield fork(subscriptionEvents, readyChannel, subscriptionReady);
      const failedSaga = yield fork(subscriptionEvents, errorChannel, subscriptionFailed);
      yield take(LOGOUT_SUCCEED);
      subsSaga.cancel();
      readySaga.cancel();
      failedSaga.cancel();
      yield call(unsubscribe, subscription.id);
      yield put(subscriptionStopped());
    }
  };
}
