import * as deps from '../deps';

export const createSite = ({ siteName, siteUrl, siteId, caller = deps.libs.call }) =>
  caller('createSite', { siteName, siteUrl, siteId });
export const deleteSite = ({ siteId, caller = deps.libs.call }) =>
  caller('deleteSite', { siteId });
export const updateSiteStatus = ({ siteId, status, caller = deps.libs.call }) =>
  caller('updateSiteStatus', { siteId, status });
export const editSite = ({ siteName, siteUrl, siteId, caller = deps.libs.call }) =>
  caller('editSite', { siteName, siteUrl, siteId });
