import { createSelector } from 'reselect';
import * as deps from '../deps';
import * as selectors from '../selectors';

export const getSettingsCreator = (packageName) => createSelector(
  selectors.getSettingsLiveCollection,
  deps.selectors.getSelectedSiteId,
  (settings, siteId) => (
    settings.find(
      item =>
        (item.woronaInfo.name === packageName
             && item.woronaInfo.siteId === siteId)
    ) || { woronaInfo: {} } // default to empty object til settings collections is loaded
  )
);

export const getSettingCreator = packageName => (settingName, settingDefault = undefined) =>
createSelector(
  getSettingsCreator(packageName),
  settings => (settings && settings[settingName]) || settingDefault
);
