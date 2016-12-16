import { combineReducers } from 'redux';
import * as types from '../types';
import * as deps from '../deps';

export const showingSiteHomeMobileMenu = (state = false, action) => {
  switch (action.type) {
    case types.TOGGLE_SITEHOME_MOBILE_MENU:
      return !state;
    case deps.types.ROUTER_DID_CHANGE:
      return false;
    default:
      return state;
  }
};

export default () => combineReducers({
  showingSiteHomeMobileMenu,
});
