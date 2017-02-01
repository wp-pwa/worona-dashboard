import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { DELETING_SITE } from '../messages';
import * as actions from '../actions';
import * as libs from '../libs';
import * as types from '../types';
import * as deps from '../deps';

export function* deleteSiteSaga({ siteId }) {
  yield deps.sagaHelpers.waitForConnectionEstablished();
  try {
    yield put(actions.deleteSiteStatusChanged(DELETING_SITE));
    yield call(libs.deleteSite, { siteId });
    yield put(actions.deleteSiteSucceed(siteId));
    yield call(deps.libs.push, '/sites');
  } catch (error) {
    yield put(actions.deleteSiteFailed(error));
  }
}

export function* deleteSiteWatcher() {
  yield* takeEvery(types.DELETE_SITE_REQUESTED, deleteSiteSaga);
}
