import { createSelector } from 'reselect';
import { flatMap, map } from 'lodash';

export const packageList = state => state.build.packages.list;
export const downloadedPackages = state => state.build.packages.downloaded;
export const activatedPackages = state => state.build.packages.activated;
export const getAssets = state => state.build.assets;
export const getThemeName = state => state.build.packages.activated.theme;

export const getCssAssets = createSelector(
  getAssets,
  assets => flatMap(assets, (pkg, pkgName) => map(pkg.css, (val, path) => ({ path, pkgName })))
);
