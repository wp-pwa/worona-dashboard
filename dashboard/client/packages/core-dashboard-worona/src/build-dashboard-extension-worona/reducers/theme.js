import { combineReducers } from 'redux';
import * as types from '../types';

const defaultTheme = 'loading-dashboard-theme-worona';

export const requested = (state = defaultTheme, { type, name }) => {
  if (type === types.THEME_LOAD_REQUESTED) {
    return name;
  }
  return state;
};

export const isLoading = (state = defaultTheme, { type, pkg }) => {
  if (type === types.THEME_LOAD_STARTED) {
    return pkg.name;
  }
  return state;
};

export const current = (state = defaultTheme, { type, pkg }) => {
  if (type === types.THEME_LOAD_SUCCEED) {
    return pkg.name;
  }
  return state;
};

export default combineReducers({
  current,
  isLoading,
  requested,
});
