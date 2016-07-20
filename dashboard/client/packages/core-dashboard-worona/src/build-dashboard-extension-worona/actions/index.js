import * as types from '../types';

let uniqueId = 0;
export const packagesAdditionRequested = ({ theme, extensions, uid }) =>
  ({ type: types.PACKAGES_ADDITION_REQUESTED, theme, extensions, uid: uid || uniqueId++ });
export const packagesAdditionFailed = ({ error, name, uid }) =>
  ({ type: types.PACKAGES_ADDITION_FAILED, error, name, uid });
export const packagesAdditionSucceed = ({ theme, extensions, uid }) =>
  ({ type: types.PACKAGES_ADDITION_SUCCEED, theme, extensions, uid });

export const packagesDownloadRequested = ({ theme, extensions, uid }) =>
  ({ type: types.PACKAGES_DOWNLOAD_REQUESTED, theme, extensions, uid });
export const packagesDownloadSucceed = ({ theme, extensions, uid }) =>
  ({ type: types.PACKAGES_DOWNLOAD_SUCCEED, theme, extensions, uid });
export const packagesDownloadFailed = ({ error, name, uid }) =>
  ({ type: types.PACKAGES_DOWNLOAD_FAILED, error, name, uid });

export const themeDownloadRequested = ({ name, uid }) =>
  ({ type: types.THEME_DOWNLOAD_REQUESTED, name, uid });
export const themeDownloadSucceed = ({ name, uid }) =>
  ({ type: types.THEME_DOWNLOAD_SUCCEED, name, uid });
export const themeDownloadFailed = ({ error, name, uid }) =>
  ({ type: types.THEME_DOWNLOAD_FAILED, error, name, uid });

export const extensionDownloadRequested = ({ name, uid }) =>
  ({ type: types.EXTENSION_DOWNLOAD_REQUESTED, name, uid });
export const extensionDownloadSucceed = ({ name, uid }) =>
  ({ type: types.EXTENSION_DOWNLOAD_SUCCEED, name, uid });
export const extensionDownloadFailed = ({ error, name, uid }) =>
  ({ type: types.EXTENSION_DOWNLOAD_FAILED, error, name, uid });

export const packagesLoadRequested = ({ theme, extensions, uid }) =>
  ({ type: types.PACKAGES_LOAD_REQUESTED, theme, extensions, uid });
export const packagesLoadSucceed = ({ theme, extensions, uid }) =>
  ({ type: types.PACKAGES_LOAD_SUCCEED, theme, extensions, uid });
export const packagesLoadFailed = ({ error, name, uid }) =>
  ({ type: types.PACKAGES_LOAD_FAILED, error, name, uid });

export const themeChangeRequested = ({ name, uid }) =>
  ({ type: types.THEME_CHANGE_REQUESTED, name, uid });
export const themeChangeSucceed = ({ name, uid }) =>
  ({ type: types.THEME_CHANGE_SUCCEED, name, uid });
export const themeChangeFailed = ({ error, name, uid }) =>
  ({ type: types.THEME_CHANGE_FAILED, error, name, uid });
