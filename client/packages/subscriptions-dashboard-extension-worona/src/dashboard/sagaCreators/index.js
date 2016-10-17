/* eslint-disable no-constant-condition */
import { call, take, put, fork, select } from 'redux-saga/effects';
import * as actions from '../actions';
import * as deps from '../dependencies';
import * as types from '../types';

export function* subscriptionEvents(channel, action) {
  while (true) {
    const result = yield take(channel);
    yield put(action(result));
  }
}

export function subscriptionWatcherCreator(selectedCollection, ...params) {
  return function* subscriptionWatcher() {
    const subsChannel = yield call(deps.libs.collectionEventChannel, selectedCollection);
    while (true) {
      yield take(deps.types.LOGIN_SUCCEED);
      yield put(actions.subscriptionStarted(selectedCollection));
      const subscription = yield call(deps.libs.subscribe, selectedCollection, ...params);
      const readyChannel = yield call(deps.libs.readyEventChannel, subscription);
      const errorChannel = yield call(deps.libs.errorEventChannel, subscription);
      const subsSaga = yield fork(subscriptionEvents, subsChannel, actions.subscriptionModified);
      const readySaga = yield fork(subscriptionEvents, readyChannel, actions.subscriptionReady);
      const failedSaga = yield fork(subscriptionEvents, errorChannel, actions.subscriptionFailed);
      yield take(deps.types.LOGOUT_SUCCEED);
      subsSaga.cancel();
      readySaga.cancel();
      failedSaga.cancel();
      yield call(deps.libs.unsubscribe, subscription.id);
      yield put(actions.subscriptionStopped());
    }
  };
}

export function* waitForReadySubscription(selectedCollection, selector) {
  let ready = yield select(selector);
  while (!ready) {
    const action = yield take(types.SUBSCRIPTION_READY);
    if (action.collection === selectedCollection) ready = true;
  }
  return ready;
}
