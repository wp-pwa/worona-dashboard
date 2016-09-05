import * as types from '../types';

export const corePackagesRequested = () =>
  ({ type: types.CORE_PACKAGES_REQUESTED });
export const corePackagesSucceed = ({ pkgs }) =>
  ({ type: types.CORE_PACKAGES_SUCCEED, pkgs });
export const corePackagesFailed = ({ error }) =>
  ({ type: types.CORE_PACKAGES_FAILED, error });

export const packageActivationRequested = ({ pkg }) =>
  ({ type: types.PACKAGE_ACTIVATION_REQUESTED, pkg });
export const packageActivationSucceed = ({ pkg }) =>
  ({ type: types.PACKAGE_ACTIVATION_SUCCEED, pkg });
export const packageActivationFailed = ({ error, pkg }) =>
  ({ type: types.PACKAGE_ACTIVATION_FAILED, error, pkg });

export const packageDownloadRequested = ({ pkg }) =>
  ({ type: types.PACKAGE_DOWNLOAD_REQUESTED, pkg });
export const packageDownloadSucceed = ({ pkg }) =>
  ({ type: types.PACKAGE_DOWNLOAD_SUCCEED, pkg });
export const packageDownloadFailed = ({ error, pkg }) =>
  ({ type: types.PACKAGE_DOWNLOAD_FAILED, error, pkg });

export const packageLoadRequested = ({ pkg }) =>
  ({ type: types.PACKAGE_LOAD_REQUESTED, pkg });
export const packageLoadSucceed = ({ pkg }) =>
  ({ type: types.PACKAGE_LOAD_SUCCEED, pkg });
export const packageLoadFailed = ({ error, pkg }) =>
  ({ type: types.PACKAGE_LOAD_FAILED, error, pkg });

export const themeCssLoadRequested = ({ pkg }) =>
  ({ type: types.THEME_CSS_LOAD_REQUESTED, pkg });
export const themeCssFileDownloaded = ({ file }) =>
  ({ type: types.THEME_CSS_FILE_DOWNLOADED, file });
export const themeCssLoadSucceed = ({ pkg }) =>
  ({ type: types.THEME_CSS_LOAD_SUCCEED, pkg });
export const themeCssLoadFailed = ({ pkg, error }) =>
  ({ type: types.THEME_CSS_LOAD_FAILED, pkg, error });

export const themeHtmlLoadRequested = ({ pkg }) =>
  ({ type: types.THEME_HTML_LOAD_REQUESTED, pkg });
export const themeHtmlLoadSucceed = ({ pkg }) =>
  ({ type: types.THEME_HTML_LOAD_SUCCEED, pkg });
export const themeHtmlLoadFailed = ({ pkg, error }) =>
  ({ type: types.THEME_HTML_LOAD_FAILED, pkg, error });
