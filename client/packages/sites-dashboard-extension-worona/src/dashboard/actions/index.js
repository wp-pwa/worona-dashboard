import stringifyError from 'stringify-error-message';
import * as types from '../types';
// Create Site actions:
export const createSiteRequested = ({ siteName, siteUrl, siteId }) => ({
  type: types.CREATE_SITE_REQUESTED,
  siteName,
  siteUrl,
  siteId,
});
export const createSiteStatusChanged = status => ({
  type: types.CREATE_SITE_STATUS_CHANGED,
  status,
});
export const createSiteSucceed = site => ({ type: types.CREATE_SITE_SUCCEED, site });
export const createSiteFailed = errorObj => ({
  type: types.CREATE_SITE_FAILED,
  error: stringifyError(errorObj),
});
// Delete Site actions:
export const deleteSiteRequested = ({ siteId }) => ({ type: types.DELETE_SITE_REQUESTED, siteId });
export const deleteSiteStatusChanged = status => ({
  type: types.DELETE_SITE_STATUS_CHANGED,
  status,
});
export const deleteSiteSucceed = siteId => ({ type: types.DELETE_SITE_SUCCEED, siteId });
export const deleteSiteFailed = errorObj => ({
  type: types.DELETE_SITE_FAILED,
  error: stringifyError(errorObj),
});
// Check Site actions
export const checkSiteRequested = () => ({ type: types.CHECK_SITE_REQUESTED });
export const checkSiteSucceed = (siteId, warning) => ({
  type: types.CHECK_SITE_SUCCEED,
  siteId,
  warning,
});
export const checkSiteFailed = errorObj => ({
  type: types.CHECK_SITE_FAILED,
  error: stringifyError(errorObj),
});
// Edit Site actions:
export const editSiteRequested = ({ siteName, siteUrl, siteId }) => ({
  type: types.EDIT_SITE_REQUESTED,
  siteName,
  siteUrl,
  siteId,
});
export const editSiteStatusChanged = status => ({ type: types.EDIT_SITE_STATUS_CHANGED, status });
export const editSiteSucceed = siteId => ({ type: types.EDIT_SITE_SUCCEED, siteId });
export const editSiteFailed = errorObj => ({
  type: types.EDIT_SITE_FAILED,
  error: stringifyError(errorObj),
});
