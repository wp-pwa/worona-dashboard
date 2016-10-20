import { take, select } from 'redux-saga/effects';
import * as deps from '../deps';

export function* waitForConnectionEstablished() {
  const connected = yield select(deps.selectors.getIsConnected);
  if (!connected) {
    console.log('fee');
    yield take(deps.types.CONNECTION_SUCCEED);
  }
  console.log(connected);
  return true;
}
