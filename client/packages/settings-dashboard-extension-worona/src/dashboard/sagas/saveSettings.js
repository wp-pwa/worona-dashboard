import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { SAVING_SETTINGS } from '../messages';
import * as actions from '../actions';
import * as libs from '../libs';
import * as types from '../types';
import * as deps from '../deps';

export function* saveSettingsSaga({ settings, woronaInfo }) {
  if (typeof woronaInfo.name !== 'string') throw new Error('Package name needed when saving settings.');
  yield deps.sagaHelpers.waitForConnectionEstablished();
  try {
    yield put(actions.saveSettingsStatusChanged({ status: SAVING_SETTINGS, settings, woronaInfo }));
    const selectedSiteId = yield select(deps.selectors.getSelectedSiteId);
    yield call(libs.saveSettings, { ...settings,
      woronaInfo: {
        name: woronaInfo.name,
        siteId: woronaInfo.siteId || selectedSiteId,
      } });
    yield put(actions.saveSettingsSucceed({ settings, woronaInfo }));
  } catch (error) {
    yield put(actions.saveSettingsFailed({ error, settings, woronaInfo }));
  }
}

export default function* saveSettingsWatcher() {
  yield* takeEvery(types.SAVE_SETTINGS_REQUESTED, saveSettingsSaga);
}
