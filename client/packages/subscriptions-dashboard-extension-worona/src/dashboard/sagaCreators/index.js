/* eslint-disable no-constant-condition */
import { call, take, put, fork } from 'redux-saga/effects';
import * as actions from '../actions';
import * as deps from '../deps';

export function* subscriptionEvents(channel, action) {
  while (true) {
    const result = yield take(channel);
    yield put(action(result));
  }
}

const collectionsWatched = [];

export const collectionWatcherCreator = collectionName =>
  function* collectionWatcher() {
    if (collectionsWatched.indexOf(collectionName) === -1) {
      collectionsWatched.push(collectionName);
      const collectionChannel = yield call(deps.libs.collectionEventChannel, collectionName);
      yield fork(subscriptionEvents, collectionChannel, actions.collectionModified);
    }
  };

export const subscriptionWatcherCreator = (subscriptionName, ...params) =>
  function* subscriptionWatcher() {
    while (true) {
      yield take(deps.types.LOGIN_SUCCEED);
      yield put(actions.subscriptionStarted({ subscription: subscriptionName }));
      const subscription = yield call(deps.libs.subscribe, subscriptionName, ...params);
      const readyChannel = yield call(deps.libs.readyEventChannel, subscription);
      const errorChannel = yield call(deps.libs.errorEventChannel, subscription);
      const readySaga = yield fork(subscriptionEvents, readyChannel, actions.subscriptionReady);
      const failedSaga = yield fork(subscriptionEvents, errorChannel, actions.subscriptionFailed);
      yield take(deps.types.LOGOUT_SUCCEED);
      readySaga.cancel();
      failedSaga.cancel();
      yield call(deps.libs.unsubscribe, subscription.id);
      yield put(actions.subscriptionStopped({ subscription: subscriptionName }));
    }
  };
