import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { EDITING_SITE } from '../messages';
import * as actions from '../actions';
import * as libs from '../libs';
import * as types from '../types';
import * as deps from '../deps';

export function* editSiteSaga(action) {
  const { name, url, _id } = action;
  yield deps.sagaHelpers.waitForConnectionEstablished();
  try {
    yield put(actions.editSiteStatusChanged(EDITING_SITE));
    yield call(libs.editSite, { name, url, _id });
    yield put(actions.editSiteSucceed(_id));
    yield call(deps.libs.push, '/sites');
  } catch (error) {
    yield put(actions.editSiteFailed(error));
  }
}

export function* editSiteWatcher() {
  yield* takeEvery(types.EDIT_SITE_REQUESTED, editSiteSaga);
}
