import * as types from '../types';

export const themeDownloadRequested = name =>
  ({ type: types.THEME_DOWNLOAD_REQUESTED, name });
export const themeDownloadSucceed = name =>
  ({ type: types.THEME_DOWNLOAD_SUCCEED, name });
export const themeDownloadFailed = error =>
  ({ type: types.THEME_DOWNLOAD_FAILED, error });

export const extensionDownloadRequested = name =>
  ({ type: types.EXTENSION_DOWNLOAD_REQUESTED, name });
export const extensionDownloadSucceed = name =>
  ({ type: types.EXTENSION_DOWNLOAD_SUCCEED, name });
export const extensionDownloadFailed = error =>
  ({ type: types.EXTENSION_DOWNLOAD_FAILED, error });

export const packagesDownloadRequested = pkgs =>
  ({ type: types.PACKAGES_DOWNLOAD_REQUESTED, pkgs });
export const packagesDownloadSucceed = pkgs =>
  ({ type: types.PACKAGES_DOWNLOAD_SUCCEED, pkgs });
export const packagesDownloadFailed = error =>
  ({ type: types.PACKAGES_DOWNLOAD_FAILED, error });

export const packagesLoadRequested = pkgs =>
  ({ type: types.PACKAGES_LOAD_REQUESTED, pkgs });
export const packagesLoadSucceed = pkgs =>
  ({ type: types.PACKAGES_LOAD_SUCCEED, pkgs });
export const packagesLoadFailed = error =>
  ({ type: types.PACKAGES_LOAD_FAILED, error });

export const themeChangeRequested = name =>
  ({ type: types.THEME_CHANGE_REQUESTED, name });
export const themeChangeSucceed = name =>
  ({ type: types.THEME_CHANGE_SUCCEED, name });
export const themeChangeFailed = error =>
  ({ type: types.THEME_CHANGE_FAILED, error });
