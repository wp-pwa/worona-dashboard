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

export function subscriptionWatcherCreator(selectedPublication, ...params) {
  return function* subscriptionWatcher() {
    const subsChannel = yield call(deps.libs.collectionEventChannel, selectedPublication);
    while (true) {
      yield take(deps.types.LOGIN_SUCCEED);
      yield put(actions.subscriptionStarted(selectedPublication));
      const subscription = yield call(deps.libs.subscribe, selectedPublication, ...params);
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
      yield put(actions.subscriptionStopped(selectedPublication));
    }
  };
}
