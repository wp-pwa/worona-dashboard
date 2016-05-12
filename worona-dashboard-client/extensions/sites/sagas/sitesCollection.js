/* eslint-disable no-constant-condition */
import { call, take, put, fork } from 'redux-saga/effects';
import { collectionEventChannel, subscribe, unsubscribe, readyEventChannel, errorEventChannel }
  from '../libs';
import { sitesCollectionStarted, sitesCollectionModified, sitesCollectionReady,
  sitesCollectionFailed, sitesCollectionStopped } from '../actions';
import { LOGIN_SUCCEED, LOGOUT_SUCCEED } from '../actiontypes';

export function* sitesCollectionSaga(channel) {
  while (true) {
    const data = yield take(channel);
    yield put(sitesCollectionModified(data.event, data.id, data.fields));
  }
}

export function* sitesCollectionEvents(channel, action) {
  const result = yield take(channel);
  yield put(action(result));
}

export function* sitesCollectionWatcher() {
  const channel = yield call(collectionEventChannel, 'sites');
  while (true) {
    yield take(LOGIN_SUCCEED);
    yield put(sitesCollectionStarted());
    const subscription = yield call(subscribe, 'sites');
    const readyChannel = yield call(readyEventChannel, subscription);
    const errorChannel = yield call(errorEventChannel, subscription);
    yield fork(sitesCollectionSaga, channel);
    yield fork(sitesCollectionEvents, readyChannel, sitesCollectionReady);
    yield fork(sitesCollectionEvents, errorChannel, sitesCollectionFailed);
    yield take(LOGOUT_SUCCEED);
    yield call(unsubscribe, subscription.id);
    yield put(sitesCollectionStopped());
  }
}
