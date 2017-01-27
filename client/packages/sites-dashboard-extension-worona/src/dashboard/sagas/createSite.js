import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CREATING_SITE } from '../messages';
import * as actions from '../actions';
import * as libs from '../libs';
import * as types from '../types';
import * as deps from '../deps';

export function* createSiteSaga(action) {
  const { siteName, siteUrl, siteId } = action;
  try {
    yield put(actions.createSiteStatusChanged(CREATING_SITE));
    yield deps.sagaHelpers.waitForConnectionEstablished();
    const newId = yield call(libs.createSite, { siteName, siteUrl, siteId });
    yield put(actions.createSiteSucceed(newId));
    yield call(deps.libs.push, `/check-site/${newId}`);
  } catch (error) {
    yield put(actions.createSiteFailed(error));
  }
}

export function* createSiteWatcher() {
  yield* takeEvery(types.CREATE_SITE_REQUESTED, createSiteSaga);
}
