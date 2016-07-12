import * as types from '../types';

export const createSiteRequested = (name, url, _id) =>
  ({ type: types.CREATE_SITE_REQUESTED, name, url, _id });
export const createSiteStatusChanged = status =>
  ({ type: types.CREATE_SITE_STATUS_CHANGED, status });
export const createSiteSucceed = siteId =>
  ({ type: types.CREATE_SITE_SUCCEED, siteId });
export const createSiteFailed = error =>
  ({ type: types.CREATE_SITE_FAILED, error });
