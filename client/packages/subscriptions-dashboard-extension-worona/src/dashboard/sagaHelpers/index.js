import { take, select } from 'redux-saga/effects';
import * as types from '../types';

export function* waitForReadySubscription(subscriptionName, selector) {
  let ready = yield select(selector);
  while (!ready) {
    const action = yield take(types.SUBSCRIPTION_READY);
    if (action.subscription === subscriptionName) ready = true;
  }
}
