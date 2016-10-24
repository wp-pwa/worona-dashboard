import { take, select } from 'redux-saga/effects';
import * as types from '../types';

export function* waitForReadySubscription(selectedCollection, selector) {
  let ready = yield select(selector);
  while (!ready) {
    const action = yield take(types.SUBSCRIPTION_READY);
    if (action.collection === selectedCollection) ready = true;
  }
  return ready;
}
