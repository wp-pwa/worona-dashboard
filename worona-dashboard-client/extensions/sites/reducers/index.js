import { combineReducers } from 'redux';
import { CREATE_SITE_REQUESTED, CREATE_SITE_STATUS_CHANGED, CREATE_SITE_SUCCEED,
  CREATE_SITE_FAILED } from '../actiontypes';

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

export default combineReducers({
  isCreatingSite,
});
