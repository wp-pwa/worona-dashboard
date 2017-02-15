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
  if (
    action.type === deps.types.ROUTER_DID_CHANGE &&
    (action.payload.location.query.siteName ||
      action.payload.location.query.siteURL ||
      action.payload.location.query.siteId)
  ) {
    const { siteName, siteURL, siteId } = action.payload.location.query;
    let siteInfo = { siteName, siteURL, siteId };
    siteInfo = lodash.pickBy(siteInfo, prop => !lodash.isUndefined(prop));
    return siteInfo;
  } else if (action.type === types.CREATE_SITE_SUCCEED) return {};

  return state;
};

export const checkSite = (state = { online: '', plugin: '', wpapi: '' }, { type, error }) => {
  switch (type) {
    case types.CHECK_SITE_REQUESTED:
      return { online: 'loading', plugin: 'loading', wpapi: 'loading' };
    case types.CHECK_SITE_SUCCEED: {
      return { online: 'success', plugin: 'success', wpapi: 'success' };
    }
    case types.CHECK_SITE_FAILED: {
      switch (error) {
        case errors.WORONA_PLUGIN_NOT_FOUND:
          return { online: 'success', plugin: 'error', wpapi: 'inactive' };
        case errors.WP_API_NOT_FOUND:
          return { online: 'success', plugin: 'success', wpapi: 'error' };
        default:
          // Also works for SITE_NOT_ONLINE.
          return { online: 'error', plugin: 'inactive', wpapi: 'inactive' };
      }
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
