import stringifyError from 'stringify-error-message';
import * as types from '../types';

// Save settings actions:
export const saveSettingsRequested = (settings, woronaInfo) =>
  ({ type: types.SAVE_SETTINGS_REQUESTED, settings, woronaInfo });
export const saveSettingsStatusChanged = ({ status, settings, woronaInfo }) =>
  ({ type: types.SAVE_SETTINGS_STATUS_CHANGED, status, settings, woronaInfo });
export const saveSettingsSucceed = ({ settings, woronaInfo }) =>
  ({ type: types.SAVE_SETTINGS_SUCCEED, settings, woronaInfo });
export const saveSettingsFailed = ({ error, settings, woronaInfo }) =>
  ({ type: types.SAVE_SETTINGS_FAILED, error: stringifyError(error), settings, woronaInfo });

export const addSettingsRequested = ({ name, namespace, siteId }) =>
  ({ type: types.ADD_SETTINGS_REQUESTED, name, namespace, siteId });
export const addSettingsSucceed = ({ id, name, namespace, siteId }) =>
  ({ type: types.ADD_SETTINGS_SUCCEED, id, name, namespace, siteId });
export const addSettingsFailed = ({ error, name, namespace, siteId }) =>
  ({ type: types.ADD_SETTINGS_FAILED, error, name, namespace, siteId });

export const defaultSettingsNeeded = ({ name, siteId }) =>
  ({ type: types.DEFAULT_SETTINGS_NEEDED, name, siteId });
