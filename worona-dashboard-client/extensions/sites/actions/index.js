import { CREATE_SITE_REQUESTED, CREATE_SITE_STATUS_CHANGED, CREATE_SITE_SUCCEED,
  CREATE_SITE_FAILED } from '../actiontypes';

export const createSiteRequested = () => ({ type: CREATE_SITE_REQUESTED });
export const createSiteStatusChanged = () => ({ type: CREATE_SITE_STATUS_CHANGED });
export const createSiteSucceed = () => ({ type: CREATE_SITE_SUCCEED });
export const createSiteFailed = () => ({ type: CREATE_SITE_FAILED });
