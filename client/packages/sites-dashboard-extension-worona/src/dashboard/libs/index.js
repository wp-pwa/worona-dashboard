import * as deps from '../deps';

export const createSite = ({ name, url, _id, caller = deps.libs.call }) =>
  caller('createSite', { name, url, _id });
export const deleteSite = ({ _id, caller = deps.libs.call }) =>
  caller('deleteSite', { _id });
export const updateSiteStatus = ({ _id, status, caller = deps.libs.call }) =>
  caller('updateSiteStatus', { _id, status });
export const editSite = ({ name, url, _id, caller = deps.libs.call }) =>
  caller('editSite', { name, url, _id });
