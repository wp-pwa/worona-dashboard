import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { DELETING_SITE } from '../messages';
import * as actions from '../actions';
import * as libs from '../libs';
import * as types from '../types';
import * as deps from '../dependencies';

export function* deleteSiteSaga(action) {
  const { _id } = action;
  try {
    yield put(actions.deleteSiteStatusChanged(DELETING_SITE));
    const siteId = yield call(libs.deleteSite, { _id });
    yield put(actions.deleteSiteSucceed(siteId));
    yield call(deps.libs.push, '/');
  } catch (error) {
    yield put(actions.deleteSiteFailed(error));
  }
}

export function* deleteSiteWatcher() {
  yield* takeEvery(types.DELETE_SITE_REQUESTED, deleteSiteSaga);
}
