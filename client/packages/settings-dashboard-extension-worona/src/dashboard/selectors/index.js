import { createSelector } from 'reselect';
import { findIndex } from 'lodash';
import { flow, map, sortBy, groupBy, filter } from 'lodash/fp';
import * as deps from '../deps';

export const getSettingsLiveCollection = state => state.settings.collections.live.collection;
export const getSettingsLiveIsReady = state => state.settings.collections.live.isReady;
export const getSettingsPreviewCollection = state => state.settings.collections.preview.collection;
export const getSettingsPreviewIsReady = state => state.settings.collections.preview.isReady;
export const getPackageCollection = state => state.settings.collections.packages.collection;
export const getPackageIsReady = state => state.settings.collections.packages.isReady;
export const getDevPackageCollection = state => state.settings.collections.devPackages.collection;

export const getCategories = createSelector(
  getSettingsLiveCollection,
  getPackageCollection,
  getDevPackageCollection,
  (settings, packages, devPackages) => {
    const pkgsWithSettings = flow(
      map(item => packages[findIndex(packages, pkg => pkg.name === item.woronaInfo.name)]),
      filter(item => typeof item !== 'undefined'),
      sortBy(item => item.menu.order),
      groupBy(item => item.menu.category)
    )(settings);
    const pkgsFromDev = flow(
      sortBy(item => item.menu.order),
      groupBy(item => item.menu.category)
    )(devPackages);
    return { ...pkgsWithSettings, ...pkgsFromDev };
  }
);

export const getAllSettings = state => state.settings.collection;
export const getIsReadySettings = state => state.settings.isReady;

export const getSiteSettings = id => createSelector(
  getAllSettings,
  settings => settings.filter(setting => setting.siteId === id)
);

export const getSelectedSiteSettings = (state) => {
  const currentId = deps.selectors.getSelectedSiteId(state);
  return getSiteSettings(currentId);
};
