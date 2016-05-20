import { combineReducers } from 'redux';
import { TOGGLE_MOBILE_MENU } from '../actiontypes';
import { LOGOUT_SUCCEED } from '../dependencies';

export const showingMobileMenu = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_MOBILE_MENU:
      return !state;
    case LOGOUT_SUCCEED:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  showingMobileMenu,
});
