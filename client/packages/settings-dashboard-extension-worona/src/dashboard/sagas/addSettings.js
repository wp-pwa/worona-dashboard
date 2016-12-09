import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as types from '../types';
import * as deps from '../deps';

export function* addSettingsSaga(action) {
  yield deps.sagaHelpers.waitForConnectionEstablished();
  try {
    const id = yield call(deps.libs.call, 'addSettings', action);
    yield put(actions.addSettingsSucceed({ id, ...action }));
  } catch (error) {
    yield put(actions.addSettingsFailed({ error, ...action }));
  }
}

export default function* addSettingsWatcher() {
  yield* takeEvery(types.ADD_SETTINGS_REQUESTED, addSettingsSaga);
}
