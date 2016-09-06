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

export const packageDeactivationRequested = ({ pkg }) =>
  ({ type: types.PACKAGE_DEACTIVATION_REQUESTED, pkg });
export const packageDeactivationSucceed = ({ pkg }) =>
  ({ type: types.PACKAGE_DEACTIVATION_SUCCEED, pkg });
export const packageDeactivationFailed = ({ error, pkg }) =>
  ({ type: types.PACKAGE_DEACTIVATION_FAILED, error, pkg });

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

export const packageAssetsLoadRequested = ({ pkg }) =>
  ({ type: types.PACKAGE_ASSETS_LOAD_REQUESTED, pkg });
export const packageAssetsFileDownloaded = ({ file }) =>
  ({ type: types.PACKAGE_ASSETS_FILE_DOWNLOADED, file });
export const packageAssetsLoadSucceed = ({ pkg }) =>
  ({ type: types.PACKAGE_ASSETS_LOAD_SUCCEED, pkg });
export const packageAssetsLoadFailed = ({ pkg, error }) =>
  ({ type: types.PACKAGE_ASSETS_LOAD_FAILED, pkg, error });
