import * as types from '../types';

export const packagesDownloadRequested = ({ theme, extensions }) =>
  ({ type: types.PACKAGES_DOWNLOAD_REQUESTED, theme, extensions });
export const packagesDownloadSucceed = ({ theme, extensions }) =>
  ({ type: types.PACKAGES_DOWNLOAD_SUCCEED, theme, extensions });
export const packagesDownloadFailed = ({ error, name }) =>
  ({ type: types.PACKAGES_DOWNLOAD_FAILED, error, name });

export const themeDownloadRequested = ({ name }) =>
  ({ type: types.THEME_DOWNLOAD_REQUESTED, name });
export const themeDownloadSucceed = ({ name }) =>
  ({ type: types.THEME_DOWNLOAD_SUCCEED, name });
export const themeDownloadFailed = ({ error, name }) =>
  ({ type: types.THEME_DOWNLOAD_FAILED, error, name });

export const extensionDownloadRequested = ({ name }) =>
  ({ type: types.EXTENSION_DOWNLOAD_REQUESTED, name });
export const extensionDownloadSucceed = ({ name }) =>
  ({ type: types.EXTENSION_DOWNLOAD_SUCCEED, name });
export const extensionDownloadFailed = ({ error, name }) =>
  ({ type: types.EXTENSION_DOWNLOAD_FAILED, error, name });

export const packagesLoadRequested = ({ theme, extensions }) =>
  ({ type: types.PACKAGES_LOAD_REQUESTED, theme, extensions });
export const packagesLoadSucceed = ({ theme, extensions }) =>
  ({ type: types.PACKAGES_LOAD_SUCCEED, theme, extensions });
export const packagesLoadFailed = ({ error, name }) =>
  ({ type: types.PACKAGES_LOAD_FAILED, error, name });

export const themeLoadRequested = ({ name }) =>
  ({ type: types.THEME_LOAD_REQUESTED, name });
export const themeLoadSucceed = ({ name }) =>
  ({ type: types.THEME_LOAD_SUCCEED, name });
export const themeLoadFailed = ({ error }) =>
  ({ type: types.THEME_LOAD_FAILED, error });

export const extensionLoadRequested = ({ name }) =>
  ({ type: types.EXTENSION_LOAD_REQUESTED, name });
export const extensionLoadSucceed = ({ name }) =>
  ({ type: types.EXTENSION_LOAD_SUCCEED, name });
export const extensionLoadFailed = ({ error, name }) =>
  ({ type: types.EXTENSION_LOAD_FAILED, error, name });

export const themeChangeRequested = ({ name }) =>
  ({ type: types.THEME_CHANGE_REQUESTED, name });
export const themeChangeSucceed = ({ name }) =>
  ({ type: types.THEME_CHANGE_SUCCEED, name });
export const themeChangeFailed = ({ error }) =>
  ({ type: types.THEME_CHANGE_FAILED, error });
