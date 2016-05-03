import { combineReducers } from 'redux';
import { TOGGLE_MOBILE_MENU } from '../actiontypes';

export const showingMobileMenu = (state = false, action) => {
  if (action.type === TOGGLE_MOBILE_MENU) {
    return !state;
  }
  return state;
};

export default combineReducers({
  showingMobileMenu,
});
