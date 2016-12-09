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
    yield put(actions.saveSettingsStatusChanged(SAVING_SETTINGS));
    const selectedSiteId = yield select(deps.selectors.getSelectedSiteId);
    const id = yield call(libs.saveSettings, { ...settings,
      woronaInfo: {
        name: woronaInfo.name,
        siteId: woronaInfo.siteId || selectedSiteId,
      } });
    yield put(actions.saveSettingsSucceed({ id }));
  } catch (error) {
    yield put(actions.saveSettingsFailed({ error }));
  }
}

export default function* saveSettingsWatcher() {
  yield* takeEvery(types.SAVE_SETTINGS_REQUESTED, saveSettingsSaga);
}
