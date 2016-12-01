import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { SAVING_SETTINGS } from '../messages';
import * as actions from '../actions';
import * as libs from '../libs';
import * as types from '../types';
import * as deps from '../deps';

export function* saveSettingSaga(action) {
  const { setting } = action;
  yield deps.sagaHelpers.waitForConnectionEstablished();
  try {
    yield put(actions.saveSettingStatusChanged(SAVING_SETTINGS));
    yield call(libs.saveSettings, setting);
    yield put(actions.saveSettingSucceed(setting._id));
  } catch (error) {
    yield put(actions.saveSettingFailed(error));
  }
}

export function* saveSettingsWatcher() {
  yield* takeEvery(types.SAVE_SETTING_REQUESTED, saveSettingSaga);
}
