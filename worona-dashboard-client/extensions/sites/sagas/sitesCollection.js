/* eslint-disable no-constant-condition */
import { call, take, put } from 'redux-saga/effects';
import { collectionEventChannel, subscribe } from '../libs';
import { sitesCollectionModified } from '../actions';

export function* sitesCollectionWatcher() {
  yield call(subscribe, 'sites');
  const channel = yield call(collectionEventChannel, 'sites');
  while (true) {
    const { event, id, fields } = yield take(channel);
    yield put(sitesCollectionModified(event, id, fields));
  }
}
