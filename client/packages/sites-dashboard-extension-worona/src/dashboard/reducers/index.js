import lodash from 'lodash';
import { combineReducers } from 'redux';
import * as types from '../types';
import * as errors from '../errors';
import * as deps from '../deps';

export const isCreatingSite = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_SITE_REQUESTED:
      return true;
    case types.CREATE_SITE_SUCCEED:
    case types.CREATE_SITE_FAILED:
      return false;
    default:
      return state;
  }
};

export const createSiteStatus = (state = false, action) => {
  switch (action.type) {
    case types.CREATE_SITE_STATUS_CHANGED:
      return action.status;
    case types.CREATE_SITE_SUCCEED:
    case types.CREATE_SITE_FAILED:
      return false;
    default:
      return state;
  }
};

export const createSiteError = (state = false, action) => {
  const { error } = action;
  switch (action.type) {
    case types.CREATE_SITE_FAILED:
      return error;
    case types.CREATE_SITE_REQUESTED:
    case types.CREATE_SITE_SUCCEED:
      return false;
    default:
      return state;
  }
};

export const newSiteInfo = (state = {}, action) => {
  if (action.type === deps.types.ROUTER_DID_CHANGE
   && (action.payload.location.query.siteName
     || action.payload.location.query.siteURL
     || action.payload.location.query.siteId)) {
    const { siteName, siteURL, siteId } = action.payload.location.query;
    let siteInfo = { siteName, siteURL, siteId };
    siteInfo = lodash.pickBy(siteInfo, prop => !lodash.isUndefined(prop));
    return siteInfo;
  } else if (action.type === types.CREATE_SITE_SUCCEED) return {};

  return state;
};

/* aux function for checkSite reducer */
export function CheckSiteState(online = 'inactive', plugin = 'inactive', siteId = 'inactive') {
  this.online = online;
  this.plugin = plugin;
  this.siteId = siteId;
}

export const checkSite = (state = new CheckSiteState(), action) => {
  switch (action.type) {
    case types.CHECK_SITE_REQUESTED:
      return new CheckSiteState('loading', 'loading', 'loading');
    case types.CHECK_SITE_SUCCEED:
      return new CheckSiteState('success', 'success', 'success');
    case types.CHECK_SITE_FAILED: {
      const { error } = action;
      if (error === errors.RESPONSE_NOT_200) return new CheckSiteState('error');
      if (error === errors.WORONA_PLUGIN_NOT_FOUND) return new CheckSiteState('success', 'error');
      if (error === errors.WP_API_NOT_FOUND) return new CheckSiteState('success', 'error');
      if (error === errors.SITEID_DONT_MATCH) return new CheckSiteState('success', 'success', 'warning');
      /* else any other error */ return new CheckSiteState('error');
    }
    default:
      return state;
  }
};

export default () => combineReducers({
  isCreatingSite,
  createSiteStatus,
  createSiteError,
  newSiteInfo,
  checkSite,
  collection: deps.reducerCreators.collectionCreator('sites'),
  isReady: deps.reducerCreators.isReadyCreator('sites'),
});
