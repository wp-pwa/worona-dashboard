/* eslint-disable no-constant-condition */
import { fork, select, take, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as selectors from '../selectors';
import * as types from '../types';

function* siteSelectedSaga() {
  let lastSiteId = false;
  while (true) {
    yield take(types.ROUTER_DID_CHANGE);
    const siteId = yield select(selectors.getSelectedSiteId);
    if (siteId && siteId !== lastSiteId) {
      lastSiteId = siteId;
      yield put(actions.siteSelected({ siteId }));
    } else if (!siteId && lastSiteId !== false) {
      lastSiteId = false;
      yield put(actions.siteUnselected());
    }
  }
}

export default function* routerSagas() {
  yield [fork(siteSelectedSaga)];
}
