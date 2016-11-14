import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import stringifyError from 'stringify-error-message';


import * as deps from '../deps';
import * as types from '../types';
import * as actions from '../actions';

export function* setIconSiteSaga(action) {
  try {
    const { siteId, fileId } = action;
    yield deps.sagaHelpers.waitForConnectionEstablished();
    yield call(deps.libs.setSiteIcon, { _id: siteId, fileId });
  } catch (error) {
    yield put(actions.uploadError(stringifyError(error)));
  }
}

export function* setIconSiteSagaWatcher() {
  yield* takeEvery(types.UPLOAD_SUCCEED, setIconSiteSaga);
}
