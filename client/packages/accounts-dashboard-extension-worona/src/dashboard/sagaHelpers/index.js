import { take, select } from 'redux-saga/effects';
import * as deps from '../deps';

export function* waitForConnectionEstablished() {
  const connected = yield select(deps.selectors.getIsConnected);
  if (!connected) {
    yield take(deps.types.CONNECTION_SUCCEED);
  }
  return true;
}
