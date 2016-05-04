import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { CREATE_SITE_REQUESTED } from '../actiontypes';
import { createSiteSucceed, createSiteFailed } from '../actiontypes';
import { createSite } from '../libs';

export function* createSiteSaga(action) {
  const { name, url, _id } = action;
  try {
    yield call(createSite, { name, url, _id });
    yield put(createSiteSucceed());
  } catch (error) {
    yield put(createSiteFailed());
  }
}

export function* createSiteWatcher() {
  yield* takeEvery(CREATE_SITE_REQUESTED, createSiteSaga);
}
