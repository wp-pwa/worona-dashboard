import { combineReducers } from 'redux';
import { TOGGLE_MOBILE_MENU } from '../actiontypes';

export const showingMobileMenu = (state = false, action) => {
  if (action.type === TOGGLE_MOBILE_MENU) {
    return !state;
  }
  return state;
};

export const initialState = [
  {
    name: 'Website',
    type: 'text',
    url: 'https://www.worona.org',
  },
  {
    name: 'Documentation',
    type: 'text',
    url: 'https://docs.worona.org',
    target: '_blank',
  },
  {
    name: 'Forums',
    type: 'text',
    url: 'https://forums.worona.org',
    target: '_blank',
  },
  {
    name: 'Support',
    type: 'text',
    url: 'https://support.worona.org',
    target: '_blank',
  },
];

export const items = (state = initialState) => state;

export default combineReducers({
  showingMobileMenu,
  items,
});
