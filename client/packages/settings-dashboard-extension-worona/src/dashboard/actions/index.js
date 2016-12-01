import stringifyError from 'stringify-error-message';
import * as types from '../types';
  // Save settings actions:
export const saveSettingRequested = (setting) =>
  ({ type: types.SAVE_SETTING_REQUESTED, setting });
export const saveSettingStatusChanged = status =>
  ({ type: types.SAVE_SETTING_STATUS_CHANGED, status });
export const saveSettingSucceed = settingId =>
  ({ type: types.SAVE_SETTING_SUCCEED, settingId });
export const saveSettingFailed = errorObj =>
  ({ type: types.SAVE_SETTING_FAILED, error: stringifyError(errorObj) });
