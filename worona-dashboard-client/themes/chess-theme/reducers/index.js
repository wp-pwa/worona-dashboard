import { combineReducers } from 'redux';
import { items } from './header-items';
import { forms } from './forms';

export const showingMobileMenu = (state = false, action) => {
  if (action.type === 'TOGGLE_MOBILE_MENU') {
    return !state;
  }
  return state;
};

export const theme = combineReducers({
  header: combineReducers({
    items,
    showingMobileMenu,
  }),
  forms,
});
