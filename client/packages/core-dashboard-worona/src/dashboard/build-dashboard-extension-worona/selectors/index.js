import { createSelector } from 'reselect';
import { flatMap, map } from 'lodash';

export const getPackageList = state => state.build.packages.list;
export const getDownloadedPackages = state => state.build.packages.downloaded;
export const getActivatedPackages = state => state.build.packages.activated;
export const getAssets = state => state.build.assets;
export const getThemeName = state => state.build.packages.activated.theme;

export const getCssAssets = createSelector(
  getAssets,
  assets => flatMap(assets, (pkg, pkgName) => map(pkg.css, (val, path) => ({ path, pkgName })))
);
