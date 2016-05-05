import { combineReducers } from 'redux';
import { CREATE_SITE_REQUESTED, CREATE_SITE_STATUS_CHANGED, CREATE_SITE_SUCCEED,
  CREATE_SITE_FAILED } from '../actiontypes';
import { METEOR_USER_NOT_LOGGED_IN, YOU_ARE_NOT_LOGGED_IN } from '../errors';

export const isCreatingSite = (state = false, action) => {
  switch (action.type) {
    case CREATE_SITE_REQUESTED:
      return true;
    case CREATE_SITE_SUCCEED:
    case CREATE_SITE_FAILED:
      return false;
    default:
      return state;
  }
};

export const createSiteStatus = (state = false, action) => {
  switch (action.type) {
    case CREATE_SITE_STATUS_CHANGED:
      return action.status;
    case CREATE_SITE_SUCCEED:
    case CREATE_SITE_FAILED:
      return false;
    default:
      return state;
  }
};

export const createSiteError = (state = false, action) => {
  const { error } = action;
  switch (action.type) {
    case CREATE_SITE_FAILED:
      if (error.error === METEOR_USER_NOT_LOGGED_IN) {
        error.reason = YOU_ARE_NOT_LOGGED_IN;
      }
      return error;
    case CREATE_SITE_REQUESTED:
    case CREATE_SITE_SUCCEED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  isCreatingSite,
  createSiteStatus,
  createSiteError,
});
