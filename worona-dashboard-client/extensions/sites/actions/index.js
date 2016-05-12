import { CREATE_SITE_REQUESTED, CREATE_SITE_STATUS_CHANGED, CREATE_SITE_SUCCEED,
  CREATE_SITE_FAILED, SITES_COLLECTION_MODIFIED, SITES_COLLECTION_STARTED, SITES_COLLECTION_READY,
  SITES_COLLECTION_FAILED, SITES_COLLECTION_STOPPED } from '../actiontypes';

export const createSiteRequested = (name, url, _id) =>
  ({ type: CREATE_SITE_REQUESTED, name, url, _id });
export const createSiteStatusChanged = status => ({ type: CREATE_SITE_STATUS_CHANGED, status });
export const createSiteSucceed = siteId => ({ type: CREATE_SITE_SUCCEED, siteId });
export const createSiteFailed = error => ({ type: CREATE_SITE_FAILED, error });

export const sitesCollectionStarted = () => ({ type: SITES_COLLECTION_STARTED });
export const sitesCollectionModified = (event, id, fields) =>
  ({ type: SITES_COLLECTION_MODIFIED, event, id, fields });
export const sitesCollectionReady = () => ({ type: SITES_COLLECTION_READY });
export const sitesCollectionFailed = error => ({ type: SITES_COLLECTION_FAILED, error });
export const sitesCollectionStopped = () => ({ type: SITES_COLLECTION_STOPPED });
