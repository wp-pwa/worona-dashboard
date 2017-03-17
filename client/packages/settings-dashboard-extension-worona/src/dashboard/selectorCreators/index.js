import { createSelector } from 'reselect';
import * as deps from '../deps';
import * as selectors from '../selectors';

export const getSettings = packageNamespace =>
  createSelector(
    selectors.getSettingsLiveCollection,
    deps.selectors.getActivatedPackages,
    deps.selectors.getSelectedSiteId,
    (settings, activated, siteId) =>
      settings.find(
        item =>
          item.woronaInfo.name === activated[packageNamespace] && item.woronaInfo.siteId === siteId,
      ) || { woronaInfo: {} }, // default to empty object til settings collections is loaded
  );

export const getSetting = (packageNamespace, settingName, settingDefault = undefined) =>
  createSelector(
    getSettings(packageNamespace),
    settings => (settings && settings[settingName]) || settingDefault,
  );
