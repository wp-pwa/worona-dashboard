/* eslint-disable no-constant-condition */
import { call, take, put, race } from 'redux-saga/effects';
import { collectionEventChannel, subscribe, unsubscribe } from '../libs';
import { sitesCollectionModified } from '../actions';
import { LOGIN_SUCCEED, LOGOUT_SUCCEED } from '../actiontypes';

export function* sitesCollectionSaga(channel) {
  while (true) {
    const { data } = yield race({
      data: take(channel),
      logout: take(LOGOUT_SUCCEED),
    });
    if (data) yield put(sitesCollectionModified(data.event, data.id, data.fields));
    else break;
  }
}

export function* sitesCollectionWatcher() {
  const channel = yield call(collectionEventChannel, 'sites');
  while (true) {
    yield take(LOGIN_SUCCEED);
    const subscription = yield call(subscribe, 'sites');
    yield call(sitesCollectionSaga, channel);
    yield call(unsubscribe, subscription.id);
  }
}
