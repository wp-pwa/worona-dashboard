import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CREATE_SITE_REQUESTED } from '../actiontypes';
import { CREATING_SITE } from '../messages';
import { createSiteSucceed, createSiteFailed, createSiteStatusChanged } from '../actions';
import { createSite } from '../libs';
import { browserHistory } from '../dependencies';

export function* createSiteSaga(action) {
  const { name, url, _id } = action;
  try {
    yield put(createSiteStatusChanged(CREATING_SITE));
    const siteId = yield call(createSite, { name, url, _id });
    yield put(createSiteSucceed(siteId));
    yield call(browserHistory.push, '/');
  } catch (error) {
    yield put(createSiteFailed(error));
  }
}

export function* createSiteWatcher() {
  yield* takeEvery(CREATE_SITE_REQUESTED, createSiteSaga);
}
