import { take, select } from 'redux-saga/effects';
import * as deps from '../deps';
import * as selectors from '../selectors';

export function* waitForReadySelectedSite() {
  let ready = yield select(selectors.getIsReadySelectedSite);
  while (!ready) {
    yield take(deps.types.COLLECTION_MODIFIED);
    ready = yield select(selectors.getIsReadySelectedSite);
  }
  return ready;
}
