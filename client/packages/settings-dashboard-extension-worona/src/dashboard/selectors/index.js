import { createSelector } from 'reselect';
import { findIndex, findKey } from 'lodash';
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
  deps.selectors.getSelectedService,
  getSettingsLiveCollection,
  getPackageCollection,
  getDevPackageCollection,
  deps.selectors.getSelectedSiteId,
  (service, settings, packages, devPackages, siteId) => {
    const pkgsWithSettings = flow(
      filter(item => item.woronaInfo.siteId === siteId),
      map(item => packages[findIndex(packages, pkg =>
        pkg.name === item.woronaInfo.name && pkg.menu.services.indexOf(service) !== -1
      )]),
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

export const getSelectedPackage = createSelector(
  deps.selectors.getSelectedPackageName,
  getPackageCollection,
  getDevPackageCollection,
  (name, packages, devPackages) => {
    const allPackages = [...packages, ...devPackages];
    const index = findIndex(allPackages, pkg => pkg.name === name);
    return allPackages[index] || {};
  }
);

export const getSelectedPackageIsActivated = createSelector(
  deps.selectors.getSelectedPackageName,
  deps.selectors.getActivatedPackages,
  (selectedName, activatedPkgs) => !!findKey(activatedPkgs, pkgName => pkgName === selectedName)
);
